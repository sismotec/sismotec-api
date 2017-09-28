var Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('beneficiario', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre_Instituto: {
      type: Sequelize.STRING
    },
    celular: {
      type: Sequelize.STRING
    },
    latitud: {
      type: Sequelize.DOUBLE
    },
    longitud: {
      type: Sequelize.DOUBLE
    },
    password: {
      type: Sequelize.STRING
    },
    nombre_Responsable: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    estado: {
      type: Sequelize.STRING
    }
  }, {
  // don't add the timestamp attributes (updatedAt, createdAt)
  timestamps: false,

  // don't delete database entries but set the newly added attribute deletedAt
  // to the current date (when deletion was done). paranoid will only work if
  // timestamps are enabled
  paranoid: true,

  // disable the modification of tablenames; By default, sequelize will automatically
  // transform all passed model names (first parameter of define) into plural.
  // if you don't want that, set the following
  freezeTableName: true
});
};
