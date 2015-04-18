var netfileDownload = require('../netfile-download');

var zip = new require('node-zip');


describe('netfileDownload', function() {
	this.timeout(10000);

	it('should get the 2015 file for Sacramento', function(done) {
		netfileDownload('SAC', 2015, function(err, zipBuffer) {
			if(err) return done(err);

			if(isValidZipFile(zipBuffer)) {
				done();
			} else {
				done(new Error('Invalid zip file'));
			}
		});
	});

	it('should get the 2014 file for West Sacramento', function(done) {
		netfileDownload('WESTSAC', 2014, function(err, zipBuffer) {
			if(err) return done(err);

			if(isValidZipFile(zipBuffer)) {
				done();
			} else {
				done(new Error('Invalid zip file'));
			}
		});
	});

	it('should get the 2013 file for San Franscisco', function(done) {
		netfileDownload('SFO', 2013, function(err, zipBuffer) {
			if(err) return done(err);

			if(isValidZipFile(zipBuffer)) {
				done();
			} else {
				done(new Error('Invalid zip file'));
			}
		});
	});
});


function isValidZipFile(buffer) {
	try {
		var archive = zip(buffer, {base64: false, checkCRC32: true});
	} catch(e) {
		return false;
	}
	

	return Object.keys(archive.files).length === 1;
}
