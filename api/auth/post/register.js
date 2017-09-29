const models = require('../../../models');
const {Beneficiario, CentroDeAcopio} = models;
var shajs = require('sha.js')

let handler = (req, res) => {
	id_usuario = req.body.id
	tipo_usuario = req.body.tipo
	nombre_organizacion = req.body.nombre_organizacion
	nombre_responsable = req.body.nombre_responsable
	email = req.body.email
	celular = req.body.celular
	latitud = req.body.latitud
	longitud = req.body.longitud
	password = req.body.password
	estado = req.body.estado

	password = sha256(password);

	if(id_usuario == null && tipo_usuario
		== null){
		res.send({code: 404, message: 'Register Error'});	
	}else{
		if (tipo_usuario == "Centro de acopio") {
			CentroDeAcopio.create({ 
				id: id_usuario,
				latitud: latitud,
				longitud: longitud,
				nombre_organizacion: nombre_organizacion,
				nombre_responsable: nombre_responsable,
				celular: celular,
				email: email,
				estado: estado,
				password: password })
			  .then(() => CentroDeAcopio.findOrCreate({
			  	where: {
			  		email: email,
			  		celular: celular,
			  		id: id_usuario
			  	}, 
			  	defaults: {
			  		horario: null
			  	}}))
			  .spread((user, created) => {
			    console.log(user.get({
			      plain: true
			    }))
			    console.log(created)
				})
			  .catch(function (err) {
			  	res.send({code: 404, message: 'Register Error'});
			  });
		}else{
			Beneficiario.create({ 
				id: id_usuario,
				latitud: latitud,
				longitud: longitud,
				nombre_instituto: nombre_organizacion,
				nombre_responsable: nombre_responsable,
				celular: celular,
				email: email,
				estado: estado,
				password: password })
			  .then(() => CentroDeAcopio.findOrCreate({
			  	where: {
			  		email: email,
			  		celular: celular,
			  		id: id_usuario
			  	}}))
			  .spread((user, created) => {
			    console.log(user.get({
			      plain: true
			    }))
			    console.log(created)
				})
			  .catch(function (err) {
			  	res.send({code: 404, message: 'Register Error'});
			  });
		}
	}
};
module.exports = {handler};