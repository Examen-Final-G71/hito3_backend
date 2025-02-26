const { getPublicaciones, addPublicacion, deletePublicacion } = require('../models/publicacionModel');
const cloudinary = require("../config/cloudinaryConfig");

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
    const { nombre, precio, clasificacion, descripcion, stock } = req.body;
    const id_user = req.user.id;

    let imagenUrl = null;
    if (!req.file) {
      return res.status(400).json({ message: "Debe proporcionar una imagen" });
    }
    if (req.file) {
      // Convertimos el buffer en base64 para subirlo a Cloudinary
      const fileBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

      // Subimos la imagen a Cloudinary
      const result = await cloudinary.uploader.upload(fileBase64, {
        folder: "publicaciones",
      });
      imagenUrl = result.secure_url; // URL segura de la imagen
    }

    const publicacion = await addPublicacion({
      nombre,
      precio,
      clasificacion,
      descripcion,
      stock,
      imagen: imagenUrl,
      id_user,
    });

    res.status(201).json(publicacion);
  } catch (error) {
    console.error("Error al crear la publicación:", error);
    res.status(500).json({ message: "Error interno del servidor" });
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
