const { Router } = require('express');
const router = Router();

const serenosRouter = require('./serenosRouter');
const tipificacionRouter = require('./tipificacionesRouter');
const informacionRouter=require("./informacionRouter");

router.use('/informacion',informacionRouter);
router.use('/serenos', serenosRouter);
router.use('/tipificaciones', tipificacionRouter);


module.exports = router;
