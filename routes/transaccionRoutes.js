const express = require('express');
const { getComprasUsuario,registrarCompra } = require('../controllers/transaccionController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();


router.get("/compras", authenticateToken, getComprasUsuario);
router.post("/comprar",authenticateToken, registrarCompra);

module.exports = router;


