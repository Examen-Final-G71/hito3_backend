const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadsDir = "uploads";

// Asegúrate de que la carpeta "uploads" existe; si no, créala
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  // Permitir solo archivos de imagen
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("El archivo no es una imagen"), false);
  }
};

const upload = multer({ storage, fileFilter });
module.exports = upload;
