
const bcrypt = require('bcrypt');
const db = require('../db');

const Person = {
    find: async (email) => {
        await db.query(
            'SELECT * FROM "Person" WHERE "email" = $1 LIMIT;', 
            [email]
        );
    },

    hashPassword: async (password) => {
        return bcrypt.hash(password, 10);
    },

    verifyPassword: async (password, hashedPassword) => {
        return bcrypt.compare(password, hashedPassword);
    },

    create: async (email, hashedPassword) => {
        await db.query(
            'INSERT INTO "Person" ("email", "hashedPassword") VALUES ($1, $2);', 
            [email, hashedPassword]
        );
    },
};

module.exports = Person;