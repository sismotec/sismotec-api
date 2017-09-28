const express = require('express');
const api = express.Router();

const beneficiarios = require('./beneficiarios');
const ordenes_envio = require('./orden_envio');
const necesidades = require('./necesidades');
const recursos = require('./recursos');

api.get('/', (req, res) => res.send({message: 'Hello World! This is SismoTec API!'}));
api.use('/beneficiarios', beneficiarios);
api.use('/recursos', recursos);
api.use('/necesidades', necesidades);
api.use('/ordenes-envio', ordenes_envio);

module.exports = api;