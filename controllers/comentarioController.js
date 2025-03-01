const { getComentarios, addComentario, deleteComentario } = require('../models/comentarioModel');

const obtenerComentarios = async (req, res) => {
  const { publicacion_id } = req.params;
  try {
      const comentarios = await getComentarios(publicacion_id);
      res.json(comentarios);
  } catch (error) {
      console.error("Error al obtener comentarios:", error);
      res.status(500).json({ error: "Error en el servidor" });
  }
};

const crearComentario = async (req, res) => {
  const { calificacion, comment } = req.body; // ⚠️ Cambio: `comentario` → `comment`
  const { publicacion_id } = req.params;
  const usuario_id = req.user?.id || null; // ⚠️ Cambio: Si el usuario no está autenticado, es `NULL`

  if (!calificacion || !comment) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
      const nuevoComentario = await addComentario(calificacion, comment, usuario_id, publicacion_id);
      res.status(201).json(nuevoComentario);
  } catch (error) {
      console.error("Error al crear comentario:", error);
      res.status(500).json({ error: "Error en el servidor" });
  }
};

const eliminarComentario = async (req, res) => {
  const { id } = req.params;
  const usuario_id = req.user?.id || null; // ⚠️ Cambio: Si no hay usuario autenticado, es `NULL`

  try {
      const comentarioEliminado = await deleteComentario(id, usuario_id);
      if (!comentarioEliminado) {
          return res.status(403).json({ error: "No tienes permisos para eliminar este comentario" });
      }
      res.json({ message: "Comentario eliminado correctamente" });
  } catch (error) {
      console.error("Error al eliminar comentario:", error);
      res.status(500).json({ error: "Error en el servidor" });
  }
};

module.exports = { obtenerComentarios, crearComentario, eliminarComentario };