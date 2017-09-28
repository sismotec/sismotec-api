var Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cantidad_acopio_recurso', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_recurso: {
      type: Sequelize.INTEGER
    },
    id_necesidad_acopio: {
      type: Sequelize.INTEGER
    },
    cantidad: {
      type: Sequelize.INTEGER
    }
  });
};
