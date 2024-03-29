/**
 * This is a collection of methods plugging holes that irritate me in
 * JavaScript. Attribution is made wherever possible.
 *
 * This file plugs holes in the Array object.
 *
 * Compiled by Kamil "Brego" Dzieliński 2011 <brego.dk@gmail.com>
 *
 * VERSION: 0.6
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