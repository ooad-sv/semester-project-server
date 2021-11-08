
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');
const db = require('../db');

const Person = {
    find: async (email) => {
        return db.query(
            'SELECT * FROM "Person" WHERE "email" = $1;', 
            [email]
        );
    },

    hashPassword: async (password) => {
        return bcrypt.hash(password, 10);
    },

    verifyPassword: async (password, hashedPassword) => {
        return bcrypt.compare(password, hashedPassword);
    },

    create: async (person) => {
        const {email, hashedPassword} = person;
        await db.query(
            'INSERT INTO "Person" ("email", "hashedPassword") VALUES ($1, $2);', 
            [email, hashedPassword]
        );
    },

    createToken: (person) => {
        return jwt.sign(person, config.auth.jwtSecretKey, { expiresIn: "90d" });
    },

    verifyToken: (token) => {
        return jwt.verify(token, config.auth.jwtSecretKey);
    },
};

module.exports = Person;