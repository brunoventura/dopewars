(function(){
	var socket = io.connect('http://localhost:9000');

	socket.on('connected', function (data, test) {
		console.log(data, test);
	});

	socket.emit("travel", function(data, test) {
			console.log(data);
	});

	socket.emit("test", function(data, test) {
			console.log(data);
	});

	socket.on('serverUpdate', function (data) {
		console.log(data);
	})

}());



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


var City = function(id, name, drugList, dangerousness, drugRandomness, copRandomness){
	this.id = id;
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

var Board = function(name, cities, mapFile, drugs, drawBoard) {
	this.id = Math.random().toString(36).substring(7);
	this.name = name;
	this.cities = cities;
	this.mapFile = mapFile;
	this.drugs = drugs;
	this.drawBoard = drawBoard;
}

Board.prototype = {

	hasCity: function(cityId) {
		return !!_.find(this.cities, "id", cityId);
	},

	getCity: function(cityId) {
		return _.find(this.cities, "id", cityId);	
	},

	randomCity: function() {
		return _.sample(this.cities).id;
	}

}

var newYorkCityBoard = function() {
	var name = "New York City";
	var drugs = [
		new Drug("Crack", 2, 0.2),
		new Drug("Marijuana", 4, 0,5)
	];
	var cities = [
		new City("The_Bronx", "The Bronx", drugs),
		new City("Manhattan", "Manhattan", drugs),
		new City("Brooklyn", "Brooklyn", drugs),
		new City("Queens", "Queens", drugs),
		new City("Straten_Island", "Straten Island", drugs)		
	];

	var mapFile = "nyc.svg";

	var drawBoard = function() {
		var mapPath = Config.mapFolder + this.mapFile;
		var that = this;
		var objSvg = document.createElement("object");
		objSvg.setAttribute("class", "map");
		objSvg.setAttribute("type", "image/svg+xml")
		objSvg.setAttribute("data", mapPath);
		objSvg.onload = function() {
			$(".city-tooltip").removeClass("hide");

			this.contentDocument.addEventListener("mousedown", function(evt){
				if (_.find(that.cities, { 'id': evt.target.parentElement.id})) {
					player.travel(evt.target.parentElement.id);
				}
			}, false);
			this.contentDocument.addEventListener("mouseover", function(evt){
				var city = _.find(that.cities, { 'id': evt.target.parentElement.id});
				if (city) {
					$(".city-tooltip")[0].innerText = city.name;
				}
			}, false);
		}

		$("#map-container .map-box").append(objSvg);
	};

	return new Board(name, cities, mapFile, drugs, drawBoard);
};

var Interface = function(board, player) {
	this.board = board;
	this.player = player;
};

Interface.prototype = {

	

};


var world1 = newYorkCityBoard();
world1.drawBoard();

var player = new Player("ventura", world1);

watch(player, "city", function(){
	console.log("here");
    $("#city span")[0].innerText = world1.getCity(player.city).name;
});
callWatchers(player, "city");