/*Dependencies.*/
var should = require("chai").should();
var db = require('../../models/db');
describe('Test the database primary functions.', function() {
	describe('#Load', function() {
		it('It should be a number of items.', function(done) {
			db.loadDB(function(err, nbItems) {
				nbItems.should.be.a('number').and.be.at.least(0);
				done();
			});
		});
	});
});
