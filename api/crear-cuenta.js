const models = require('./../models');
const {Beneficiario, CentroDeAcopio} = models;
const sha256 = require('sha256');

let handler = (req, res) => {
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

	if(tipo_usuario == null){
		res.send({code: 404, message: 'Register Error'});	
	}else{
		if (tipo_usuario == "Centro de acopio") {
			CentroDeAcopio.create({ 
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
			  		celular: celular
			  	}, 
			  	defaults: {
			  		estado: null
			  	}}))
			  .spread((user, created) => {
			    console.log(user.get({
			      plain: true
			    }))
			    console.log(created)
			    res.send({id: user.id, tipo: tipo_usuario});
				});
		}else{
			Beneficiario.create({ 
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
			  		celular: celular
			  	}}))
			  .spread((user, created) => {
			    console.log(user.get({
			      plain: true
			    }))
			    console.log(created)
			    res.send({id: user.id, tipo: tipo_usuario});
				});
		}
	}
};
module.exports = {handler};