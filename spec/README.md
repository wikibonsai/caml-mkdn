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

Multi-line strings follow the [YAML block scalar](https://yaml.org/spec/1.2.2/#81-block-scalar-headers) spec (see also [yaml-multiline.info](https://yaml-multiline.info/)). They start with a style indicator and terminate when a line with indentation of 0 is detected.

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
