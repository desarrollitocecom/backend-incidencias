// routes/incidenciasRutas.js
const { Router } = require("express");
const {
  getIncidenciasByDNIHandler,
  getIncidenciaByIDHandler,
  postIncidenciaHandler,
} = require("../handlers/incidenciasHandler");
const validate = require("../middlewares/validar-campos");
const incidenciaByDniValidator = require("../validators/incidencia/incidenciaByDniValidator");
const incidenciaByIdValidator = require("../validators/incidencia/incidenciaByIdValidator");
const createIncidenciaValidator = require("../validators/incidencia/createIncidenciaValidator");

const router = Router();

router.get(
  "/dni/:dni",
  validate(incidenciaByDniValidator()),
  getIncidenciasByDNIHandler,
); // 76578857?fechaInicio=2024-12-01&fechaFin=2024-12-31
router.get(
  "/incidencia/:cod_incidencia",
  validate(incidenciaByIdValidator()),
  getIncidenciaByIDHandler,
);
router.post("/", validate(createIncidenciaValidator()), postIncidenciaHandler);

module.exports = router;
