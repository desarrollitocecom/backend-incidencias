// routes/tipificacionRutas.js

const { Router } = require('express');
const { getUnidadesHandler, getTipoCasoHandler, getSubTipoCasoHandler, getTipoReportanteHandler } = require('../handlers/tipificacionHandler');

const router = Router();

router.get('/unidades', getUnidadesHandler);
router.get('/tipo_caso', getTipoCasoHandler);
router.get('/subtipo_caso', getSubTipoCasoHandler);
router.get('/tipo_reportante', getTipoReportanteHandler);

module.exports = router;
