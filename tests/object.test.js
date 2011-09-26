$(function() {
	module('Object');

	test('toType', function() {
		expect(10);

		ok(Object.toType, "Object.toType");
		equal(Object.toType(1),             'number');
		equal(Object.toType('string'),      'string');
		equal(Object.toType(/a-z/),         'regexp');
		equal(Object.toType(new Date),      'date');
		equal(Object.toType(new Array),     'array');
		equal(Object.toType([]),            'array');
		equal(Object.toType({}),            'object');
		equal(Object.toType(function() {}), 'function');
		equal(Object.toType(undefined),     'undefined');
	});
	
	test('keys', function() {
		expect(2);
		
		ok(Object.keys, 'Object.keys');
		deepEqual(Object.keys({a: 1, b: 2, c: 3}), ["a", "b", "c"]);
	});
});