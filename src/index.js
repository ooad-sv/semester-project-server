require('dotenv').config();
const path = require('path');
const express = require('express');
const personController = require('./controllers/person');
const stationController = require('./controllers/station');

const app = express();
const port = process.env.PORT;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', personController);
app.use('/', stationController);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});