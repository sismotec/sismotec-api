const models = require('../../../models');
const {NecesidadAcopio, NecesidadBeneficiario, Recurso, Categoria, UnidadDeMedida, CentroDeAcopio, Beneficiario} = models;

//Regresar todas las necesidades locales

const geocoder = require('geocoder');

let handler = (req, res) => {
	let lat = req.query.lat;
	let long = req.query.long;

	//Get all necessities
	if(lat == null || long == null){
		NecesidadAcopio.findAll({include: [{model: CentroDeAcopio, as: 'centro_de_acopio'}, {model: Recurso, as: 'recursos', include: [{ model: Categoria, as: 'categoria'}, {model: UnidadDeMedida, as: 'unidad_de_medida'}]}]})
		.then(necessities_acopio => {
			NecesidadBeneficiario.findAll({include: [{model: Beneficiario, as: 'beneficiario'}, {model: Recurso, as: 'recursos', include: [{ model: Categoria, as: 'categoria'}, {model: UnidadDeMedida, as: 'unidad_de_medida'}]}]})
			.then(necessities_beneficiario => {
				var necessities = [];
				var recursos;

				for(var i = 0; i < necessities_acopio.length; ++i){

					recursos = [];
					for(var j = 0; j < necessities_acopio[i]['recursos'].length; ++j){
						Recurso
						recursos.push({
							id: necessities_acopio[i]['recursos'][j].id,
							nombre: necessities_acopio[i]['recursos'][j].nombre,
							categoria: necessities_acopio[i]['recursos'][j]['categoria'].categoria,
							unidad: necessities_acopio[i]['recursos'][j]['unidad_de_medida'].unidad,
							cantidad: necessities_acopio[i]['recursos'][j]['cantidad_acopio_recurso'].cantidad
						});
					}

					necessities.push({
						id_necesidad: necessities_acopio[i].id,
						id_propietario: necessities_acopio[i]['centro_de_acopio'].id,
						propetario_tipo: 'Centro de acopio',
						latitud: necessities_acopio[i]['centro_de_acopio'].latitud,
						longitud: necessities_acopio[i]['centro_de_acopio'].longitud,
						recursos: recursos
					});
				}

				for(var i = 0; i < necessities_beneficiario.length; ++i){

					recursos = [];
					for(var j = 0; j < necessities_beneficiario[i]['recursos'].length; ++j){
						recursos.push({
							id: necessities_beneficiario[i]['recursos'][j].id,
							nombre: necessities_beneficiario[i]['recursos'][j].nombre,
							categoria: necessities_beneficiario[i]['recursos'][j]['categoria'].categoria,
							unidad: necessities_beneficiario[i]['recursos'][j]['unidad_de_medida'].unidad,
							cantidad: necessities_beneficiario[i]['recursos'][j]['cantidad_beneficiario_recurso'].cantidad_actual
						});
					}

					necessities.push({
						id_necesidad: necessities_beneficiario[i].id,
						id_propietario: necessities_beneficiario[i]['beneficiario'].id,
						propetario_tipo: 'Beneficiario',
						latitud: necessities_beneficiario[i]['beneficiario'].latitud,
						longitud: necessities_beneficiario[i]['beneficiario'].longitud,
						recursos: recursos
					});
				}
				res.send(necessities);
			});
		});
	}else{
		var estado;

		geocoder.reverseGeocode(lat, long, function(error, data){
			if(!error){
				var size = data.results[0].address_components.length;
				estado = data.results[0].address_components[size-2].long_name

				NecesidadAcopio.findAll({include: [{model: CentroDeAcopio, as: 'centro_de_acopio'}, {model: Recurso, as: 'recursos', include: [{ model: Categoria, as: 'categoria'}, {model: UnidadDeMedida, as: 'unidad_de_medida'}]}]})
				.then(necessities_acopio => {
					NecesidadBeneficiario.findAll({include: [{model: Beneficiario, as: 'beneficiario'}, {model: Recurso, as: 'recursos', include: [{ model: Categoria, as: 'categoria'}, {model: UnidadDeMedida, as: 'unidad_de_medida'}]}]})
					.then(necessities_beneficiario => {
						var necessities = [];
						var recursos;

						for(var i = 0; i < necessities_acopio.length; ++i){

							recursos = [];
							if(necessities_acopio[i]['centro_de_acopio'].estado == estado){
								for(var j = 0; j < necessities_acopio[i]['recursos'].length; ++j){
									recursos.push({
										id: necessities_acopio[i]['recursos'][j].id,
										nombre: necessities_acopio[i]['recursos'][j].nombre,
										categoria: necessities_acopio[i]['recursos'][j]['categoria'].categoria,
										unidad: necessities_acopio[i]['recursos'][j]['unidad_de_medida'].unidad,
										cantidad: necessities_acopio[i]['recursos'][j]['cantidad_acopio_recurso'].cantidad
									});
								}

								necessities.push({
									id_necesidad: necessities_acopio[i].id,
									id_propietario: necessities_acopio[i]['centro_de_acopio'].id,
									propetario_tipo: 'Centro de acopio',
									latitud: necessities_acopio[i]['centro_de_acopio'].latitud,
									longitud: necessities_acopio[i]['centro_de_acopio'].longitud,
									recursos: recursos
								});
							}
						}

						for(var i = 0; i < necessities_beneficiario.length; ++i){

							recursos = [];
							if(necessities_beneficiario[i]['beneficiario'].estado == estado){
								for(var j = 0; j < necessities_beneficiario[i]['recursos'].length; ++j){
									recursos.push({
										id: necessities_beneficiario[i]['recursos'][j].id,
										nombre: necessities_beneficiario[i]['recursos'][j].nombre,
										categoria: necessities_beneficiario[i]['recursos'][j]['categoria'].categoria,
										unidad: necessities_beneficiario[i]['recursos'][j]['unidad_de_medida'].unidad,
										cantidad: necessities_beneficiario[i]['recursos'][j]['cantidad_beneficiario_recurso'].cantidad_actual
									});
								}

								necessities.push({
									id_necesidad: necessities_beneficiario[i].id,
									id_propietario: necessities_beneficiario[i]['beneficiario'].id,
									propetario_tipo: 'Beneficiario',
									latitud: necessities_beneficiario[i]['beneficiario'].latitud,
									longitud: necessities_beneficiario[i]['beneficiario'].longitud,
									recursos: recursos
								});
							}
						}
						res.send(necessities);
					});
				});
			}else{
				res.send({code: 404, message: 'Location not found'});
			}
		});
	}
};

module.exports = {handler};