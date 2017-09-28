const models = require('../../../models');
const {OrdenEnvio, CentroDeAcopio, NecesidadBeneficiario, RecursoOrden, Beneficiario, sequelize} = models;

let handler = (req, res) => {
  const {id_centro_acopio, id_necesidad, recursos, destino_latitud, destino_longitud, tiempo_estimado} = req.body;
  order_id = null;
  console.log(id_necesidad);
  CentroDeAcopio.findById(id_centro_acopio)
  .then(ca => {
    if(ca){
      NecesidadBeneficiario.findById(id_necesidad, { include: [{model: Beneficiario, as: 'beneficiario'}] })
      .then(necesidad_b => {
        console.log("lol");
        if(necesidad_b){
          return sequelize.transaction(function (t) {

            // chain all your queries here. make sure you return them.
            return OrdenEnvio.create({
              id_centro_acopio: id_centro_acopio,
              id_necesidad_beneficiario: id_necesidad,
              destino_latitud: destino_latitud,
              destino_longitud: destino_longitud,
              origen_latitud: necesidad_b.beneficiario.latitud,
              origen_longitud: necesidad_b.beneficiario.longitud,
              tiempo_estimado: tiempo_estimado,
              status: 'En camino',
              fecha_creacion: new Date()
            }, {transaction: t}).then(function (orden) {
              order_id = orden.id
              var promises = []
              recursos.forEach(recurso => {
                promises.push(RecursoOrden.create({id_orden: orden.id, id_recurso: recurso.id, cantidad: recurso.cantidad},{transaction: t}))
              });
              return Promise.all(promises);
            });

          }).then(function (result) {
            // Transaction has been committed
            // result is whatever the result of the promise chain returned to the transaction callback
            res.send({id_orden: order_id});
          });
        }
        else {
          res.send({error: "No existe beneficiario"})
        }
      }, err => {
        res.send({error: err})
      });
    }
    else {
      res.send({error: "No hay centro de acopio"})
    }
  }).catch(function (err) {
    // Transaction has been rolled back
    // err is whatever rejected the promise chain returned to the transaction callback
    res.send({error: err})
  });
};

module.exports = {handler};
