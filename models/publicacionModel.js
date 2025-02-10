const pool = require('../config/db');

const getPublicaciones = async () => {
  const result = await pool.query('SELECT * FROM "Publicaciones"');
  return result.rows;
};

const addPublicacion = async (titulo, precio, clasificacion, descripcion, usuario_id, stock, imagen) => {
  const result = await pool.query(
    'INSERT INTO "Publicaciones" (titulo, precio, clasificacion, descripcion, usuario_id, stock, imagen) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    [titulo, precio, clasificacion, descripcion, usuario_id, stock, imagen]
  );
  return result.rows[0];
};

module.exports = { getPublicaciones, addPublicacion };
