const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Incidencia = sequelize.define('Incidencia', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
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
        state:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    }, {
        tableName: 'Incidencias',
        timestamps: true
    });

    Incidencia.associate = (db) => {
        Incidencia.belongsTo(db.Subgerencia, {
            foreignKey: 'id_subgerencia', // Clave foránea
            as: 'Subgerencia' // Alias para la relación
        });
    };

    return Incidencia;
};
