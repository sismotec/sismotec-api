var Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('recurso', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: Sequelize.STRING
    },
    categoria: {
      type: Sequelize.INTEGER
    },
    id_unidad: {
      type: Sequelize.INTEGER
    }
  });
};
