'use strict';

var Player = require('../model/Player');
var World = require('../model/World');

function newPlayer(socket) {
	return new Player(socket);
};

function newWorld() {
	return new World();
}

module.exports = {
	newPlayer: newPlayer,
	newWorld: newWorld
}