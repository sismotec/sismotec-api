var Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('recurso_orden', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_orden: {
      type: Sequelize.INTEGER
    },
    id_recurso: {
      type: Sequelize.INTEGER
    },
    cantidad: {
      type: Sequelize.INTEGER
    }
  });
};
