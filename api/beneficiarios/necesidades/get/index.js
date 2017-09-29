const models = require('./../../../../models');
const {Beneficiario, Categoria, UnidadDeMedida, NecesidadBeneficiario, CantidadBeneficiarioRecurso, Recurso} = models;

let handler = (req, res) => {
   let idBeneficiariosString = req.query.id_beneficiarios;

   if (idBeneficiariosString == null) {
      return res.status(400).send();
   }

   let idBeneficiarios = idBeneficiariosString.split(',');

   NecesidadBeneficiario.findAll({include: [{model: Recurso, as: 'recursos', include: [{model: Categoria, as: 'categoria'}, {model: UnidadDeMedida, as: 'unidad_de_medida'}]}]})
   .then(necesidadesBeneficiario => {
      let nuevosRecursos = []
      let necesidadesBeneficiarioNuevas = [];

      necesidadesBeneficiario.forEach(necesidad => {
         nuevosRecursos = necesidad.recursos.map(recurso => ({
            id: recurso.id,
            nombre: recurso.nombre,
            categoria: recurso.categoria.categoria,
            unidad: recurso.unidad_de_medida.unidad
         }));

         necesidadesBeneficiarioNuevas.push({
            id_beneficiario: necesidad.id_beneficiario,
            recursos: nuevosRecursos
         });
      });

      if (idBeneficiariosString !== '') {
         idBeneficiarios = idBeneficiarios.map(id => +id);
         necesidadesBeneficiarioNuevas = necesidadesBeneficiarioNuevas.filter(necesidad => {
            return idBeneficiarios.indexOf(necesidad.id_beneficiario) >= 0;
         });
      }
      
      return res.status(200).send(necesidadesBeneficiarioNuevas);
   })
   .catch(err => {
      console.log('err', err);
      return res.status(400).send();
   });
};

module.exports = {handler}