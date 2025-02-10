const express = require('express');
const { obtenerPublicaciones, crearPublicacion, eliminarPublicacion } = require('../controllers/publicacionController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', obtenerPublicaciones);
router.post('/', authenticateToken, crearPublicacion);
router.delete('/:id', authenticateToken, eliminarPublicacion); 

module.exports = router;
