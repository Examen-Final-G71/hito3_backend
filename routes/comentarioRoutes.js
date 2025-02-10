const express = require('express');
const { obtenerComentarios, crearComentario, eliminarComentario } = require('../controllers/comentarioController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/:publicacion_id', obtenerComentarios);
router.post('/:publicacion_id', authenticateToken, crearComentario);
router.delete('/:id', authenticateToken, eliminarComentario);

module.exports = router;
