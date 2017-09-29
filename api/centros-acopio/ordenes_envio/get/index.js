const models = require('./../../../../models');
const {CentroDeAcopio, OrdenEnvio, RecursoOrden, Recurso, Categoria, UnidadDeMedida} = models;

let handler = (req, res) =>{
	let id = req.query.id_centro_acopio;

	CentroDeAcopio.findOne({include: [{model: OrdenEnvio, as: 'ordenes_de_envio', include: [{model: RecursoOrden, as: 'recurso_ordenes', include: [{model: Recurso, as: 'recurso', include: [{model: Categoria, as: 'categoria'}, {model: UnidadDeMedida, as: 'unidad_de_medida'}]}]}]}], where: {id: id}})
	.then(centro_de_acopio => {
		var ordenes = [];
		var recursos;

		for(var i = 0; i < centro_de_acopio['ordenes_de_envio'].length; ++i){

			recursos = [];
			for(var j = 0; j < centro_de_acopio['ordenes_de_envio'][i]['recurso_ordenes'].length; ++j){
				recursos.push({
					id: centro_de_acopio['ordenes_de_envio'][i]['recurso_ordenes'][j].id_recurso,
					nombre: centro_de_acopio['ordenes_de_envio'][i]['recurso_ordenes'][j]['recurso'].nombre,
					categoria: centro_de_acopio['ordenes_de_envio'][i]['recurso_ordenes'][j]['recurso']['categoria'].categoria,
					cantidad: centro_de_acopio['ordenes_de_envio'][i]['recurso_ordenes'][j].cantidad,
					unidad: centro_de_acopio['ordenes_de_envio'][i]['recurso_ordenes'][j]['recurso']['unidad_de_medida'].unidad
				});
			}

			ordenes.push({
				id: centro_de_acopio['ordenes_de_envio'][i].id, //del envío
				organizacion: centro_de_acopio.nombre_organizacion,
				origen_latitud: centro_de_acopio['ordenes_de_envio'][i].origen_latitud,
				origen_longitud: centro_de_acopio['ordenes_de_envio'][i].origen_longitud,
				destino_latitud: centro_de_acopio['ordenes_de_envio'][i].destino_latitud,
				destino_longitud: centro_de_acopio['ordenes_de_envio'][i].destino_longitud,
				estado: centro_de_acopio['ordenes_de_envio'][i].status,
				fecha_creacion: centro_de_acopio['ordenes_de_envio'][i].fecha_creacion,
				recurso: recursos
			});
		}
		res.send(ordenes);
	});
};

module.exports = {handler};