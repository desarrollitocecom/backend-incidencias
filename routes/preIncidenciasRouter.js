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

router.get("/", getAllPreIncidenciasHandler);
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
