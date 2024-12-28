// routes/incidenciasRutas.js
const upload = require('../middlewares/uploadMiddleware');
const { Router } = require('express');
const { getIncidenciasByDNIHandler, getIncidenciaByIDHandler, postIncidenciaHandler } = require('../handlers/incidenciasHandler');

const router = Router();

router.get('/dni/:dni', getIncidenciasByDNIHandler); // 76578857?fechaInicio=2024-12-01&fechaFin=2024-12-31
router.get('/incidencia/:cod_incidencia', getIncidenciaByIDHandler);
router.post('/', upload.array('file_save'), postIncidenciaHandler);

module.exports = router;
