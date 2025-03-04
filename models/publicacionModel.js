const pool = require('../connection');

const getPublicaciones = async () => {
  const result = await pool.query(`
    SELECT p.*, u.nombre AS usuario_nombre
    FROM "publicaciones" p
    JOIN "usuarios" u ON p.usuario_id = u.id
  `);
  return result.rows;
};

const getPublicacionesByUserId = async (usuario_id) => {
  const result = await pool.query(`
    SELECT p.*, u.nombre AS usuario_nombre
    FROM "publicaciones" p
    JOIN "usuarios" u ON p.usuario_id = u.id
    WHERE p.usuario_id = $1 
  `, [usuario_id]);
  return result.rows;
};

const addPublicacion = async (nombre, precio, clasificacion, descripcion, usuario_id, stock, imagen) => {
  // Convertir precio y stock a valores numéricos
  const precioNumber = parseFloat(precio);
  const stockNumber = parseInt(stock);
  console.log(precioNumber, stockNumber)

  const result = await pool.query(
    'INSERT INTO "publicaciones" (nombre, precio, clasificacion, descripcion, usuario_id, stock, imagen, fecha_publicacion) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW()) RETURNING *',
    [nombre, precioNumber, clasificacion, descripcion, usuario_id, stockNumber, imagen]
  );
  return result.rows[0];
};
const deletePublicacion = async (id, userId) => {
  const query = 'DELETE FROM "publicaciones" WHERE id = $1 AND usuario_id = $2 RETURNING *';
  const result = await pool.query(query, [id, userId]);
  return result.rowCount; // Devuelve el número de filas afectadas
};

const updatePublicacion = async (id, nombre, descripcion, userId) => {
  const query = `
    UPDATE "publicaciones" 
    SET nombre = $1, descripcion = $2 
    WHERE id = $3 AND usuario_id = $4
    RETURNING *;
  `;
  const values = [nombre, descripcion, id, userId];
  const result = await pool.query(query, values);
  return result.rowCount; // Devuelve la cantidad de filas afectadas
};

module.exports = {
  deletePublicacion,
  getPublicaciones,
  addPublicacion,
  updatePublicacion,
  getPublicacionesByUserId
 };
