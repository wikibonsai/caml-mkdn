# caml-mkdn

[![A WikiBonsai Project](https://img.shields.io/badge/%F0%9F%8E%8B-A%20WikiBonsai%20Project-brightgreen)](https://github.com/wikibonsai/wikibonsai)
[![NPM package](https://img.shields.io/npm/v/caml-mkdn)](https://npmjs.org/package/caml-mkdn)

<p align="center">
  <img src="./caml.svg" width="300" height="300"/>
</p>

CAML is a **C**olon **A**ttribute **M**arkup **L**anguage similar to [YAML](https://yaml.org/) with some key differences:

- Slims down the syntax by removing the need for separators (`---`).
- Can be sprinkled throughout a markdown file (similar to markdown footnotes).
- Focuses on single level sequence [collections](https://yaml.org/spec/1.2.2/#block-collection-styles) (e.g. does not support object values, just arrays).
- Supports [`[[wikiref]]`](https://github.com/wikibonsai/wikirefs) values.
- Can be rendered as a wikipedia-style infobox alongside the rest of your markdown.
- Supports markdown inside of strings.

🕸 Weave a semantic web in your [🎋 WikiBonsai](https://github.com/wikibonsai/wikibonsai) digital garden.

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
data-view-key::data-view-value
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
//    data-view-key: 'data-view-value',
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

```typescript
import { dump } from 'caml-mkdn';
import type { CamlDumpOpts } from 'caml-mkdn';

const attrs: Record<string, any> = {
  title: 'My Document',
  tags: ['tag1', 'tag2', 'tag3'],
};
const result: string = dump(attrs);
// result = ': title :: My Document\n'
//        + ': tags  ::\n'
//        + '           - tag1\n'
//        + '           - tag2\n'
//        + '           - tag3\n'

const compact: string = dump(attrs, { format: 'none', listFormat: 'comma', prefix: true });
// compact = ':title::My Document\n'
//         + ':tags::tag1,tag2,tag3\n'
```

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

Note: multi-line strings in lists are only supported with `'mkdn'` format. When `multiLine` is set and a list item contains newlines, it is serialized as a block scalar:

```ts
dump({ tags: ['first', 'line one\nline two\n'] }, { listFormat: 'mkdn', multiLine: 'literal', chomp: 'clip' });
// : tags ::
//   - first
//   - |
//   line one
//   line two
```
##### `prefix: boolean`

Whether or not to use the colon `:` prefix when dumping CAML attributes.
- With:
  ```markdown
  : key :: value
  ```
- Without:
  ```markdown
  key :: value
  ```

##### `multiLine: 'none' | 'literal' | 'folded'`

How to serialize string values that contain newlines.
- `'none'` (default): dumps the value as-is (newlines appear inline).
- `'literal'`: emits a `|` block scalar with indented content (preserves newlines).
- `'folded'`: emits a `>` block scalar, wrapping long lines at ~72 characters (replaces newlines with spaces).

```ts
const attrs = { poem: 'roses are red\nviolets are blue\n' };

dump(attrs, { multiLine: 'literal' });
// : poem :: |
//   roses are red
//   violets are blue

dump(attrs, { multiLine: 'folded' });
// : poem :: >
//   roses are red violets are blue
```

##### `chomp: 'clip' | 'strip' | 'keep'`

Controls trailing newline behavior for multi-line block scalars. Only applies when `multiLine` is `'literal'` or `'folded'`.
- `'clip'` (default): emits `|` or `>` — adds a single trailing newline.
- `'strip'`: emits `|-` or `>-` — no trailing newline.
- `'keep'`: emits `|+` or `>+` — preserves all trailing newlines from the value.

```ts
const attrs = { notes: 'line one\nline two' };

dump(attrs, { multiLine: 'literal', chomp: 'clip' });
// : notes :: |
//   line one
//   line two

dump(attrs, { multiLine: 'literal', chomp: 'strip' });
// : notes :: |-
//   line one
//   line two

dump(attrs, { multiLine: 'literal', chomp: 'keep' });
// : notes :: |+
//   line one
//   line two
```

##### `indent: number`

Number of spaces to indent multi-line block content. Defaults to `2`. Only applies when `multiLine` is `'literal'` or `'folded'`.

#### Multi-Line Parsing Rules

When parsing multi-line block scalars (folded `>`, literal `|`, and their chomped variants `>-`, `|-`, `>+`, `|+`), continuation lines must be indented with **2 or more spaces** (or a tab). Two spaces is the minimum *intentional* indent, and it stays below markdown's 4-space indented-code-block threshold, so prose values don't render as code. `dump` emits two-space indentation by default.

The block ends when a non-blank line is indented with fewer than 2 spaces (e.g. a line at column 0). Blank lines within the block are preserved.

```markdown
:poem:: |
  verse one

  verse two

This line ends the block (not indented).
```

Parses as:
- `poem` = `"verse one\n\nverse two\n"` (blank line preserved)
- `"This line ends the block..."` is content, not part of the attribute.

Multiple multi-line attributes can appear consecutively, separated by non-indented content (including other CAML attributes):

```markdown
:description:: >
  A long description
  that gets folded.

:poem:: |
  roses are red
  violets are blue
```

Each block stops at the blank line + next non-indented line.

### `load(content: string): CamlLoadPayload`

Load a content string, parse CAML attributes, and store attributes in `data` and the rest of the content string in `content`. Similar to [graymatter](https://github.com/jonschlinkert/gray-matter#what-does-this-do).

```typescript
import { load } from 'caml-mkdn';
import type { CamlLoadPayload } from 'caml-mkdn';

const payload: CamlLoadPayload = load(
  ': title :: My Document\n'
+ ': tags  :: tag1, tag2, tag3\n'
+ '\n'
+ 'And some content!\n'
);
// payload = {
//   data: {
//     title: 'My Document',
//     tags: ['tag1', 'tag2', 'tag3'],
//   },
//   content: 'And some content!',
// }
```

### `resolve(value: string): CamlValData`

Take a CAML attribute value as a string, parse it, and return `CamlValData`.

```typescript
import { resolve } from 'caml-mkdn';
import type { CamlValData } from 'caml-mkdn';

const str: CamlValData = resolve('hello');
// str = { type: 'string', string: 'hello', value: 'hello' }

const num: CamlValData = resolve('42');
// num = { type: 'int', string: '42', value: 42 }

const bool: CamlValData = resolve('true');
// bool = { type: 'bool', string: 'true', value: true }

const nil: CamlValData = resolve('null');
// nil = { type: 'null', string: 'null', value: null }
```

`CamlValData` looks like:

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

### `update(content: string, key: string, newVal: string, opts?: UpdateOpts): [number, number, string] | string | undefined`

Find a CAML attribute by key and replace its value. Returns `undefined` if the key is not found. Whitespace around the `::` marker is preserved.

```typescript
import { update } from 'caml-mkdn';
import type { UpdateOpts } from 'caml-mkdn';

// default format: 'content' — returns the full string with the replacement applied
const content = update('attr::old value\n', 'attr', 'new value');
// content = 'attr::new value\n'

// format: 'offsets' — returns [start, end, replacementText]
const offsets = update('attr::old value\n', 'attr', 'new value', { format: 'offsets' });
// offsets = [0, 15, 'attr::new value']

// type-aware matching
const dated = update(': date :: 2001-12-14\n', 'date', '2022-11-14', { type: 'timestamp' });
// dated = ': date :: 2022-11-14\n'
```

#### Options

##### `format: 'content' | 'offsets'`

- `'content'` (default): Returns the full content string with the value replaced inline.
- `'offsets'`: Returns `[start, end, replacementText]` — the character offsets and the replacement string, useful for editor integrations.

##### `type?: string`

Constrain the match to a specific value type (e.g. `'timestamp'`, `'int'`, `'bool'`). If omitted, matches any value.

### `scan(content: string, opts?: CamlScanOpts): CamlScanResult[]`

Scan a given `content` string and return an array of descriptions of all valid CAML attribute constructs. Each result groups a key with its values.

```typescript
import { scan } from 'caml-mkdn';
import type { CamlScanResult } from 'caml-mkdn';

const results: CamlScanResult[] = scan(': title :: My Document\n: count :: 42\n');
// results = [
//   {
//     key: { text: 'title', start: 2 },
//     vals: [
//       { type: 'string', val: { text: 'My Document', start: 11 } },
//     ],
//   },
//   {
//     key: { text: 'count', start: 25 },
//     vals: [
//       { type: 'int', val: { text: '42', start: 34 } },
//     ],
//   },
// ]
```

#### Options

##### `skipEsc: boolean`

Whether or not to skip escaped CAML construct instances; set to `true` by default.

- `true` (default): CAML inside backticks, code spans, and fenced code blocks is ignored.
- `false`: All CAML constructs are returned regardless of escaping.

```ts
const results: CamlScanResult[] = scan('`:attr::value`\n', { skipEsc: true });
// results = [
//   {
//     key: { text: 'attr', start: 1 },
//     vals: [
//       { type: 'string', val: { text: 'value', start: 7 } },
//     ],
//   },
// ]
```

#### Types

```typescript
interface CamlScanOpts {
  skipEsc?: boolean;
}

interface ScanTxt {
  text: string;
  start: number;
}

interface CamlScanResVal {
  type: string;
  val: ScanTxt;
}

interface CamlScanResult {
  key: ScanTxt;
  vals: CamlScanResVal[];
}
```
