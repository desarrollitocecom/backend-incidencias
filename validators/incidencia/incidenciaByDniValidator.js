const { param } = require("express-validator");

const validateDni = {
  dni: param("dni")
    .isLength({ min: 8, max: 8 })
    .withMessage("El dni debe ser de 8 digitos"),
};

const incidenciaByDniValidator = () => {
  return [validateDni.dni];
};

module.exports = incidenciaByDniValidator;
