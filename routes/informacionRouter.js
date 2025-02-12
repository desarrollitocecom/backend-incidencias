const { Router } = require("express");
const router = Router();

const {
  getAllEstadoProcesoHandler,
  getAllSeveridadesHandler,
  getAllGeneroAgresorHandler,
  getAllGeneroVictimaHandler,
  getAllSeveridadProcesosHandler,
} = require("../handlers/InformacionAgresionHandler");

router.get("/estados_proceso", getAllEstadoProcesoHandler);
router.get("/genero_agresor", getAllGeneroAgresorHandler);
router.get("/genero_victima", getAllGeneroVictimaHandler);
router.get("/severidad_procesos", getAllSeveridadProcesosHandler);
router.get("/severidades", getAllSeveridadesHandler);
module.exports = router;
