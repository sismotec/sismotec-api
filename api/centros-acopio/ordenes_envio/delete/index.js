const models = require('./../../../../models');
const {OrdenEnvio, RecursoOrden, NecesidadBeneficiario, CantidadBeneficiarioRecurso} = models;

let handler = (req, res) => {
	id_orden = req.body.id_orden;

	if(id_orden == null){
		res.send({code: 404, message: 'Order not found'});	
	}else{
		OrdenEnvio.findById(id_orden, {include: [{model: RecursoOrden, as: 'recurso_ordenes'}, {model: NecesidadBeneficiario, as: 'necesidad_beneficiario', include: [{model: CantidadBeneficiarioRecurso, as:'cantidad_beneficiario_recursos'}]}]})
		.then(orden => {
			orden.update({
				status: 'Cancelado',
			});
			for(var i = 0; i < orden['recurso_ordenes'].length; ++i){
				for(var j = 0; j < orden['necesidad_beneficiario']['cantidad_beneficiario_recursos'].length; ++j){
					if(orden['recurso_ordenes'][i].id_recurso == orden['necesidad_beneficiario']['cantidad_beneficiario_recursos'][j].id_recurso){
						orden['necesidad_beneficiario']['cantidad_beneficiario_recursos'][j].update({
							cantidad_actual: (orden['necesidad_beneficiario']['cantidad_beneficiario_recursos'][j].cantidad_actual + orden['recurso_ordenes'][i].cantidad)
						});
					}
				}
			}
			res.send({id_orden: orden.id});
		});
	}
};
module.exports = {handler};