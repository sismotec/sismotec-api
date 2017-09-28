const express = require('express');
const api = express.Router();

const beneficiaries = require('./beneficiaries');
const centrosAcopio = require('./centros-acopio');

api.get('/', (req, res) => res.send({message: 'Hello World! This is SismoTec API!'}));
api.use('/beneficiaries', beneficiaries);
api.use('/centros-acopio', centrosAcopio);

module.exports = api;