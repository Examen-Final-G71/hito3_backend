const { getComprasByUsuario, createTransaccion } = require('../models/transaccionModel.js');

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

const { createTransaccion } = require("../models/transaccionesModel");

const registrarCompra = async (req, res) => {
  try {
    const { usuario_id, monto_total, detalle } = req.body;

    // Validar que los datos requeridos estén presentes
    if (!usuario_id || !monto_total || !detalle || !Array.isArray(detalle) || detalle.length === 0) {
      return res.status(400).json({ error: "Faltan datos obligatorios o detalle inválido." });
    }

    // Llamar a la función del modelo para registrar la compra
    const result = await createTransaccion(usuario_id, monto_total, detalle);

    res.status(201).json({ message: "Compra registrada con éxito", transaccion_id: result.transaccion_id });
  } catch (error) {
    res.status(500).json({ error: "Error al registrar la compra: " + error.message });
  }
};

module.exports = { getComprasUsuario, registrarCompra };


