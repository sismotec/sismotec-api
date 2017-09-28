var Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('orden_envio', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_acopio: {
      type: Sequelize.INTEGER
    },
    id_necesidad_beneficiario: {
      type: Sequelize.INTEGER
    },
    destino: {
      type: Sequelize.STRING
    },
    fecha_salida: {
      type: Sequelize.DATE
    },
    origen: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.STRING
    },
    tiempo_estimado: {
      type: Sequelize.DATE
    }
  });
};
