// If debug available require it.
let debug; try { debug = require(`debug`)(`hoast-filter`); } catch(error) { debug = function() {}; }

/**
 * Filters out files from the list using glob patterns.
 * @param {Object} options The module options.
 */
module.exports = function(options) {
	debug(`Initializing module.`);
	
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
				if (this.expressions && hoast.helpers.matchExpressions(file.path, this.expressions, options.patternOptions.all)) {
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
				return hoast.helpers.matchExpressions(file.path, this.expressions, options.patternOptions.all);
			}, mod);
		}
		debug(`Finished filtering files.`);
		
		return filtered;
	};
	
	mod.before = function(hoast) {
		// Parse glob patterns into regular expressions.
		if (options.patterns) {
			this.expressions = hoast.helpers.parsePatterns(options.patterns, options.patternOptions, true);
			debug(`Patterns parsed into expressions: ${this.expressions}.`);
		}
	};
	
	return mod;
};