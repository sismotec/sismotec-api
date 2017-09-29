const models = require('../../../../models');
const {OrdenEnvio} = models;


let handler = (req, res) => {
  const {id_orden} = req.body;
  OrdenEnvio.findById(id_orden).then(oe => {
    if(oe){
      if(oe.estado != "engregado"){
        oe.estado = entregado
        oe.save().then(() => {
          res.send({});
        });
      } else {
        res.send({error: "Esa orden ya esta terminada"});
      }
    } else {
      res.send({error: "No existe la orden"});
    }
  })
  .catch(err => {
    res.send({error: err});
  });
};

module.exports = {handler};
