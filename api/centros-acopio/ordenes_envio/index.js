const express = require('express');
const router = express.Router();

const get = require('./get');
const del = require('./delete');

router.route('/')
.get(get.handler);

router.route('/')
.delete(del.handler);

module.exports = router;