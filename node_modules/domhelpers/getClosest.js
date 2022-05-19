'use strict';

module.exports = function(el, selector){
	var matches = document.querySelectorAll(selector);
	var index;
	while (el){
		index = Array.prototype.indexOf.call(matches, el);
		if (index !== -1) return matches[index];
		el = el.parentNode;
	}
};
