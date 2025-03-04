const express = require('express');
const { obtenerPublicaciones, crearPublicacion, eliminarPublicacion, editarPublicacion, obtenerPublicacionesPorUsario } = require('../controllers/publicacionController');
const authenticateToken = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.get('/', obtenerPublicaciones);
router.get('/:id', authenticateToken, obtenerPublicacionesPorUsario);
router.post('/', authenticateToken, upload.single('imagen'), crearPublicacion);
router.put('/:id', authenticateToken, editarPublicacion);
router.delete('/:id', authenticateToken, eliminarPublicacion); 

module.exports = router;
