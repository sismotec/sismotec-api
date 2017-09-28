//const CentroAcopio = require('./../../../database');
//const Beneficiario = require('./../../../database');
const geocoder = require('geocoder');

let handler = (req, res) => {
	let lat = req.query.lat;
	let long = req.query.long;
	var estado;	

	geocoder.reverseGeocode(lat, long, function(error, data){
		if(!error){
			var size = data.results[0].address_components.length;

			if(size == 7)
				estado = data.results[0].address_components[5].long_name;
			else
				estado = data.results[0].address_components[2].long_name;

			res.send({message: 'Hit GET /centros-acopio', result: data, size: size});
		}else{
			res.send({code: 404, message: 'Location not found'});
		}
	});
};

module.exports = {handler};