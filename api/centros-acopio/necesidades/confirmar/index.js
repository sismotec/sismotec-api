const express = require('express');
const router = express.Router();

const put = require('./put');

router.route('/')
.put(put.handler);

module.exports = router;
