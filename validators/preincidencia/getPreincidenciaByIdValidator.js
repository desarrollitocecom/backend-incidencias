const { param, query } = require("express-validator");

const validateId = {
  id: param("id").isNumeric().withMessage("El id debe ser un valor numérico"),
};

const validateQueryDates = {
  fecha_inicio: query("fecha_inicio")
    .optional()
    .isISO8601()
    .withMessage(
      "La fecha de inicio debe ser una fecha válida en formato ISO8601 (YYYY-MM-DD)",
    ),
  fecha_fin: query("fecha_fin")
    .optional()
    .isISO8601()
    .withMessage(
      "La fecha de fin debe ser una fecha válida en formato ISO8601 (YYYY-MM-DD)",
    ),
};

const validateEstado = {
  estado: query("estado")
    .optional()
    .isIn(["PENDIENTE", "APROBADO", "RECHAZADO"])
    .withMessage(
      "El estado debe ser uno de los siguientes valores: PENDIENTE, APROBADO, RECHAZADO",
    ),
};

const getPreincidenciaByIdValidator = () => {
  return [
    validateId.id,
    validateQueryDates.fecha_inicio,
    validateQueryDates.fecha_fin,
    validateEstado.estado,
  ];
};

module.exports = getPreincidenciaByIdValidator;
