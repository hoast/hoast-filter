// If debug available require it.
let debug; try { debug = require(`debug`)(`hoast-filter`); } catch(error) { debug = function() {}; }
// Node modules.
const assert = require(`assert`);
// Dependency modules.
const parse = require(`planckmatch/parse`),
	match = require(`planckmatch/match`);

/**
 * Validates the module options.
 * @param {Object} options The options.
 */
const validateOptions = function(options) {
	assert(
		typeof(options) === `object`,
		`hoast-filter: options must be set and of type object.`
	);
	
	assert(
		options.engine || options.patterns,
		`hoast-filter: either engine or patterns needs to be specified.`
	);
	if (options.engine) {
		assert(
			typeof(options.engine) === `function`,
			`hoast-filter: engine must be of type function.`
		);
	}
	if (options.patterns) {
		assert(
			typeof(options.patterns) === `string` || (Array.isArray(options.patterns) && options.patterns.length > 0 && typeof(options.patterns[0] === `string`)),
			`hoast-filter: patterns must be of type string or an array of string.`
		);
	}
	if (options.patternOptions) {
		assert(
			typeof(options.patternOptions) === `object`,
			`hoast-filter: patternOptions must be of type object.`
		);
		if (options.patternOptions.all) {
			assert(
				typeof(options.patternOptions.all) === `boolean`,
				`hoast-filter: patternOptions.all must be of type boolean.`
			);
		}
	}
};

/**
 * Check if expressions match with the given value.
 * @param {String} value The string to match with the expressions.
 * @param {RegExps|Array} expressions The regular expressions to match with.
 * @param {Boolean} all Whether all patterns need to match.
 */
const isMatch = function(value, expressions, all) {
	const result = match(value, expressions);
	
	// If results is an array.
	if (Array.isArray(result)) {
		// Check whether all or just any will result in a match, and return the outcome.
		return all ? !result.includes(false) : result.includes(true);
	}
	
	// Otherwise result is a boolean and can be returned directly.
	return result;
};

/**
 * Filters out files from the list using glob patterns.
 * @param {Object} options The module options.
 */
module.exports = function(options) {
	debug(`Initializing module.`);
	
	validateOptions(options);
	debug(`Validated options.`);
	options = Object.assign({
		patternOptions: {}
	}, options);
	
	// Main module method.
	const mod = async function(hoast, files) {
		debug(`Running module.`);
		
		let filtered;
		// Check if custom function is specified.
		if (options.engine) {
			debug(`Using engine filter method.`);
			
			// Loop through the files.
			await Promise.all(files.map(async function(file) {
				debug(`Filtering file '${file.path}'.`);
				// First check if expression are given then with the expressions check whether it should be filtered.
				if (this.expressions && isMatch(file.path, this.expressions, options.patternOptions.all)) {
					debug(`File path valid for skipping.`);
					return true;
				}
				
				debug(`Custom function for file '${file.path}'.`);
				// Else use the specified engine function.
				return await options.engine(file);
			}, mod))
				.then(function(matchResults) {
					filtered = files.filter(function(file, index) {
						return matchResults[index];
					});
				});
		} else {
			debug(`Using standard filter method.`);
			
			// Filter using the expressions.
			filtered = files.filter(function(file) {
				debug(`Filtering file '${file.path}'.`);
				return isMatch(file.path, this.expressions, options.patternOptions.all);
			}, mod);
		}
		debug(`Finished filtering files.`);
		
		return filtered;
	};
	
	// Parse glob patterns into regular expressions.
	if (options.patterns) {
		mod.expressions = parse(options.patterns, options.patternOptions, true);
		debug(`Patterns parsed into expressions: ${mod.expressions}.`);
	}
	
	return mod;
};