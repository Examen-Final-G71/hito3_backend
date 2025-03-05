const pool = require('../connection');

const getComprasByUsuario = async (usuario_id) => {
  try {
    const query = `
      SELECT 
        dt.id, 
        p.nombre AS publicacion, 
        p.precio, 
        dt.cantidad, 
        dt.subtotal, 
        t.fecha 
      FROM detalle_transacciones dt
      JOIN transacciones t ON dt.transaccion_id = t.id
      JOIN publicaciones p ON dt.publicacion_id = p.id
      WHERE t.usuario_id = $1 AND t.tipo_transaccion = true  
      ORDER BY t.fecha DESC;
    `;
    const result = await pool.query(query, [usuario_id]);
    return result.rows;
  } catch (error) {
    throw new Error("Error al obtener compras del usuario: " + error.message);
  }
};

const createTransaccion = async (usuario_id, monto_total, detalle) => {
  const client = await pool.connect();
  
  try {
    await client.query("BEGIN"); 


    const transaccionQuery = `
      INSERT INTO transacciones (usuario_id, tipo_transaccion, monto_total, fecha)
      VALUES ($1, true, $2, NOW()) RETURNING id;
    `;
    const transaccionResult = await client.query(transaccionQuery, [usuario_id, monto_total]);
    const transaccion_id = transaccionResult.rows[0].id;


    const detalleQuery = `
      INSERT INTO detalle_transacciones (transaccion_id, publicacion_id, cantidad, subtotal)
      VALUES ($1, $2, $3, $4);
    `;

    for (const item of detalle) {
      await client.query(detalleQuery, [transaccion_id, item.publicacion_id, item.cantidad, item.subtotal]);
    }

    await client.query("COMMIT"); 
    return { success: true, transaccion_id };
  } catch (error) {
    await client.query("ROLLBACK");
    throw new Error("Error al registrar la compra: " + error.message);
  } finally {
    client.release();
  }
};

module.exports = { getComprasByUsuario, createTransaccion  };
