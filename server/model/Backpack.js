'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var BackpackItemSchema = require('./BackpackItem');

var BackpackSchema = new Schema({
	slots: Number,
	items: [BackpackItemSchema]
});

module.exports = mongoose.model('Backpack', BackpackSchema);