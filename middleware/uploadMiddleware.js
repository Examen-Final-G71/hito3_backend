const multer = require("multer");

// Configurar multer para almacenar archivos en memoria
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Solo se permiten archivos JPEG y PNG"), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
