const express = require('express');
const { body, validationResult } = require('express-validator');
const Person = require('../models/person');
const router = express.Router();

router.get('/', async (req, res) => {
    res.render('person/login', {title: 'Login'});
});

router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;
        const rows = Person.find(email);
        if (!rows.length) {
            return res.render('person/login', {title: 'Login', errors: ['User with that email does not exist!'] });
        }
        const user = rows[0];
        const passwordCorrect = await Person.verifyPassword(password, user.hashedPassword);
        if (!passwordCorrect) {
            return res.render('person/login', {title: 'Login', errors: ['Invalid password!'] });
        } 
        res.render('person/login', {title: 'Login'});
    } catch (error) {
        console.error(error);
    }
});

router.get('/register', async (req, res) => {
    res.render('person/register', {title: 'Register'});
});

router.post('/register', 
    body('email', 'Email not valid!').trim().isEmail().normalizeEmail(),
    body('password', 'Password must be at least 4 characters long!').trim().isLength({ min: 4 }),
    body('confirmPassword', 'Passwords must be the same!').custom(async (confirmPassword, {req}) => {
        if (req.body.password !== confirmPassword) throw new Error();
    }),
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.render('person/register', {title: 'Register', errors: errors.array().map(e => e.msg)});
            }
            const { email, password } = req.body;
            const rows = Person.find(email);
            if (rows.length) {
                return res.render('person/register', {title: 'Register', errors: ['User with that email already exists!'] });
            }
            const hashedPassword = await Person.hashPassword(password);
            await Person.create(email, hashedPassword);
            res.render('person/register', {title: 'Register'});
        } catch (error) {
            console.error(error);
        }
    }
);

module.exports = router;