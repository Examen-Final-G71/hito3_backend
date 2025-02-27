const pool = require('../db'); // Asegúrate de importar tu conexión a la base de datos


const obtenerComentarios = async (req, res) => {
  const { publicacion_id } = req.params;

  try {
    const result = await pool.query(`
      SELECT c.id, c.calificacion, c.comment, c.fecha, u.nombre AS usuario_nombre
      FROM comentarios c
      JOIN usuarios u ON c.usuario_id = u.id
      WHERE c.publicacion_id = $1
      ORDER BY c.fecha DESC
    `, [publicacion_id]);

    res.json(result.rows);
  } catch (error) {
    console.error('Error obteniendo comentarios:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


const crearComentario = async (req, res) => {
  const { publicacion_id } = req.params;
  const { calificacion, comment } = req.body;
  const usuario_id = req.user.id; // Cambio aquí

  if (!calificacion || calificacion < 1 || calificacion > 5) {
    return res.status(400).json({ error: 'La calificación debe estar entre 1 y 5.' });
  }
  if (!comment || comment.trim() === '') {
    return res.status(400).json({ error: 'El comentario no puede estar vacío.' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO comentarios (calificacion, comment, usuario_id, publicacion_id)
      VALUES ($1, TRIM($2), $3, $4) RETURNING id, calificacion, comment, fecha, usuario_id`,
      [calificacion, comment, usuario_id, publicacion_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creando comentario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};



const eliminarComentario = async (req, res) => {
  const { id } = req.params;
  const usuario_id = req.user.id; 

  try {
    const result = await pool.query('DELETE FROM comentarios WHERE id = $1 AND usuario_id = $2 RETURNING *', [id, usuario_id]);

    if (result.rowCount === 0) {
      return res.status(403).json({ error: 'Comentario no encontrado o no tienes permiso para eliminarlo.' });
    }

    res.json({ mensaje: 'Comentario eliminado exitosamente.' });
  } catch (error) {
    console.error('Error eliminando comentario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = { obtenerComentarios, crearComentario, eliminarComentario };
