const express = require('express');
const router = express.Router();

const necesidades = require('./necesidades');
const ordenes_envio = require('./ordenes_envio');

router.use('/necesidades', necesidades);
router.use('/ordenes-envio', ordenes_envio);

module.exports = router;
