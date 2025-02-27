const pool = require('../connection');

const getComentarios = async (publicacion_id) => {
  const result = await pool.query('SELECT * FROM "comentarios" WHERE publicacion_id = $1', [publicacion_id]);
  return result.rows;
};

const addComentario = async (calificacion, comentario, usuario_id, publicacion_id) => {
  const result = await pool.query(
    'INSERT INTO "comentarios" (calificacion, comentario, usuario_id, publicacion_id) VALUES ($1, $2, $3, $4) RETURNING *',
    [calificacion, comentario, usuario_id, publicacion_id]
  );
  return result.rows[0];
};

const deleteComentario = async (id, userId) => {
  const result = await pool.query(
    'DELETE FROM comentarios WHERE id = $1 AND usuario_id = $2 RETURNING *',
    [id, userId]
  );
  return result.rows[0];
};

module.exports = { deleteComentario , getComentarios, addComentario };
