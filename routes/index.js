const { Router } = require('express');
const router = Router();

const serenosRutas = require('./serenosRutas');
const tipificacionRutas = require('./tipificacionRutas');

router.use('/serenos', serenosRutas);
router.use('/tipificacion', tipificacionRutas);

module.exports = router;
