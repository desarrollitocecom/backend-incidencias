const { query } = require("express-validator");

const validateFechaYTurno = () => {
    return [
        query("fecha")
            .optional()
            .isISO8601()
            .withMessage("El parámetro 'fecha' debe ser una fecha válida en formato YYYY-MM-DD."),
        query("turno")
            .optional()
            .isIn(["Mañana", "Tarde", "Noche", "No Definido", "Rotativo"])
            .withMessage("El parámetro 'turno' debe ser uno de los valores: 'Mañana', 'Tarde', 'Noche', 'No Definido', 'Rotativo'."),
    ];
};

module.exports = validateFechaYTurno;
