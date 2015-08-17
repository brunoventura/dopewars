'use strict';
var morgan = require("morgan");
var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");
var mongoose = require("mongoose");
var express = require("express");
var path = require('path');
var http = require('http');

//Models
var User = require('./model/user');

//Controllers
var auth = require('./controllers/auth');
var project = require('./controllers/project');
var lang = require('./controllers/lang');

var app = express();
var server = http.createServer(app);

var port = 9000;
var root = path.normalize(__dirname + '/../')


/*mongoose.connect('mongodb://localhost:27017/translate');*/

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev", {
	skip: function (req, res) {
		return req.baseUrl.indexOf('/api') == -1;
	}
}));

app.use(function(req, res, next) {
res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

process.on('uncaughtException', function(err) {
	console.log(err);
});

app.set('appPath', 'client');
app.use(express.static(path.join(root, '.tmp')));
app.use(express.static(path.join(root, 'client')));

project.use('/:id/lang', lang);
app.use('/api/project', project);
/*app.use('/api', auth);*/

app.all('*', function(req, res) {
  res.sendFile(app.get('appPath') + '/index.html', {root : root});
});

server.listen(port, 'localhost', function() {
	console.log("Listening on " + port);
});