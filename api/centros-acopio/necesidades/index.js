const express = require('express');
const router = express.Router();

const get = require('./get');
const put = require('./put');

router.route('/')
.get(get.handler);

router.route('/')
.put(put.handler);

module.exports = router;
