const multer = require("multer");
const path = require("path");
const fs = require("fs");

const foto_login_path = process.env.FOTOS_LOGIN_FACE;

// Configuración de almacenamiento de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // const dir = path.join(foto_login_path, "incidencias", "fotos");
    const dir = process.env.FOTOS_LOGIN_FACE;

    // Verificar si el directorio existe, si no, crearlo
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log("Directorio creado:", dir);
    }

    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Filtros de archivos permitidos
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Tipo de archivo no permitido. Solo JPG, PNG son aceptados."),
      false,
    );
  }
};

// Límite de tamaño de archivos
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 }, // 5 MB
});

module.exports = upload;
