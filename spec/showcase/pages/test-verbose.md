# CAML (All Spec Cases)

Every caml spec case, shown as source. caml attributes are collected into a file-level attrbox (they do not render at their source location) — run this through a caml processor (or your SSG) to see the rendered attrbox output.

> Generated from the caml-spec test cases by `showcase/generate.ts` — do not edit by hand; run `yarn gen:showcase`.

## Prefixed

### prefixed; single; null; all lowercase

```markdown
:attribute::null
```

### prefixed; single; null; camelCase

```markdown
:attribute::Null
```

### prefixed; single; null; all uppercase

```markdown
:attribute::NULL
```

### prefixed; single; bool; all lowercase

```markdown
:attribute::true
```

### prefixed; single; bool; camelCase

```markdown
:attribute::True
```

### prefixed; single; bool; all uppercase

```markdown
:attribute::TRUE
```

### prefixed; single; int; canonical

```markdown
:attribute::1
```

### prefixed; single; int; octal

```markdown
:attribute::0o14
```

### prefixed; single; int; hexadecimal

```markdown
:attribute::0xC
```

### prefixed; single; float; canonical

```markdown
:attribute::1.23015
```

### prefixed; single; float; exp -- exponential

```markdown
:attribute::12.3015e+02
```

### prefixed; single; float; nan -- not a number

```markdown
:attribute::.nan
```

### prefixed; single; time; canonical

```markdown
:attribute::2001-12-15T02:59:43.1Z
```

### prefixed; single; time; iso8601

```markdown
:attribute::2001-12-14t21:59:43.10-05:00
```

### prefixed; single; time; spaced

```markdown
:attribute::2001-12-14 21:59:43.10 -5
```

### prefixed; single; time; date only

```markdown
:attribute::2001-12-14
```

### prefixed; single; time; int

```markdown
:attribute::+12:00
```

### prefixed; single; time; float

```markdown
:attribute::+12:00.123
```

### prefixed; single; string; single-line; w/o whitespace

```markdown
:attribute::this-is-a-string
```

### prefixed; single; string; single-line; w/ whitespace

```markdown
:attribute::this is a string
```

### prefixed; single; string; single-line; quotes (double); escape commas

```markdown
:attribute::"this, is, a, string"
```

### prefixed; single; string; multi-line; folded (>); basic

```markdown
:attribute:: >
  line one
  line two
```

### prefixed; single; string; multi-line; folded (>); with trailing newline

```markdown
:attribute:: >
  line one
  line two
```

### prefixed; single; string; multi-line; literal (|); basic

```markdown
:attribute:: |
  line one
  line two
```

### prefixed; single; string; multi-line; folded chomped (>-); strips trailing newlines

```markdown
:attribute:: >-
  line one
  line two
```

### prefixed; single; string; multi-line; folded (>); empty block

```markdown
:attribute:: >
```

### prefixed; single; string; multi-line; folded (>); multi-paragraph

```markdown
:attribute:: >
  line one

  line two
```

### prefixed; single; string; multi-line; literal (|); multi-paragraph

```markdown
:attribute:: |
  line one

  line two
```

### prefixed; single; string; multi-line; literal (|); nested indentation

```markdown
:attribute:: |
  line one
    indented
  line two
```

### prefixed; single; string; multi-line; literal strip (|-); strips trailing newlines

```markdown
:attribute:: |-
  line one
  line two
```

### prefixed; single; string; multi-line; literal keep (|+); preserves trailing newlines

```markdown
:attribute:: |+
  line one
  line two
```

### prefixed; single; string; multi-line; folded keep (>+); preserves trailing newlines

```markdown
:attribute:: >+
  line one
  line two
```

### prefixed; single; string; multi-line; adjacent; two multi-line attrs back-to-back

```markdown
:description:: >
  This is folded text.
:notes:: |
  line one
  line two
```

### prefixed; single; string; multi-line; adjacent; multi-line followed by regular attr

```markdown
:description:: >
  folded text.
:count:: 42
```

### prefixed; single; string; multi-line; adjacent; regular attr followed by multi-line

```markdown
:title:: Doc
:description:: >
  folded text.
```

### prefixed; single; string; multi-line; adjacent; four indicators back-to-back

```markdown
:a:: >
  folded
:b:: |
  literal
:c:: >-
  strip-folded
:d:: |-
  strip-literal
```

### prefixed; single; string; multi-line; adjacent; multi-line with content preserved

```markdown
:title:: Test
:desc:: >
  folded text.
:tags:: a, b, c

Some paragraph content.
```

### prefixed; single; escaped; code span

```markdown
`:attribute:: value`
```

### prefixed; single; escaped; fenced code block

````markdown
```
:attribute:: value
```
````

### prefixed; single; escaped; indented code block (4 spaces)

```markdown
    :attribute:: value
```

### prefixed; single; w/ other mkdn constructs; nested; blockquote; not allowed inside

```markdown
> :attribute:: value
```

### prefixed; single; w/ other mkdn constructs; nested; list; not allowed inside

```markdown
- :attribute:: value
```

### prefixed; single; w/ other mkdn constructs; near headers; before

```markdown
:attribute:: value

# heading
```

### prefixed; single; w/ other mkdn constructs; near headers; after

```markdown
# heading

:attribute:: value
```

### prefixed; single; w/ other mkdn constructs; near blockquotes; before

```markdown
:attribute:: value

> some text
```

### prefixed; single; w/ other mkdn constructs; near blockquotes; after

```markdown
> some text

:attribute:: value
```

### prefixed; single; w/ other mkdn constructs; near lists; before

```markdown
:attribute:: value

- list item
```

### prefixed; single; w/ other mkdn constructs; near lists; after

```markdown
- list item

:attribute:: value
```

### prefixed; single; multi-line folded; stops at blank line; next attr separate

```markdown
:desc:: >
  folded text
  here

:title:: Test
```

### prefixed; single; multi-line literal; stops at blank line; next attr separate

```markdown
:poem:: |
  roses are red
  violets are blue

:author:: someone
```

### prefixed; single; multi-line folded; stops before non-indented text

```markdown
:description:: >
  This is a long description
  that spans multiple lines
  and gets folded into one.

(see attrbox for output)
```

### prefixed; single; multi-line literal; blank line within block preserved

```markdown
:poem:: |
  verse one

  verse two

not indented
```

### prefixed; list; comma-separated; null; all lowercase

```markdown
:attribute::null,null
```

### prefixed; list; comma-separated; null; camelCase

```markdown
:attribute::Null,Null
```

### prefixed; list; comma-separated; null; all lowercase

```markdown
:attribute::NULL,NULL
```

### prefixed; list; comma-separated; bool; all lowercase

```markdown
:attribute::true,false
```

### prefixed; list; comma-separated; bool; camelCase

```markdown
:attribute::True,False
```

### prefixed; list; comma-separated; bool; all uppercase

```markdown
:attribute::TRUE,FALSE
```

### prefixed; list; comma-separated; int; canonical

```markdown
:attribute::10,-123
```

### prefixed; list; comma-separated; int; octal

```markdown
:attribute::0o10,0o123
```

### prefixed; list; comma-separated; int; hexadecimal

```markdown
:attribute::0xC,0x014D
```

### prefixed; list; comma-separated; float; canonical

```markdown
:attribute::1.23015,-1.23015
```

### prefixed; list; comma-separated; float; exp -- exponential

```markdown
:attribute::12.3015e+02,12.3015e-02
```

### prefixed; list; comma-separated; float; nan -- not a number

```markdown
:attribute::.NaN,.nan
```

### prefixed; list; comma-separated; time; canonical

```markdown
:attribute::2001-12-15T02:59:43.1Z,2022-12-15T02:59:43.1Z
```

### prefixed; list; comma-separated; time; iso8601

```markdown
:attribute::2001-12-14t21:59:43.10-05:00,2022-12-14t21:59:43.10-05:00
```

### prefixed; list; comma-separated; time; spaced

```markdown
:attribute::2001-12-14 21:59:43.10 -5,2022-12-14 21:59:43.10 -5
```

### prefixed; list; comma-separated; time; date only

```markdown
:attribute::2001-12-14,2022-12-14
```

### prefixed; list; comma-separated; time; int

```markdown
:attribute::+12:00,12:00
```

### prefixed; list; comma-separated; time; float

```markdown
:attribute::+12:00.123,12:00.123
```

### prefixed; list; comma-separated; string; single-line; w/o whitespace

```markdown
:attribute::this-is-a-string,and-another-string
```

### prefixed; list; comma-separated; string; single-line; w/ whitespace

```markdown
:attribute::this is a string,and another string
```

### prefixed; list; comma-separated; string; single-line; w/o whitespace; quotes (double); comma

```markdown
:attribute::"this-is,a-string",and-another-string
```

### prefixed; list; comma-separated; string; multi-line; not supported (indicator treated as literal)

```markdown
:attribute::first, >
```

### prefixed; list; mkdn-separated; null; all lowercase

```markdown
:attribute::
- null
- null
```

### prefixed; list; mkdn-separated; null; camelCase

```markdown
:attribute::
- Null
- Null
```

### prefixed; list; mkdn-separated; null; all uppercase

```markdown
:attribute::
- NULL
- NULL
```

### prefixed; list; mkdn-separated; bool; all lowercase

```markdown
:attribute::
- true
- false
```

### prefixed; list; mkdn-separated; bool; camelCase

```markdown
:attribute::
- True
- False
```

### prefixed; list; mkdn-separated; bool; all uppercase

```markdown
:attribute::
- TRUE
- FALSE
```

### prefixed; list; mkdn-separated; int; canonical

```markdown
:attribute::
- 10
- -123
```

### prefixed; list; mkdn-separated; int; octal

```markdown
:attribute::
- 0o10
- 0o123
```

### prefixed; list; mkdn-separated; int; hexadecimal

```markdown
:attribute::
- 0xC
- 0x014D
```

### prefixed; list; mkdn-separated; float; canonical

```markdown
:attribute::
- 1.23015
- -1.23015
```

### prefixed; list; mkdn-separated; float; exp -- exponential

```markdown
:attribute::
- 12.3015e+02
- 12.3015e-02
```

### prefixed; list; mkdn-separated; float; nan -- not a number

```markdown
:attribute::
- .NaN
- .nan
```

### prefixed; list; mkdn-separated; time; canonical

```markdown
:attribute::
- 2001-12-15T02:59:43.1Z
- 2022-12-15T02:59:43.1Z
```

### prefixed; list; mkdn-separated; time; iso8601

```markdown
:attribute::
- 2001-12-14t21:59:43.10-05:00
- 2022-12-14t21:59:43.10-05:00
```

### prefixed; list; mkdn-separated; time; spaced

```markdown
:attribute::
- 2001-12-14 21:59:43.10 -5
- 2022-12-14 21:59:43.10 -5
```

### prefixed; list; mkdn-separated; time; date only

```markdown
:attribute::
- 2001-12-14
- 2022-12-14
```

### prefixed; list; mkdn-separated; time; int

```markdown
:attribute::
- +12:00
- 12:00
```

### prefixed; list; mkdn-separated; time; float

```markdown
:attribute::
- +12:00.123
- 12:00.123
```

### prefixed; list; mkdn-separated; string; single-line; w/o whitespace

```markdown
:attribute::
- this-is-a-string
- and-another-string
```

### prefixed; list; mkdn-separated; string; single-line; w/ whitespace

```markdown
:attribute::
- this is a string
- and another string
```

### prefixed; list; mkdn-separated; string; single-line; w/o whitespace; quotes (double); comma

```markdown
:attribute::
- "this-is,a-string"
- and-another-string
```

### prefixed; list; mkdn-separated; string; multi-line; folded (>); basic

```markdown
:attribute::
- first
- >
  line one
  line two
```

### prefixed; list; mkdn-separated; string; multi-line; folded (>); with trailing newline

```markdown
:attribute::
- first
- >
  line one
  line two
```

### prefixed; list; mkdn-separated; string; multi-line; literal (|); basic

```markdown
:attribute::
- first
- |
  line one
  line two
```

### prefixed; list; mkdn-separated; string; multi-line; folded chomped (>-); strips trailing newlines

```markdown
:attribute::
- first
- >-
  line one
  line two
```

### prefixed; list; mkdn-separated; string; multi-line; literal strip (|-); strips trailing newlines

```markdown
:attribute::
- first
- |-
  line one
  line two
```

### prefixed; list; mkdn-separated; string; multi-line; literal keep (|+); preserves trailing newlines

```markdown
:attribute::
- first
- |+
  line one
  line two
```

### prefixed; list; mkdn-separated; string; multi-line; folded keep (>+); preserves trailing newlines

```markdown
:attribute::
- first
- >+
  line one
  line two
```

### prefixed; list; mkdn-separated; string; multi-line; folded (>); empty block

```markdown
:attribute::
- first
- >
```

## Unprefixed

### unprefixed; single; null; all lowercase

```markdown
attribute::null
```

### unprefixed; single; null; camelCase

```markdown
attribute::Null
```

### unprefixed; single; null; all uppercase

```markdown
attribute::NULL
```

### unprefixed; single; bool; all lowercase

```markdown
attribute::true
```

### unprefixed; single; bool; camelCase

```markdown
attribute::True
```

### unprefixed; single; bool; all uppercase

```markdown
attribute::TRUE
```

### unprefixed; single; int; canonical

```markdown
attribute::1
```

### unprefixed; single; int; octal

```markdown
attribute::0o14
```

### unprefixed; single; int; hexadecimal

```markdown
attribute::0xC
```

### unprefixed; single; float; canonical

```markdown
attribute::1.23015
```

### unprefixed; single; float; exp -- exponential

```markdown
attribute::12.3015e+02
```

### unprefixed; single; float; nan -- not a number

```markdown
attribute::.nan
```

### unprefixed; single; time; canonical

```markdown
attribute::2001-12-15T02:59:43.1Z
```

### unprefixed; single; time; iso8601

```markdown
attribute::2001-12-14t21:59:43.10-05:00
```

### unprefixed; single; time; spaced

```markdown
attribute::2001-12-14 21:59:43.10 -5
```

### unprefixed; single; time; date only

```markdown
attribute::2001-12-14
```

### unprefixed; single; time; int

```markdown
attribute::+12:00
```

### unprefixed; single; time; float

```markdown
attribute::+12:00.123
```

### unprefixed; single; string; single-line; w/o whitespace

```markdown
attribute::this-is-a-string
```

### unprefixed; single; string; single-line; w/ whitespace

```markdown
attribute::this is a string
```

### unprefixed; single; string; single-line; quotes (double)

```markdown
attribute::"this is a string"
```

### unprefixed; single; string; single-line; quotes (double); escape commas

```markdown
attribute::"this, is, a, string"
```

### unprefixed; single; string; single-line; quotes (single)

```markdown
attribute::'this is a string'
```

### unprefixed; single; string; single-line; quotes (single); escape commas

```markdown
attribute::'this, is, a, string'
```

### unprefixed; single; string; multi-line; folded (>); basic

```markdown
attribute:: >
  line one
  line two
```

### unprefixed; single; string; multi-line; folded (>); with trailing newline

```markdown
attribute:: >
  line one
  line two
```

### unprefixed; single; string; multi-line; literal (|); basic

```markdown
attribute:: |
  line one
  line two
```

### unprefixed; single; string; multi-line; folded chomped (>-); strips trailing newlines

```markdown
attribute:: >-
  line one
  line two
```

### unprefixed; single; string; multi-line; folded (>); empty block

```markdown
attribute:: >
```

### unprefixed; single; string; multi-line; folded (>); multi-paragraph

```markdown
attribute:: >
  line one

  line two
```

### unprefixed; single; string; multi-line; literal (|); multi-paragraph

```markdown
attribute:: |
  line one

  line two
```

### unprefixed; single; string; multi-line; literal (|); nested indentation

```markdown
attribute:: |
  line one
    indented
  line two
```

### unprefixed; single; string; multi-line; literal strip (|-); strips trailing newlines

```markdown
attribute:: |-
  line one
  line two
```

### unprefixed; single; string; multi-line; literal keep (|+); preserves trailing newlines

```markdown
attribute:: |+
  line one
  line two
```

### unprefixed; single; string; multi-line; folded keep (>+); preserves trailing newlines

```markdown
attribute:: >+
  line one
  line two
```

### unprefixed; single; string; multi-line; adjacent; two multi-line attrs back-to-back

```markdown
description:: >
  This is folded text.
notes:: |
  line one
  line two
```

### unprefixed; single; string; multi-line; adjacent; multi-line followed by regular attr

```markdown
description:: >
  folded text.
count:: 42
```

### unprefixed; single; string; multi-line; adjacent; regular attr followed by multi-line

```markdown
title:: Doc
description:: >
  folded text.
```

### unprefixed; single; string; multi-line; adjacent; four indicators back-to-back

```markdown
a:: >
  folded
b:: |
  literal
c:: >-
  strip-folded
d:: |-
  strip-literal
```

### unprefixed; single; string; multi-line; adjacent; multi-line with content preserved

```markdown
title:: Test
desc:: >
  folded text.
tags:: a, b, c

Some paragraph content.
```

### unprefixed; single; escaped; code span

```markdown
`attribute:: value`
```

### unprefixed; single; escaped; fenced code block

````markdown
```
attribute:: value
```
````

### unprefixed; single; escaped; indented code block (4 spaces)

```markdown
    attribute:: value
```

### unprefixed; single; w/ other mkdn constructs; nested; blockquote; not allowed inside

```markdown
> attribute:: value
```

### unprefixed; single; w/ other mkdn constructs; nested; list; not allowed inside

```markdown
- attribute:: value
```

### unprefixed; single; w/ other mkdn constructs; near headers; before

```markdown
attribute:: value

# heading
```

### unprefixed; single; w/ other mkdn constructs; near headers; after

```markdown
# heading

attribute:: value
```

### unprefixed; single; w/ other mkdn constructs; near blockquotes; before

```markdown
attribute:: value

> some text
```

### unprefixed; single; w/ other mkdn constructs; near blockquotes; after

```markdown
> some text

attribute:: value
```

### unprefixed; single; w/ other mkdn constructs; near lists; before

```markdown
attribute:: value

- list item
```

### unprefixed; single; w/ other mkdn constructs; near lists; after

```markdown
- list item

attribute:: value
```

### unprefixed; single; multi-line folded; stops at blank line; next attr separate

```markdown
desc:: >
  folded text
  here

title:: Test
```

### unprefixed; single; multi-line literal; stops at blank line; next attr separate

```markdown
poem:: |
  roses are red
  violets are blue

author:: someone
```

### unprefixed; list; comma-separated; null; all lowercase

```markdown
attribute::null,null
```

### unprefixed; list; comma-separated; null; camelCase

```markdown
attribute::Null,Null
```

### unprefixed; list; comma-separated; null; all lowercase

```markdown
attribute::NULL,NULL
```

### unprefixed; list; comma-separated; bool; all lowercase

```markdown
attribute::true,false
```

### unprefixed; list; comma-separated; bool; camelCase

```markdown
attribute::True,False
```

### unprefixed; list; comma-separated; bool; all uppercase

```markdown
attribute::TRUE,FALSE
```

### unprefixed; list; comma-separated; int; canonical

```markdown
attribute::10,-123
```

### unprefixed; list; comma-separated; int; octal

```markdown
attribute::0o10,0o123
```

### unprefixed; list; comma-separated; int; hexadecimal

```markdown
attribute::0xC,0x014D
```

### unprefixed; list; comma-separated; float; canonical

```markdown
attribute::1.23015,-1.23015
```

### unprefixed; list; comma-separated; float; exp -- exponential

```markdown
attribute::12.3015e+02,12.3015e-02
```

### unprefixed; list; comma-separated; float; nan -- not a number

```markdown
attribute::.NaN,.nan
```

### unprefixed; list; comma-separated; time; canonical

```markdown
attribute::2001-12-15T02:59:43.1Z,2022-12-15T02:59:43.1Z
```

### unprefixed; list; comma-separated; time; iso8601

```markdown
attribute::2001-12-14t21:59:43.10-05:00,2022-12-14t21:59:43.10-05:00
```

### unprefixed; list; comma-separated; time; spaced

```markdown
attribute::2001-12-14 21:59:43.10 -5,2022-12-14 21:59:43.10 -5
```

### unprefixed; list; comma-separated; time; date only

```markdown
attribute::2001-12-14,2022-12-14
```

### unprefixed; list; comma-separated; time; int

```markdown
attribute::+12:00,12:00
```

### unprefixed; list; comma-separated; time; float

```markdown
attribute::+12:00.123,12:00.123
```

### unprefixed; list; comma-separated; string; single-line; w/o whitespace

```markdown
attribute::this-is-a-string,and-another-string
```

### unprefixed; list; comma-separated; string; single-line; w/ whitespace

```markdown
attribute::this is a string,and another string
```

### unprefixed; list; comma-separated; string; single-line; w/o whitespace; quotes (double); comma

```markdown
attribute::"this-is,a-string",and-another-string
```

### unprefixed; list; comma-separated; string; multi-line; not supported (indicator treated as literal)

```markdown
attribute::first, >
```

### unprefixed; list; mkdn-separated; null; all lowercase

```markdown
attribute::
- null
- null
```

### unprefixed; list; mkdn-separated; null; camelCase

```markdown
attribute::
- Null
- Null
```

### unprefixed; list; mkdn-separated; null; all uppercase

```markdown
attribute::
- NULL
- NULL
```

### unprefixed; list; mkdn-separated; bool; all lowercase

```markdown
attribute::
- true
- false
```

### unprefixed; list; mkdn-separated; bool; camelCase

```markdown
attribute::
- True
- False
```

### unprefixed; list; mkdn-separated; bool; all uppercase

```markdown
attribute::
- TRUE
- FALSE
```

### unprefixed; list; mkdn-separated; int; canonical

```markdown
attribute::
- 10
- -123
```

### unprefixed; list; mkdn-separated; int; octal

```markdown
attribute::
- 0o10
- 0o123
```

### unprefixed; list; mkdn-separated; int; hexadecimal

```markdown
attribute::
- 0xC
- 0x014D
```

### unprefixed; list; mkdn-separated; float; canonical

```markdown
attribute::
- 1.23015
- -1.23015
```

### unprefixed; list; mkdn-separated; float; exp -- exponential

```markdown
attribute::
- 12.3015e+02
- 12.3015e-02
```

### unprefixed; list; mkdn-separated; float; nan -- not a number

```markdown
attribute::
- .NaN
- .nan
```

### unprefixed; list; mkdn-separated; time; canonical

```markdown
attribute::
- 2001-12-15T02:59:43.1Z
- 2022-12-15T02:59:43.1Z
```

### unprefixed; list; mkdn-separated; time; iso8601

```markdown
attribute::
- 2001-12-14t21:59:43.10-05:00
- 2022-12-14t21:59:43.10-05:00
```

### unprefixed; list; mkdn-separated; time; spaced

```markdown
attribute::
- 2001-12-14 21:59:43.10 -5
- 2022-12-14 21:59:43.10 -5
```

### unprefixed; list; mkdn-separated; time; date only

```markdown
attribute::
- 2001-12-14
- 2022-12-14
```

### unprefixed; list; mkdn-separated; time; int

```markdown
attribute::
- +12:00
- 12:00
```

### unprefixed; list; mkdn-separated; time; float

```markdown
attribute::
- +12:00.123
- 12:00.123
```

### unprefixed; list; mkdn-separated; string; single-line; w/o whitespace

```markdown
attribute::
- this-is-a-string
- and-another-string
```

### unprefixed; list; mkdn-separated; string; single-line; w/ whitespace

```markdown
attribute::
- this is a string
- and another string
```

### unprefixed; list; mkdn-separated; string; single-line; w/o whitespace; quotes (double); comma

```markdown
attribute::
- "this-is,a-string"
- and-another-string
```

### unprefixed; list; mkdn-separated; string; multi-line; folded (>); basic

```markdown
attribute::
- first
- >
  line one
  line two
```

### unprefixed; list; mkdn-separated; string; multi-line; folded (>); with trailing newline

```markdown
attribute::
- first
- >
  line one
  line two
```

### unprefixed; list; mkdn-separated; string; multi-line; literal (|); basic

```markdown
attribute::
- first
- |
  line one
  line two
```

### unprefixed; list; mkdn-separated; string; multi-line; folded chomped (>-); strips trailing newlines

```markdown
attribute::
- first
- >-
  line one
  line two
```

### unprefixed; list; mkdn-separated; string; multi-line; literal strip (|-); strips trailing newlines

```markdown
attribute::
- first
- |-
  line one
  line two
```

### unprefixed; list; mkdn-separated; string; multi-line; literal keep (|+); preserves trailing newlines

```markdown
attribute::
- first
- |+
  line one
  line two
```

### unprefixed; list; mkdn-separated; string; multi-line; folded keep (>+); preserves trailing newlines

```markdown
attribute::
- first
- >+
  line one
  line two
```

### unprefixed; list; mkdn-separated; string; multi-line; folded (>); empty block

```markdown
attribute::
- first
- >
```

## Wiki Values

### [[wikirefs]]; prefixed; single; wiki value

```markdown
: attribute :: [[fname-a]]
```

### [[wikirefs]]; unprefixed; single; wiki value

```markdown
attribute :: [[fname-a]]
```

### [[wikirefs]]; unprefixed; single; wiki value with spaces

```markdown
attribute :: [[fname-a]]
```

### [[wikirefs]]; unprefixed; single; wiki value with hyphens

```markdown
attribute :: [[fname-a]]
```

### [[wikirefs]]; unprefixed; single; invalid wiki; unclosed

```markdown
attribute :: [[invalid
```

### [[wikirefs]]; unprefixed; single; invalid wiki; empty brackets

```markdown
attribute :: [[]]
```

### [[wikirefs]]; prefixed; list; mkdn-separated; all wiki

```markdown
:attribute::
- [[fname-a]]
- [[fname-b]]
```

### [[wikirefs]]; prefixed; list; comma-separated; all wiki

```markdown
:attribute::[[fname-a]],[[fname-b]]
```

### [[wikirefs]]; unprefixed; list; mkdn-separated; all wiki

```markdown
attribute::
- [[fname-a]]
- [[fname-b]]
```

### [[wikirefs]]; unprefixed; list; comma-separated; all wiki

```markdown
attribute::[[fname-a]],[[fname-b]]
```

### [[wikirefs]]; prefixed; list; mkdn-separated; mixed wiki and int

```markdown
:attribute::
- [[fname-a]]
- 42
```

### [[wikirefs]]; prefixed; list; comma-separated; mixed wiki and int

```markdown
:attribute::[[fname-a]],42
```

### [[wikirefs]]; unprefixed; list; mkdn-separated; mixed wiki and int

```markdown
attribute::
- [[fname-a]]
- 42
```

### [[wikirefs]]; unprefixed; list; comma-separated; mixed wiki and int

```markdown
attribute::[[fname-a]],42
```

### [[wikirefs]]; prefixed; list; mkdn-separated; mixed wiki and bool

```markdown
:attribute::
- [[fname-a]]
- true
```

### [[wikirefs]]; unprefixed; list; comma-separated; mixed wiki and bool

```markdown
attribute::[[fname-a]],true
```

### [[wikirefs]]; prefixed; list; comma-separated; mixed wiki and bool

```markdown
:attribute::[[fname-a]],true
```

### [[wikirefs]]; unprefixed; list; mkdn-separated; mixed wiki and bool

```markdown
attribute::
- [[fname-a]]
- true
```

### [[wikirefs]]; prefixed; list; comma-separated; mixed wiki and string

```markdown
:attribute::[[fname-a]],hello
```

### [[wikirefs]]; unprefixed; list; mkdn-separated; mixed wiki and string

```markdown
attribute::
- [[fname-a]]
- hello
```

### [[wikirefs]]; prefixed; list; comma-separated; mixed wiki and float

```markdown
:attribute::[[fname-a]],1.5
```

### [[wikirefs]]; unprefixed; list; mkdn-separated; mixed wiki and float

```markdown
attribute::
- [[fname-a]]
- 1.5
```

### [[wikirefs]]; prefixed; list; comma-separated; mixed wiki and time

```markdown
:attribute::[[fname-a]],2001-12-14
```

### [[wikirefs]]; unprefixed; list; mkdn-separated; mixed wiki and time

```markdown
attribute::
- [[fname-a]]
- 2001-12-14
```

### [[wikirefs]]; prefixed; list; comma-separated; mixed wiki and null

```markdown
:attribute::[[fname-a]],null
```

### [[wikirefs]]; unprefixed; list; mkdn-separated; mixed wiki and null

```markdown
attribute::
- [[fname-a]]
- null
```

### [[wikirefs]]; prefixed; list; comma-separated; mixed wiki and invalid wiki (fallback to string)

```markdown
:attribute::[[fname-a]],[[invalid
```

### [[wikirefs]]; unprefixed; no val; none is not allowed (see no-val cases)

```markdown
attribute::
```

### [[wikirefs]]; prefixed; list; mkdn-separated; invalid wiki (fallback to string)

```markdown
:attribute::
- [[invalid
- 42
```

### no val; prefixed; single; [[wikirefs]]; should not be processed here

```markdown
: attribute ::

[[fname-a]]
```

### [[wikirefs]]; prefixed; single; [[wikilinks]]; should not interfere with empty string processing

```markdown
: attribute :: ''

[[fname-a]]
```

### [[wikirefs]]; unprefixed; single; [[wikilinks]]; should not be processed here

```markdown
 attribute ::

[[fname-a]]
```

### [[wikirefs]]; unprefixed; single; [[wikilinks]]; should not interfere with empty string processing

```markdown
attribute :: ''

[[fname-a]]
```

## No Value

### no val; prefixed; single; no caml value; none is not allowed

```markdown
:attribute::
```

### no val; unprefixed; single; no caml value; none is not allowed

```markdown
attribute::
```

### no val; unprefixed; single; immediately before thematic break (setext); none is not allowed

```markdown
attribute::
---
```

### no val; prefixed; single; immediately before thematic break (setext); none is not allowed

```markdown
:attribute::
---
```

### no val; unprefixed; single; immediately before blockquote; none is not allowed

```markdown
attribute::
> quote text
```

### no val; prefixed; single; immediately before blockquote; none is not allowed

```markdown
:attribute::
> quote text
```

## Invalid

### prefixed; single; date; invalid; month out of range

```markdown
:attribute::2025-13-45
```

### prefixed; single; date; invalid; day out of range

```markdown
:attribute::2025-02-30
```

### prefixed; single; date; invalid; month zero

```markdown
:attribute::2025-00-01
```

### prefixed; single; date; invalid; non-zero-padded

```markdown
:attribute::2025-1-30
```

### prefixed; single; date; invalid; non-zero-padded month and day

```markdown
:attribute::2025-1-1
```

### prefixed; single; date; zero-padded

```markdown
:attribute::2025-01-30
```

### prefixed; single; int; invalid; incomplete hex

```markdown
:attribute::0x
```

### prefixed; single; int; invalid; non-hex digits

```markdown
:attribute::0xZZ
```

### prefixed; single; int; invalid; non-octal digit

```markdown
:attribute::0o8
```

### prefixed; single; int; invalid; trailing letters

```markdown
:attribute::12abc
```

### prefixed; single; float; invalid; two decimal points

```markdown
:attribute::1.2.3
```

### prefixed; single; float; invalid; bare exponent

```markdown
:attribute::1e
```

### prefixed; single; float; invalid; double dot

```markdown
:attribute::1..2
```

### prefixed; single; bool; invalid; typo

```markdown
:attribute::treu
```

### prefixed; single; bool; invalid; near-word

```markdown
:attribute::truthy
```

