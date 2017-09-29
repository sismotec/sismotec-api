const models = require('../../../../models');
const {NecesidadAcopio, sequelize} = models;


let handler = (req, res) => {
  const {id_necesidad, recursos} = req.body;
  NecesidadAcopio.findById(id_necesidad)
  .then(na => {
    if(na){
      return sequelize.transaction(t =>{
        promises = []
        recursos.forEach(recurso => {
          
        });
      });
    } else {
      res.send({error: "No existe la necesidad"});
    }
  })
  .catch((err) => {
    console.log(err);
    res.send({error: err});
  });
};

module.exports = {handler};
