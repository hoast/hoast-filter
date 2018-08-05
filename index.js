// Node modules.
const assert = require('assert');
// If debug available require it.
let debug; try { debug = require('debug')('hoast-filter'); } catch(error) { debug = function() {}; }
// Dependency modules.
const nanomatch = require('nanomatch');

/**
 * Validates the module options.
 * @param {Object} options The options.
 */
const validateOptions = function(options) {
	assert(typeof(options) === 'object', 'hoast.filter: options must be set and of type object.');
	assert(Array.isArray(options.patterns) && options.patterns.length, 'hoast.filter: patterns must be set and an array of string.');
};

/**
 * Filters out files from the list using glob patterns via nanomatch.
 * @param {Object} options The module options.
 */
module.exports = function(options) {
	debug(`Initializing module.`);
	
	validateOptions(options);
	debug(`Validated options.`);
	options = Object.assign({
		invert: false
	}, options);
	
	return function(hoast, files) {
		debug(`Running module.`);
		return files.filter(function(file) {
			return nanomatch.any(file.path, options.patterns) ? !options.invert : options.invert
		});
	};
};