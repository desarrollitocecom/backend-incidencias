const express = require('express');
const router = express.Router();
const { getAllPreIncidenciasHandler, getPreIncidenciaByIdHandler, createPreIncidenciaHandler, updatePreIncidenciaHandler, deletePreIncidenciaHandler } = require('../handlers/preIncidenciaHandler');

// Definición de rutas CRUD
router.get('/', getAllPreIncidenciasHandler); // Obtener todas las incidencias
router.get('/:id', getPreIncidenciaByIdHandler); // Obtener una incidencia por ID
router.post('/', createPreIncidenciaHandler); // Crear una nueva incidencia
router.put('/:id', updatePreIncidenciaHandler); // Actualizar una incidencia por ID
router.delete('/:id', deletePreIncidenciaHandler); // Eliminar una incidencia por ID

module.exports = router;
