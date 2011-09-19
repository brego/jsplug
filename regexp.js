/**
 * This is a collection of methods plugging holes that irritate me in
 * JavaScript. Attribution is made wherever possible.
 *
 * This file plugs holes in the RegExp object.
 *
 * Compiled by Kamil "Brego" Dzieliński 2011 <brego.dk@gmail.com>
 *
 * VERSION: 0.2
 */

// This escapes a string for use in a regular expression
// Taken from http://80.68.89.23/2006/Jan/20/escape/ by Simon Willison
if (!('escape' in RegExp.prototype)) {
	RegExp.prototype.escape = function(text) {
    	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
	}
}