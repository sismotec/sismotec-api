const express = require('express');
const api = express.Router();

const beneficiaries = require('./beneficiaries');
const orden_envio = require('./orden_envio');
const centro_acopio = require('./centros-acopio');

api.get('/', (req, res) => res.send({message: 'Hello World! This is SismoTec API!'}));
api.use('/beneficiaries', beneficiaries);
api.use('/centros-acopio', centro_acopio);
api.use('/orden_envio', orden_envio);


module.exports = api;