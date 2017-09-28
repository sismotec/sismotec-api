const express = require('express');
const api = express.Router();

const beneficiaries = require('./beneficiaries');
const ordenes_envio = require('./orden_envio');
const necessities = require('./necessities');
const recursos = require('./recursos');

api.get('/', (req, res) => res.send({message: 'Hello World! This is SismoTec API!'}));
api.use('/beneficiaries', beneficiaries);
api.use('/recursos', recursos);
api.use('/necessities', necessities);
api.use('/ordenes-envio', ordenes_envio);

module.exports = api;