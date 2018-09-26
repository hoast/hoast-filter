<div align="center">
  
  [![npm package @latest](https://img.shields.io/npm/v/hoast-filter.svg?label=npm@latest&style=flat-square&maxAge=3600)](https://npmjs.com/package/hoast-filter)
  [![npm package @next](https://img.shields.io/npm/v/hoast-filter/next.svg?label=npm@next&style=flat-square&maxAge=3600)](https://npmjs.com/package/hoast-filter/v/next)
  
  [![Travis-ci status](https://img.shields.io/travis-ci/hoast/hoast-filter.svg?branch=master&label=test%20status&style=flat-square&maxAge=3600)](https://travis-ci.org/hoast/hoast-filter)
  [![CodeCov coverage](https://img.shields.io/codecov/c/github/hoast/hoast-filter/master.svg?label=test%20coverage&style=flat-square&maxAge=3600)](https://codecov.io/gh/hoast/hoast-filter)
  
  [![License agreement](https://img.shields.io/github/license/hoast/hoast-filter.svg?style=flat-square&maxAge=86400)](https://github.com/hoast/hoast-filter/blob/master/LICENSE)
  [![Open issues on GitHub](https://img.shields.io/github/issues/hoast/hoast-filter.svg?style=flat-square&maxAge=86400)](https://github.com/hoast/hoast-filter/issues)
  
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

The parameters are given via a single object with the properties listed below.

* `engine`: A custom function can be specified to use for filtering with instead of the default pattern matching. The function can be asynchronous and gets given one argument [the file data](https://github.com/hoast/hoast#modules) and requires one return value of type Boolean.
  * Type: `Function`
  * Required: `If pattern not specified`
* `patterns`: Glob patterns to match file paths with. If the engine function is set the file paths matches to the patterns it will be skipped and continue to be processed.
  * Type: `String` or `Array of strings`
  * Required: `If engine not specified`
* `patternOptions`: Options for the glob pattern matching. See [planckmatch options](https://github.com/redkenrok/node-planckmatch#options) for more details on the pattern options.
  * Type: `Object`
  * Default: `{}`
* `patternOptions.all`: This options is added to `patternOptions`, and determines whether all patterns need to match instead of only one.
  * Type: `Boolean`
  * Default: `false`

### Examples

All files that match the glob patterns will be further processed after the filter call

**Cli**

```json
{
  "modules": {
    "hoast-filter": {
      "patterns": "*.md"
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
    patterns: `*.md`
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
      "patterns": [
        "*"
        "!(layouts/*)"
      ],
      "patternOptions": {
        "all": true,
        "extended": true
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
    patterns: [
      `*`
      `!(layouts/*)`
    ],
    patternOptions: {
      all: true,
      extended: true
    }
  }))
  .use(read())
  .process();
```

> In the example the layouts directory will be filter out from further processing.

The engine function can also be used to specify a custom filter based on the file's data.

**CLI**

`engine` option is not compatible with the CLI tool as it requires a reference to a self specified function.

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
    patterns: [
      `*`
      `!(layouts/*)`
    ],
    patternOptions: {
      all: true,
      extended: true
    }
  }))
  .use(read())
  .process();
```

> In the example any files within the layouts directory will be filtered out if they do not have the `.hbs` extension. All other files outside the layouts directory will remain part of the files array and be processed further.

## License

[ISC license](https://github.com/hoast/hoast-filter/blob/master/LICENSE)