const models = require('../../../models');
const OrdenEnvio = models.OrdenEnvio;
const CentroDeAcopio = models.CentroDeAcopio;
const NecesidadBeneficiario = models.NecesidadBeneficiario;


let handler = (req, res) => {
   CentroDeAcopio.findById(1)
   .then(ca => {
     res.send({centro: ca});
   });
};

module.exports = {handler};
