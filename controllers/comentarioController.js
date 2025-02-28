const { getComentarios, addComentario, deleteComentario } = require('../models/comentarioModel');

const obtenerComentarios = async (req, res) => {
  const { id } = req.params;  // Asegurar que el id de la publicación se recibe correctamente
  try {
      const comentarios = await getComentarios(id); 
      res.json(comentarios);
  } catch (error) {
      console.error("Error al obtener comentarios:", error);
      res.status(500).json({ error: "Error en el servidor" });
  }
};

const crearComentario = async (req, res) => {
  const { calificacion, comment } = req.body;
  const { publicacion_id } = req.params;
  const usuario_id = req.user.id;

  // Validaciones
  if (!calificacion || calificacion < 1 || calificacion > 5) {
    return res.status(400).json({ message: 'La calificación debe estar entre 1 y 5.' });
  }
  if (!comment || comment.trim() === '') {
    return res.status(400).json({ message: 'El comentario no puede estar vacío.' });
  }

  try {
    const comentario = await addComentario(calificacion, comment, usuario_id, publicacion_id);
    res.status(201).json(comentario);
  } catch (error) {
    console.error('Error al crear comentario:', error);
    res.status(500).json({ message: 'Error al crear comentario', error });
  }
};

const eliminarComentario = async (req, res) => {
  const { id } = req.params;
  const usuario_id = req.user.id;

  try {
    const resultado = await deleteComentario(id, usuario_id);

    if (!resultado) {
      return res.status(403).json({ message: 'No tienes permiso para eliminar este comentario o no existe.' });
    }

    res.json({ message: 'Comentario eliminado correctamente.' });
  } catch (error) {
    console.error('Error al eliminar comentario:', error);
    res.status(500).json({ message: 'Error al eliminar comentario', error });
  }
};

module.exports = { obtenerComentarios, crearComentario, eliminarComentario };
