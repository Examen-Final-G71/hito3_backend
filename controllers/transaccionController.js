const { getComprasByUsuario } = require('../models/transaccionModel.js');

const getComprasUsuario = async (req, res) => {
  try {
    console.log("Usuario autenticado:", req.user.id);
    const usuario_id = req.user.id;
    const compras = await getComprasByUsuario(usuario_id);
    console.log("Compras encontradas:", compras);
    res.json(compras);
  } catch (error) {
    console.error("Error en getComprasUsuario:", error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getComprasUsuario };
