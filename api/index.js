const express = require('express');
const api = express.Router();

const beneficiaries = require('./beneficiaries');
const orden_envio = require('./orden_envio');
const recursos = require('./recursos');

api.get('/', (req, res) => res.send({message: 'Hello World! This is SismoTec API!'}));
api.use('/beneficiaries', beneficiaries);
api.use('/recursos', recursos);

module.exports = api;
