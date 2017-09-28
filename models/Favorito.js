var Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('favorito', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_necesidad_beneficiario: {
      type: Sequelize.INTEGER
    },
    id_centro_acopio: {
      type: Sequelize.INTEGER
    }
  });
};
