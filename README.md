# gulp-apigen
> ApiGen plugin for gulp 3

## Usage

First, install `gulp-apigen` as a development dependency:

```shell
npm install --save-dev gulp-apigen
```

Then, add it to your `gulpfile.js`:

```javascript
var apigen = require('gulp-apigen');

// option 1: default format
gulp.task('apigen', function() {
	gulp.src('apigen.neon').pipe(apigen());
});

// option 2: with defined bin
gulp.task('apigen', function() {
	gulp.src('apigen.neon').pipe(apigen('./vendor/bin/apigen'));
});

// option 3: supply callback to integrate something like notification (using gulp-notify)

var gulp = require('gulp'),
 notify  = require('gulp-notify'),
 apigen  = require('gulp-apigen');
 _       = require('lodash');

gulp.task('apigen', function() {
  gulp.src('apigen.neon')
    .pipe(apigen('./vendor/bin/apigen', {notify: true}))
    .on('error', notify.onError(APINotification('fail', 'apigen')))
    .pipe(notify(APINotification('done', 'apigen')));
});

function APINotification(status, pluginName, override) {
	var options = {
		title:   ( status == 'done' ) ? 'Docs Generated!' : 'Failed to Generate Docs!',
		message: ( status == 'done' ) ? '\n\nAPI Documentation has been generated!\n\n' : '\n\nDocumentation has failed to generate...\n\n',
		icon:    __dirname + '/node_modules/gulp-' + pluginName + '/assets/test-' + status + '.png'
	};
	options = _.merge(options, override);
  return options;
}
```

## API

### (apigenpath,options,cb)

#### apigenpath

Type: `String`

The path to the desired ApiGen binary
- If not supplied, the default path will be ./vendor/bin/apigen

#### options.debug
Type: `Boolean (Default: false)`

Emit error details and shows command used in console

#### options.clear
Type: `Boolean (Default: false)`

Clear console before executing command

#### options.notify
Type: `Boolean (Default: false)`

Call user supplied callback to handle notification (use gulp-notify)

## Change Log

- 0.1.0: Initial Release

## Credits

gulp-apigen written by Nathan Macnamara

E-Mail: [hola@nathanmac.com](mailto:hola@nathanmac.com)

Twitter: [@nathmacn](http://twitter.com/nathmacn)


Inspired By: [gulp-codeception](https://github.com/mikeerickson/gulp-codeception) & [gulp-phpunit](https://github.com/mikeerickson/gulp-phpunit)