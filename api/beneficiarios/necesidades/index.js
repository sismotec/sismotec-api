const express = require('express');
const router = express.Router();

const get = require('./get');
const post = require('./post');
const put = require('./put');

router.route('/')
.get(get.handler);

router.route('/')
.post(post.handler);

router.route('/')
.put(put.handler);

module.exports = router;
