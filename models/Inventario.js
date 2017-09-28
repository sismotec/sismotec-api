var Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('inventario', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_recurso: {
      type: Sequelize.INTEGER
    },
    id_centro_acopio: {
      type: Sequelize.INTEGER
    },
    entradas: {
      type: Sequelize.INTEGER
    },
    salidas: {
      type: Sequelize.INTEGER
    },
    actual: {
      type: Sequelize.INTEGER
    }
  });
};
