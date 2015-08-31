'use strict';

var handler = require("socket.io-events");

var modelFactory = require("./ModelFactory");
var worldManager = require("./WorldManager");

var io;

//Public Api
var connect = function(server) {
	io = require("socket.io")(server);
	worldManager.createWorld();
	setupEvents();
	io.on('connection', connectEvent);
};

function connectEvent(socket) {
	var player = modelFactory.newPlayer(socket.id);

	socket.emit('connected', playerConnectResponse());
	socket.on('disconnect', playerDisconnectResponse);

	function playerConnectResponse () {
		worldManager.addPlayer(player);
		return player.getLeanObject();
	};

	function playerDisconnectResponse () {
		worldManager.removePlayer(player);
	};
};

function playerEvents() {
	var playerEvents = handler();
	playerEvents.on('travel', function(socket, data, next) {
		console.log('travel', socket.id);
	});

	return playerEvents;
};

function worldEvents() {
	setInterval(function() {
		console.log("here");
		serverUpdate();
	}, 3000);
}

function setupEvents() {
	//worldEvents();
	io.use(playerEvents());
};

function serverUpdate () {
	var response =  {
		playerCount: worldManager.playerCount(),
	};

	io.emit('serverUpdate', response);
}

module.exports = {
	connect: connect
};