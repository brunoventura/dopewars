var Config = {
	starterMoney: 2000,
	starterSlots: 50,
	calcFloatCoefficient: function(floatValue) {
		return Math.random() * ((1+floatValue) - (1-floatValue)) + (1-floatValue);
	}
};

var Backpack = function(slots) {
	this.slots = slots;
	this.list = [];
}

Backpack.prototype = {
	addDrug: function(drugName, price, quantity) {
		var index = _.findIndex(this.list, "drug", drugName);

		if (freeSlots < quantity) return false;

		if (index < 0) {
			this.list.push({
				drug: drugName, 
				price: price, 
				quantity: quantity
			});
			return true;
		}

		var item = this.list[index];
		var totalQuantity = item.quantity + quantity;
		item.price = ((item.quantity * item.price) + (quantity * price)) / totalQuantity;
		item.quantity = totalQuantity;
		return true;
	},

	removeDrug: function(drugName, quantity) {
		var index = _.findIndex(this.list, "drug", drugName);
		if (index < 0) return false;

	},

	freeSlots: function() {
		return _.reduce(this.list, function(total, item) {
			return total + item.quantity;
		});
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


var City = function(name, dangerousness, drugRandomness, copRandomness){
	this.name = name;
	this.backpack = new Backpack(300);

	var _init = function() {
		this.generateDrugValues();
	};

	_init();
};

City.prototype = {

	generateDrugValues: function(drugList) {
		for (var i = 0; i < this.backpack.slots; i++) {
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


var World = function() {
	this.id = Math.random().toString(36).substring(7);
	this.cities = [];
	this.drugs = [];
};

World.prototype = {

	hasCity: function(cityName) {
		return !!_.find(this.cities, "name", cityName);
	},

	randomCity: function() {
		return _.sample(this.cities).name;
	}

};

var world1 = new World();

world1.cities.push(new City("The Bronx"));
world1.cities.push(new City("Manhattan"));
world1.cities.push(new City("Brooklyn"));
world1.drugs.push(new Drug("Crack", 2, 0.2));

var player = new Player("ventura", world1);

console.log(player);