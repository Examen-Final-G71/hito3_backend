const { getComentarios, addComentario, deleteComentario  } = require('../models/comentarioModel');

const obtenerComentarios = async (req, res) => {
  try {
    const comentarios = await getComentarios(req.params.publicacion_id);
    res.json(comentarios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener comentarios', error });
  }
};

const crearComentario = async (req, res) => {
  const { contenido } = req.body;
  const { publicacion_id } = req.params;

  try {
    const comentario = await addComentario(contenido, req.user.id, publicacion_id);
    res.status(201).json(comentario);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear comentario', error });
  }
};

const eliminarComentario = async (req, res) => {
    const { id } = req.params;
  
    try {
      const resultado = await deleteComentario(id, req.user.id);
  
      if (resultado.affectedRows === 0) {
        return res.status(403).json({ message: 'No tienes permiso para eliminar este comentario o no existe.' });
      }
  
      res.json({ message: 'Comentario eliminado correctamente.' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el comentario', error });
    }
  };

module.exports = { eliminarComentario , obtenerComentarios, crearComentario };
