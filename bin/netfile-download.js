#!/usr/bin/env node

var program = require('commander');

var netfileDownload = require('../netfile-download');

var fs = require('fs');


program
	.version(require('../package').version)
	.usage('[options] <aid>')
	.option('-y, --year <year>', 'Select year to download file for, defaults to current year', new Date().getFullYear())
	.option('-o, --output <file>', 'Output to file, defaults to stdout')
	.parse(process.argv);

if(program.args.length === 0) {
	console.error('aid required');
	console.error('Find the aid code for your city by going to their Netfile portal and looking at the url');

	process.exit(1);
}

var aid = program.args[0];

netfileDownload(aid, program.year, function(err, zipBuffer) {
	if(err) throw err;

	if(program.output) {
		fs.writeFileSync(program.output, zipBuffer);
	} else {
		process.stdout.write(zipBuffer);
	}
});
