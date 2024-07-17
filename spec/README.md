# caml-spec

[![A WikiBonsai Project](https://img.shields.io/badge/%F0%9F%8E%8B-A%20WikiBonsai%20Project-brightgreen)](https://github.com/wikibonsai/wikibonsai)
[![NPM package](https://img.shields.io/npm/v/caml-spec)](https://npmjs.org/package/caml-spec)

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
  <span class="attrbox-title">Attributes</span>
    <dl>
      <dt>attrtype</dt>
        <dd>a-string</dd>
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
  <span class="attrbox-title">Attributes</span>
    <dl>
      <dt>attrtype</dt>
        <dd>string-a</dd>
        <dd>string-b</dd>
        <dd>string-c</dd>
        <!-- etc. -->
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
