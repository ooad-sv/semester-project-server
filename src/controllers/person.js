const express = require('express');
const { body, validationResult } = require('express-validator');
const Person = require('../models/person');
const Utilities = require('../utilities');

const router = express.Router();

router.get('/', Utilities.isUnauthorized,
  async (req, res) => res.render('person/login', { title: 'Login' }));

router.post('/login', Utilities.isUnauthorized,
  body('email', 'Email not valid!').trim().isEmail().normalizeEmail(),
  body('password', 'Password must be at least 4 characters long!').trim().isLength({ min: 4 }),
  async (req, res) => {
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
      const token = Person.createToken(person);
      Utilities.setTokenCookie(res, token);
      return res.redirect('/dashboard');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      return res.render('person/login', { title: 'Login', errors: ['Something went wrong!'] });
    }
  });

router.get('/register', Utilities.isUnauthorized,
  async (req, res) => res.render('person/register', { title: 'Register' }));

router.post('/register', Utilities.isUnauthorized,
  body('firstName', 'First name cannot be empty!').trim().not().isEmpty(),
  body('lastName', 'Last name cannot be empty!').trim().not().isEmpty(),
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
      let person = req.body;
      delete person.confirmPassword;
      const rows = await Person.find(person.email);
      if (rows.length) {
        return res.render('person/register', { title: 'Register', errors: ['Person with that email already exists!'] });
      }
      person = await Person.create(person);
      const token = Person.createToken(person);
      Utilities.setTokenCookie(res, token);
      return res.redirect('/dashboard');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      return res.render('person/register', { title: 'Register', errors: ['Something went wrong!'] });
    }
  });

router.get('/dashboard', Utilities.isAuthorized,
  async (req, res) => res.render('person/dashboard', { title: 'Dashboard', person: req.person }));

router.post('/logout', Utilities.isAuthorized, async (req, res) => {
  Utilities.clearTokenCookie(res);
  return res.redirect('/');
});

module.exports = router;
