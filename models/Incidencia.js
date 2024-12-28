const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Incidencia = sequelize.define('Incidencia', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        motivo: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fotos:{
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true
        },
        state:{
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
