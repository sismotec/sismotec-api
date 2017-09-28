const models = require('../../../models');
const {OrdenEnvio, CentroDeAcopio, NecesidadBeneficiario, RecursoOrden} = models;

OrdenEnvio.findAll({
	attributes: ['id']
});

let handler = (req, res) => {
   OrdenEnvio.findAll({
   	attributes: ['id']
   });

   RecursoOrden.findAll({
   	attributes: ['id']
   });

   

   CentroDeAcopio.findById(1)
   .then(ca => {
     res.send({centro: ca});
   });
};


module.exports = {handler};


