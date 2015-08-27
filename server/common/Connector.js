'use strict';

var modelFactory = require("./ModelFactory");

var Connector = function() {
	this.io = null;
	this.playerCount = 0;
	this.world = null;
};

//Public Api
Connector.prototype.connect = function(server) {
	this.io = require("socket.io")(server);
	setUpServer();
	connectionListner();
};

Connector.prototype.serverUpdate = function(server) {
	var response =  {
		playerCount: this.playerCount,
		globalEvents: []
	};

	this.io.emit('serverUpdate', response);
}

//Private Api
function setUpServer () {
	self.world = modelFactory.newWorld();
};

function connectionListner () {
	var io = self.io;
	io.on("connection", function (socket) {
		self.playerCount++;
		console.log(self.playerCount);
		socket.emit('connected' , playerConnectResponse());
		self.serverUpdate();
		socket.on('disconnect', playerDisconnectCallback);
		socket
	});
};

function playerConnectResponse () {
	var player = modelFactory.newPlayer(self.world);
	return player;
};

function playerDisconnectCallback () {
	self.playerCount--;
	console.log(self.playerCount);
	self.serverUpdate();
};

var self = module.exports = new Connector();