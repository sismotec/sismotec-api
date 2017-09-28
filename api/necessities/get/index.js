const models = require('../../../models');
const {NecesidadAcopio, NecesidadBeneficiario, Recurso, UnidadDeMedida, CentroDeAcopio} = models;

//Regresar todas las necesidades locales

const geocoder = require('geocoder');

let handler = (req, res) => {
	let lat = req.query.lat;
	let long = req.query.long;

	//Get all necessities
	if(lat == null || long == null){
		NecesidadAcopio.findAll({include: [{model: CentroDeAcopio, as: 'centro_de_acopio'}, {model: Recurso, as: 'recursos'}]})
		.then(necessities_acopio => {
			NecesidadBeneficiario.findAll()
			.then(necessities_beneficiario => {
				
				res.send({necessities: necessities_acopio});
			});
		});
	}else{
		var estado;

		geocoder.reverseGeocode(lat, long, function(error, data){
			if(!error){
				var size = data.results[0].address_components.length;

				if(size == 7)
					estado = data.results[0].address_components[5].long_name;
				else
					estado = data.results[0].address_components[2].long_name;

				res.send({message: 'Hit GET /necessities', result: estado, long: long});
			}else{
				res.send({code: 404, message: 'Location not found'});
			}
		});
	}
};

module.exports = {handler};