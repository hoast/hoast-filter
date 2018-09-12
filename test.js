// Dependency modules.
const test = require(`ava`);
// Custom module.
const Filter = require(`.`);

// Test patterns option with a string.
test(`pattern`, async function(t) {
	// Create dummy files.
	let files = [{
		path: `a.txt`
	}, {
		path: `b.md`
	}];
	
	// Expected outcome.
	let filesOutcome = [{
		path: `a.txt`
	}];
	
	// Test module.
	files = await Filter({
		patterns: `**/*.txt`
	})({}, files);
	
	// Compare files.
	t.deepEqual(files, filesOutcome);
});

// Test patterns option with an array.
test(`patterns`, async function(t) {
	// Create dummy files.
	let files = [{
		path: `a.txt`
	}, {
		path: `b.md`
	}, {
		path: `c.js`
	}];
	
	// Expected outcome.
	let filesOutcome = [{
		path: `a.txt`,
	}, {
		path: `b.md`,
	}];
	
	// Test module.
	files = await Filter({
		patterns: [
			`**/*.txt`,
			`**/*.md`
		]
	})({}, files);
	
	// Compare files.
	t.deepEqual(files, filesOutcome);
});

// Test invert option.
test(`invert`, async function(t) {
	// Create dummy files.
	let files = [{
		path: `a.txt`
	}, {
		path: `b.md`
	}, {
		path: `c.js`
	}];
	
	// Expected outcome.
	let filesOutcome = [{
		path: `c.js`,
	}];
	
	// Test module.
	files = await Filter({
		invert: true,
		patterns: [
			`**/*.txt`,
			`**/*.md`
		]
	})({}, files);
	
	// Compare files.
	t.deepEqual(files, filesOutcome);
});

// Test engine option.
test(`engine`, async function(t) {
	// Create dummy files.
	let files = [{
		path: `a.txt`
	}, {
		path: `b.md`
	}, {
		path: `c.js`
	}];
	
	// Expected outcome.
	let filesOutcome = [{
		path: `a.txt`
	}];
	
	// Test module.
	files = await Filter({
		engine: function(file) {
			return file.path === `a.txt`;
		}
	})({}, files);
	
	// Compare files.
	t.deepEqual(files, filesOutcome);
});

// Test engine option in combination with a pattern.
test(`engine-pattern`, async function(t) {
	// Create dummy files.
	let files = [{
		path: `a.txt`
	}, {
		path: `b.md`
	}, {
		path: `c.txt`
	}];
	
	// Expected outcome.
	let filesOutcome = [{
		path: `a.txt`
	}, {
		path: `b.md`
	}];
	
	// Test module.
	files = await Filter({
		engine: function(file) {
			return file.path === `a.txt`;
		},
		patterns: `**/*.txt`
	})({}, files);
	
	// Compare files.
	t.deepEqual(files, filesOutcome);
});

// Test engine option in combination with an inverted pattern.
test(`engine-invert`, async function(t) {
	// Create dummy files.
	let files = [{
		path: `a.txt`
	}, {
		path: `b.md`
	}, {
		path: `c.md`
	}];
	
	// Expected outcome.
	let filesOutcome = [{
		path: `a.txt`
	}, {
		path: `b.md`
	}];
	
	// Test module.
	files = await Filter({
		engine: function(file) {
			return file.path === `b.md`;
		},
		invert: true,
		patterns: `**/*.txt`
	})({}, files);
	
	// Compare files.
	t.deepEqual(files, filesOutcome);
});