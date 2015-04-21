# netfile-download

Downloads a zip file from a Netfile campaign finance disclosure portal. This will retrieve a zip file containing financial disclosure data for the year requested.

## Install

    npm install netfile-download

## Example

```javascript
var netfileDownload = require('netfile-download');

// Pass in aid, year, callback
netfileDownload('WESTSAC', '2014', function(err, zipBuffer) {
	// err is present if there was a problem getting requested file

	// zipBuffer is now a Buffer object containing the contents of the file
});
```

## CLI

This module can also be installed globally.

    npm install -g netfile-download

And used as a command line tool.

    netfile-download -y 2014 -o outputfile.zip <aid>

Not setting the `-y` option uses the current year.

    netfile-download -o outputfile_sac.zip SAC

Calling without setting an `-o` option will result in the file contents being written to stdout.

    netfile-download SAC | unzip
