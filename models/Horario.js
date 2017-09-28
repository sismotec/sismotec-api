var Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('horario', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_acopio: {
      type: Sequelize.INTEGER
    },
    horaInicio: {
      type: Sequelize.STRING
    },
    horaFin: {
      type: Sequelize.STRING
    },
    dia: {
      type: Sequelize.STRING
    }
  });
};
