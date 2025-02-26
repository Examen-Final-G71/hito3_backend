const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
require("dotenv").config();


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "publicaciones", 
    allowed_formats: ["jpg", "png", "jpeg"]
  }
});

const uploads = multer({ storage });
module.exports = { uploads, cloudinary };


/*const multer = require("multer");
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

  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("El archivo no es una imagen"), false);
  }
};

const upload = multer({ storage, fileFilter });
module.exports = upload;*/