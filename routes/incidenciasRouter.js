// routes/incidenciasRutas.js

const { Router } = require('express');
const { getIncidenciasByDNIHandler, getIncidenciaByIDHandler, postIncidenciaHandler } = require('../handlers/incidenciasHandler');

const router = Router();

router.get('/dni/:dni', getIncidenciasByDNIHandler);
router.get('/incidencia/:cod_incidencia', getIncidenciaByIDHandler);
router.post('/', postIncidenciaHandler);

module.exports = router;
