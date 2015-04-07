/*jshint node:true */

'use strict';

var map = require('map-stream'),
	gutil = require('gulp-util'),
	os    = require('os'),
	exec  = require('child_process').exec;

module.exports = function(command, opt) {
	var counter = 0;

	if (typeof command === 'object') {
		throw new gutil.PluginError("gulp-apigen", "Invalid ApiGen Binary");
	}

	// if path to apigen bin not supplied, use default vendor/bin path
	if(! command) {
		command = './vendor/bin/apigen';
		if (os.platform() === 'win32') {
			command = '.\\vendor\\bin\\apigen';
		}
	}

	// create default opt object if no options supplied
	if ( ! opt) { opt = {}; }

	// assign default options if one is not supplied
	if (typeof opt.debug === 'undefined') { opt.debug = false; }
	if (typeof opt.clear === 'undefined') { opt.clear = false; }
	if (typeof opt.notify === 'undefined') { opt.notify = false; }

   command += ' generate';

	return map(function (file, cb) {
		// construct command
		var cmd = opt.clear ? 'clear && ' + command : command;
		cmd += ' --config ' + file.path;

		if(counter === 0) {
			counter++;


			cmd.trim(); // clean up any space remnants

			if (opt.debug) {
				gutil.log(gutil.colors.yellow('\n       *** Debug Cmd: ' + cmd + '***\n'));
			}

			exec(cmd, function (error) {

				if(opt.debug && error) {
					gutil.log(error);
				}

				if (opt.notify) {
					cb(error, file);
				} else {
					cb(null, file);
				}

			});
		}
	});

};

