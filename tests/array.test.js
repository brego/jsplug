$(function() {
	module('Array');
	
	var array = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5];

	test('indexOf', function() {
		expect(3);

		ok(Array.prototype.indexOf,   "Array.indexOf");
		equal(array.indexOf(1), 0,    "array.indexOf(1)");
		equal(array.indexOf(1, 4), 5, "array.indexOf(1, 4)");
	});

	test('lastIndexOf', function() {
		expect(3);
		
		ok(Array.prototype.lastIndexOf,   "Array.indexOf()");
		equal(array.lastIndexOf(1), 5,    "array.lastIndexOf(1)");
		equal(array.lastIndexOf(1, 4), 0, "array.lastIndexOf(1, 4)");
	});
	
	
	test('max', function() {
		expect(2);
		
		var test_array = [1, 2, 3, 50, 2, 74];
		
		ok(Array.prototype.max,   "Array.max()");
		equal(test_array.max(), 74, "test_array.max()");
	});
	
	test('min', function() {
		expect(2);
		
		var test_array = [1, 2, 3, 50, 2, 74];
		
		ok(Array.prototype.min,   "Array.min()");
		equal(test_array.min(), 1, "test_array.min()");
	});
	
});