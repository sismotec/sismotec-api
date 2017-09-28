var Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cantidad_beneficiario_recurso', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_recurso: {
      type: Sequelize.INTEGER
    },
    id_necesidad_beneficiario: {
      type: Sequelize.INTEGER
    },
    cantidad_actual: {
      type: Sequelize.INTEGER
    },
    cantidad_total: {
      type: Sequelize.INTEGER
    }
  });
};
