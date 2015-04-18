var request = require('request');


var NETFILE_URL_PREFIX = 'http://nf4.netfile.com/pub2/Default.aspx?aid=';


// FRAGILE: This uses some hackery to pretend to be the browser-side ASP.NET code
function netfileDownload(aid, year, cb) {
	var url = NETFILE_URL_PREFIX + aid;

	// Need cookies enabled
	request = request.defaults({jar: true});

	request(url, function(err, response, body) {
		if(err || response.statusCode !== 200) {
			return cb(new Error('Page failed to load'));
		}

		var form = {
			__EVENTTARGET: 'ctl00$phBody$GetExcelAmend',
			__EVENTARGUMENT: '',
			__VIEWSTATE: extractVariable('__VIEWSTATE', body),
			ctl00$phBody$DateSelect: year
		};

		request.post({
			url: url,
			headers: {Referer: url},
			form: form,
			encoding: null
		}, function(err, response, body) {
			if(err || response.statusCode !== 200 || response.headers['content-type'] !== 'application/zip') {
				return cb(new Error('File failed to load'));
			}

			if(!body) {
				return cb(new Error('Blank body returned'));
			}

			cb(null, body);
		});
	});
}


function extractVariable(name, body) {
	var tokenStart = name + '" value="';
	var tokenEnd = '" />';

	var start = body.indexOf(tokenStart) + tokenStart.length;
	var length = body.indexOf(tokenEnd, start) - start;

	return body.substr(start, length);
}


module.exports = netfileDownload;
