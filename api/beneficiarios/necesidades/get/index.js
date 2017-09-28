const models = require('./../../../../models');
const {Beneficiario, NecesidadBeneficiario, CantidadBeneficiarioRecurso, Recurso} = models;

let handler = (req, res) => {
   let idBeneficiarios = req.query.id_beneficiarios.split(',');
   console.log('idBeneficiarios', idBeneficiarios);

   //Beneficiario.findAll({include: [{model: NecesidadBeneficiario, as: 'necesidad_beneficiario'}]})
   CantidadBeneficiarioRecurso.findAll({include: [{model: Recurso, as: 'recurso'}]})
   .then(data => {
      console.log('data', data);
      return res.status(200).send(data);
   })
   .catch(err => {
      console.log('err', err);
      return res.status(400).send();
   });
};

module.exports = {handler}