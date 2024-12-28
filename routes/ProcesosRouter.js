
const { Router } = require('express');
const router = Router();

const { getAllOperadoresHandler,
    getAllSituacionesHandler,
    getAllMediosHandler } = require('../handlers/ProcesosHandler');

router.get('/operadores', getAllOperadoresHandler);
router.get('/situaciones', getAllSituacionesHandler);
router.get('/medios', getAllMediosHandler);

module.exports = router;