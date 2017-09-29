const models = require('./../../../../models');
const {OrdenEnvio, NecesidadBeneficiario, Beneficiario, Recurso, Categoria, UnidadDeMedida, CantidadBeneficiarioRecurso, RecursoOrden} = models;

let handler = (req, res) => {
	let id = req.query.id_beneficiario;

	Beneficiario.findOne({include: [{model: NecesidadBeneficiario, as: 'necesidad_beneficiario', include: [{model: OrdenEnvio, as: 'ordenes_de_envio', include: [{model: RecursoOrden, as: 'recurso_ordenes', include: [{model: Recurso, as: 'recurso', include: [{model: Categoria, as: 'categoria'}, {model: UnidadDeMedida, as: 'unidad_de_medida'}]}]}]}]}], where: {id: id}})
	.then(beneficiario => {
		var ordenes = [];
		var recursos;
		for(var i = 0; i < beneficiario['necesidad_beneficiario']['ordenes_de_envio'].length; ++i){
			recursos = [];
			for(var j = 0; j < beneficiario['necesidad_beneficiario']['ordenes_de_envio'][i]['recurso_ordenes'].length; ++j){
				recursos.push({
					id: beneficiario['necesidad_beneficiario']['ordenes_de_envio'][i]['recurso_ordenes'][j].id_recurso,
					nombre: beneficiario['necesidad_beneficiario']['ordenes_de_envio'][i]['recurso_ordenes'][j]['recurso'].nombre,
					categoria: beneficiario['necesidad_beneficiario']['ordenes_de_envio'][i]['recurso_ordenes'][j]['recurso']['categoria'].categoria,
					cantidad: beneficiario['necesidad_beneficiario']['ordenes_de_envio'][i]['recurso_ordenes'][j].cantidad,
					unidad: beneficiario['necesidad_beneficiario']['ordenes_de_envio'][i]['recurso_ordenes'][j]['recurso']['unidad_de_medida'].unidad
				});
			}

			ordenes.push({
				id: beneficiario['necesidad_beneficiario']['ordenes_de_envio'][i].id,
				origen_latitud: beneficiario['necesidad_beneficiario']['ordenes_de_envio'][i].origen_latitud,
				origen_longitud: beneficiario['necesidad_beneficiario']['ordenes_de_envio'][i].origen_longitud,
				destino_latitud: beneficiario['necesidad_beneficiario']['ordenes_de_envio'][i].destino_latitud,
				destino_longitud: beneficiario['necesidad_beneficiario']['ordenes_de_envio'][i].destino_longitud,
				estado: beneficiario['necesidad_beneficiario']['ordenes_de_envio'][i].status,
				fecha_creacion: beneficiario['necesidad_beneficiario']['ordenes_de_envio'][i].fecha_creacion,
				recursos: recursos

			});
		}
		res.send(ordenes);
	});
};

module.exports = {handler}