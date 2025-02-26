const { Pool } = require('pg');
const envs = require('./config/config');

const pool = new Pool({
  connectionString: envs.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
pool.query('SELECT NOW()')
    .then(res => console.log(res.rows))
    .catch(err => console.error('Error en la conexión a la base de datos', err));

module.exports = pool;