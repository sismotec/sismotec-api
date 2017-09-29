const models = require('./../../../../models');
const {Categoria, UnidadDeMedida, NecesidadAcopio, Recurso} = models;

let handler = (req, res) => {
   let idCentrosAcopioString = req.query.id_centros_acopio;
   
   if (idCentrosAcopioString == null) {
      return res.status(400).send();
   }

   let idCentrosAcopio = idCentrosAcopioString.split(',');
   console.log('idCentrosAcopio', idCentrosAcopio);
   
   NecesidadAcopio.findAll({include: [{model: Recurso, as: 'recursos', include: [{model: Categoria, as: 'categoria'}, {model: UnidadDeMedida, as: 'unidad_de_medida'}]}]})
   .then(necesidadesCentroAcopio => {
      let nuevosRecursos = []
      let necesidadesCentroAcopioNuevas = [];

      necesidadesCentroAcopio.forEach(necesidad => {
         nuevosRecursos = necesidad.recursos.map(recurso => ({
            id: recurso.id,
            nombre: recurso.nombre,
            categoria: recurso.categoria.categoria,
            unidad: recurso.unidad_de_medida.unidad
         }));

         necesidadesCentroAcopioNuevas.push({
            id_centro_acopio: necesidad.id_centro_acopio,
            recursos: nuevosRecursos
         });
      });

      if (idCentrosAcopioString !== '') {
         idCentrosAcopio = idCentrosAcopio.map(id => +id);
         necesidadesCentroAcopioNuevas = necesidadesCentroAcopioNuevas.filter(necesidad => {
            return idCentrosAcopio.indexOf(necesidad.id_centro_acopio) >= 0;
         });
      }
      
      return res.status(200).send(necesidadesCentroAcopioNuevas);
   })
   .catch(err => {
      console.log('err', err);
      return res.status(400).send();
   });
};

module.exports = {handler};