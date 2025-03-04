const express = require('express');
const { getComprasUsuario } = require('../controllers/transaccionController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// Ruta para obtener las compras de un usuario
router.get("/compras", authenticateToken, getComprasUsuario);

export default router;