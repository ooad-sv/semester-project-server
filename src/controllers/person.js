const express = require('express');
const { body, validationResult } = require('express-validator');
const Person = require('../models/person');

const router = express.Router();

router.get('/', async (req, res) => res.render('person/login', { title: 'Login' }));

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const rows = await Person.find(email);
    if (!rows.length) {
      return res.render('person/login', { title: 'Login', errors: ['Person with that email does not exist!'] });
    }
    const person = rows[0];
    const passwordCorrect = await Person.verifyPassword(password, person.hashedPassword);
    if (!passwordCorrect) {
      return res.render('person/login', { title: 'Login', errors: ['Invalid password!'] });
    }
    person.token = Person.createToken(person);
    return res.render('person/dashboard', { title: 'Dashboard', person });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return res.render('person/login', { title: 'Login', errors: ['Something went wrong!'] });
  }
});

router.get('/register', async (req, res) => res.render('person/register', { title: 'Register' }));

router.post('/register',
  body('email', 'Email not valid!').trim().isEmail().normalizeEmail(),
  body('password', 'Password must be at least 4 characters long!').trim().isLength({ min: 4 }),
  body('confirmPassword', 'Passwords must be the same!').custom(async (confirmPassword, { req }) => {
    if (req.body.password !== confirmPassword) throw new Error();
  }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.render('person/register', { title: 'Register', errors: errors.array().map((e) => e.msg) });
      }
      const person = req.body;
      delete person.confirmPassword;
      const rows = await Person.find(person.email);
      if (rows.length) {
        return res.render('person/register', { title: 'Register', errors: ['Person with that email already exists!'] });
      }
      person.hashedPassword = await Person.hashPassword(person.password);
      delete person.password;
      await Person.create(person);
      person.token = Person.createToken(person);
      return res.render('person/dashboard', { title: 'Dashboard', person });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      return res.render('person/register', { title: 'Register', errors: ['Something went wrong!'] });
    }
  });

router.get('/dashboard', async (req, res) => res.render('person/dashboard', { title: 'Dashboard' }));

router.post('/logout', async (req, res) => res.redirect('/'));

module.exports = router;
