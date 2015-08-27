'use strict';

var InvisibleHand = function() {};

InvisibleHand.prototype = {

	calcFloatCoefficient: function(floatValue) {
		return Math.random() * ((1+floatValue) - (1-floatValue)) + (1-floatValue);
	}

}

module.exports = InvisibleHand;