const express = require('express');
const { body, validationResult } = require('express-validator');
const Person = require('../models/person');
const Utilities = require('../utilities');

const router = express.Router();

router.get('/', Utilities.unauthenticated,
  async (req, res) => {
    req.data.title = 'Login';
    res.render('person/login', req.data);
  });

router.post('/login', Utilities.unauthenticated,
  body('email', 'Email not valid!').trim().isEmail().normalizeEmail(),
  body('password', 'Password must be at least 4 characters long!').trim().isLength({ min: 4 }),
  async (req, res) => {
    req.data.title = 'Login';
    try {
      const { email, password } = req.body;
      const rows = await Person.find(email);
      if (!rows.length) {
        req.data.errors = ['Person with that email does not exist!'];
        return res.render('person/login', req.data);
      }
      const person = rows[0];
      const passwordCorrect = await Person.verifyPassword(password, person.hashedPassword);
      if (!passwordCorrect) {
        req.data.errors = ['Invalid password!'];
        return res.render('person/login', req.data);
      }
      const token = Person.createToken(person);
      Utilities.setTokenCookie(res, token);
      return res.redirect('/dashboard');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      req.data.errors = ['Something went wrong!'];
      return res.render('person/login', req.data);
    }
  });

router.get('/register', Utilities.unauthenticated,
  async (req, res) => {
    req.data.title = 'Register';
    res.render('person/register', req.data);
  });

router.post('/register', Utilities.unauthenticated,
  body('firstName', 'First name cannot be empty!').trim().not().isEmpty(),
  body('lastName', 'Last name cannot be empty!').trim().not().isEmpty(),
  body('email', 'Email not valid!').trim().isEmail().normalizeEmail(),
  body('password', 'Password must be at least 4 characters long!').trim().isLength({ min: 4 }),
  body('confirmPassword', 'Passwords must be the same!').custom(async (confirmPassword, { req }) => {
    if (req.body.password !== confirmPassword) throw new Error();
  }),
  async (req, res) => {
    req.data.title = 'Register';
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        req.data.errors = errors.array().map((e) => e.msg);
        return res.render('person/register', req.data);
      }
      let person = req.body;
      delete person.confirmPassword;
      const rows = await Person.find(person.email);
      if (rows.length) {
        req.data.errors = ['Person with that email already exists!'];
        return res.render('person/register', req.data);
      }
      person = await Person.create(person);
      const token = Person.createToken(person);
      Utilities.setTokenCookie(res, token);
      return res.redirect('/dashboard');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      req.data.errors = ['Something went wrong!'];
      return res.render('person/register', req.data);
    }
  });

router.get('/dashboard', Utilities.authenticated,
  async (req, res) => {
    req.data.title = 'Dashboard';
    res.render('person/dashboard', req.data);
  });

router.get('/logout', Utilities.authenticated, async (req, res) => {
  Utilities.clearTokenCookie(res);
  return res.redirect('/');
});

router.get('/profile', Utilities.authenticated,
  async (req, res) => {
    req.data.title = 'Profile';
    res.render('person/profile', req.data);
  });

router.post('/profile', Utilities.authenticated,
  body('password', 'Password must be at least 4 characters long!').optional({ checkFalsy: true }).trim().isLength({ min: 4 }),
  body('confirmPassword', 'Passwords must be the same!').custom(async (confirmPassword, { req }) => {
    if (req.body.password !== confirmPassword) throw new Error();
  }),
  async (req, res) => {
    req.data.title = 'Profile';
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        req.data.errors = errors.array().map((e) => e.msg);
        return res.render('person/profile', req.data);
      }
      const personData = req.body;
      personData.email = req.data.person.email;
      const person = await Person.update(personData);
      const token = Person.createToken(person);
      Utilities.setTokenCookie(res, token);
      req.data.person = person;
      req.data.updated = true;
      return res.render('person/profile', req.data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      req.data.errors = ['Something went wrong!'];
      return res.render('person/profile', req.data);
    }
  });

router.get('/preferences', Utilities.authenticated,
  async (req, res) => {
    req.data.title = 'Preferences';
    res.render('person/preferences', req.data);
  });

module.exports = router;
