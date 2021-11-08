const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

router.get('/', async (req, res) => {
    res.render('login', {title: 'Login'});
});

router.post('/', async (req, res) => {
    console.log(req.body);
    res.render('login', {title: 'Login'});
});

router.get('/register', async (req, res) => {
    res.render('register', {title: 'Register'});
});

router.post('/register', 
    body('email', 'Email not valid!').trim().isEmail().normalizeEmail(),
    body('password', 'Password must be at least 4 characters long!').trim().isLength({ min: 4 }),
    body('confirmPassword', 'Passwords must be the same!').custom(async (confirmPassword, {req}) => {
        if (req.body.password !== confirmPassword) throw new Error();
    }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
            return res.render('register', {title: 'Register', errors: errors.array().map(e => e.msg)});
        }
        console.log(req.body);
        const { email, password } = req.body;
        res.render('register', {title: 'Register'});
    }
);

module.exports = router;