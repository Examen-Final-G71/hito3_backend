const { getPublicaciones, addPublicacion, deletePublicacion } = require('../models/publicacionModel');

const obtenerPublicaciones = async (req, res) => {
  try {
    const publicaciones = await getPublicaciones();
    res.json(publicaciones);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener publicaciones', error });
  }
};

const crearPublicacion = async (req, res) => {
  const { nombre, precio, clasificacion, descripcion, stock } = req.body;
  const imagen = req.file ? req.file.filename : null;
  
  try {
    const publicacion = await addPublicacion(nombre, precio, clasificacion, descripcion, req.user.id, stock, imagen);
    res.status(201).json(publicacion);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear publicación', error });
  }
};

const eliminarPublicacion = async (req, res) => {
    const { id } = req.params;
  
    try {
      const resultado = await deletePublicacion(id, req.user.id);
  
      if (resultado.affectedRows === 0) {
        return res.status(403).json({ message: 'No tienes permiso para eliminar esta publicación o no existe.' });
      }
  
      res.json({ message: 'Publicación eliminada correctamente.' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar la publicación', error });
    }
  };

  const editarPublicacion = async (req, res) => {
    const { id } = req.params;         
    const { nombre, descripcion } = req.body; 
  
    try {
      const resultado = await updatePublicacion(id, nombre, descripcion, req.user.id);
  
      if (resultado.affectedRows === 0) {
        return res.status(403).json({ message: 'No tienes permiso para editar esta publicación o no existe.' });
      }
  
      res.json({ message: 'Publicación editada correctamente.' });
    } catch (error) {
      res.status(500).json({ message: 'Error al editar la publicación', error });
    }
  };
  
  module.exports = {
    obtenerPublicaciones,
    crearPublicacion,
    eliminarPublicacion, 
    editarPublicacion
   };
