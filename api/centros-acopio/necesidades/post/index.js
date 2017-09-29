const models = require('./../../../../models');
const {sequelize, NecesidadAcopio, CantidadAcopioRecurso} = models;

let handler = (req, res) => {
	const {id_centro_acopio, recursos} = req.body;
	var nc_id = null;
	return sequelize.transaction(t => {
		return NecesidadAcopio.create({
			id_centro_acopio: id_centro_acopio
		}, {transaction: t}).then(nc => {
			nc_id = nc.id;
			promises = [];
			recursos.forEach(recurso => {
				promises.push(CantidadAcopioRecurso.create({
					cantidad: recurso.cantidad,
					id_recurso: recurso.id,
					id_necesidad_acopio: nc.id
				}, {transaction: t}))
			});

			return Promise.all(promises);
		}, {transaction: t});
	}).then(function(result){
		//Transaction committed
		res.send({id_necesidad: nc_id});
	})
	.catch(err => {
		res.send({error: err, recursos: recursos});
	});
};

module.exports = {handler};