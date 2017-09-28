const express = require('express');
const router = express.Router();

const get = require('./get');

router.route('/')
.get(get.handler);

module.exports = router;