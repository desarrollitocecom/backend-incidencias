const express = require('express');
const router = express.Router();

const { getAllPreIncidenciasHandler, getPreIncidenciaByIdHandler, createPreIncidenciaHandler, updatePreIncidenciaHandler, deletePreIncidenciaHandler, getPhotoPreIncidenciaHandler } = require('../handlers/preIncidenciaHandler');
const uploadPreincidencia = require('../middlewares/uploadPreincidenciaMiddleware');
const validate = require('../middlewares/validar-campos');

// Definición de rutas CRUD
router.get('/', getAllPreIncidenciasHandler); // Obtener todas las incidencias
router.use('/fotos/:name', getPhotoPreIncidenciaHandler);
router.get('/:id', getPreIncidenciaByIdHandler); // Obtener una incidencia por ID
router.post('/', validate([]), uploadPreincidencia.array('file_save'), createPreIncidenciaHandler); // Crear preincidencia
router.put('/:id', updatePreIncidenciaHandler); // Actualizar una incidencia por ID
router.delete('/:id', deletePreIncidenciaHandler); // Eliminar una incidencia por ID

module.exports = router;
