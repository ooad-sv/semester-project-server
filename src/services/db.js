const { Pool } = require('pg');
const config = require('../config');

/*
 Object Pool pattern: The WebServer will get an instance of the DBConnectionPool
 using the getInstance method. It will execute the SQL queries using this
 connection pool using the query method. The connection pool object will internally
 manage the acquisition and release of reusable connection objects.
 */
const pool = new Pool(config.db);

const query = async (sqlQuery, params) => {
  let result = await pool.query(sqlQuery, params);
  result = (({ rowCount, rows }) => ({ rowCount, rows }))(result);
  return result;
};

module.exports = {
  query,
};
