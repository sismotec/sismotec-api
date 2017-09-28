const models = require('./../../../../models');
const {OrdenEnvio, NececidadBeneficiario, Recurso, Categoria, UnidadDeMedida} = models;

let handler = (req, res) => {
	let id = req.query;
	OrdenEnvio.findAll({where: {id_necesidad_beneficiario}})
	res.send({id: id});
};