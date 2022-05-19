'use strict';

module.exports = function(el, selector){
	var matches = document.querySelectorAll(selector);
	var index;
	var parents = [];

	el = el.parentNode;
	while (el){
		index = Array.prototype.indexOf.call(matches, el);
		if (index !== -1) parents.push(matches[index]);
		el = el.parentNode;
	}

	return parents;
};
