const express = require('express');
const { body, validationResult } = require('express-validator');
const WeatherStation = require('../models/weatherStation');
const Utilities = require('../services/utilities');

const router = express.Router();

router.post('/weather-station/update',
  body('key', 'Key length not valid!').trim().isLength({ min: 32, max: 32 }),
  body('temperature', 'Temperature not valid!').trim().isNumeric(),
  body('pressure', 'Pressure not valid!').trim().isNumeric(),
  body('humidity', 'Humidity not valid!').trim().isNumeric(),
  body('altitude', 'Altitude not valid!').trim().isNumeric(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorString = errors.array().map((e) => e.msg).join(' ');
      return res.status(400).send(errorString);
    }
    const rowCount = await WeatherStation.updateData(req.body);
    if (rowCount !== 1) {
      return res.status(404).send('Weather station not found!');
    }
    return res.status(200).send('OK!');
  });

router.post('/weather-station/toggle-state', Utilities.isAuthenticated, Utilities.isAdmin,
  body('id', 'Id not valid!').trim().isNumeric(),
  async (req, res) => {
    const { id } = req.body;
    await WeatherStation.toggleState(id);
    res.redirect('/dashboard');
  });

module.exports = router;
