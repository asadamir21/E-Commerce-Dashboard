const express = require('express');
const path = require('path');
var cors = require('cors');

const {PORT} = require('../config.json');
const app = express();
app.use(cors())


// Then use it before your routes are set up:
app.use(cors());

app.use('/', express.static(path.join(__dirname, '..','build')));
app.use('/static', express.static(path.join(__dirname, '..','static')));
console.log(path.join(__dirname, '..','static'))

app.listen(PORT, () => console.log('Node server listening on Port '+ PORT));

module.exports = app