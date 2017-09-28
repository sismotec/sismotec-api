var models = require('./../../../models');
var Beneficiario = models.Beneficiario;

let handler = (req, res) => {
   Beneficiario.findAll()
   .then(beneficiaries => {
     res.send({beneficiarios: beneficiaries});
   });
};

module.exports = {handler};
