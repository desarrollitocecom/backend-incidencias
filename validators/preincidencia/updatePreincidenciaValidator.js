const { body, param } = require("express-validator");

const validateUpatePreIncidencia = {
  id: param("id")
    .isUUID()
    .withMessage("el ID en parámetros debe ser un UUID válido"),
  unidad_id: body("unidad_id")
    .optional()
    .isInt()
    .withMessage("Unidad id debe ser un número entero"),
  tipo_caso_id: body("tipo_caso_id")
    .optional()
    .isInt()
    .withMessage("Tipo caso id debe ser un número entero"),
  sub_tipo_caso_id: body("sub_tipo_caso_id")
    .optional()
    .isInt()
    .withMessage("Sub tipo caso id debe ser un número entero"),
  tipo_reportante_id: body("tipo_reportante_id")
    .optional()
    .isInt()
    .withMessage("Tipo reportante id debe ser un número entero"),
  telefono_reportante: body("telefono_reportante")
    .optional()
    .isString()
    .isLength({ min: 9, max: 15 })
    .withMessage(
      "Telefono reportante debe ser un string entre 9 y 15 caracteres",
    ),
  cargo_sereno_id: body("cargo_sereno_id")
    .optional()
    .isInt()
    .withMessage("Cargo sereno id debe ser un número entero"),
  nombre_reportante: body("nombre_reportante")
    .optional()
    .isString()
    .withMessage("Nombre reportante debe ser un string"),
  sereno_id: body("sereno_id")
    .optional()
    .isInt()
    .withMessage("Sereno id debe ser un número entero"),
  direccion: body("direccion")
    .optional()
    .isString()
    .withMessage("Direccion debe ser un string"),
  latitud: body("latitud")
    .optional()
    .isString()
    .withMessage("Latitud debe ser una cadena de texto")
    .custom((value) => {
      const num = parseFloat(value);
      if (isNaN(num) || num < -90 || num > 90) {
        throw new Error("Latitud debe ser un número entre -90 y 90");
      }
      return true;
    }),
  longitud: body("longitud")
    .optional()
    .isString()
    .withMessage("Longitud debe ser una cadena de texto")
    .custom((value) => {
      const num = parseFloat(value);
      if (isNaN(num) || num < -180 || num > 180) {
        throw new Error("Longitud debe ser un número entre -180 y 180");
      }
      return true;
    }),
  jurisdiccion_id: body("jurisdiccion_id")
    .optional()
    .isInt()
    .withMessage("Jurisdiccion id debe ser un número entero"),
  fecha_registro: body("fecha_registro")
    .optional()
    .isDate()
    .withMessage("Fecha registro debe ser una fecha válida"),
  hora_registro: body("hora_registro")
    .optional()
    .matches(/^([0-9]|1[0-9]|2[0-3]):[0-5][0-9](?::[0-5][0-9])?$/)
    .withMessage(
      "Hora registro debe estar en formato H:mm, HH:mm, H:mm:ss o HH:mm:ss",
    ),
  fecha_ocurrencia: body("fecha_ocurrencia")
    .optional()
    .isDate()
    .withMessage("Fecha ocurrencia debe ser una fecha válida"),
  hora_ocurrencia: body("hora_ocurrencia")
    .optional()
    .matches(/^(?:[01]?\d|2[0-3]):([0-5]?\d)(?::([0-5]?\d))?$/)
    .withMessage(
      "Hora ocurrencia debe estar en formato H:mm, HH:mm, H:mm:ss o HH:mm:ss",
    ),
  estado_proceso_id: body("estado_proceso_id")
    .optional()
    .isInt()
    .withMessage("Estado proceso id debe ser un número entero"),
  estado_agresor_id: body("estado_agresor_id")
    .optional()
    .isInt()
    .withMessage("Estado agresor id debe ser un número entero"),
  genero_agresor_id: body("genero_agresor_id")
    .optional()
    .isInt()
    .withMessage("Genero agresor id debe ser un número entero"),
  genero_victima_id: body("genero_victima_id")
    .optional()
    .isInt()
    .withMessage("Genero victima id debe ser un número entero"),
  severidad_proceso_id: body("severidad_proceso_id")
    .optional()
    .isInt()
    .withMessage("Severidad proceso id debe ser un número entero"),
  severidad_id: body("severidad_id")
    .optional()
    .isInt()
    .withMessage("Severidad id debe ser un número entero"),
  medio_id: body("medio_id")
    .optional()
    .isInt()
    .withMessage("Medio id debe ser un número entero"),
  medio_reporte_id: body("medio_reporte_id")
    .optional()
    .isInt()
    .withMessage("Medio reporte id debe ser un número entero"),
  situacion_id: body("situacion_id")
    .optional()
    .isInt()
    .withMessage("Situacion id debe ser un número entero"),
  operador_id: body("operador_id")
    .optional()
    .isInt()
    .withMessage("Operador id debe ser un número entero"),
  motivo: body("motivo")
    .optional()
    .isString()
    .withMessage("Motivo debe ser un texto"),
  descripcion: body("descripcion")
    .optional()
    .isString()
    .withMessage("Descripcion debe ser un texto"),
  fotos: body("fotos")
    .optional()
    .isArray({ min: 1, max: 2 })
    .withMessage("Fotos debe contener entre 1 y 2 elementos"),
};

const updatePreIncidenciaValidator = () => {
  return [
    validateUpatePreIncidencia.id,
    validateUpatePreIncidencia.unidad_id,
    validateUpatePreIncidencia.tipo_caso_id,
    validateUpatePreIncidencia.sub_tipo_caso_id,
    validateUpatePreIncidencia.tipo_reportante_id,
    validateUpatePreIncidencia.telefono_reportante,
    validateUpatePreIncidencia.cargo_sereno_id,
    validateUpatePreIncidencia.nombre_reportante,
    validateUpatePreIncidencia.sereno_id,
    validateUpatePreIncidencia.direccion,
    validateUpatePreIncidencia.latitud,
    validateUpatePreIncidencia.longitud,
    validateUpatePreIncidencia.jurisdiccion_id,
    validateUpatePreIncidencia.fecha_registro,
    validateUpatePreIncidencia.hora_registro,
    validateUpatePreIncidencia.fecha_ocurrencia,
    validateUpatePreIncidencia.hora_ocurrencia,
    validateUpatePreIncidencia.estado_proceso_id,
    validateUpatePreIncidencia.estado_agresor_id,
    validateUpatePreIncidencia.genero_agresor_id,
    validateUpatePreIncidencia.genero_victima_id,
    validateUpatePreIncidencia.severidad_proceso_id,
    validateUpatePreIncidencia.severidad_id,
    validateUpatePreIncidencia.medio_id,
    validateUpatePreIncidencia.medio_reporte_id,
    validateUpatePreIncidencia.situacion_id,
    validateUpatePreIncidencia.operador_id,
    validateUpatePreIncidencia.motivo,
    validateUpatePreIncidencia.descripcion,
    validateUpatePreIncidencia.fotos,
  ];
};

module.exports = updatePreIncidenciaValidator;
