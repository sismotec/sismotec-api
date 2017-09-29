const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const api = require('./api');

app.use(bodyParser.json());
app.set('models', require('./models'));
app.use('/', api);

app.listen(port, () => console.log(`Server is up and running on port ${port}\n`));
module.exports = app;
