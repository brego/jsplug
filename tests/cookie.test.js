$(function(){

	module('Cookie');

	test('createCookie', function() {
		expect(2);
		
		ok(window.createCookie, "window.createCookie");
		createCookie('test_name', 'test_val', 10)
		equal(document.cookie, "test_name=test_val", "createCookie('test_name', 'test_val', 10)");
		document.cookie = "";
	});
	
	test('readCookie', function() {
		expect(2);
		
		var date = new Date();
		date.setTime(date.getTime() + (10*24*60*60*1000));
		var expires = "; expires=" + date.toUTCString();
		
		ok(window.readCookie, "window.readCookie");
		document.cookie = "test_name=test_val" + expires + "; path=/";
		equal(readCookie('test_name'), "test_val", "readCookie('test_name')");
		document.cookie = "";
	});
	
	test('eraseCookie', function() {
		expect(2);

		var date = new Date();
		date.setTime(date.getTime() + (10*24*60*60*1000));
		var expires = "; expires=" + date.toUTCString();
		document.cookie = "test_name=test_val" + expires + "; path=/";

		ok(window.eraseCookie, "window.eraseCookie");
		eraseCookie('test_name');
		equal(document.cookie, '', "eraseCookie('test_name')");
		document.cookie = "";
	});

});
