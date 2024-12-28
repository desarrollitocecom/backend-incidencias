// Función para eliminar archivos temporales
const fs = require('fs');

const eliminarArchivosTemporales = (archivos) => {
    if (!archivos || archivos.length === 0) return;

    archivos.forEach((file) => {
        const filePath =file.path; // Ruta completa
        // console.log("file: ",filePath);
        fs.unlink(filePath, (err) => {
            if (err) // Si hay error{
                console.error(`Error al eliminar el archivo ${filePath}:`, err.message);
            // } else {
            //     console.log(`Archivo eliminado correctamente: ${filePath}`);
            // }
        });
    });
};

module.exports = eliminarArchivosTemporales;