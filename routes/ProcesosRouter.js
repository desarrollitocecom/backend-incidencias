
const { Router } = require('express');
const router = Router();

const { getAllOperadoresHandler,
    getAllSituacionesHandler,
    getAllMediosHandler } = require('../handlers/ProcesosHandler');

router.get('/Operadores', getAllOperadoresHandler);
router.get('/Situaciones', getAllSituacionesHandler);
router.get('/Medios', getAllMediosHandler);

module.exports = router;