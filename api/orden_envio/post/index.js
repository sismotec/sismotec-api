const models = require('../../../models');
const OrdenEnvio = models.OrdenEnvio;
const CentroDeAcopio = models.CentroDeAcopio;
const NecesidadBeneficiario = models.NecesidadBeneficiario;


let handler = (req, res) => {
  id_centro_acopio = req.body.id_centro_acopio
  id_necesidad_beneficiario = req.body.id_necesidad_beneficiario
  recursos = req.body.recursos
  CentroDeAcopio.findById(id_centro_acopio)
    .then(ca => {
      if(ca){
        NecesidadBeneficiario.findById(id_necesidad_beneficiario)
        .then(necesidad_b => {
          recursos_orden = []
          recursos.forEach(recurso => {
            aux = 
          });
          oe = OrdenEnvio.build({})
        });
        res.send({centro: ca});
      }
    });
};

module.exports = {handler};
