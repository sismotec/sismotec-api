var Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('horario', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_centro_acopio: {
      type: Sequelize.INTEGER
    },
    hora_inicio: {
      type: Sequelize.STRING
    },
    hora_fin: {
      type: Sequelize.STRING
    },
    dia: {
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
