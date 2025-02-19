const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Incidencia = sequelize.define(
    "Incidencia",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "1",
        validate: {
          notEmpty: true,
        },
      },
      unidad_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      tipo_caso_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      sub_tipo_caso_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      tipo_reportante_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      telefono_reportante: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cargo_sereno_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      nombre_reportante: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      sereno_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      direccion: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      latitud: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      longitud: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      jurisdiccion_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      fecha_registro: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      hora_registro: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      fecha_ocurrencia: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      hora_ocurrencia: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      estado_proceso_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      genero_agresor_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      genero_victima_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      severidad_proceso_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      severidad_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      medio_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      situacion_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      operador_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      motivo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fotos: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      codigo_incidencia: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      estado: {
        type: DataTypes.ENUM("PENDIENTE", "APROBADO", "RECHAZADO"),
        allowNull: false,
        defaultValue: "PENDIENTE",
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      convertidaAIncidencia: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      turno: {
        type: DataTypes.ENUM("Mañana", "Tarde", "Noche", "No Definido", "Rotativo"),
        allowNull: true,
      },
    },
    {
      tableName: "Incidencias",
      timestamps: true,
    },
  );

  return Incidencia;
};
