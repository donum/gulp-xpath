# gulp-xpath

gulp-xpath is a [gulp](https://github.com/wearefractal/gulp) plugin to executes a XPath query on a XML document in a stream and returns the matches as a string.

## Usage

```javascript
var xpath = require('gulp-xpath');

// simple xpath that outputs all matches in a text file
gulp.src(['./news/*.xml'])
	.pipe(xpath("/news-items/news[@category='git']"))
	.pipe(concat('git_news.txt'))
	.pipe(gulp.dest('./news'));

// defining custom namespaces
gulp.src(['./news/*.xml'])
	.pipe(xpath("/news-items/news[@category='git']",{"exsl":"http://exslt.org/common"}))
	.pipe(concat('git_news.txt'))
	.pipe(gulp.dest('./news'));
```

## Notes

* Frist parameter: _string_ `XPath query`
* Second parameter: _object_ `namespace declarations`
  * `xmlns:xsl="http://www.w3.org/1999/XSL/Transform"` is the default namespace (can't be overwritten)
* To output an valid XML document, I suggest to use [gulp-wrapper](https://github.com/AntouanK/gulp-wrapper).

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
