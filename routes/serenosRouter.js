// routes/serenosRutas.js

const { Router } = require('express');
const { getAllSerenosHandler, getSerenoByDNIHandler, getCargoSerenoHandler } = require('../handlers/serenosHandler');

const router = Router();

router.get('/', getAllSerenosHandler);
router.get('/:dni', getSerenoByDNIHandler);
router.get('/cargos', getCargoSerenoHandler);

module.exports = router;
