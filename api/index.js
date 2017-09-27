const express = require('express');
const api = express.Router();

const beneficiaries = require('./beneficiaries');

api.get('/', (req, res) => res.send({message: 'Hello World! This is SismoTec API!'}));
api.use('/beneficiaries', beneficiaries);

module.exports = api;