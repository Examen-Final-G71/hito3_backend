const pool = require('../config/db');

const createUser = async (nombre, correo, hashedPassword) => {
  const result = await pool.query(
    'INSERT INTO "Usuarios" (nombre, correo, password) VALUES ($1, $2, $3) RETURNING *',
    [nombre, correo, hashedPassword]
  );
  return result.rows[0];
};

const getUserByEmail = async (correo) => {
  const result = await pool.query('SELECT * FROM "Usuarios" WHERE correo = $1', [correo]);
  return result.rows[0];
};

const getUserById = async (id) => {
  const result = await pool.query('SELECT id, nombre, correo FROM "Usuarios" WHERE id = $1', [id]);
  return result.rows[0];
};

module.exports = { createUser, getUserByEmail, getUserById };
