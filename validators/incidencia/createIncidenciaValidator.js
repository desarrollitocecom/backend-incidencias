const { body } = require("express-validator");

const validateIncidencia = {
  id: body("id").isUUID().withMessage("el ID debe ser un UUID válido"),
  unidad_id: body("unidad_id")
    .isInt()
    .withMessage("Unidad id debe ser un número entero"),
  user_id: body("user_id")
    .isString()
    .withMessage("El user id debe ser de tipo string")
    .isLength({ min: 1 })
    .withMessage("El user id debe contener al menos un carácter"),  
  tipo_caso_id: body("tipo_caso_id")
    .isInt()
    .withMessage("Tipo caso id debe ser un número entero"),
  sub_tipo_caso_id: body("sub_tipo_caso_id")
    .isInt()
    .withMessage("Sub tipo caso id debe ser un número entero"),
  tipo_reportante_id: body("tipo_reportante_id")
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
    .isInt()
    .withMessage("Cargo sereno id debe ser un número entero"),
  nombre_reportante: body("nombre_reportante")
    .isString()
    .withMessage("Nombre reportante debe ser un string")
    .isLength({ min: 1 })
    .withMessage("Nombre reportante no puede estar vacío"),
  sereno_id: body("sereno_id")
    .isInt()
    .withMessage("Sereno id debe ser un número entero"),
  direccion: body("direccion")
    .isString()
    .withMessage("Direccion debe ser un string"),
  latitud: body("latitud")
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
    .isInt()
    .withMessage("Jurisdiccion id debe ser un número entero"),
  fecha_registro: body("fecha_registro")
    .isDate()
    .withMessage("Fecha registro debe ser una fecha válida"),
  hora_registro: body("hora_registro")
    .matches(/^(0?[0-9]|1[0-9]|2[0-3]):[0-5][0-9](?::[0-5][0-9])?$/)
    .withMessage(
      "Hora registro debe estar en formato H:mm, HH:mm, H:mm:ss o HH:mm:ss",
    ),
  fecha_ocurrencia: body("fecha_ocurrencia")
    .isDate()
    .withMessage("Fecha ocurrencia debe ser una fecha válida"),
  hora_ocurrencia: body("hora_ocurrencia")
    .matches(/^(?:[01]?\d|2[0-3]):([0-5]?\d)(?::([0-5]?\d))?$/)
    .withMessage(
      "Hora ocurrencia debe estar en formato H:mm, HH:mm, H:mm:ss o HH:mm:ss",
    ),
  estado_proceso_id: body("estado_proceso_id")
    .isInt()
    .withMessage("Estado proceso id debe ser un número entero"),
  genero_agresor_id: body("genero_agresor_id")
    .isInt()
    .withMessage("Genero agresor id debe ser un número entero"),
  genero_victima_id: body("genero_victima_id")
    .isInt()
    .withMessage("Genero victima id debe ser un número entero"),
  severidad_proceso_id: body("severidad_proceso_id")
    .isInt()
    .withMessage("Severidad proceso id debe ser un número entero"),
  severidad_id: body("severidad_id")
    .isInt()
    .withMessage("Severidad id debe ser un número entero"),
  medio_id: body("medio_id")
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
    .isInt()
    .withMessage("Operador id debe ser un número entero"),
  motivo: body("motivo").isString().withMessage("Motivo debe ser un texto"),
  descripcion: body("descripcion")
    .isString()
    .withMessage("Descripcion debe ser un texto"),
  fotos: body("fotos")
    .isArray({ min: 1, max: 2 })
    .withMessage("Fotos debe contener entre 1 y 2 elementos"),
};

const createIncidenciaValidator = () => {
  return [
    validateIncidencia.id,
    validateIncidencia.unidad_id,
    validateIncidencia.user_id,
    validateIncidencia.tipo_caso_id,
    validateIncidencia.sub_tipo_caso_id,
    validateIncidencia.tipo_reportante_id,
    validateIncidencia.telefono_reportante,
    validateIncidencia.cargo_sereno_id,
    validateIncidencia.nombre_reportante,
    validateIncidencia.sereno_id,
    validateIncidencia.direccion,
    validateIncidencia.latitud,
    validateIncidencia.longitud,
    validateIncidencia.jurisdiccion_id,
    validateIncidencia.fecha_registro,
    validateIncidencia.hora_registro,
    validateIncidencia.fecha_ocurrencia,
    validateIncidencia.hora_ocurrencia,
    validateIncidencia.estado_proceso_id,
    validateIncidencia.genero_agresor_id,
    validateIncidencia.genero_victima_id,
    validateIncidencia.severidad_proceso_id,
    validateIncidencia.severidad_id,
    validateIncidencia.medio_id,
    validateIncidencia.medio_reporte_id,
    validateIncidencia.situacion_id,
    validateIncidencia.operador_id,
    validateIncidencia.motivo,
    validateIncidencia.descripcion,
    validateIncidencia.fotos,
  ];
};

module.exports = createIncidenciaValidator;
