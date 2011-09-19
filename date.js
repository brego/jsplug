/**
 * This is a collection of methods plugging holes that irritate me in
 * JavaScript. Attribution is made wherever possible.
 *
 * This file plugs holes in the Date object.
 *
 * Compiled by Kamil "Brego" Dzieliński 2011 <brego.dk@gmail.com>
 *
 * VERSION: 0.3
 */

// Set date from an ISO8601 string
// Taken from http://delete.me.uk/2005/03/iso8601.html by Paul Sowden
if (!('setISO' in Date.prototype)) {
	Date.prototype.setISO = function (string) {
		var regexp = "([0-9]{4})(-([0-9]{2})(-([0-9]{2})"
				+ "(T([0-9]{2}):([0-9]{2})(:([0-9]{2})(\.([0-9]+))?)?"
				+ "(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?",
			d      = string.match(new RegExp(regexp)),
			offset = 0,
			date   = new Date(d[1], 0, 1);

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