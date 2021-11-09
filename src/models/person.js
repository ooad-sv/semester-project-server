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
    delete person.password;
    const {
      firstName, lastName, email, hashedPassword, isAdmin,
    } = person;
    await db.query(
      `INSERT INTO "Person" 
      ("firstName", "lastName", "email", "hashedPassword", "isAdmin") 
      VALUES ($1, $2, $3, $4, $5);`,
      [firstName, lastName, email, hashedPassword, isAdmin],
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
      SET "intervalNotificationsEnabled" = $2, "timeInterval" = $3, "alarmNotificationsEnabled" = $4,
      "minTemperature" = $5, "maxTemperature" = $6, "minPressure" = $7, "maxPressure" = $8,
      "minHumidity" = $9, "maxHumidity" = $10, "minAltitude" = $11, "maxAltitude" = $12
      WHERE "id" = $1;`,
      [id, intervalNotificationsEnabled, timeInterval, alarmNotificationsEnabled,
        minTemperature, maxTemperature, minPressure, maxPressure,
        minHumidity, maxHumidity, minAltitude, maxAltitude],
    );
    return preferences;
  }

  static createToken(person) {
    const data = (({
      id, firstName, lastName, email, isAdmin,
    }) => ({
      id, firstName, lastName, email, isAdmin,
    }))(person);
    return jwt.sign(data, config.auth.jwtSecretKey, { expiresIn: '90d' });
  }

  static verifyToken(token) { return jwt.verify(token, config.auth.jwtSecretKey); }
}

module.exports = Person;
