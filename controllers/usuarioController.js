const { getUserById } = require('../models/usuarioModel');

const getUsuario = async (req, res) => {
  try {
    const user = await getUserById(req.user.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const { password, ...userWithoutPassword } = user; 
    res.json(userWithoutPassword); 
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuario', error });
  }
};

module.exports = { getUsuario };


