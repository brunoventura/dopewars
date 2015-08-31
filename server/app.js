'use strict';

var express = require("express");
var http = require("http");
var path = require("path");
var eventHandler = require("./common/EventHandler");

var app = express();
var server = http.createServer(app);

var port = 9000;
var root = path.normalize(__dirname + '/../')

/*process.on('uncaughtException', function(err) {
	console.log(err);
});*/

eventHandler.connect(server);
app.set('appPath', 'client');
app.use(express.static(path.join(root, '.tmp')));
app.use(express.static(path.join(root, 'client')));
app.all('*', function(req, res) {
  res.sendFile(app.get('appPath') + '/index.html', {root : root});
});

server.listen(port, 'localhost', function() {
	console.log("Listening on " + port);
});