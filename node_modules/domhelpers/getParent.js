'use strict';

var getClosest = require('./getClosest');

module.exports = function(el, selector){
	return getClosest(el.parentNode, selector);
};
