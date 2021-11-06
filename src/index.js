require('dotenv').config();
const path = require('path');
const express = require('express');
const db = require('./db');

const app = express();
const port = process.env.PORT;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
  res.render('index', {
    data: 'Hello World!'
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})