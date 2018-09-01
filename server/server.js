const express = require('express');
const app = express();
const path = require('path');
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, "../dist/chat-app")));

require('./routes.js')(app, path);
require('./listen.js')(http);