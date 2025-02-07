const { param } = require("express-validator");

const validateId = {
  cod_incidencia: param("cod_incidencia")
    .isLength({ min: 1 })
    .withMessage("El còdigo incidencia debe ser vàlido"),
};

const incidenciaByIdValidator = () => {
  return [validateId.cod_incidencia];
};

module.exports = incidenciaByIdValidator;
