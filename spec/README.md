# caml-spec

[![A WikiBonsai Project](https://img.shields.io/badge/%F0%9F%8E%8B-A%20WikiBonsai%20Project-brightgreen)](https://github.com/wikibonsai/wikibonsai)
[![NPM package](https://img.shields.io/npm/v/caml-spec)](https://npmjs.org/package/caml-spec)

CAML attributes are block-level constructs. They are not parsed inside other markdown constructs:

- Inline code: `` `:attrtype::value` `` renders as a code span.
- Fenced code blocks: CAML inside triple backticks is treated as literal text.
- Indented code blocks: lines indented 4+ spaces are not parsed as CAML.
- Blockquotes: CAML inside `>` blockquotes is not parsed as an attribute.
- List items: CAML inside `- ` list items is not parsed as an attribute.

CAML attrs are meant to be compatible with [wikiattrs](https://github.com/wikibonsai/wikirefs/tree/main/spec#wikiattrs).

## Use

Below is an example usage of the test cases provided by `caml-spec`:

```js
import assert from 'node:assert/strict';
import { camlCases } from 'caml-spec';

function run(contextMsg: string, tests: TestCase[]): void {
  context(contextMsg, () => {
    for(const test of tests) {
      it(test.descr, () => {
        const expdHTML: string = test.html;
        const actlHTML: string = md.render(test.mkdn, env);
        assert.strictEqual(actlHTML, expdHTML);
      });
    }
  });
}
```

Tests without wikirefs:

```js
import { camlCases, camlWikiNoParseCases } from 'caml-spec';

describe('render caml; mkdn -> html', () => {

  run('caml cases', camlCases);
  run('wikirefs no parse cases', camlWikiNoParseCases);

});
```

Tests with wikirefs:

Import `wikiAttrCases` from [wikirefs-spec](https://github.com/wikibonsai/wikirefs/tree/main/spec).

```js
import { camlCases } from 'caml-spec';
import { wikiAttrCases } from 'wikirefs-spec';

describe('render caml + wikirefs; mkdn -> html', () => {

  run('caml cases', camlCases);
  run('w/ wikiattr cases', wikiAttrCases);

});
```

### Test Case Fields

```ts
{
    descr: 'prefixed; single; bool; all lowercase',
    mkdn: ':attribute::true\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-item">\n'
        + '<dt class="key__attribute">attribute</dt>\n'
        + '<dd><span class="attr bool">true</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': 'true',
      },
      value: {
        'attribute': true,
      },
      parse: {
        'attribute': [{
          type: 'bool',
          string: 'true',
          value: true,
        }],
      },
    },
  }
```

- `descr`: The test name / description.
- `mkdn`: The markdown syntax being tested.
- `html`: The intended rendered html.
- `data`: The expected data to be extracted. Keyed by attribute key, in three facets:
  - `string`: Attribute values as raw strings.
  - `value`: Attribute values coerced to their concrete types (what `load()` yields).
  - `parse`: Attribute values as `CamlValData` (`{ type, string, value }` -- the full type-resolution record from `resolve()`).

### Customizing Tests

Downstream implementations may need to adjust spec test expectations due to differences in how markdown renderers handle non-standardized features. Common reasons include:

- **Non-standardized HTML output** — Features like GFM strikethroughs (`<del>` vs `<s>`) and footnotes vary across renderers since they are not part of the core CommonMark specification.
- **Renderer-specific behavior** — Some renderers add extra attributes, wrap elements differently, or handle whitespace in ways that differ from the spec's expected HTML.
- **Platform-specific requirements** — Target environments may need additional attributes (e.g., `target="_blank"`) or different URL formats.

They can be altered in a test suite in the following manner -- this example is taken from [marked-caml](https://github.com/wikibonsai/marked-caml):

```js
import { camlCases } from 'caml-spec';

before(() => {
  // marked preserves leading whitespace...
  camlCases.forEach((testcase: CamlTestCase) => {
    // ...so this whitespace-flexible attr renders with a leading space...
    if (testcase.descr === '[[wikirefs]]; unprefixed; single; [[wikilinks]]; should not be processed here') {
      // ...that the spec's expected html doesn't carry.
      testcase.html = testcase.html.replace('<p>attribute ::</p>', '<p> attribute ::</p>');
    }
  });
});
```

Before running (inside the `before`), all test cases are looped through and changed by filtering tests by the `descr` and then applying the desired change to the test case's `html` -- or `mkdn` if so desired.

### Showcase

Human-facing caml *source* for a quick visual check of caml parsing/rendering. Two
files (in `showcase/pages/`):

| file              | ext   | scope     | authored  |
| ----------------- | ----- | --------- | --------- |
| `test.md`         | `.md` | curated   | by hand   |
| `test-verbose.md` | `.md` | all cases | generated |

- `test.md` is a small, curated live page (the one an SSG vendors) — the
  hand-authored source of truth.
- `test-verbose.md` is generated from every case in `spec/cases/` — a source
  catalog of the whole spec.

Both hold caml source. caml attributes render into a file-level attrbox, so run
these through a caml processor (or your SSG) to see the rendered output.

Regenerate `test-verbose.md` with `yarn gen:showcase` (only `test.md` is maintained
by hand).

#### Consuming Test Files (e.g. from an SSG)

`caml-spec` is primarily a **devDependency**, not a runtime dependency. The files
ship in the published package (see `files` in `package.json`), so they resolve by
path:

```js
const specTestMd = require.resolve('caml-spec/showcase/pages/test.md');
// copy it into your content dir at build time
```

Note: caml values in the showcase are mostly self-contained primitives. The one
wiki-value example (`[[fname-a]]`) renders as a plain string span in standalone
caml output; install [wikirefs](https://github.com/wikibonsai/wikirefs) alongside
to resolve it to a link.

## CSS Classnames

In the rendered attrbox, the key name itself carries its css classname: `<dt class="key__<slug>">` -- so stylesheets can color the key to match its graph links. Value spans carry structural classes only (`attr` + the value type, e.g. `attr string`); the raw key no longer rides along on the value.

When run alongside [wikirefs](https://github.com/wikibonsai/wikirefs), caml owns the attrbox: the `<dt>` keeps caml's `key__<slug>` (wikirefs-only attrboxes use `reftype__<slug>` instead).

### Single

All of the following examples should generate the same html:

```markdown
:attrtype::a-string

Some more text.

```

```markdown
Some more text.

:attrtype::a-string

```

(Optional colon prefixes)

```markdown
attrtype::a-string

Some more text.

```

Resulting HTML:

```html
<aside class="attrbox">
  <dl>
    <div class="attr-item">
      <dt class="key__attrtype">attrtype</dt>
      <dd><span class="attr string">a-string</span></dd>
    </div>
  </dl>
</aside>
<p>Some more text.</p>
```

### List

Lists are also supported. All of the following examples should generate the same html:

Comma-separated lists.

```markdown
:attrtype::string-a, string-b, string-c
```

Markdown-style bullet lists.

Dashes.

```markdown
:attrtype::
- string-a
- string-b
- string-c
```

Pluses.

```markdown
:attrtype::
+ string-a
+ string-b
+ string-c
```

Asterisks.

```markdown
:attrtype::
* string-a
* string-b
* string-c
```

Mixed.

```markdown
:attrtype::
- string-a
+ string-b
* string-c
```

Optional colon prefix.

```markdown
attrtype::
- string-a
- string-b
- string-c
```

Flexible whitespace (see note below).

```markdown
: attrtype ::
              - string-a
              - string-b
              - string-c
```

Resulting HTML:

```html
<aside class="attrbox">
  <dl>
    <div class="attr-item">
      <dt class="key__attrtype">attrtype</dt>
      <dd><span class="attr string">string-a</span></dd>
      <dd><span class="attr string">string-b</span></dd>
      <dd><span class="attr string">string-c</span></dd>
      <!-- etc. -->
    </div>
  </dl>
</aside>
```

Note on Flexible Whitespace:

The purpose of flexible whitespacing is for pretty-printing for better legibility:

```markdown
: type             :: string-a
: med-type         :: 
                      - string-b
                      - string-c
: longer-type-text :: 
                      - string-d
                      - string-e
                      - string-f
```

Optional whitespace is defined as follows:

- Attrtype text may be prefixed (between first colon `:` and attrtype text) or suffixed (between attrtype text and double colon `::`) by one space.
- List item prefix whitespace (space before the bullet `-*+`) can have any number of spaces.

### No Value

A `key::` with no value is **not** an attribute — it renders as plain text:

```markdown
attribute::
```

```html
<p>attribute::</p>
```

This holds even when a block immediately follows (no blank line): the bare key is not an attr, so the following block parses natively. Before a thematic break (which makes the key line a setext heading):

```markdown
attribute::
---
```

```html
<h2>attribute::</h2>
```

Before a blockquote:

```markdown
attribute::
> quote text
```

```html
<p>attribute::</p>
<blockquote>
<p>quote text</p>
</blockquote>
```

### Types

CAML supports different value types, [similar to YAML](https://yaml.org/spec/1.2.2/#chapter-10-recommended-schemas):

```markdown
: null-type    :: 
                 - null
                 - NULL
: boolean-type :: 
                 - true
                 - True
: int-type     :: 
                 - -12                          // negative
                 - 0                            // zero
                 - 12                           // positive
                 - 0x4                          // hexadecimal
                 - 0o4                          // octal
: float-type   :: 
                 - -4.20                        // negative
                 - 0                            // zero
                 - +4.20                        // positive
                 - 2.3e4                        // expo
                 - .inf                         // infinity
                 - .nan                         // not a number
: string-type  :: 
                 - string-no-whitespace
                 - string with whitespace
                 - 'string with single quotes'
                 - "string with double quotes"
: time-type    :: 
                 - 2001-12-15T02:59:43.1Z       // canonical
                 - 2001-12-14t21:59:43.10-05:00 // iso8601
                 - 2001-12-14 21:59:43.10 -5    // spaced
                 - 2002-12-14                   // date
: wiki-type    ::
                 - [[wiki]]                     // a wiki value (use in conjunction with [wikirefs](https://github.com/wikibonsai/wikirefs))
```

Types can be mixed, also similarly to YAML:

```
: attrtype :: null, False, 0, nothing, 2002-12-14, [[wikilink]]
```

### Multi-Line Strings

Multi-line strings follow the [YAML block scalar](https://yaml.org/spec/1.2.2/#81-block-scalar-headers) spec (see also [yaml-multiline.info](https://yaml-multiline.info/)).

They start with a style indicator. Continuation lines must be **indented by at least two spaces (or a tab)** and this is the default indentation in helper functions. A line indented less than two spaces ends the block, as does end of input. A blank line is kept as content only when the following line is still indented; otherwise it ends the block - so blank lines *within* an indented block are preserved (multi-paragraph values are supported). Common leading indentation is stripped, so you may indent further for readability without affecting the value.

Multi-line strings are **not** supported in comma-separated lists (`a, b, >`): the indicator is treated as a literal string value. Use a markdown (`-`) list or a single value for a multi-line string.

Style indicators determine how newlines within the block are handled:

- `>` folded: replaces newlines with spaces
- `|` literal: preserves newlines

An optional chomping indicator controls trailing newlines:

- (default) clip: adds a single trailing newline
- `-` strip: removes all trailing newlines
- `+` keep: preserves all trailing newlines

This gives six combinations: `>`, `>-`, `>+`, `|`, `|-`, `|+`.

Folded (`>`). Newlines become spaces, one trailing newline added (clip).

```markdown
: attrtype :: >
              This is a long string
              that spans multiple
              lines.

```

Resulting JSON:

```json
{
  "attrtype": "This is a long string that spans multiple lines.\n"
}
```

Literal (`|`). Newlines preserved, one trailing newline added (clip).

```markdown
: attrtype :: |
              This is a long string
              that spans multiple
              lines.

```

Resulting JSON:

```json
{
  "attrtype": "This is a long string\nthat spans multiple\nlines.\n"
}
```

Folded strip (`>-`). Newlines become spaces, no trailing newline.

```markdown
: attrtype :: >-
              This is a long string
              that spans multiple
              lines.

```

Resulting JSON:

```json
{
  "attrtype": "This is a long string that spans multiple lines."
}
```

Literal strip (`|-`). Newlines preserved, no trailing newline.

```markdown
: attrtype :: |-
              line one
              line two

```

Resulting JSON:

```json
{
  "attrtype": "line one\nline two"
}
```

Literal keep (`|+`). Newlines preserved, all trailing newlines preserved.

```markdown
: attrtype :: |+
              line one
              line two

```

Resulting JSON:

```json
{
  "attrtype": "line one\nline two\n\n"
}
```

Folded keep (`>+`). Newlines become spaces, all trailing newlines preserved.

```markdown
: attrtype :: >+
              line one
              line two

```

Resulting JSON:

```json
{
  "attrtype": "line one line two\n\n"
}
```

Note on Edge Cases:

Multi-paragraph (blank line within block). Folded mode produces a double space; literal mode preserves the blank line.

```markdown
: attrtype :: >
              line one

              line two

```

Resulting JSON:

```json
{
  "attrtype": "line one  line two\n"
}
```

Nested indentation. Literal mode preserves relative indentation.

```markdown
: attrtype :: |
              line one
                indented
              line two

```

Resulting JSON:

```json
{
  "attrtype": "line one\n  indented\nline two\n"
}
```

Empty block. Clip mode produces a single newline.

```markdown
: attrtype :: >

```

Resulting JSON:

```json
{
  "attrtype": "\n"
}
```

Note on HTML Rendering:

Newlines in multi-line values are rendered as `<br>` elements in the attrbox HTML:

Resulting HTML:

```html
<aside class="attrbox">
  <dl>
    <div class="attr-item">
      <dt class="key__attrtype">attrtype</dt>
      <dd><span class="attr string">line one<br>line two<br></span></dd>
    </div>
  </dl>
</aside>
```

Multi-line strings can appear in markdown-style lists:

```markdown
:attrtype::
- first
- |
  line one
  line two

```

Multi-line strings are NOT supported in comma-separated lists. Indicators in comma lists are treated as literal string values:

```markdown
:attrtype::first, >
```

```json
{
  "attrtype": ["first", ">"]
}
```
