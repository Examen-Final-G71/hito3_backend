const pool = require('../config/db');

const crearTransaccion = async (req, res) => {
  try {
    const { usuario_id, publicacion_id, monto_total } = req.body;
    const fecha = new Date();
    
    const nuevaTransaccion = await pool.query(
      'INSERT INTO Transacciones (usuario_id, publicacion_id, monto_total, fecha) VALUES ($1, $2, $3, $4) RETURNING *',
      [usuario_id, publicacion_id, monto_total, fecha]
    );
    
    res.status(201).json(nuevaTransaccion.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar la transacción' });
  }
};

const obtenerTransacciones = async (req, res) => {
  try {
    const usuario_id = req.user.id; 
    const transacciones = await pool.query(
      'SELECT * FROM Transacciones WHERE usuario_id = $1',
      [usuario_id]
    );
    res.json(transacciones.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las transacciones' });
  }
};

module.exports = { crearTransaccion, obtenerTransacciones };