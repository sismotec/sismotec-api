const models = require('./../../../models');
const {Recurso, Categoria, UnidadDeMedida} = models;

let handler = (req, res) => {
   Recurso.findAll({include: [{model: Categoria, as: 'categoria'}, {model: UnidadDeMedida, as: 'unidad_de_medida'}] })
   .then(recursos => {
      let data = recursos.map(recurso => ({
         id: recurso.id,
         nombre: recurso.nombre,
         categoria: recurso.categoria.categoria,
         unidad: recurso.unidad_de_medida.unidad
      }));
      res.send(data);
   })
   .catch(data => res.status(400).send());
};

module.exports = {handler};
