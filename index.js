// Node modules.
const assert = require(`assert`);
// If debug available require it.
let debug; try { debug = require(`debug`)(`hoast-filter`); } catch(error) { debug = function() {}; }
// Dependency modules.
const nanomatch = require(`nanomatch`);

/**
 * Validates the module options.
 * @param {Object} options The options.
 */
const validateOptions = function(options) {
	assert(typeof(options) === `object`, `hoast-filter: options must be set and of type object.`);
	assert(options.engine || options.patterns, `hoast-filter: either engine or patterns needs to be specified.`);
	if (options.engine) {
		assert(typeof(options.engine) === `function`, `hoast-filter: engine must be of type function.`);
	}
	if (options.invert) {
		assert(typeof(options.invert) === `boolean`, `hoast-filter: invert must be of type boolean.`);
	}
	if (options.patterns) {
		assert(typeof(options.patterns) === `string` || (Array.isArray(options.patterns) && options.patterns.length > 0 && typeof(options.patterns[0] === `string`)), `hoast-filter: patterns must be of type string or an array of string.`);
	}
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
		invert: false,
	}, options);
	
	return async function(hoast, files) {
		debug(`Running module.`);
		
		let filtered;
		if (options.engine) {
			debug(`Using engine filter method.`);
			
			await Promise.all(files.map(async function(file) {
				// First check nanomatch filter whether it should be filtered.
				if (options.patterns && nanomatch.any(file.path, options.patterns) === options.invert)  {
					return true;
				}
				// Else use the specified engine function.
				return await options.engine(file);
			})).then(function(result) {
				filtered = files.filter(function(file, index) {
					return result[index];
				});
			});
		} else {
			debug(`Using standard filter method.`);
			
			// Filter using nanomatch based of patterns.
			filtered = files.filter(function(file) {
				debug(`Filtering file '${file.path}'.`);
				return nanomatch.any(file.path, options.patterns) ? !options.invert : options.invert;
			});
		}
		debug(`Finished filtering files.`);
		
		return filtered;
	};
};