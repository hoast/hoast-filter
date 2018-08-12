// Dependecy modules.
const test = require(`ava`);
// Custom module.
const Filter = require(`.`);

test(`filter`, async function(t) {
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
		path: `b.md`
	}, {
		path: `c.js`
	}];
	
	// Test module.
	files = Filter({
		invert: true,
		patterns: `**/*.txt`
	})({}, files);
	
	// Compare files.
	t.deepEqual(files, filesOutcome);
	
	filesOutcome = [{
		path: `b.md`
	}];
	
	// Test module.
	files = Filter({
		patterns: `**/*.md`
	})({}, files);
	
	// Compare files.
	t.deepEqual(files, filesOutcome);
});