const pool = require('../connection');

// Obtener comentarios de una publicación específica
const getComentarios = async (publicacion_id) => {
  const result = await pool.query(
    `SELECT c.id, c.calificacion, c.comment, c.fecha, u.nombre AS usuario_nombre
     FROM comentarios c
     JOIN usuarios u ON c.usuario_id = u.id
     WHERE c.publicacion_id = $1
     ORDER BY c.fecha DESC`,
    [publicacion_id]
  );
  return result.rows;
};

// Agregar un nuevo comentario a una publicación
const addComentario = async (calificacion, comment, usuario_id, publicacion_id) => {
  const result = await pool.query(
    `INSERT INTO comentarios (calificacion, comment, usuario_id, publicacion_id)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [calificacion, comment, usuario_id, publicacion_id]
  );
  return result.rows[0];
};

// Eliminar un comentario (solo si pertenece al usuario que lo creó)
const deleteComentario = async (id, usuario_id) => {
  const result = await pool.query(
    `DELETE FROM comentarios WHERE id = $1 AND usuario_id = $2 RETURNING *`,
    [id, usuario_id]
  );
  return result.rows[0];
};

module.exports = { getComentarios, addComentario, deleteComentario };

