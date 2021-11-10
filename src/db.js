const { Pool } = require('pg');
const config = require('./config');

const pool = new Pool(config.db);

async function query(sqlQuery, params) {
  let result = await pool.query(sqlQuery, params);
  result = (({ rowCount, rows }) => ({ rowCount, rows }))(result);
  return result;
}

module.exports = {
  query,
};
