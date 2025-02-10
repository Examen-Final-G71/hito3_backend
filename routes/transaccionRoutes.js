const express = require('express');
const { crearTransaccion, obtenerTransacciones } = require('../controllers/transaccionController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authenticateToken, crearTransaccion);
router.get('/', authenticateToken, obtenerTransacciones);

module.exports = router;