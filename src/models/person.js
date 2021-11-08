const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');
const db = require('../db');

const Person = {
  find: async (email) => db.query(
    'SELECT * FROM "Person" WHERE "email" = $1;',
    [email],
  ),

  hashPassword: async (password) => bcrypt.hash(password, 10),

  verifyPassword: async (password, hashedPassword) => bcrypt.compare(password, hashedPassword),

  create: async (person) => {
    const { email, hashedPassword } = person;
    await db.query(
      'INSERT INTO "Person" ("email", "hashedPassword") VALUES ($1, $2);',
      [email, hashedPassword],
    );
  },

  createToken: (person) => jwt.sign(person, config.auth.jwtSecretKey, { expiresIn: '90d' }),

  verifyToken: (token) => jwt.verify(token, config.auth.jwtSecretKey),
};

module.exports = Person;
