import db from "../database/db.js";

export const getComprasByUsuario = async (usuario_id) => {
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
      WHERE t.usuario_id = $1 AND t.tipo_transaccion = true  -- Filtra solo las compras
      ORDER BY t.fecha DESC;
    `;
    const result = await db.query(query, [usuario_id]);
    return result.rows;
  } catch (error) {
    throw new Error("Error al obtener compras del usuario: " + error.message);
  }
};