/**
 * This is a collection of methods plugging holes that irritate me in
 * JavaScript. Attribution is made wherever possible.
 *
 * This file plugs holes in the Function object.
 *
 * Compiled by Kamil "Brego" Dzieliński 2011 <brego.dk@gmail.com>
 *
 * VERSION: 0.6
 */

// Taken from http://stackoverflow.com/questions/2790001/fixing-javascript-array-functions-in-internet-explorer-indexof-foreach-etc/2790686#2790686
if (!('bind' in Function.prototype)) {
	Function.prototype.bind = function(owner) {
		var that = this;
		if (arguments.length <= 1) {
			return function() {
				return that.apply(owner, arguments);
			}
		} else {
			var args = Array.prototype.slice.call(arguments, 1);
			return function() {
				return that.apply(owner, arguments.length === 0 ? args : args.concat(Array.prototype.slice.call(arguments)));
			}
		}
	}
}