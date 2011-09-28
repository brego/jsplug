/**
 * This is a collection of methods plugging holes that irritate me in
 * JavaScript. Attribution is made wherever possible.
 *
 * This file plugs holes in the cookie handling.
 *
 * Compiled by Kamil "Brego" Dzieliński 2011 <brego.dk@gmail.com>
 *
 * VERSION: 0.6
 */

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