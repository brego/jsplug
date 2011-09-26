$(function() {
	module('RegExp');

	test('escape', function() {
		expect(1);

		ok(RegExp.prototype.escape, "RegExp.escape");
	});
});