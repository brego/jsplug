/**
 * This is a collection of methods plugging holes that irritate me in
 * JavaScript. Attribution is made wherever possible.
 *
 * This is a combined file, containing all plugs.
 *
 * Compiled by Kamil "Brego" Dzieliński 2011 <brego.dk@gmail.com>
 *
 * VERSION: 0.7
 */

// Add ECMA262-5 Array methods if not supported natively
// Taken from http://stackoverflow.com/questions/2790001/fixing-javascript-array-functions-in-internet-explorer-indexof-foreach-etc/2790686#2790686
if (!('indexOf' in Array.prototype)) {
	Array.prototype.indexOf = function(find, i /*opt*/) {
		if (i === undefined) i = 0;
		if (i < 0) i += this.length;
		if (i < 0) i  = 0;
		for (var n = this.length; i < n; i++)
			if (i in this && this[i] === find)
				return i;
		return -1;
	};
}

// Taken from http://stackoverflow.com/questions/2790001/fixing-javascript-array-functions-in-internet-explorer-indexof-foreach-etc/2790686#2790686
if (!('lastIndexOf' in Array.prototype)) {
	Array.prototype.lastIndexOf = function(find, i /*opt*/) {
		if (i === undefined) i = this.length-1;
		if (i < 0) i += this.length;
		if (i > this.length - 1) i = this.length - 1;
		for (i++; i-->0;) /* i++ because from-argument is sadly inclusive */
			if (i in this && this[i] === find)
				return i;
		return -1;
	};
}

// Taken from http://stackoverflow.com/questions/2790001/fixing-javascript-array-functions-in-internet-explorer-indexof-foreach-etc/2790686#2790686
if (!('forEach' in Array.prototype)) {
	Array.prototype.forEach = function(action, that /*opt*/) {
		for (var i = 0, n = this.length; i < n; i++)
			if (i in this)
				action.call(that, this[i], i, this);
	};
}

// Taken from http://stackoverflow.com/questions/2790001/fixing-javascript-array-functions-in-internet-explorer-indexof-foreach-etc/2790686#2790686
if (!('map' in Array.prototype)) {
	Array.prototype.map = function(mapper, that /*opt*/) {
		var other = new Array(this.length);
		for (var i = 0, n = this.length; i < n; i++)
		if (i in this)
			other[i] = mapper.call(that, this[i], i, this);
		return other;
	};
}

// Taken from http://stackoverflow.com/questions/2790001/fixing-javascript-array-functions-in-internet-explorer-indexof-foreach-etc/2790686#2790686
if (!('filter' in Array.prototype)) {
	Array.prototype.filter = function(filter, that /*opt*/) {
		var other = [], v;
		for (var i = 0, n = this.length; i < n; i++)
			if (i in this && filter.call(that, v = this[i], i, this))
				other.push(v);
		return other;
	};
}

// Taken from http://stackoverflow.com/questions/2790001/fixing-javascript-array-functions-in-internet-explorer-indexof-foreach-etc/2790686#2790686
if (!('every' in Array.prototype)) {
	Array.prototype.every = function(tester, that /*opt*/) {
		for (var i = 0, n = this.length; i < n; i++)
			if (i in this && !tester.call(that, this[i], i, this))
				return false;
		return true;
	};
}

// Taken from http://stackoverflow.com/questions/2790001/fixing-javascript-array-functions-in-internet-explorer-indexof-foreach-etc/2790686#2790686
if (!('some' in Array.prototype)) {
	Array.prototype.some = function(tester, that /*opt*/) {
		for (var i = 0, n = this.length; i < n; i++)
			if (i in this && tester.call(that, this[i], i, this))
				return true;
		return false;
	};
}

// Taken from http://ejohn.org/blog/fast-javascript-maxmin/
if (!('max' in Array.prototype)) {
	Array.prototype.max = function(){
		return Math.max.apply(Math, this);
	};
}

// Taken from http://ejohn.org/blog/fast-javascript-maxmin/
if (!('min' in Array.prototype)) {
	Array.prototype.min = function(){
		return Math.min.apply(Math, this);
	};
}

// Methods taken from http://www.quirksmode.org/js/cookies.html
if (typeof(Cookie) !== 'object') {
	(function(window, undefined) {
		var Cookie = {
			set: function(name, value, days) {
				if (days) {
					var date = new Date();
					date.setTime(date.getTime() + (days*24*60*60*1000));
					var expires = "; expires=" + date.toUTCString();
				} else {
					var expires = "";
				}
				document.cookie = name + "=" + value + expires + "; path=/";
			},
			get: function(name) {
				var nameEQ = name + "=",
					ca     = document.cookie.split(';');
				for (var i = 0; i < ca.length; i++) {
					var c = ca[i];
					while (c.charAt(0)==' ') {
						c = c.substring(1, c.length);
					}
					if (c.indexOf(nameEQ) == 0) {
						return c.substring(nameEQ.length, c.length);
					}
				}
				return null;
			},
			delete: function(name) {
				this.set(name, "", -1);
			}
		}
		window.Cookie = Cookie;
	})(window);
}

// Set date from an ISO8601 string
// Taken from http://delete.me.uk/2005/03/iso8601.html by Paul Sowden
if (!('setISO' in Date.prototype)) {
	Date.prototype.setISO = function (string) {
		var regexp = "([0-9]{4})(-([0-9]{2})(-([0-9]{2})"
				+ "(T([0-9]{2}):([0-9]{2})(:([0-9]{2})(\.([0-9]+))?)?"
				+ "(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?",
			d      = string.match(new RegExp(regexp)),
			offset = 0,
			date   = new Date(d[1], 0, 1),
			time   = null;

		if (d[3])  { date.setMonth(d[3] - 1); }
		if (d[5])  { date.setDate(d[5]); }
		if (d[7])  { date.setHours(d[7]); }
		if (d[8])  { date.setMinutes(d[8]); }
		if (d[10]) { date.setSeconds(d[10]); }
		if (d[12]) { date.setMilliseconds(Number("0." + d[12]) * 1000); }
		if (d[14]) {
			offset  = (Number(d[16]) * 60) + Number(d[17]);
			offset *= ((d[15] == '-') ? 1 : -1);
		}

		offset -= date.getTimezoneOffset();
		time    = (Number(date) + (offset * 60 * 1000));
		this.setTime(Number(time));
	}
}

// Get an ISO8601 string-representation from the date object
// Taken from https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date#Example:_ISO_8601_formatted_dates
if (!('getISO' in Date.prototype)) {
	Date.prototype.getISO = function() {
		function pad(n) { return n < 10 ? '0' + n : n; }

		return this.getUTCFullYear() + '-'
			+ pad(this.getUTCMonth() + 1) + '-'
			+ pad(this.getUTCDate()) + 'T'
			+ pad(this.getUTCHours()) + ':'
			+ pad(this.getUTCMinutes()) + ':'
			+ pad(this.getUTCSeconds()) + 'Z';
	}
}

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

// Taken from http://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/
// Object.toType(var)
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

// Taken from http://javascriptweblog.wordpress.com/2011/02/28/javascript-object-keys-finally/
// Object.keys(object)
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

// This escapes a string for use in a regular expression
// Taken from http://80.68.89.23/2006/Jan/20/escape/ by Simon Willison
if (!('escape' in RegExp.prototype)) {
	RegExp.prototype.escape = function(text) {
    	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
	}
}

// Add ECMA262-5 string trim if not supported natively
// Originaly taken from http://stackoverflow.com/questions/2790001/fixing-javascript-array-functions-in-internet-explorer-indexof-foreach-etc/2790686#2790686
// New RegEx taken from http://blog.stevenlevithan.com/archives/faster-trim-javascript
if (!('trim' in String.prototype)) {
	String.prototype.trim = function() {
		return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	}
}