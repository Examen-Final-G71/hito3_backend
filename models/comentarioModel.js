const pool = require('../config/db');

const getComentarios = async (publicacion_id) => {
  const result = await pool.query('SELECT * FROM "Comentarios" WHERE publicacion_id = $1', [publicacion_id]);
  return result.rows;
};

const addComentario = async (calificacion, comentario, usuario_id, publicacion_id) => {
  const result = await pool.query(
    'INSERT INTO "Comentarios" (calificacion, comentario, usuario_id, publicacion_id) VALUES ($1, $2, $3, $4) RETURNING *',
    [calificacion, comentario, usuario_id, publicacion_id]
  );
  return result.rows[0];
};

module.exports = { getComentarios, addComentario };
