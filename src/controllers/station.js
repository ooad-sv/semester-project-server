const express = require('express');

const router = express.Router();

router.get('/station', async (req, res) => {
  res.render('person/login', { title: 'Station' });
});

module.exports = router;
