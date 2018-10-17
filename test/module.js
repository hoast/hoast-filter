// Dependency modules.
const Hoast = require(`hoast`),
	test = require(`ava`);
// Custom module.
const Filter = require(`../library`);

/**
 * Emulates a simplified Hoast process for testing purposes.
 * @param {Object} options Hoast options.
 * @param {Function} mod Module function.
 * @param {Array of objects} files The files to process and return.
 */
const emulateHoast = async function(options, mod, files) {
	const hoast = Hoast(__dirname, options);
	
	if (mod.before) {
		mod.before(hoast);
	}
	
	files = await mod(hoast, files);
	
	if (mod.after) {
		mod.after(hoast);
	}
	
	return files;
};

// Test patterns as a string.
test(`pattern`, async function(t) {
	// Create dummy files.
	let files = [{
		path: `a.css`
	}, {
		path: `b.html`
	}];
	
	// Expected outcome.
	let filesOutcome = [{
		path: `a.css`
	}];
	
	// Test module.
	files = await emulateHoast(
		{},
		Filter({
			patterns: `*.css`
		}),
		files
	);
	
	// Compare files.
	t.deepEqual(files, filesOutcome);
});

// Test patterns as an array of string.
test(`patterns`, async function(t) {
	// Create dummy files.
	let files = [{
		path: `a.css`
	}, {
		path: `b.html`
	}, {
		path: `c.js`
	}];
	
	// Expected outcome.
	let filesOutcome = [{
		path: `a.css`,
	}, {
		path: `b.html`,
	}];
	
	// Test module.
	files = await emulateHoast(
		{},
		Filter({
			patterns: [
				`*.css`,
				`*.html`
			]
		}),
		files
	);
	
	// Compare files.
	t.deepEqual(files, filesOutcome);
});

// Test pattern in combination with an option.
test(`options`, async function(t) {
	// Create dummy files.
	let files = [{
		path: `a.css`
	}, {
		path: `b.html`
	}];
	
	// Expected outcome.
	let filesOutcome = [{
		path: `a.css`
	}];
	
	// Test module.
	files = await emulateHoast(
		{},
		Filter({
			patterns: `?.css`,
			patternOptions: {
				extended: true
			}
		}),
		files
	);
	
	// Compare files.
	t.deepEqual(files, filesOutcome);
});

// Test invert option.
test(`patternOptions:all`, async function(t) {
	// Create dummy files.
	let files = [{
		path: `a.css`
	}, {
		path: `b.html`
	}, {
		path: `c.js`
	}];
	
	// Expected outcome.
	let filesOutcome = [{
		path: `b.html`
	}, {
		path: `c.js`,
	}];
	
	// Test module.
	files = await emulateHoast(
		{},
		Filter({
			patterns: [
				`*`,
				`!(*.css)`
			],
			patternOptions: {
				all: true,
				extended: true
			}
		}),
		files
	);
	
	// Compare files.
	t.deepEqual(files, filesOutcome);
});

// Test engine option.
test(`engine`, async function(t) {
	// Create dummy files.
	let files = [{
		path: `a.css`
	}, {
		path: `b.html`
	}, {
		path: `c.js`
	}];
	
	// Expected outcome.
	let filesOutcome = [{
		path: `a.css`
	}];
	
	// Test module.
	files = await emulateHoast(
		{},
		Filter({
			engine: function(file) {
				return file.path === `a.css`;
			}
		}),
		files
	);
	
	// Compare files.
	t.deepEqual(files, filesOutcome);
});

// Test engine option in combination with a pattern.
test(`engine-pattern`, async function(t) {
	// Create dummy files.
	let files = [{
		path: `a.css`
	}, {
		path: `b.html`
	}, {
		path: `c.js`
	}];
	
	// Expected outcome.
	let filesOutcome = [{
		path: `a.css`
	}, {
		path: `b.html`
	}];
	
	// Test module.
	files = await emulateHoast(
		{},
		Filter({
			engine: function(file) {
				t.true([ `a.css`, `c.js` ].indexOf(file.path) >= 0);
				return file.path === `a.css`;
			},
			patterns: `*.html`
		}),
		files
	);
	
	// Compare files.
	t.deepEqual(files, filesOutcome);
});

// Test engine option in combination with a pattern.
test(`engine-patterns`, async function(t) {
	// Create dummy files.
	let files = [{
		path: `a.css`
	}, {
		path: `b.html`
	}, {
		path: `c.js`
	}, {
		path: `d.md`
	}];
	
	// Expected outcome.
	let filesOutcome = [{
		path: `a.css`
	}, {
		path: `b.html`
	}, {
		path: `c.js`
	}];
	
	// Test module.
	files = await emulateHoast(
		{},
		Filter({
			engine: function(file) {
				t.true([ `a.css`, `d.md` ].indexOf(file.path) >= 0);
				return file.path === `a.css`;
			},
			patterns: [
				`*.html`,
				`*.js`
			]
		}),
		files
	);
	
	// Compare files.
	t.deepEqual(files, filesOutcome);
});

// Test pattern in combination with an option.
test(`engine-options`, async function(t) {
	// Create dummy files.
	let files = [{
		path: `a.css`
	}, {
		path: `b.html`
	}, {
		path: `c.js`
	}];
	
	// Expected outcome.
	let filesOutcome = [{
		path: `a.css`
	}, {
		path: `b.html`
	}];
	
	// Test module.
	files = await emulateHoast(
		{},
		Filter({
			engine: function(file) {
				t.true([ `a.css`, `c.js` ].indexOf(file.path) >= 0);
				return file.path === `a.css`;
			},
			patterns: `?.html`,
			patternOptions: {
				extended: true
			}
		}),
		files
	);
	
	// Compare files.
	t.deepEqual(files, filesOutcome);
});

// Test engine option in combination with an inverted pattern.
test(`engine-patternOptions:all`, async function(t) {
	// Create dummy files.
	let files = [{
		path: `a.css`
	}, {
		path: `b.html`
	}, {
		path: `c.html`
	}];
	
	// Expected outcome.
	let filesOutcome = [{
		path: `a.css`
	}, {
		path: `b.html`
	}];
	
	// Test module.
	files = await emulateHoast(
		{},
		Filter({
			engine: function(file) {
				t.true([ `a.css`, `c.html` ].indexOf(file.path) >= 0);
				return file.path === `a.css`;
			},
			patterns: [
				`b.*`,
				`*.html`
			],
			patternOptions: {
				all: true,
				extended: true
			}
		}),
		files
	);
	
	// Compare files.
	t.deepEqual(files, filesOutcome);
});