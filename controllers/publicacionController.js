const { getPublicaciones, addPublicacion, deletePublicacion, getPublicacionesByUserId } = require('../models/publicacionModel');


const obtenerPublicaciones = async (req, res) => {
  try {
    const publicaciones = await getPublicaciones();
    res.json(publicaciones);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener publicaciones', error });
  }
};

const obtenerPublicacionesPorUsario = async (req, res) => {
  try {
    const publicaciones = await getPublicacionesByUserId(usuario_id);
    res.json(publicaciones);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener publicaciones', error });
  }
};

const crearPublicacion = async (req, res) => {
  try {
    const { nombre, precio, clasificacion, descripcion, stock } = req.body;
    const usuario_id = req.user ? req.user.id : null; 
    const imagenUrl = req.file ? req.file.path : null; 

    if (!imagenUrl) {
      return res.status(400).json({ message: "Debe proporcionar una imagen" });
    }

    const nuevaPublicacion = await addPublicacion(
      nombre, precio, clasificacion, descripcion, usuario_id, stock, imagenUrl
    );

    res.status(201).json({
      message: "Publicación creada exitosamente",
      publicacion: nuevaPublicacion,
    });
  } catch (error) {
    console.error("Error al crear la publicación:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};



const eliminarPublicacion = async (req, res) => {
  const { id } = req.params;

  try {
    const filasAfectadas = await deletePublicacion(id, req.user.id);

    if (filasAfectadas === 0) {
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
    const filasAfectadas = await updatePublicacion(id, nombre, descripcion, req.user.id);

    if (filasAfectadas === 0) {
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
    editarPublicacion,
    obtenerPublicacionesPorUsario
   };
