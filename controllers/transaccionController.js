import { getComprasByUsuario } from "../models/transaccionModel.js";

export const getComprasUsuario = async (req, res) => {
  try {
    const usuario_id = req.user.id; // Obtenemos el ID del usuario autenticado
    const compras = await getComprasByUsuario(usuario_id);
    res.json(compras);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};