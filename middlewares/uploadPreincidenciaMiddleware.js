const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Configuración de almacenamiento de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = process.env.FOTOS_RUTA_PREINCIDENCIA;

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

const errorHandlerMulter = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Error de Multer
    if (err.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Demasiados archivos. Solo puedes cargar hasta 4 archivos.",
        error: "LIMIT_FILE_COUNT",
      });
    }
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message:
          "El archivo es demasiado grande. El tamaño máximo permitido es 50 MB.",
        error: "LIMIT_FILE_SIZE",
      });
    }
  } else if (err) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: err.message,
      error: "Unknown Error",
    });
  }

  next();
};

const validateMinFiles = (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "Debes enviar al menos un archivo.",
      error: "Bad Request", // Esto es válido pero algo genérico
    });
  }
  next();
};

const checkFilesBeforeForwarding = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error("Tipo de archivo no permitido. Solo JPG, PNG son aceptados."),
        false,
      );
    }
  },
  limits: { fileSize: 50 * 1024 * 1024, files: 4 },
}).array("fotos",4);

const uploadPreincidencia = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 50 * 1024 * 1024, files: 4 }, // 5 MB
}).array("fotos", 4);

module.exports = {
  uploadPreincidencia,
  errorHandlerMulter,
  validateMinFiles,
  checkFilesBeforeForwarding,
};
