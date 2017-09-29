const models = require('../../../models');
const {OrdenEnvio, CentroDeAcopio, NecesidadBeneficiario, RecursoOrden, Beneficiario, CantidadBeneficiarioRecurso, sequelize} = models;

let handler = (req, res) => {
  const {id_centro_acopio, id_necesidad, recursos, destino_latitud, destino_longitud, tiempo_estimado} = req.body;
  order_id = null;
  console.log(id_necesidad);
  CentroDeAcopio.findById(id_centro_acopio)
  .then(ca => {
    if(ca){
      NecesidadBeneficiario.findById(id_necesidad, { include: [{model: Beneficiario, as: 'beneficiario'},{model: CantidadBeneficiarioRecurso, as: 'cantidad_beneficiario_recursos'}] })
      .then(necesidad_b => {
        console.log(req.body);
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
              status: 'en camino',
              fecha_creacion: new Date()
            }, {transaction: t}).then(function (orden) {
              order_id = orden.id
              var promises = []
              recursos.forEach(recurso => {
                promises.push(RecursoOrden.create({id_orden: orden.id, id_recurso: recurso.id, cantidad: recurso.cantidad},{transaction: t}))
              });
              return Promise.all(promises);
            }, {transaction: t}).then(ordenes_recurso => {
              promises = []
              necesidad_b.cantidad_beneficiario_recursos.forEach(cantidad_beneficiario_recurso => {
                ordenes_recurso.forEach(orden_recurso => {
                  if(cantidad_beneficiario_recurso.id_recurso == orden_recurso.id_recurso){
                    cantidad_beneficiario_recurso.cantidad_actual -= orden_recurso.cantidad;
                    cantidad_beneficiario_recurso.cantidad_actual = cantidad_beneficiario_recurso.cantidad_actual < 0 ? 0 : cantidad_beneficiario_recurso.cantidad_actual;
                    promises.push(cantidad_beneficiario_recurso.save())
                  }
                });
              })

              return Promise.all(promises);
            }, {transaction: t});

          }).then(function (result) {
            // Transaction has been committed
            // result is whatever the result of the promise chain returned to the transaction callback
            res.send({id_orden: order_id});
          });
        }
        else {
          res.send({error: "No existe beneficiario"})
        }
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
