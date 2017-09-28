const models = require('./../../../models');
const {Recurso, Categoria} = models;

let handler = (req, res) => {
   Recurso.findAll({include: [{model: Categoria, as: 'categoria'}] })
   .then(recursos => {

      res.send(recursos);
   })
   .catch(data => {
      console.log(data);
      res.status(400).send();
   });
};

module.exports = {handler};
