'use strict';

var modelFactory = require("./ModelFactory");
var _ = require("lodash");

var servers = [];
var playerPool = [];

function createWorld() {
	var world = modelFactory.newWorld();
	servers.push(world);
	return world.id;
};

function playerCount() {
	return playerPool.length;	
}

function addPlayer(player) {
	player.world = getBalancedServer().id;
	playerPool.push(player);
}

function removePlayer(player) {
	playerPool = _.reject(playerPool, 'socket', player.socket);
}

function getBalancedServer() {
	return servers[0];
}

module.exports = {
	createWorld: createWorld,
	playerCount: playerCount,
	addPlayer: addPlayer,
	removePlayer: removePlayer
};