'use strict';

var Player = require('../model/Player');
var World = require('../model/World');

function newPlayer(world) {
	return new Player(world);
};

function newWorld() {
	return new World();
}

module.exports = {
	newPlayer: newPlayer,
	newWorld: newWorld
}