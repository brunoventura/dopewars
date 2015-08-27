'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var BackpackItemSchema = new Schema({
	drug: [{type: ObjectId, ref: 'Drug'}],
	avgPrice: [{type: Number, default: 0}],
	quantity: [{type: Number, default: 0}]
});

module.exports = mongoose.model("BackpackItem", BackpackItemSchema);