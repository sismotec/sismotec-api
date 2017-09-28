const models = require('../../../models');
const {OrdenEnvio, CentroDeAcopio, NecesidadBeneficiario, RecursoOrden} = models;

let handler = (req, res) => {
	id_orden = req.body.id_orden
	id_orden_recurso = req.body.id_orden

	if(id_orden == null){
		res.send({code: 404, message: 'Order not found'});	
	}else{
		OrdenEnvio.findById(id_orden).then(orden => {
			res.send({id_orden: orden});
		});
		
 	// OrdenEnvio.destroy({
	//   where: {
	//     id: id_orden
	//   }
	// });

	// RecursoOrden.destroy({
	// 	where: {
	// 		id_orden: id_orden_recurso
	// 	}
	// });

	}

    

};


module.exports = {handler};


