const express = require('express');
const { obtenerComentarios, crearComentario, eliminarComentario } = require('../controllers/comentarioController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/publicacion/:publicacion_id/comentarios', obtenerComentarios);
router.post('/publicacion/:publicacion_id/comentarios', authenticateToken, crearComentario);
router.delete('/:id', authenticateToken, eliminarComentario);

module.exports = router;
