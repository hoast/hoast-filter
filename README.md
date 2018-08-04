# Hoast-filter
Filter out files from further processing.

> As the name suggest this is a [Hoast](https://github.com/hoast/hoast#readme) module.

## Usage

### Parameters

* `patterns` **{Array of strings}**: An array of string which gets used to match files using glob patterns. See [nanomatch](https://github.com/micromatch/nanomatch#readme) for more details on the patterns.
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
      "patterns": [
	    "**/*.md"
      ]
	},
    "read": {}
  }
}
```

**Script**

```javascript
const Hoast = require('hoast');
const read = Hoast.read,
      filter = require('hoast-filter');

Hoast(__dirname)
  .use(filter({
    patterns: [
	  '**/*.md'
    ]
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
      "patterns": [
	    "layouts/**"
      ]
	},
    "read": {}
  }
}
```

**Script**

```javascript
const Hoast = require('hoast');
const read = Hoast.read,
      filter = require('hoast-filter');

Hoast(__dirname)
  .use(filter({
	invert: true,
    patterns: [
	  'layouts/**'
	]
  }))
  .use(read())
  .process();
```

> In the example the layouts folder will be filter out from further processing.

## License
[ISC license](https://github.com/hoast/hoast-filter/blob/master/LICENSE)