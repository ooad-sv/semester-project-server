require('dotenv').config();
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const personController = require('./controllers/person');
const weatherStationController = require('./controllers/weatherStation');

/*
 MVC pattern: We're applying the MVC pattern where user interacts with the View, Controller
 changes the Model state and renders the View and Model updates the View.
 */
const app = express();
const port = process.env.PORT;

/*
 MVC pattern: Registered Views
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

/*
 MVC pattern: Registered Controllers
 */
app.use('/', personController);
app.use('/', weatherStationController);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening at http://localhost:${port}`);
});
