const express = require('express');
const { obtenerPublicaciones, crearPublicacion, eliminarPublicacion, editarPublicacion } = require('../controllers/publicacionController');
const authenticateToken = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.get('/', obtenerPublicaciones);
router.post('/', authenticateToken, upload.single('imagen'), crearPublicacion);
router.put('/:id', authenticateToken, editarPublicacion);
router.delete('/:id', authenticateToken, eliminarPublicacion); 

module.exports = router;
