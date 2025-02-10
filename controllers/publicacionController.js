const { getPublicaciones, addPublicacion } = require('../models/publicacionModel');

const obtenerPublicaciones = async (req, res) => {
  try {
    const publicaciones = await getPublicaciones();
    res.json(publicaciones);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener publicaciones', error });
  }
};

const crearPublicacion = async (req, res) => {
  const { titulo, contenido } = req.body;

  try {
    const publicacion = await addPublicacion(titulo, contenido, req.user.id);
    res.status(201).json(publicacion);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear publicación', error });
  }
};

module.exports = { obtenerPublicaciones, crearPublicacion };
