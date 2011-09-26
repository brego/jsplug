$(function() {
	module('Function');

	test('bind', function() {
		expect(1);

		ok(Function.prototype.bind, "Function.bind");
	});
});