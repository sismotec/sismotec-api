const express = require('express');
const router = express.Router();

const get = require('./get');
const put = require('./put');
const post = require('./post');

router.route('/')
.get(get.handler);

router.route('/')
.put(put.handler);

router.route('/')
.post(post.handler);

module.exports = router;
