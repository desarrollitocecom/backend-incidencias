const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Incidencia = sequelize.define('Incidencia', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        unidad_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        tipo_caso_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        sub_tipo_caso_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        tipo_reportante_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        telefono_reportante: {
            type: DataTypes.STRING,
            allowNull: true
        },
        cargo_sereno_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        nombre_reportante: {
            type: DataTypes.STRING,
            allowNull: true
        },
        sereno_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        direccion: {
            type: DataTypes.STRING,
            allowNull: true
        },
        latitud: {
            type: DataTypes.STRING,
            allowNull: true
        },
        longitud: {
            type: DataTypes.STRING,
            allowNull: true
        },
        jurisdiccion_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: true
        },
        fecha_registro: {
            type: DataTypes.DATE,
            allowNull: true
        },
        hora_registro: {
            type: DataTypes.TIME,
            allowNull: true
        },
        fecha_ocurrencia: {
            type: DataTypes.DATE,
            allowNull: true
        },
        hora_ocurrencia: {
            type: DataTypes.TIME,
            allowNull: true
        },
        estado_proceso_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        genero_agresor_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        genero_victima_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        severidad_proceso_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        severidad_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        medio_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        situacion_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        operador_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        motivo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fotos: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true
        },
        state: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    }, {
        tableName: 'Incidencias',
        timestamps: true
    });

    return Incidencia;
};
