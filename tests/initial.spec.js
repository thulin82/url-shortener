var it = require('mocha').it;
var expect = require('chai').expect;
// eslint-disable-next-line no-unused-vars
var should = require('chai').should();

it('should return true', function() {
    var isValid = true;
    expect(isValid).to.be.true;
});
it('should return false', function() {
    var isValid = false;
    isValid.should.equal(false);
});
