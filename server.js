require("dotenv").config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const publicacionRoutes = require('./routes/publicacionRoutes');
const comentarioRoutes = require('./routes/comentarioRoutes');
const transaccionRoutes = require('./routes/transaccionRoutes'); 

const app = express();

app.use(cors());
app.use(express.json());



app.get("/api/test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ success: true, time: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.use('/auth', authRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/publicaciones', publicacionRoutes);
app.use('/comentarios', comentarioRoutes);
app.use('/transacciones', transaccionRoutes); 

if (require.main === module) {
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

module.exports = app;