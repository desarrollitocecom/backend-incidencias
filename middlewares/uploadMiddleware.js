const multer = require('multer');
const path = require('path');

const foto_path = process.env.FOTOS_RUTA;

// Configuración de almacenamiento de archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${foto_path}/incidencias/fotos`); // Carpeta donde se guardarán los archivos temporalmente
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// Filtros de archivos permitidos
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Tipo de archivo no permitido. Solo JPG, PNG son aceptados.'), false);
    }
};

// Límite de tamaño de archivos
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 50 * 1024 * 1024 } // 5 MB
});

module.exports = upload;
