const express = require('express');
const router = express.Router();

const get = require('./get');
const necesidades = require('./necesidades');

router.route('/')
.get(get.handler);

router.use('/necesidades', necesidades);

module.exports = router;
