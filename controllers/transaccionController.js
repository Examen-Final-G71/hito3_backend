const { crearTransaccion, obtenerTransaccionesPorUsuario } = require('../models/transaccionModel');

const realizarTransaccion = async (req, res) => {
    const { numero_transaccion, monto_total, publicacion_id } = req.body;
    const usuario_id = req.user.id; // Se obtiene del token de autenticación

    try {
        const transaccion = await crearTransaccion(numero_transaccion, monto_total, usuario_id, publicacion_id);
        res.status(201).json(transaccion);
    } catch (error) {
        res.status(500).json({ message: 'Error al procesar la transacción', error });
    }
};

const obtenerTransacciones = async (req, res) => {
    const usuario_id = req.user.id; // Se obtiene del token de autenticación

    try {
        const transacciones = await obtenerTransaccionesPorUsuario(usuario_id);
        res.json(transacciones);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener transacciones', error });
    }
};

module.exports = { realizarTransaccion, obtenerTransacciones };