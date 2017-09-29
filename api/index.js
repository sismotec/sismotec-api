const express = require('express');
const api = express.Router();

const beneficiarios = require('./beneficiarios');
const centrosAcopio = require('./centros-acopio');
const ordenes_envio = require('./orden_envio');
const necesidades = require('./necesidades');
const recursos = require('./recursos');
const crear_cuenta = require('./crear-cuenta');

api.get('/', (req, res) => res.send({message: 'Hello World! This is SismoTec API!'}));
api.use('/beneficiarios', beneficiarios);
api.use('/centros-acopio', centrosAcopio);
api.use('/recursos', recursos);
api.use('/necesidades', necesidades);
api.use('/ordenes-envio', ordenes_envio);
api.post('/crear-cuenta', crear_cuenta.handler);
module.exports = api;