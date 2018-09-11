[![Version master branch](https://img.shields.io/github/package-json/v/hoast/hoast-filter.svg?label=master&style=flat-square)](https://github.com/hoast/hoast-filter#readme)
[![Version npm package](https://img.shields.io/npm/v/hoast-filter.svg?label=npm&style=flat-square)](https://npmjs.com/package/hoast-filter)
[![License agreement](https://img.shields.io/github/license/hoast/hoast-filter.svg?style=flat-square)](https://github.com/hoast/hoast-filter/blob/master/LICENSE)
[![Travis-ci build status](https://img.shields.io/travis-ci/hoast/hoast-filter.svg?branch=master&style=flat-square)](https://travis-ci.org/hoast/hoast-filter)
[![Open issues on GitHub](https://img.shields.io/github/issues/hoast/hoast-filter.svg?style=flat-square)](https://github.com/hoast/hoast-filter/issues)

# hoast-filter

Filter out files from further processing.

> As the name suggest this is a [hoast](https://github.com/hoast/hoast#readme) module.

## Usage

Install [hoast-filter](https://npmjs.com/package/hoast-filter) using [npm](https://npmjs.com).

```
$ npm install hoast-filter
```

### Parameters

* `engine` **{Function}**: Optionally a custom function can be specified to use for filtering instead of the default pattern matching. The function gets given one argument [the file data](https://github.com/hoast/hoast#modules) and requires one return value of type Boolean.
	* Required: `If pattern not specified`
* `invert` **{boolean}**: When set to true instead of allowing matches it will discard them. If the engine function is used it will invert the pattern allowance as well.
	* Default: `false`
* `patterns` **{Array|strings}**: A string or an array of strings which gets used to match files using glob patterns. See [nanomatch](https://github.com/micromatch/nanomatch#readme) for more details on the patterns. If the engine function is set it will only give the function any files matching the pattern.
	* Required: `If engine not specified`

### Examples

All files that match the glob patterns will be further processed after the filter call

**Cli**

```json
{
  "modules": {
    "hoast-filter": {
      "patterns": "**/*.md"
	},
    "read": {}
  }
}
```

**Script**

```javascript
const Hoast = require(`hoast`);
const read = Hoast.read,
      filter = require(`hoast-filter`);

Hoast(__dirname)
  .use(filter({
    patterns: `**/*.md`
  }))
  .use(read())
  .process();
```

> In the example only the markdown files continue past the filter.

The filter can also be inverted whereby it will filter out files matching the glob patterns instead of only keeping those that match the patterns.

**Cli**

```json
{
  "modules": {
    "hoast-filter": {
      "invert": true,
      "patterns": "layouts/**"
    }
	},
    "read": {}
  }
}
```

**Script**

```javascript
const Hoast = require(`hoast`);
const read = Hoast.read,
      filter = require(`hoast-filter`);

Hoast(__dirname)
  .use(filter({
	  invert: true,
    patterns: `layouts/**`
  }))
  .use(read())
  .process();
```

> In the example the layouts directory will be filter out from further processing.

The engine function can also be used to specify a custom filter based on the file's data.

**CLI**

Not compatible with the CLI tool as it requires a reference to a self specified function.

**Script**

```javascript
const path = require(`path`);
const Hoast = require(`hoast`);
const read = Hoast.read,
      filter = require(`hoast-filter`);

Hoast(__dirname)
  .use(filter({
    engine: function(file) {
      return path.extname(file.path) === `.hbs`;
    },
    patterns: `layouts/**`
  }))
  .use(read())
  .process();
```

> In the example any files within the layouts directory will be filtered out if they do not have the `.hbs` extension. All other files outside the layouts directory will remain part of the files array and be processed further.

## License

[ISC license](https://github.com/hoast/hoast-filter/blob/master/LICENSE)