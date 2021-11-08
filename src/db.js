const { Pool } = require('pg');
const config = require('./config');

const pool = new Pool(config.db);

async function query(sqlQuery, params) {
  const { rows } = await pool.query(sqlQuery, params);
  return rows;
}

module.exports = {
  query,
};
