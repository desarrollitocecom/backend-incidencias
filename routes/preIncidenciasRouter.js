const express = require("express");
const router = express.Router();

const {
  getAllPreIncidenciasHandler,
  getPreIncidenciaByIdHandler,
  createPreIncidenciaHandler,
  updatePreIncidenciaHandler,
  deletePreIncidenciaHandler,
  getPhotoPreIncidenciaHandler,
  getPreIncidenciasBySerenoHandler,
  getAllHistorialHandler
} = require("../handlers/preIncidenciaHandler");
const {
  errorHandlerMulter,
  uploadPreincidencia,
  validateMinFiles,
} = require("../middlewares/uploadPreincidenciaMiddleware");
const validate = require("../middlewares/validar-campos");
const createPreIncidenciaValidator = require("../validators/preincidencia/createPreincidenciaValidator");
const updatePreIncidenciaValidator = require("../validators/preincidencia/updatePreincidenciaValidator");
const getPreincidenciaByIdValidator = require("../validators/preincidencia/getPreincidenciaByIdValidator");
const getFilteredDataValidator = require("../validators/preincidencia/getPreincidenciaFilters");
const validateFechaYTurno = require("../validators/preincidencia/historialValidator");

router.get("/", validate(getFilteredDataValidator()), getAllPreIncidenciasHandler);
router.get("/historial", validate(validateFechaYTurno()), getAllHistorialHandler)
router.get("/fotos/:name", getPhotoPreIncidenciaHandler);
router.get("/:id", getPreIncidenciaByIdHandler);
router.get(
  "/sereno/:id",
  validate(getPreincidenciaByIdValidator()),
  getPreIncidenciasBySerenoHandler,
);
router.post(
  "/",
  uploadPreincidencia,
  errorHandlerMulter,
  validateMinFiles,
  validate(createPreIncidenciaValidator()),
  createPreIncidenciaHandler,
);
router.put(
  "/:id",
  uploadPreincidencia,
  errorHandlerMulter,
  validate(updatePreIncidenciaValidator()),
  updatePreIncidenciaHandler,
);
router.delete("/:id", deletePreIncidenciaHandler);

module.exports = router;
