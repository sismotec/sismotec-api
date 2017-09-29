const models = require('../../../../models');
const {NecesidadAcopio, CantidadAcopioRecurso, sequelize} = models;


let handler = (req, res) => {
  const {id_necesidad, recursos} = req.body;
  na_id = null
  console.log("entra");
  NecesidadAcopio.findById(id_necesidad)
  .then(na => {
    if(na){
      na_id = na.id
      return sequelize.transaction(t =>{
        promises = []
        recursos.forEach(recurso => {
          promises.push(
            CantidadAcopioRecurso.findOrCreate({where: {id_recurso: recurso.id, id_necesidad_acopio: na.id}, defaults: {cantidad: recurso.cantidad}, transaction: t})
            .spread((car, created) => {
              if(!created){
                car.cantidad = recurso.cantidad
                return car.save({transaction: t})
              }
              else {
                return car
              }
            })
          );
        });

        return Promise.all(promises);
      });
    } else {
      res.send({error: "No existe la necesidad"});
    }
  }).then(function (result) {
    // Transaction has been committed
    // result is whatever the result of the promise chain returned to the transaction callback
    res.send({id_necesidad: na_id});
  })
  .catch((err) => {
    console.log(err);
    res.send({error: err});
  });
};

module.exports = {handler};
