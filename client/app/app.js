var Config = {
	starterMoney: 2000,
	starterSlots: 50,
	mapFolder: './assets/maps/',
	calcFloatCoefficient: function(floatValue) {
		return Math.random() * ((1+floatValue) - (1-floatValue)) + (1-floatValue);
	}
};

var Backpack = function(slots) {
	this.totalSlots = slots;
	this.slots = slots;
	this.items = {};
}

Backpack.prototype = {
	addDrug: function(drugName, price, quantity) {
		if (this.freeSlots() < quantity) return false;

		if (!this.items[drugName]) this.items[drugName] = {quantity: 0, price: 0};

		var item = this.items[drugName];
		var totalQuantity = item.quantity + quantity;
		item.price = ((item.quantity * item.price) + (quantity * price)) / totalQuantity;
		item.quantity = totalQuantity;
		this.slots = this.freeSlots();
		return true;
	},

	removeDrug: function(drugName, quantity) {
		var index = _.findIndex(this.list, "drug", drugName);
		if (index < 0) return false;

		this.slots = this.freeSlots();
	},

	freeSlots: function() {
		var totalUsed = 0
		_.mapValues(this.items, function(n) {totalUsed += n.quantity})
		return this.totalSlots - totalUsed;
	}

}

var Player = function(name, world){
	this.name = name;
	this.world = world;
	this.backpack = new Backpack(Config.starterSlots);

	this.money = Config.starterMoney;
	this.city = world.randomCity();
	
};

Player.prototype = {

	travel: function(destiny) {
		if (!this.world.hasCity(destiny) || this.city === destiny) return false;
		
		this.city = destiny;
		return true;
	},

	buyDrugs: function(drugName, quantity, price) {
		if (quantity * price > money) return false;

		this.backpack.addDrug(drugName, quantity, price);
	}
}


var City = function(name, drugList, dangerousness, drugRandomness, copRandomness){
	this.name = name;
	this.backpack = new Backpack(300);
	this.drugList = drugList;

	this.generateDrugValues(this.drugList);
};

City.prototype = {

	generateDrugValues: function(drugList) {
		while (this.backpack.slots) {
			var drug = _.sample(drugList);
			this.backpack.addDrug(drug.name, drug.price(), 1);
		}
	}
}

var Drug = function(name, basePrice, priceFloat, outbreakChance){
	this.name = name;
	this.basePrice = basePrice;
	this.priceFloat = priceFloat;
};

Drug.prototype = {

	price: function() {
		var floatCoeficient = Config.calcFloatCoefficient(this.priceFloat);
		return this.basePrice * floatCoeficient;
	}

};

var Board = function(name, cities, mapFile, drugs) {
	this.id = Math.random().toString(36).substring(7);
	this.name = name;
	this.cities = cities;
	this.mapFile = mapFile;
	this.drugs = drugs;

	this.drawBoard();
}

Board.prototype = {

	drawBoard: function() {
		var mapPath = Config.mapFolder + this.mapFile;
		var objSvg = document.createElement("object");
		objSvg.setAttribute("type", "image/svg+xml")
		objSvg.setAttribute("data", mapPath);
		objSvg.onload = function() {
			console.log($("svg", this.contentDocument), mapPath);
		}

		$("body > .container").append(objSvg);
	},

	hasCity: function(cityName) {
		return !!_.find(this.cities, "name", cityName);
	},

	randomCity: function() {
		return _.sample(this.cities).name;
	}

}

var newYorkCityBoard = function() {
	var name = "New York City";
	var drugs = [
		new Drug("Crack", 2, 0.2),
		new Drug("Marijuana", 4, 0,5)
	];
	var cities = [
		new City("The Bronx", drugs),
		new City("Manhattan", drugs),
		new City("Brooklyn", drugs)		
	];

	var mapFile = "nyc.svg";

	return new Board(name, cities, mapFile, drugs);
};


var world1 = newYorkCityBoard();

var player = new Player("ventura", world1);
