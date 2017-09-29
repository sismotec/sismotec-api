const models = require('./../../../../models');
const {OrdenEnvio, NecesidadBeneficiario, Beneficiario, Recurso, Categoria, UnidadDeMedida, CantidadBeneficiarioRecurso, RecursoOrden} = models;

let handler = (req, res) => {
	let id = req.query.id_beneficiario;

	Beneficiario.findAll({include: [{model: NecesidadBeneficiario, as: 'necesidad_beneficiario', include: [{model: OrdenEnvio, as: 'ordenes_de_envio', include: [{model: RecursoOrden, as: 'recursos'}]}]}], where: {id: id}})
	.then(beneficiario => {
		res.send({beneficiario: beneficiario});
	});
};

module.exports = {handler}