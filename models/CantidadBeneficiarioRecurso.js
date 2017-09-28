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
  }, {
  timestamps: false,
  // disable the modification of tablenames; By default, sequelize will automatically
  // transform all passed model names (first parameter of define) into plural.
  // if you don't want that, set the following
  freezeTableName: true
});
};
