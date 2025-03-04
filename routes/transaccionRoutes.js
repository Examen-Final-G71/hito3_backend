import express from "express";
import { getComprasUsuario } from "../controllers/transaccionController.js";
import authenticateToken from "../middleware/authMiddleware.js";

const router = express.Router();

// Ruta para obtener las compras de un usuario
router.get("/compras", authenticateToken, getComprasUsuario);

export default router;