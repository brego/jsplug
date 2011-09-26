$(function() {
	module('Date');

	test('setISO', function() {
		expect(2);
		ok(Date.prototype.setISO, "Date.setISO");

		var date = new Date;
		date.setISO('2008-03-01T13:00:00Z');

		equal(date.getTime(), 1204376400000, "2008-03-01T13:00:00Z = 1204376400000");
	});

	test('getISO', function() {
		expect(2);
		ok(Date.prototype.getISO, "Date.getISO");

		var date = new Date(1204376400000);

		equal(date.getISO(), '2008-03-01T13:00:00Z', "2008-03-01T13:00:00Z = 1204376400000");
	});
});