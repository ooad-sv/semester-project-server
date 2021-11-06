require('dotenv').config();
const express = require('express');
const db = require('./services/db');

const app = express();
const port = process.env.PORT;

app.get('/', async (req, res) => {
  try {
    const rows = await db.query('SELECT 1');
    console.log({rows});
  }
  catch (error) {
    console.log(error);
  }
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})