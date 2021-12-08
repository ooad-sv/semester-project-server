const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const format = require('pg-format');
const config = require('../config');
const db = require('../services/db');

class Person {
  /*
 MVC pattern: Person Model interacts with Person table in the database
 */
  static async findByEmail(email) {
    return db.query(
      'SELECT * FROM "Person" WHERE "email" = $1;',
      [email],
    );
  }

  static async findById(id) {
    return db.query(
      'SELECT * FROM "Person" WHERE "id" = $1;',
      [id],
    );
  }

  static async hashPassword(password) { return bcrypt.hash(password, 10); }

  static async verifyPassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }

  static async create(personData) {
    const person = personData;
    person.hashedPassword = await Person.hashPassword(person.password);
    person.isAdmin = false;
    person.intervalNotificationsEnabled = true;
    person.alarmNotificationsEnabled = true;
    person.timeInterval = 4;
    person.arePreferencesSet = false;
    delete person.password;
    const {
      firstName, lastName, email, hashedPassword,
    } = person;
    const result = await db.query(
      `INSERT INTO "Person" 
      ("firstName", "lastName", "email", "hashedPassword", 
      "isAdmin", "intervalNotificationsEnabled", "alarmNotificationsEnabled", "timeInterval", "arePreferencesSet") 
      VALUES ($1, $2, $3, $4, false, true, true, 4, false)
      RETURNING id;`,
      [firstName, lastName, email, hashedPassword],
    );
    person.id = result.rows[0].id;
    return person;
  }

  static async updateProfile(personData) {
    const { rows } = await Person.findByEmail(personData.email);
    const newPerson = rows[0];
    if (personData.firstName && personData.firstName.length > 0) {
      newPerson.firstName = personData.firstName;
    }
    if (personData.lastName && personData.lastName.length > 0) {
      newPerson.lastName = personData.lastName;
    }
    if (personData.password && personData.password.length > 0) {
      newPerson.hashedPassword = await Person.hashPassword(personData.password);
    }
    const {
      id, firstName, lastName, hashedPassword,
    } = newPerson;
    await db.query(
      `UPDATE "Person" 
      SET "firstName" = $2, "lastName" = $3, "hashedPassword" = $4
      WHERE "id" = $1;`,
      [id, firstName, lastName, hashedPassword],
    );
    return newPerson;
  }

  static async updatePreferences(preferencesData) {
    const preferences = preferencesData;
    preferences.arePreferencesSet = true;
    preferences.intervalNotificationsEnabled = preferences.intervalNotificationsEnabled === 'true';
    preferences.alarmNotificationsEnabled = preferences.alarmNotificationsEnabled === 'true';
    // eslint-disable-next-line no-restricted-syntax
    for (const key in preferences) {
      if (Object.hasOwnProperty.call(preferences, key)) {
        const element = preferences[key];
        if (element === '') {
          preferences[key] = null;
        }
      }
    }
    const {
      id, timeInterval, intervalNotificationsEnabled, alarmNotificationsEnabled,
      minTemperature, maxTemperature, minPressure, maxPressure,
      minHumidity, maxHumidity, minAltitude, maxAltitude,
    } = preferences;
    await db.query(
      `UPDATE "Person"
      SET "arePreferencesSet" = true, 
      "intervalNotificationsEnabled" = $2, "timeInterval" = $3, "alarmNotificationsEnabled" = $4,
      "minTemperature" = $5, "maxTemperature" = $6, "minPressure" = $7, "maxPressure" = $8,
      "minHumidity" = $9, "maxHumidity" = $10, "minAltitude" = $11, "maxAltitude" = $12
      WHERE "id" = $1;`,
      [id, intervalNotificationsEnabled, timeInterval, alarmNotificationsEnabled,
        minTemperature, maxTemperature, minPressure, maxPressure,
        minHumidity, maxHumidity, minAltitude, maxAltitude],
    );
    const subscriptions = preferencesData.subscriptions || [];
    await Person.updateSubscriptions(id, subscriptions);
    preferences.subscriptions = await Person.getSubscriptions(id);
    return preferences;
  }

  static async getSubscribedStations(id) {
    const { rows } = await db.query(
      `SELECT W."id", "name", "enabledState", "temperature", "pressure", "humidity", "altitude"
      FROM "WeatherStation" AS W JOIN "Subscription" AS S
      ON S."weatherStationId" = W."id"
      WHERE S."personId" = $1
      ORDER BY "enabledState" DESC, "id";`,
      [id],
    );
    return rows;
  }

  /*
 Observer pattern: Person subscribes to multiple WeatherStations.
 */
  static async getSubscriptions(id) {
    const { rows } = await db.query(
      `SELECT "id", "name", "personId"
      FROM "WeatherStation" W
      LEFT JOIN
      (SELECT "weatherStationId", "personId"
      FROM "Subscription"
      WHERE "Subscription"."personId" = $1) AS S
      ON S."weatherStationId" = W."id"
      ORDER BY "id";`,
      [id],
    );
    const subscriptions = rows.map((e) => {
      e.enabled = e.personId !== null;
      delete e.personId;
      return e;
    });
    return subscriptions;
  }

  static async updateSubscriptions(id, rawSubscriptions) {
    await db.query('DELETE FROM "Subscription" WHERE "personId" = $1;', [id]);
    if (rawSubscriptions.length > 0) {
      const subscriptions = rawSubscriptions.map((e) => ([id, e]));
      const query = format(`
      INSERT INTO "Subscription" ("personId", "weatherStationId")
      VALUES %L;`, subscriptions);
      await db.query(query);
    }
  }

  static async getPreferences(id) {
    const { rows } = await Person.findById(id);
    const preferences = rows[0];
    preferences.subscriptions = await Person.getSubscriptions(id);
    if (preferences.arePreferencesSet !== true) {
      preferences.subscriptions.forEach((e) => { e.enabled = true; });
      preferences.minTemperature = 16;
      preferences.maxTemperature = 35;
      preferences.minPressure = 50000;
      preferences.maxPressure = 150000;
      preferences.minHumidity = 10;
      preferences.maxHumidity = 65;
      preferences.minAltitude = 1000;
      preferences.maxAltitude = 2000;
    }
    return preferences;
  }

  static createToken(person) {
    const data = (({
      id, firstName, lastName, email, isAdmin, arePreferencesSet,
    }) => ({
      id, firstName, lastName, email, isAdmin, arePreferencesSet,
    }))(person);
    return jwt.sign(data, config.auth.jwtSecretKey, { expiresIn: '90d' });
  }

  static verifyToken(token) { return jwt.verify(token, config.auth.jwtSecretKey); }
}

module.exports = Person;
