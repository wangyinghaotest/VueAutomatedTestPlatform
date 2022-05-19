'use strict';

var fillIn = require('mout/object/fillIn');
var indexOf = require('mout/array/indexOf');

/**
 * Create a new Sortable
 *
 * @param {Element} el
 * @param {Object} options
 *
 * @return {Sortable}
 */
var Sortable = function(el, options) {
	if (!(this instanceof Sortable)) {
		return new Sortable(el, options);
	}

	this.el = el;
	this.options = fillIn(options || {}, Sortable.defaults);
	this._build();
	this._setEvents();
};

/**
 * Default options
 */
Sortable.defaults = {
	handle: '',
	placeholderClass: 'sortable-placeholder'
};

/**
 * Build required elements
 */
Sortable.prototype._build = function() {
	var placeholder = document.createElement('li');
	placeholder.classList.add(this.options.placeholderClass);
	this.placeholder = placeholder;
};

/**
 * Set required events
 */
Sortable.prototype._setEvents = function() {
	var self = this;
	var allowDrag = false;

	/**
	 * Use mousedown to check if handle is being pressed
	 */
	self.el.addEventListener('mousedown', function(e) {
		if (!self.options.handle) allowDrag = true;

		if (self.options.handle && e.target.matches(self.options.handle)) {
			allowDrag = true;
		}
	});

	/**
	 * Start dragging an element in the sortable
	 */
	self.el.addEventListener('dragstart', function(e) {
		if (!allowDrag) {
			e.preventDefault();
			return;
		}

		e.stopPropagation();

		allowDrag = false;
		self.dragging = true;
		self.dragEl = e.target;

		// needed for drag to work in FF
		e.dataTransfer.setData('text', '');

		// delay needed cause the dragImage won't be created properly otherwise
		setTimeout(function() {
			var rect = e.target.getBoundingClientRect();
			self.placeholder.style.height = (rect.bottom - rect.top) + 'px';
			self.el.insertBefore(self.placeholder, e.target);
			e.target.style.display = 'none';
		}, 1);
	});

	/**
	 * This fires when the order potentially changes
	 */
	self.el.addEventListener('dragenter', function(e) {
		if (!self.dragging || e.target === self.placeholder) return;

		e.stopPropagation();

		var item = self.getItem(e.target);
		if (!item) return;

		var placeholderIndex = indexOf(self.el.children, self.placeholder);
		var itemIndex = indexOf(self.el.children, item);

		var before = placeholderIndex === -1 || placeholderIndex > itemIndex;
		self.el.insertBefore(self.placeholder, before ? item : item.nextSibling);
	});

	/**
	 * Dragend should be attached to the body in case it happens outside the element
	 */
	document.body.addEventListener('dragend', function(e) {
		if (!self.dragging) return;

		e.stopPropagation();

		self.dragging = false;
		self.el.insertBefore(self.dragEl, self.placeholder);
		self.dragEl.style.display = 'block';
		self.el.removeChild(self.placeholder);
		self.placeholder.style.height = '';
	});
};

/**
 * Get the item which is being dragged, relative to given element
 *
 * @param {Element} el
 */
Sortable.prototype.getItem = function(el) {
	var children = this.el.children;
	var index;

	while (el.parentNode) {
		index = indexOf(children, el);
		if (index !== -1 && el !== this.placeholder) {
			return el;
		}
		el = el.parentNode;
	}
};

module.exports = Sortable;
