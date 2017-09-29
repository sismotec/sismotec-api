const models = require('../../../../models');
const { NecesidadBeneficiario, CantidadBeneficiarioRecurso, sequelize} = models;


let handler = (req, res) => {
  const {id_beneficiario, recursos} = req.body;
  var nb_id = null
  return sequelize.transaction(t => {
    return NecesidadBeneficiario.create({
      id_beneficiario: id_beneficiario
    }, {transaction: t}).then(nb => {
      nb_id = nb.id
      promises = []
      recursos.forEach(recurso => {
        promises.push(CantidadBeneficiarioRecurso.create({
          cantidad_actual: recurso.cantidad,
          id_recurso: recurso.id,
          id_necesidad_beneficiario: nb.id,
          cantidad_total: recurso.cantidad
        }, {transaction: t}))
      });

      return Promise.all(promises);
    }, {transaction: t});

  }).then(function (result) {
    // Transaction has been committed
    // result is whatever the result of the promise chain returned to the transaction callback
    res.send({id_necesidad: nb_id});
  })
  .catch(err => {
    res.send({error: err});
  });
};

module.exports = {handler};
