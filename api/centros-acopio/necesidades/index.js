const express = require('express');
const router = express.Router();

const get = require('./get');
const put = require('./put');

router.route('/')
.get(get.handler);

router.route('/')
.put(get.handler);

module.exports = router;
