/**
 * This is a collection of methods plugging holes that irritate me in
 * JavaScript. Attribution is made wherever possible.
 *
 * This file plugs holes in the Object object (sic!)
 *
 * Compiled by Kamil "Brego" Dzieliński 2011 <brego.dk@gmail.com>
 *
 * VERSION: 0.6
 */

// Taken from http://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/
if (typeof Object.toType != 'function') {
	Object.toType = (function toType(global) {
		return function(obj) {
			if (obj === global) {
				return "global";
			}
			return ({}).toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
		}
	})(this);
}

//Taken from http://javascriptweblog.wordpress.com/2011/02/28/javascript-object-keys-finally/
if (typeof Object.keys != 'function') {
	Object.keys = function(object) {
		if (typeof obj != "object" && typeof object != "function" || object == null) {
			throw TypeError("Object.keys called on non-object");
		}
		var keys = [];
		for (var property in object) object.hasOwnProperty(property) && keys.push(property);
		return keys;
	}
}