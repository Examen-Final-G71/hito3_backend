require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, getUserByEmail } = require('../models/usuarioModel');

const register = async (req, res) => {
  const { nombre, correo, password } = req.body;

  try {
    if (!nombre || !correo || !password) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    const existingUser = await getUserByEmail(correo);
    if (existingUser) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await createUser(nombre, correo, hashedPassword);

    const token = jwt.sign(
      { id: user.id, correo: user.correo },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "Usuario registrado exitosamente",
      user: { id: user.id, nombre: user.nombre, correo: user.correo },
      token,
    });

  } catch (error) {
    console.error("Error en el registro:", error);
    res.status(500).json({ message: "Error al registrar usuario", error: error.message });
  }
};


const login = async (req, res) => {
  const { correo, password } = req.body;

  try {
    if (!correo || !password) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    const user = await getUserByEmail(correo);
    if (!user) {
      return res.status(401).json({ message: "Correo o contraseña incorrectos" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Correo o contraseña incorrectos" });
    }

    const token = jwt.sign(
      { id: user.id, correo: user.correo },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Inicio de sesión exitoso",
      user: { id: user.id, nombre: user.nombre, correo: user.correo },
      token,
    });

  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ message: "Error al iniciar sesión", error: error.message });
  }
};

module.exports = { register, login };
