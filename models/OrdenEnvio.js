var Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('orden_envio', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_centro_acopio: {
      type: Sequelize.INTEGER
    },
    id_necesidad_beneficiario: {
      type: Sequelize.INTEGER
    },
    destino_latitud: {
      type: Sequelize.DOUBLE
    },
    destino_longitud: {
      type: Sequelize.DOUBLE
    },
    fecha_salida: {
      type: Sequelize.DATE
    },
    origen_latitud: {
      type: Sequelize.DOUBLE
    },
    origen_longitud: {
      type: Sequelize.DOUBLE
    },
    status: {
      type: Sequelize.STRING
    },
    tiempo_estimado: {
      type: Sequelize.DATE
    },
    fecha_creacion: {
      type: Sequelize.DATE
    }
  }, {
  timestamps: false,
  // disable the modification of tablenames; By default, sequelize will automatically
  // transform all passed model names (first parameter of define) into plural.
  // if you don't want that, set the following
  freezeTableName: true
});
};
