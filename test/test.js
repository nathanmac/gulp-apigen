'use strict';

var gulpapigen = require('../'),
    should     = require('should');

require('mocha');

describe('gulp-apigen', function() {

		it('should not error if no parameters passed', function(done) {

			// Arrange
			var caughtErr;

			// Act
			try {
				gulpapigen();
			} catch (err) {
				caughtErr = err;
			}
			// Assert
			should.not.exist(caughtErr);
			//caughtErr.message.indexOf('required').should.be.above(-1);
			done();
		});

		it('should throw error if object passed as first parameter', function(done) {

			// arrange
			var caughtErr;

			// act
			try {
				gulpapigen({debug: true});
			} catch (err) {
				caughtErr = err;
			}

			// assert
			should.exist(caughtErr);

			done();

		});

});