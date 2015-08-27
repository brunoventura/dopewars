'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var DrugSchema = new Schema({
	name: String,
	basePrice: [{type: Number}],
	priceFloat: [{type: Number, default: 0.2}]
	outbreakChance: [{type: Number, default: 0.1}]
});

module.exports = mongoose.model('Drug', DrugSchema);