// var request = require('request');
const models = require('../../../models');
const OrdenEnvio = models.OrdenEnvio;
const CentroDeAcopio = models.CentroDeAcopio;
const NecesidadBeneficiario = models.NecesidadBeneficiario;


let handler = (req, res) => {
   CentroDeAcopio.findById(1)
   .then(ca => {
     res.send({centro: ca});
   });
};

module.exports = {handler};


// request({
//   method: 'DELETE',
//   url: 'https://private-anon-7e05af3de2-sismotecapi.apiary-mock.com/centros-acopio/ordenes-envio',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: "{  \"orderID\": 5}"
// }, function (error, response, body) {
//   console.log('Status:', response.statusCode);
//   console.log('Headers:', JSON.stringify(response.headers));
//   console.log('Response:', body);
// });