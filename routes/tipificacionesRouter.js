// routes/tipificacionRutas.js

const { Router } = require('express');
const { getUnidadesHandler, getTipoCasoHandler, getSubTipoCasoHandler, getTipoReportanteHandler } = require('../handlers/tipificacionHandler');

const router = Router();

router.get('/unidades', getUnidadesHandler);
router.get('/tipo_casos', getTipoCasoHandler);
router.get('/subtipo_casos', getSubTipoCasoHandler);
router.get('/tipo_reportante', getTipoReportanteHandler);

module.exports = router;
