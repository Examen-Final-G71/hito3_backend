const pool = require('../connection');

const getPublicaciones = async () => {
  const result = await pool.query('SELECT * FROM "publicaciones"');
  return result.rows;
};

const addPublicacion = async (nombre, precio, clasificacion, descripcion, usuario_id, stock, imagen) => {
  const result = await pool.query(
    'INSERT INTO "publicaciones" (nombre, precio, clasificacion, descripcion, usuario_id, stock, imagen, fecha_publicacion) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW()) RETURNING *',
    [nombre, precio, clasificacion, descripcion, usuario_id, stock, imagen]
  );
  return result.rows[0];
};
const deletePublicacion = async (id, userId) => {
    const query = 'DELETE FROM publicaciones WHERE id = ? AND usuario_id = ?';
    const [result] = await pool.execute(query, [id, userId]);
    return result;
  };

  const updatePublicacion = async (id, nombre, descripcion, userId) => {
    const query = `
      UPDATE "Publicaciones" 
      SET nombre = $1, descripcion = $2 
      WHERE id = $3 AND "usuario_id" = $4
      RETURNING *;
    `;
    const values = [nombre, descripcion, id, userId];
    const result = await pool.query(query, values);
    return result;
  };

module.exports = {
  deletePublicacion,
  getPublicaciones,
  addPublicacion,
  updatePublicacion
 };
