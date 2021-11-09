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

  static createToken(person) {
    const data = (({
      id, firstName, email, isAdmin,
    }) => ({
      id, firstName, email, isAdmin,
    }))(person);
    return jwt.sign(data, config.auth.jwtSecretKey, { expiresIn: '90d' });
  }

  static verifyToken(token) { return jwt.verify(token, config.auth.jwtSecretKey); }
}

module.exports = Person;
