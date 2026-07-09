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
import { camlCases, camlWithoutWikiRefsCases } from 'caml-spec';

describe('render caml; mkdn -> html', () => {

  run('caml cases', camlCases);
  run('w/o wikirefs cases', camlWithoutWikiRefsCases);

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

### Customizing Tests

#todo -- replace wikirefs examples with caml examples.

Downstream implementations may need to adjust spec test expectations due to differences in how markdown renderers handle non-standardized features. Common reasons include:

- **Non-standardized HTML output** — Features like GFM strikethroughs (`<del>` vs `<s>`) and footnotes vary across renderers since they are not part of the core CommonMark specification.
- **Renderer-specific behavior** — Some renderers add extra attributes, wrap elements differently, or handle whitespace in ways that differ from the spec's expected HTML.
- **Platform-specific requirements** — Target environments may need additional attributes (e.g., `target="_blank"`) or different URL formats.

They can be altered in a test suite in the following manner -- this example is taken from [markdown-it-wikirefs](https://github.com/wikibonsai/markdown-it-wikirefs):

```js
import { wikiRefCases } from 'wikirefs-spec';

before(() => {
  // markdown-it implements...
  wikiRefCases.forEach((testcase: WikiRefTestCase) => {
    // ...gfm strikethroughs differently by...
    if (testcase.descr.includes('gfm')
    && testcase.descr.includes('strikethrough')) {
      // ...using '<s>' instead of '<del>'
      testcase.html = testcase.html.replace(/del>/g, 's>');
    }
  });
});
```

Before running (inside the `before`), all test cases are looped through and changed by filtering tests by the `descr` and then applying the desired change to the test case's `html` -- or `mkdn` if so desired.

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
      <dt>attrtype</dt>
      <dd>a-string</dd>
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
      <dt>attrtype</dt>
      <dd>string-a</dd>
      <dd>string-b</dd>
      <dd>string-c</dd>
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
      <dt>attrtype</dt>
      <dd><span class="attr string attrtype">line one<br>line two<br></span></dd>
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
