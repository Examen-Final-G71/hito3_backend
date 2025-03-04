import { getComprasByUsuario } from "../models/transaccionModel.js";

export const getComprasUsuario = async (req, res) => {
  try {
    console.log("Usuario autenticado:", req.user.id); // Debug
    const usuario_id = req.user.id;
    const compras = await getComprasByUsuario(usuario_id);
    console.log("Compras encontradas:", compras); // Debug
    res.json(compras);
  } catch (error) {
    console.error("Error en getComprasUsuario:", error.message);
    res.status(500).json({ message: error.message });
  }
};