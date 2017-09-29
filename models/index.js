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

  m.NecesidadAcopio.belongsTo(m.CentroDeAcopio, {as: 'centro_acopio', foreignKey: 'id_centro_acopio'});
  m.CentroDeAcopio.hasOne(m.NecesidadAcopio, {as: 'necesidad_acopio', foreignKey: 'id_centro_acopio'});

  m.NecesidadBeneficiario.belongsTo(m.Beneficiario, {as: 'beneficiario', foreignKey: 'id_beneficiario'});
  m.Beneficiario.hasOne(m.NecesidadBeneficiario, {as: 'necesidad_beneficiario', foreignKey: 'id_beneficiario'});

  m.Recurso.belongsTo(m.Categoria, { as: 'categoria', foreignKey: 'id_categoria', targetKey: 'id'});
  m.Categoria.hasMany(m.Recurso, {as: 'recursos', foreignKey: 'id_categoria', sourceKey: 'id'});

  m.Recurso.belongsTo(m.UnidadDeMedida, { foreignKey: 'id_unidad', targetKey: 'id'});
  m.UnidadDeMedida.hasMany(m.Recurso, {as: 'recursos', foreignKey: 'id_unidad', sourceKey: 'id'});

  m.CantidadBeneficiarioRecurso.belongsTo(m.Recurso, { foreignKey: 'id_recurso', targetKey: 'id'});
  m.Recurso.hasMany(m.CantidadBeneficiarioRecurso, { as: 'cantidad_beneficiario_recursos', foreignKey: 'id_recurso', targetKey: 'id'});

  m.CantidadBeneficiarioRecurso.belongsTo(m.NecesidadBeneficiario, { foreignKey: 'id_necesidad_beneficiario', targetKey: 'id'});
  m.NecesidadBeneficiario.hasMany(m.CantidadBeneficiarioRecurso, {as: 'cantidad_beneficiario_recursos', foreignKey: 'id_necesidad_beneficiario', targetKey: 'id'});

  m.CantidadAcopioRecurso.belongsTo(m.Recurso, { foreignKey: 'id_recurso', targetKey: 'id'});
  m.Recurso.hasMany(m.CantidadAcopioRecurso, { as: 'cantidad_acopio_recursos', foreignKey: 'id_recurso', targetKey: 'id'});

  m.CantidadAcopioRecurso.belongsTo(m.NecesidadAcopio, { foreignKey: 'id_necesidad_acopio', targetKey: 'id'});
  m.NecesidadAcopio.hasMany(m.CantidadAcopioRecurso, {as: 'cantidad_acopio_recursos', foreignKey: 'id_necesidad_acopio', targetKey: 'id'});

  m.OrdenEnvio.belongsTo(m.CentroDeAcopio, { foreignKey: 'id_acopio', targetKey: 'id'});
  m.CentroDeAcopio.hasMany(m.OrdenEnvio, {as: 'ordenes_de_envio', foreignKey: 'id_acopio', sourceKey: 'id'});

  m.OrdenEnvio.belongsTo(m.NecesidadBeneficiario, { foreignKey: 'id_necesidad_beneficiario', targetKey: 'id'});
  m.NecesidadBeneficiario.hasMany(m.OrdenEnvio, {as: 'ordenes_de_envio', foreignKey: 'id_necesidad_beneficiario', sourceKey: 'id'});

  m.Horario.belongsTo(m.CentroDeAcopio, { foreignKey: 'id_acopio', targetKey: 'id'});
  m.CentroDeAcopio.hasMany(m.Horario, {as: 'horarios', foreignKey: 'id_acopio', sourceKey: 'id'});

  m.Recurso.belongsToMany(m.OrdenEnvio, {as: 'ordenes_de_envio', through: 'RecursoOrden', foreignKey: 'id_recurso'});
  m.OrdenEnvio.belongsToMany(m.Recurso, {as: 'recursos', through: 'RecursoOrden', foreignKey: 'id_orden'});

  m.Recurso.belongsToMany(m.CentroDeAcopio, {as: 'centros_de_acopio', through: 'Inventario', foreignKey: 'id_recurso'});
  m.CentroDeAcopio.belongsToMany(m.Recurso, {as: 'recursos', through: 'Inventario', foreignKey: 'id_centro_acopio'});

  m.Recurso.belongsToMany(m.NecesidadAcopio, {as: 'necesidades_acopio', through: 'cantidad_acopio_recurso', foreignKey: 'id_recurso'});
  m.NecesidadAcopio.belongsToMany(m.Recurso, {as: 'recursos', through: 'cantidad_acopio_recurso', foreignKey: 'id_necesidad_acopio'});

  m.Recurso.belongsToMany(m.NecesidadBeneficiario, {as: 'necesesidades_beneficiarios', through: 'cantidad_beneficiario_recurso', foreignKey: 'id_recurso'});
  m.NecesidadBeneficiario.belongsToMany(m.Recurso, {as: 'recursos', through: 'cantidad_beneficiario_recurso', foreignKey: 'id_necesidad_beneficiario'});

  m.NecesidadBeneficiario.belongsToMany(m.CentroDeAcopio, {as: 'centros_de_acopio', through: 'favoritos', foreignKey: 'id_necesidad_beneficiario'});
  m.CentroDeAcopio.belongsToMany(m.NecesidadBeneficiario, {as: 'necesesidades_beneficiarios', through: 'favoritos', foreignKey: 'id_centro_acopio'});
})(module.exports);

// export connection
module.exports.sequelize = sequelize;
