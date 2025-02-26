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
  try {
    console.log("Archivo subido:", req.file); // Verificar la imagen subida
    const { nombre, precio, clasificacion, descripcion, usuario_id, stock } = req.body;
    const imagen = req.file?.path; // Obtener la URL de la imagen desde Cloudinary

    if (!imagen) {
      return res.status(400).json({ error: "No se subió ninguna imagen" });
    }

    const nuevaPublicacion = await addPublicacion(nombre, precio, clasificacion, descripcion, usuario_id, stock, imagen);
    res.status(201).json(nuevaPublicacion);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la publicación" });
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
