const express = require('express');
const { getUsuario } = require('../controllers/usuarioController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/perfil', authenticateToken, getUsuario);

module.exports = router;
