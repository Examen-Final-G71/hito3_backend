const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.USER_DB,
  host: process.env.HOST_DB,
  database: process.env.DATABASE,
  password: process.env.PASSWORD_DB,
  port: process.env.PORT,
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};