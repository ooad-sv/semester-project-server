const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');
const db = require('../db');

class Person {
  static async find(email) {
    return db.query(
      'SELECT * FROM "Person" WHERE "email" = $1;',
      [email],
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
    await db.query(
      `INSERT INTO "Person" 
      ("firstName", "lastName", "email", "hashedPassword", 
      "isAdmin", "intervalNotificationsEnabled", "alarmNotificationsEnabled", "timeInterval", "arePreferencesSet") 
      VALUES ($1, $2, $3, $4, false, true, true, 4, false);`,
      [firstName, lastName, email, hashedPassword],
    );
    return person;
  }

  static async updateProfile(personData) {
    const rows = await Person.find(personData.email);
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
    return preferences;
  }

  static async getPreferences(email) {
    const rows = await Person.find(email);
    const preferences = rows[0];
    if (preferences.arePreferencesSet !== true) {
      preferences.minTemperature = 0.75;
      preferences.maxTemperature = 1.75;
      preferences.minPressure = 0.75;
      preferences.maxPressure = 1.75;
      preferences.minHumidity = 0.75;
      preferences.maxHumidity = 1.75;
      preferences.minAltitude = 0.75;
      preferences.maxAltitude = 1.75;
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
