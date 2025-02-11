const express = require('express');
const { realizarTransaccion, obtenerTransacciones } = require('../controllers/transaccionController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authenticateToken, realizarTransaccion);
router.get('/', authenticateToken, obtenerTransacciones);

module.exports = router;
