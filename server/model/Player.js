'use strict';

var config = require("../config");

var Player = function(world){
	this.name = "";
	this.world = world;
	//this.backpack = new Backpack(Config.starterSlots);

	this.money = config.STARTER_MONEY;
	//this.city = world.randomCity();
	
};

Player.prototype = {

	travel: function(destiny) {
		if (!this.world.hasCity(destiny) || this.city === destiny) return false;
		
		this.city = destiny;
		return true;
	},

	/*buyDrugs: function(drugName, quantity, price) {
		if (quantity * price > money) return false;

		this.backpack.addDrug(drugName, quantity, price);
	}*/
}

module.exports = Player;