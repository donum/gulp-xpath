var through = require('through2');
var PluginError = require('plugin-error');
var xpath = require('xpath');
var dom = require('xmldom').DOMParser;

// consts
const PLUGIN_NAME = 'gulp-xpath';

var custFunc = function(node) {
	return node.toString();
}

// plugin level function (dealing with files)
function gulpXPath(strXPath, objNamespaces, customFunction) {
	if (!strXPath) {
		throw new PluginError(PLUGIN_NAME, 'Missing xpath text!');
	}
	var objNamespaces = objNamespaces || {};

	if (!customFunction) {
		var customFunction = custFunc;
	}

	// creating a stream through which each file will pass
	var stream = through.obj(function(file, enc, cb) {
		if (file.isStream()) {
			this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
			return cb();
		}

		if (file.isBuffer()) {


			file.contents = new Buffer(execute_XPath(
				file.contents.toString(),
				strXPath,
				objNamespaces,
				customFunction
			));

		}

		// make sure the file goes through the next gulp plugin
		this.push(file);

		// tell the stream engine that we are done with this file
		cb();
	});

	// returning the file stream
	return stream;
};

function execute_XPath(content, strXPath, objNamespaces, customFunction) {
	if (!content) {
		throw new PluginError(PLUGIN_NAME, 'No content given!');
	}
	if (!strXPath) {
		throw new PluginError(PLUGIN_NAME, 'Missing xpath text!');
	}
	var objNamespaces = objNamespaces || {};

	if (!customFunction) {
		var customFunction = custFunc;
	}

	// default namespaces
	objNamespaces['xsl'] = 'http://www.w3.org/1999/XSL/Transform';

	var doc = new dom().parseFromString( content );
	var select = xpath.useNamespaces(objNamespaces);
	var result = select(strXPath, doc);
	var output = result.map(customFunction).join('');

	return output;
}

// exporting the plugin main function
module.exports = gulpXPath;
module.exports.stringInput = execute_XPath;
