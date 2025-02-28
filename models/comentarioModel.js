const pool = require('../connection');

const getComentarios = async (publicacion_id) => {
  try {
      const result = await pool.query(`
          SELECT c.id, c.calificacion, c.comment, c.fecha, u.nombre AS usuario_nombre
          FROM comentarios c
          JOIN usuarios u ON c.usuario_id = u.id
          WHERE c.publicacion_id = $1
          ORDER BY c.fecha DESC
      `, [publicacion_id]);
      return result.rows;
  } catch (error) {
      console.error("Error en getComentarios:", error);
      throw error;
  }
};

const addComentario = async (calificacion, comment, usuario_id, publicacion_id) => {
  try {
      const result = await pool.query(
          `INSERT INTO comentarios (calificacion, comment, usuario_id, publicacion_id) 
          VALUES ($1, $2, $3, $4) RETURNING *`,
          [calificacion, comment, usuario_id, publicacion_id]
      );
      return result.rows[0];
  } catch (error) {
      console.error("Error en addComentario:", error);
      throw error;
  }
};

const deleteComentario = async (id, userId) => {
  try {
      const result = await pool.query(
          `DELETE FROM comentarios 
          WHERE id = $1 AND usuario_id = $2 RETURNING *`,
          [id, userId]
      );
      if (!result.rows.length) {
          throw new Error("No tienes permiso para eliminar este comentario");
      }
      return result.rows[0];
  } catch (error) {
      console.error("Error en deleteComentario:", error);
      throw error;
  }
};

module.exports = { deleteComentario , getComentarios, addComentario };
