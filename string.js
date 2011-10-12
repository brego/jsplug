/**
 * This is a collection of methods plugging holes that irritate me in
 * JavaScript. Attribution is made wherever possible.
 *
 * This file plugs holes in the String object.
 *
 * Compiled by Kamil "Brego" Dzieliński 2011 <brego.dk@gmail.com>
 *
 * VERSION: 0.6
 */

// Add ECMA262-5 string trim if not supported natively
// Originaly taken from http://stackoverflow.com/questions/2790001/fixing-javascript-array-functions-in-internet-explorer-indexof-foreach-etc/2790686#2790686
// New RegEx taken from http://blog.stevenlevithan.com/archives/faster-trim-javascript
if (!('trim' in String.prototype)) {
	String.prototype.trim = function() {
		return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	}
}