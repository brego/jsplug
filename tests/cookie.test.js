$(function() {

	module('Cookie');
	
	test('Cookie', function() {
		ok(Cookie, "Cookie");
		ok(window.Cookie, "window.Cookie");
	})
	
	test('Cookie.set', function() {
		expect(2);
		
		ok(Cookie.set, "Cookie.set");
		Cookie.set('test_name', 'test_val', 10)
		equal(document.cookie, "test_name=test_val", "Cookie.set('test_name', 'test_val', 10)");
		document.cookie = "";
	});
	
	test('Cookie.get', function() {
		expect(2);
		
		var date = new Date();
		date.setTime(date.getTime() + (10*24*60*60*1000));
		var expires = "; expires=" + date.toUTCString();
		
		ok(Cookie.get, "Cookie.get");
		document.cookie = "test_name=test_val" + expires + "; path=/";
		equal(Cookie.get('test_name'), "test_val", "Cookie.get('test_name')");
		document.cookie = "";
	});
	
	test('Cookie.delete', function() {
		expect(2);
	
		var date = new Date();
		date.setTime(date.getTime() + (10*24*60*60*1000));
		var expires = "; expires=" + date.toUTCString();
		document.cookie = "test_name=test_val" + expires + "; path=/";
	
		ok(Cookie.delete, "Cookie.delete");
		Cookie.delete('test_name');
		equal(document.cookie, '', "Cookie.delete('test_name')");
		document.cookie = "";
	});
});