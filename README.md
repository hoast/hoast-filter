<div align="center">
  <a title="Version master branch" href="https://github.com/hoast/hoast-filter#readme" target="_blank" rel="noopener">
    <img src="https://img.shields.io/github/package-json/v/hoast/hoast-filter.svg?label=master&style=flat-square"/>
  </a>
  <a title="Version npm package" href="https://npmjs.com/package/hoast-filter" target="_blank" rel="noopener">
    <img src="https://img.shields.io/npm/v/hoast-filter.svg?label=npm&style=flat-square"/>
  </a>
  <a title="License agreement" href="https://github.com/hoast/hoast-filter/blob/master/LICENSE" target="_blank" rel="noopener">
    <img src="https://img.shields.io/github/license/hoast/hoast-filter.svg?style=flat-square"/>
  </a>
  <a title="Travis-ci build statis" href="https://travis-ci.org/hoast/hoast-filter" target="_blank" rel="noopener">
    <img src="https://img.shields.io/travis-ci/hoast/hoast-filter.svg?branch=master&style=flat-square"/>
  </a>
  <a title="Open issues on GitHub" href="https://github.com/hoast/hoast-filter/issues" target="_blank" rel="noopener">
    <img src="https://img.shields.io/github/issues/hoast/hoast-filter.svg?style=flat-square"/>
  </a>
</div>

# hoast-filter

Filter out files from further processing.

> As the name suggest this is a [hoast](https://github.com/hoast/hoast#readme) module.

## Usage

Install [hoast-filter](https://npmjs.com/package/hoast-filter) using [npm](https://npmjs.com).

```
$ npm install hoast-filter
```

### Parameters

* `patterns` **{Array|strings}**: A string or an array of strings which gets used to match files using glob patterns. See [nanomatch](https://github.com/micromatch/nanomatch#readme) for more details on the patterns.
	* Required: `yes`
* `invert` **{boolean}**: When set to true instead of allowing matches it will discard them.
	* Default: `false`

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

> In the example the layouts folder will be filter out from further processing.

## License

[ISC license](https://github.com/hoast/hoast-filter/blob/master/LICENSE)