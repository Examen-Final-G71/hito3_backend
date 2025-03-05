const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinaryConfig");

// Configuración de almacenamiento en Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "publicaciones", // Carpeta donde se guardarán las imágenes en Cloudinary
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});


const upload = multer({ storage });

module.exports = upload;