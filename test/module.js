// Dependency modules.
const test = require(`ava`);
// Custom module.
const Filter = require(`../library`);

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
	const filter = Filter({
		patterns: `*.css`
	});
	filter.before();
	files = await filter({}, files);
	
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
	const filter = Filter({
		patterns: [
			`*.css`,
			`*.html`
		]
	});
	filter.before();
	files = await filter({}, files);
	
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
	const filter = Filter({
		patterns: `**/*.css`,
		patternOptions: {
			globstar: true
		}
	});
	filter.before();
	files = await filter({}, files);
	
	// Compare files.
	t.deepEqual(files, filesOutcome);
});

// Test invert option.
test(`all`, async function(t) {
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
	const filter = Filter({
		patterns: [
			`*`,
			`!(*.css)`
		],
		patternOptions: {
			all: true,
			extended: true
		}
	});
	filter.before();
	files = await filter({}, files);
	
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
	const filter = Filter({
		engine: function(file) {
			return file.path === `a.css`;
		}
	});
	filter.before();
	files = await filter({}, files);
	
	// Compare files.
	t.deepEqual(files, filesOutcome);
});

// Test engine option in combination with a pattern.
test(`engine-pattern`, async function(t) {
	// Create dummy files.
	let files = [{
		path: `a.css`
	}, {
		path: `b.css`
	}, {
		path: `c.html`
	}];
	
	// Expected outcome.
	let filesOutcome = [{
		path: `a.css`
	}];
	
	// Test module.
	const filter = Filter({
		engine: function(file) {
			t.true([ `a.css`, `b.css` ].indexOf(file.path) >= 0);
			return file.path === `a.css`;
		},
		patterns: `*.css`
	});
	filter.before();
	files = await filter({}, files);
	
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
	}];
	
	// Expected outcome.
	let filesOutcome = [{
		path: `a.css`
	}];
	
	// Test module.
	const filter = Filter({
		engine: function(file) {
			t.true([ `a.css`, `b.html` ].indexOf(file.path) >= 0);
			return file.path === `a.css`;
		},
		patterns: [
			`*.css`,
			`*.html`
		]
	});
	filter.before();
	files = await filter({}, files);
	
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
	}];
	
	// Expected outcome.
	let filesOutcome = [{
		path: `a.css`
	}];
	
	// Test module.
	const filter = Filter({
		engine: function(file) {
			t.true([ `a.css` ].indexOf(file.path) >= 0);
			return file.path === `a.css`;
		},
		patterns: `**/*.css`,
		patternOptions: {
			globstar: true
		}
	});
	filter.before();
	files = await filter({}, files);
	
	// Compare files.
	t.deepEqual(files, filesOutcome);
});

// Test engine option in combination with an inverted pattern.
test(`engine-all`, async function(t) {
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
	const filter = Filter({
		engine: function(file) {
			t.true([ `a.css`, `b.html` ].indexOf(file.path) >= 0);
			return file.path === `a.css`;
		},
		patterns: [
			`**`,
			`!(*.js)`
		],
		patternOptions: {
			all: true,
			extended: true,
			globstar: true
		}
	});
	filter.before();
	files = await filter({}, files);
	
	// Compare files.
	t.deepEqual(files, filesOutcome);
});