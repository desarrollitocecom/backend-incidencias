const { body } = require('express-validator');

const preIncidenciaValidator = [
    body('unidad_id').optional().isInt().withMessage('Unidad id debe ser un número entero'),
    body('tipo_caso_id').optional().isInt().withMessage('Tipo caso id debe ser un número entero'),
    body('sub_tipo_caso_id').optional().isInt().withMessage('Sub tipo caso id debe ser un número entero'),
    body('tipo_reportante_id').optional().isInt().withMessage('Tipo reportante id debe ser un número entero'),
    body('telefono_reportante')
        .optional()
        .isString()
        .isLength({ min: 9, max: 15 })
        .withMessage('Telefono reportante debe ser un string entre 9 y 15 caracteres'),
    body('cargo_sereno_id').optional().isInt().withMessage('Cargo sereno id debe ser un número entero'),
    body('nombre_reportante').optional().isString().withMessage('Nombre reportante debe ser un string'),
    body('sereno_id').optional().isInt().withMessage('Sereno id debe ser un número entero'),
    body('direccion').optional().isString().withMessage('Direccion debe ser un string'),
    body('latitud').optional().isString().withMessage('Latitud debe ser un string'),
    body('longitud').optional().isString().withMessage('Longitud debe ser un string'),
    body('jurisdiccion_id').optional().isInt().withMessage('Jurisdiccion id debe ser un número entero'),
    body('fecha_registro').optional().isDate().withMessage('Fecha registro debe ser una fecha válida'),
    body('hora_registro').optional().matches(/^\d{2}:\d{2}:\d{2}$/).withMessage('Hora registro debe estar en formato HH:mm:ss'),
    body('fecha_ocurrencia').optional().isDate().withMessage('Fecha ocurrencia debe ser una fecha válida'),
    body('hora_ocurrencia').optional().matches(/^\d{2}:\d{2}:\d{2}$/).withMessage('Hora ocurrencia debe estar en formato HH:mm:ss'),
    body('estado_proceso_id').optional().isInt().withMessage('Estado proceso id debe ser un número entero'),
    body('genero_agresor_id').optional().isInt().withMessage('Genero agresor id debe ser un número entero'),
    body('genero_victima_id').optional().isInt().withMessage('Genero victima id debe ser un número entero'),
    body('severidad_proceso_id').optional().isInt().withMessage('Severidad proceso id debe ser un número entero'),
    body('severidad_id').optional().isInt().withMessage('Severidad id debe ser un número entero'),
    body('medio_id').optional().isInt().withMessage('Medio id debe ser un número entero'),
    body('situacion_id').optional().isInt().withMessage('Situacion id debe ser un número entero'),
    body('operador_id').optional().isInt().withMessage('Operador id debe ser un número entero'),
    body('motivo').optional().isString().withMessage('Motivo debe ser un texto'),
    body('descripcion').optional().isString().withMessage('Descripcion debe ser un texto'),
];

module.exports = preIncidenciaValidator;
