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
  }, {
  timestamps: false,
  // disable the modification of tablenames; By default, sequelize will automatically
  // transform all passed model names (first parameter of define) into plural.
  // if you don't want that, set the following
  freezeTableName: true
});
};
