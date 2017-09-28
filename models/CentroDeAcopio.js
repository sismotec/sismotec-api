var Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('centro_de_acopio', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    latitud: {
      type: Sequelize.DOUBLE
    },
    longitud: {
      type: Sequelize.DOUBLE
    },
    organizacion: {
      type: Sequelize.STRING
    },
    responsable: {
      type: Sequelize.STRING
    },
    celular: {
      type: Sequelize.STRING
    },
    horaio: {
      type: Sequelize.INTEGER
    },
    email: {
      type: Sequelize.STRING
    },
    estado: {
      type: Sequelize.STRING
    }
  });
};
