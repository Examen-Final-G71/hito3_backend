require("dotenv").config();
const express = require('express');
const cors = require('cors');
const pool = require('./connection');
const pool = require('./config');

const authRoutes = require('./routes/authRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const publicacionRoutes = require('./routes/publicacionRoutes');
const comentarioRoutes = require('./routes/comentarioRoutes');
const transaccionRoutes = require('./routes/transaccionRoutes'); 

const app = express();

app.use(cors({
  origin: 'https://hito2-frontend.onrender.com',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente");
});
app.use('/api/auth', authRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/publicaciones', publicacionRoutes);
app.use('/comentarios', comentarioRoutes);
app.use('/transacciones', transaccionRoutes); 

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

module.exports = app;