const models = require('../../../../models');
const { NecesidadBeneficiario, CantidadBeneficiarioRecurso, sequelize} = models;


let handler = (req, res) => {
  const {id_beneficiario, recursos} = req.body;
  nb = NecesidadBeneficiario
};

module.exports = {handler};
