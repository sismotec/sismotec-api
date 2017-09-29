const express = require('express');
const router = express.Router();

const post = require('./post');

router.route('/')
.post(post.handler);

module.exports = router;
