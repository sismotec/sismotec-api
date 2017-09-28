var Sequelize = require('sequelize');

// initialize database connection
const sequelize = new Sequelize('mysql://b8bbbdd2b07d5d:41f8ff47@us-cdbr-iron-east-05.cleardb.net/heroku_baf49ff38aac61a?reconnect=true');

// load models
var models = [
  'Beneficiario',
  'CantidadAcopioRecurso',
  'CantidadBeneficiarioRecurso',
  'Categoria',
  'CentroDeAcopio',
  'Favorito',
  'Horario',
  'Inventario',
  'NecesidadAcopio',
  'NecesidadBeneficiario',
  'OrdenEnvio',
  'Recurso',
  'RecursoOrden',
  'UnidadDeMedida'
];
models.forEach(function(model) {
  module.exports[model] = sequelize.import(__dirname + '/' + model);
});

// describe relationships
(function(m) {

  m.NecesidadAcopio.belongsTo(m.CentroDeAcopio, {foreignKey: 'id_centro_acopio'});
  m.CentroDeAcopio.hasOne(m.NecesidadAcopio, {foreignKey: 'id_centro_acopio'});

  m.NecesidadBeneficiario.belongsTo(m.Beneficiario, {foreignKey: 'id_beneficiario'});
  m.Beneficiario.hasOne(m.NecesidadBeneficiario, {foreignKey: 'id_beneficiario'});

  m.Recurso.belongsTo(m.Categoria, { foreignKey: 'categoria', targetKey: 'id'});
  m.Categoria.hasMany(m.Recurso, {as: 'Recursos', foreignKey: 'categoria', sourceKey: 'id'});

  m.Recurso.belongsTo(m.UnidadDeMedida, { foreignKey: 'id_unidad', targetKey: 'id'});
  m.UnidadDeMedida.hasMany(m.Recurso, {as: 'Recursos', foreignKey: 'id_unidad', sourceKey: 'id'});

  m.OrdenEnvio.belongsTo(m.CentroDeAcopio, { foreignKey: 'id_acopio', targetKey: 'id'});
  m.CentroDeAcopio.hasMany(m.OrdenEnvio, {as: 'OrdenesDeEnvio', foreignKey: 'id_acopio', sourceKey: 'id'});

  m.OrdenEnvio.belongsTo(m.NecesidadBeneficiario, { foreignKey: 'id_necesidad_beneficiario', targetKey: 'id'});
  m.NecesidadBeneficiario.hasMany(m.OrdenEnvio, {as: 'OrdenesDeEnvio', foreignKey: 'id_necesidad_beneficiario', sourceKey: 'id'});

  m.Horario.belongsTo(m.CentroDeAcopio, { foreignKey: 'id_acopio', targetKey: 'id'});
  m.CentroDeAcopio.hasMany(m.Horario, {as: 'Horarios', foreignKey: 'id_acopio', sourceKey: 'id'});

  m.Recurso.belongsToMany(m.OrdenEnvio, {as: 'EnviadoEnOrdenes', through: 'RecursoOrden', foreignKey: 'id_recurso'});
  m.OrdenEnvio.belongsToMany(m.Recurso, {as: 'Recursos', through: 'RecursoOrden', foreignKey: 'id_orden'});

  m.Recurso.belongsToMany(m.CentroDeAcopio, {as: 'InventariadoEnCentros', through: 'Inventario', foreignKey: 'id_recurso'});
  m.CentroDeAcopio.belongsToMany(m.Recurso, {as: 'RecursosEnInventario', through: 'Inventario', foreignKey: 'id_centro_acopio'});

  m.Recurso.belongsToMany(m.NecesidadAcopio, {as: 'NecesitadoEnCentros', through: 'CantidadAcopioRecurso', foreignKey: 'id_recurso'});
  m.NecesidadAcopio.belongsToMany(m.Recurso, {as: 'recursos', through: 'CantidadAcopioRecurso', foreignKey: 'id_necesidad_acopio'});

  m.Recurso.belongsToMany(m.NecesidadBeneficiario, {as: 'NecesitadoPorBeneficiarios', through: 'CantidadBeneficiarioRecurso', foreignKey: 'id_recurso'});
  m.NecesidadBeneficiario.belongsToMany(m.Recurso, {as: 'RecursosNecesitados', through: 'CantidadBeneficiarioRecurso', foreignKey: 'id_necesidad_beneficiario'});

  m.NecesidadBeneficiario.belongsToMany(m.CentroDeAcopio, {as: 'FavoritaEnCentros', through: 'favoritos', foreignKey: 'id_necesidad_beneficiario'});
  m.CentroDeAcopio.belongsToMany(m.NecesidadBeneficiario, {as: 'NecesidadesFavoritas', through: 'favoritos', foreignKey: 'id_centro_acopio'});
})(module.exports);

// export connection
module.exports.sequelize = sequelize;
