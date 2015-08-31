'use strict';

var config = require("../config");

var Player = function(socket){
	this.name = "";
	this.world = null;
	this.socket = socket;
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

	getLeanObject: function() {
		var obj = {
			name: this.name,
			money: this.money,
			world: this.world
		}

		return obj;
	}
}

module.exports = Player;