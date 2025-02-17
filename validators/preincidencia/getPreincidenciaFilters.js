const { query } = require("express-validator");

const validatePagination = {
    page: query("page")
        .optional()
        .isNumeric()
        .withMessage("El parámetro 'page' debe ser un valor numérico"),
    limit: query("limit")
        .optional()
        .isNumeric()
        .withMessage("El parámetro 'limit' debe ser un valor numérico"),
};

const validateJurisdiccionId = {
    jurisdiccion_id: query("jurisdiccion_id")
        .optional()
        .custom((value) => {
            if (!value) return true;

            const regex = /^(\d+)(,\d+)*$/;
            if (!regex.test(value)) {
                throw new Error(
                    "El parámetro 'jurisdiccion_id' debe ser una lista de valores numéricos separados por comas, sin espacios ni caracteres no válidos."
                );
            }

            const ids = value.split(",").map(Number);
            if (ids.some((id) => isNaN(id))) {
                throw new Error(
                    "El parámetro 'jurisdiccion_id' contiene valores no numéricos."
                );
            }

            return true;
        }),
};


const getFilteredDataValidator = () => {
    return [
        validatePagination.page,
        validatePagination.limit,
        validateJurisdiccionId.jurisdiccion_id,
    ];
};

module.exports = getFilteredDataValidator;
