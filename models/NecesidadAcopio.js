var Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('necesidad_acopio', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_centroAcopio: {
      type: Sequelize.INTEGER
    }
  });
};
