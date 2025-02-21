const pool = require('./connection');

const crearTransaccion = async (numero_transaccion, monto_total, usuario_id, publicacion_id) => {
    const query = `
        INSERT INTO "transacciones" (numero_transaccion, monto_total, fecha, usuario_id, publicacion_id)
        VALUES ($1, $2, NOW(), $3, $4) RETURNING *;
    `;
    const values = [numero_transaccion, monto_total, usuario_id, publicacion_id];
    const { rows } = await pool.query(query, values);
    return rows[0];
};

const obtenerTransaccionesPorUsuario = async (usuario_id) => {
    const query = `
        SELECT * FROM "transacciones" WHERE usuario_id = $1;
    `;
    const { rows } = await pool.query(query, [usuario_id]);
    return rows;
};

module.exports = { crearTransaccion, obtenerTransaccionesPorUsuario };
