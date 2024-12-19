// routes/serenosRutas.js

const { Router } = require('express');
const { getAllSerenosHandler, getSerenoByDNIHandler, getCargoSerenoHandler } = require('../handlers/serenosHandler');

const router = Router();

router.get('/', getAllSerenosHandler);
router.get('/cargos', getCargoSerenoHandler);
router.get('/:dni', getSerenoByDNIHandler);


module.exports = router;
