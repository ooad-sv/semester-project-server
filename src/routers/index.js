const express = require('express');
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

router.post('/register', async (req, res) => {
    console.log(req.body);
    const { email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        res.render('register', {title: 'Register', errors: ["Passwords don't match!"]});
    }
    res.render('register', {title: 'Register'});
});

module.exports = router;