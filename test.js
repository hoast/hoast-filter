// Dependency modules.
const test = require(`ava`);
// Custom module.
const Filter = require(`.`);

// Test patterns option with a string.
test(`pattern`, function(t) {
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
	files = Filter({
		patterns: `**/*.txt`
	})({}, files);
	
	// Compare files.
	t.deepEqual(files, filesOutcome);
});

// Test patterns option with an array.
test(`patterns`, function(t) {
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
	files = Filter({
		patterns: [
			`**/*.txt`,
			`**/*.md`
		]
	})({}, files);
	
	// Compare files.
	t.deepEqual(files, filesOutcome);
});

// Test invert option.
test(`invert`, function(t) {
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
	files = Filter({
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
test(`engine`, function(t) {
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
	files = Filter({
		engine: function(file) {
			return file.path === `a.txt`;
		}
	})({}, files);
	
	// Compare files.
	t.deepEqual(files, filesOutcome);
});

// Test engine option in combination with a pattern.
test(`engine-pattern`, function(t) {
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
	files = Filter({
		engine: function(file) {
			return file.path === `a.txt`;
		},
		patterns: `**/*.txt`
	})({}, files);
	
	// Compare files.
	t.deepEqual(files, filesOutcome);
});

// Test engine option in combination with an inverted pattern.
test(`engine-invert`, function(t) {
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
	files = Filter({
		engine: function(file) {
			return file.path === `b.md`;
		},
		invert: true,
		patterns: `**/*.txt`
	})({}, files);
	
	// Compare files.
	t.deepEqual(files, filesOutcome);
});