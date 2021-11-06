require('dotenv').config();
const path = require('path');
const express = require('express');
const db = require('./db');

const app = express();
const port = process.env.PORT;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (req, res) => {
  res.render('index');
})

app.post('/', async (req, res) => {
  console.log(req.body);
  res.render('index');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})