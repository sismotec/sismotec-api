const models = require('./../../../models');
const sha256 = require('sha256');
const {Beneficiario, CentroDeAcopio} = models;

let handler = (req, res) => {
   let {email, password} = req.body;
   console.log('POST iniciar-sesion', req.body);

   if (email == null || password == null) {
      return res.status(400).send();
   }

   password = sha256(password);

   Beneficiario.findOne({where: {email, password}, attributes: ['id']})
   .then(user => {
      if (user) {
         console.log('user Beneficiario', user);
         res.send({id: user.id, tipo: 'Beneficiario'});
      }

      return CentroDeAcopio.findOne({where: {email, password}, attributes: ['id']});
   })
   .then(user => {
      if (user) {
         console.log('user CentroDeAcopio', user);
         res.send({id: user.id, tipo: 'Centro de acopio'});
      }

      return res.status(404).send();
   })
   .catch(err => {
      console.log('err', err);
      return res.status(400).send();
   });
};

module.exports = {handler};