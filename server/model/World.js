'use strict';
var _ = require('lodash');
var config = require("../config");

var World = function() {
	this.id = Math.random().toString(36).substring(7);
	this.name = null;
	this.cities = [];
	this.mapFile = "";
	this.drugs = [];
};

module.exports = World;