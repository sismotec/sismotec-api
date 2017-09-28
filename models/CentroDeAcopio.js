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
    nombre_organizacion: {
      type: Sequelize.STRING
    },
    nombre_responsable: {
      type: Sequelize.STRING
    },
    celular: {
      type: Sequelize.STRING
    },
    horario: {
      type: Sequelize.INTEGER
    },
    email: {
      type: Sequelize.STRING
    },
    estado: {
      type: Sequelize.STRING
    }
  }, {
  timestamps: false,
  // disable the modification of tablenames; By default, sequelize will automatically
  // transform all passed model names (first parameter of define) into plural.
  // if you don't want that, set the following
  freezeTableName: true
});
};
