const models = require('../../../models');
const {Beneficiario, CentroDeAcopio} = models;
var shajs = require('sha.js')

let handler = (req, res) => {
	id_usuario = req.body.id
	tipo_usuario = req.body.tipo

	if(id_usuario == null && tipo_usuario
		== null){
		res.send({code: 404, message: 'Login Error'});	
	}else{
		if (tipo_usuario == "Centro de acopio") {
			CentroDeAcopio
		}else{
			Beneficiario
		}
	}
};
module.exports = {handler};