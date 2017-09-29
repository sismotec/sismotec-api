const express = require('express');
const router = express.Router();

const necesidades = require('./necesidades');

router.use('/necesidades', necesidades);

module.exports = router;
