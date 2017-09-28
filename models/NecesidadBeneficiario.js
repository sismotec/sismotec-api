var Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('necesidad_beneficiario', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_beneficiario: {
      type: Sequelize.INTEGER
    }
  });
};
