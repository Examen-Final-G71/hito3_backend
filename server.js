require("dotenv").config();
const express = require('express');
const cors = require('cors');
const pool = require('./connection');

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
  } else {
    console.log('Conexión a la base de datos exitosa:', res.rows[0]);
  }
});

const authRoutes = require('./routes/authRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const publicacionRoutes = require('./routes/publicacionRoutes');
const comentarioRoutes = require('./routes/comentarioRoutes');
const transaccionRoutes = require('./routes/transaccionRoutes'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: 'https://hito2-frontend.onrender.com',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente");
});

app.use('/uploads', express.static('uploads'));
app.use('/api/auth', authRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/api/publicaciones', publicacionRoutes);
app.use('/comentarios', comentarioRoutes);
app.use('/transacciones', transaccionRoutes); 

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

module.exports = app;