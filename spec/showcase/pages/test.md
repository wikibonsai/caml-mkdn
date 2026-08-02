# CAML

A quick visual check of the core CAML (Colon Attribute Markup Language) syntax primitives. Each section shows the raw source (fenced, so it renders literally) followed by the live attribute.

CAML attributes are collected into a file-level **attrbox** which is rendered at the top of the page, as opposed to in-place. So, the live attributes below all surface together in that box, keyed by attribute name.

## Scalar values

```markdown
:scalar-attr::a
```

:scalar-attr::a

## Lists

#### Comma-separated

```markdown
:comma-list:: a, b, c
```

:comma-list:: a, b, c

#### Markdown (bullet) list

```markdown
:mkdn-list::
- a
- b
- c
```

:mkdn-list::
- a
- b
- c

## Formatting

#### Unprefixed

The leading colon is optional.

```markdown
unprefixed-attr:: some value
```

unprefixed-attr:: some value

#### Padded

Whitespace is flexible enough to pad keys and values.

```markdown
: padded-attr :: some value
```

: padded-attr :: some value

#### Pretty

Whitespace is flexible enough to prettify the alignment of keys and values.

```markdown
: pretty-attr-first  :: some value
: pretty-attr-second ::
                        - one value
                        - second value
```

: pretty-attr-first  :: some value
: pretty-attr-second ::
                        - one value
                        - second value

## Value Types

#### String

```markdown
:string-attr:: hello world
```

:string-attr:: hello world

#### Integer

```markdown
:int-attr:: 42
```

:int-attr:: 42

#### Float

```markdown
:float-attr:: 3.14
```

:float-attr:: 3.14

#### Boolean

```markdown
:bool-attr:: true
```

:bool-attr:: true

#### Null

```markdown
:null-attr:: null
```

:null-attr:: null

#### Date

```markdown
:date-attr:: 2025-01-30
```

:date-attr:: 2025-01-30

#### Wiki

(If using sibling [[[wikirefs]]](https://github.com/wikibonsai/wikirefs) packages)

```markdown
:wiki-attr:: [[fname-a]]
```

:wiki-attr:: [[fname-a]]
