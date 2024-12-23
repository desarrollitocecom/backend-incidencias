// routes/serenosRutas.js

const { Router } = require('express');
const { getAllSerenosHandler, getSerenoByDNIHandler, getCargoSerenoHandler, getJurisdiccionesHandler } = require('../handlers/serenosHandler');

const router = Router();

router.get('/', getAllSerenosHandler);
router.get('/cargos', getCargoSerenoHandler);
router.get('/jurisdicciones', getJurisdiccionesHandler);
router.get('/:dni', getSerenoByDNIHandler);



module.exports = router;
