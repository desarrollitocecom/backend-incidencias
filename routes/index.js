const { Router } = require('express');
const router = Router();

const serenosRouter = require('./serenosRouter');
const tipificacionRouter = require('./tipificacionesRouter');

const informacionRouter=require("./informacionRouter");
const procesos=require('./ProcesosRouter')
const incidenciasRouter = require("./incidenciasRouter");

router.use('/informacion', informacionRouter);
router.use('/serenos', serenosRouter);
router.use('/tipificaciones', tipificacionRouter);
router.use('/procesos',procesos)
router.use('/incidencias', incidenciasRouter);

module.exports = router;
