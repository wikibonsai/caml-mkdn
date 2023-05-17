# caml-mkdn

[![A WikiBonsai Project](https://img.shields.io/badge/%F0%9F%8E%8B-A%20WikiBonsai%20Project-brightgreen)](https://github.com/wikibonsai/wikibonsai)
[![NPM package](https://img.shields.io/npm/v/caml-mkdn)](https://npmjs.org/package/caml-mkdn)

![](./caml.svg)

CAML is a **C**olon **A**ttribute **M**arkup **L**anguage similar to [YAML](https://yaml.org/) with some key differences:

- Slims down the syntax by removing the need for separators (`---`).
- Can be sprinkled throughout a markdown file (similar to markdown footnotes).
- Focuses on single level sequence [collections](https://yaml.org/spec/1.2.2/#block-collection-styles) (e.g. does not support object values, just arrays).
- Supports [`[[wikiref]]`](https://github.com/wikibonsai/wikirefs) values.
- Can be rendered as a wikipedia-style infobox alongside the rest of your markdown.
- Supports markdown inside of strings.

🕸 Weave a semantic web in your [🎋 WikiBonsai](https://github.com/wikibonsai/wikibonsai) digital garden.

TODO:
- Attribute types may be intermingled, except for `[[wikirefs]]`; e.g. `:key::string,1` will work but `:key::string,[[wikiref]]` will not.
- Ordered list values.

## Install

Install with [npm](https://docs.npmjs.com/cli/v9/commands/npm-install):

```
npm install caml-mkdn
```

## Use

```js
import * as caml from 'caml-mkdn';

let text = `
:key::value
:another-key::val1,val2,val3
:yet-another-key::
- 1
- 2
- 3

And some content!
`;
let payload = caml.load(text);

console.log(payload.data);
// should produce:
// {
//    key: 'value',
//    another-key: ['val1', 'val2', 'val3'],
//    yet-another-key: [1, 2, 3],
//  }

console.log(payload.content);
// should produce:
// 'And some content!'
```

Note: To use commas (,) inside of singular caml string value, make sure to surround the value with single or double quotes ('', "") so that the comma is not used to create a list value. Commas inside of list string values is not (yet) supported.

## API

### `dump(attrs: any, opts?: DumpOpts): string`

Serializes object as a CAML document. Similar to [js-yaml's dump()](https://github.com/nodeca/js-yaml#dump-object---options-).

#### Options

##### `format: 'pretty' | 'pad' | 'none'`

The format CAML attributes should be printed in. Choices are `'pretty'`, `'pad'`, and `'none'`:
- `'none'`: Will just dump the text with no added whitespace.
  - ex: 
  ```markdown
  :this-is-a-really-long-key::value
  :short-key:: value
  :comma-list::1,2,3
  :mkdn-list::
  - 1
  - 2
  - 3
  ```
- `'pad'`: Will pad with a single whitespace around text and special chars.
  - ex: 
  ```markdown
  : this-is-a-really-long-key :: value
  : short-key :: value
  : comma-list :: 1, 2, 3
  : mkdn-list ::
  - 1
  - 2
  - 3
  ```
- `'pretty'`: Will pad as well as determine the longest key length and pad all other keys with the same amount of spaces to achieve a "pretty" print feel.
  - ex: 
  ```markdown
  : this-is-a-really-long-key :: value
  : short-key                 :: value
  : comma-list                :: 1, 2, 3
  : mkdn-list                 ::
                                 - 1
                                 - 2
                                 - 3
  ```

##### `listFormat: 'comma' | 'mkdn'`

Dump CAML attribute lists by comma-separation or mkdn-list-separation.
- comma-separated:
  ```markdown
  : comma-list :: 1, 2, 3
  ```
- Mkdn-separation:
  ```markdown
    : mkdn-list ::
    - 1
    - 2
    - 3
    ```
##### `prefix: boolean;`

Whether or not to use the colon `:` prefix when dumping CAML attributes.
- With:
  ```markdown
  : key :: value
  ```
- Without:
  ```markdown
  key :: value
  ```

### `load(content: string): CamlLoadPayload`

Load a content string, parse CAML attributes, and store attributes in `data` and the rest of the content string in `content`. Similar to [graymatter](https://github.com/jonschlinkert/gray-matter#what-does-this-do).

### `resolve(value: string): CamlValData`

Take a CAML attribute value as a string, parse it, and return `CamlValData`, which looks like:

```js
interface CamlValData {
  type: string;   // a string description of the value's type
  string: string; // a string representation of the value
  value: null     // the literal parsed value
  | boolean
  | number
  | bigint
  | Date
  | string;
}
```

### `scan(content: string): (CamlScanResKey | CamlScanResVal)[]`

Scan a given `content` string and return an array of descriptions of all valid CAML attributes constructs.

Result formats:

```js
// caml attribute key
interface ScanResCamlKey {
  key: [string, number];
}
// caml attribute value
interface ScanResCamlVal {
  type: string;
  val: [string, number];
}
``` 
