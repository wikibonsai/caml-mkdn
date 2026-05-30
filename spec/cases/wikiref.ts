/*
 * note: newlines are added to the end of test values to illustrate that they
 * really are 'block' or 'flow' elements.
 */
import type { CamlTestCase } from '../types';


export const camlWikiRefsCases: CamlTestCase[] = [
  {
    descr: 'no val; prefixed; single; [[wikilinks]]; should not be processed here',
    mkdn: ': attribute ::\n\n[[wikilink]]\n',
    html: '<p>: attribute ::</p>\n<p>[[wikilink]]</p>\n',
    strData: {},
    valData: {},
    parseData: {},
  },
  {
    descr: '[[wikirefs]]; prefixed; single; [[wikilinks]]; should not interfere with empty string processing',
    mkdn: ': attribute :: \'\'\n\n[[wikilink]]\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">\'\'</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n'
        + '<p>[[wikilink]]</p>\n',
    strData: {
      'attribute': '\'\'',
    },
    valData: {
      'attribute': '\'\'',
    },
    parseData: {
      'attribute': [{
        type: 'string',
        string: '\'\'',
        value: '\'\'',
      }],
    },
  },
  {
    descr: '[[wikirefs]]; unprefixed; single; [[wikilinks]]; should not be processed here',
    mkdn: ' attribute ::\n\n[[wikilink]]\n',
    html: '<p>attribute ::</p>\n<p>[[wikilink]]</p>\n',
    strData: {},
    valData: {},
    parseData:  {},
  },
  {
    descr: '[[wikirefs]]; unprefixed; single; [[wikilinks]]; should not interfere with empty string processing',
    mkdn: 'attribute :: \'\'\n\n[[wikilink]]\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">\'\'</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n'
        + '<p>[[wikilink]]</p>\n',
    strData: {
      'attribute': '\'\'',
    },
    valData: {
      'attribute': '\'\'',
    },
    parseData: {
      'attribute': [{
        type: 'string',
        string: '\'\'',
        value: '\'\'',
      }],
    },
  },
  ////
  // single wiki value
  {
    descr: '[[wikirefs]]; prefixed; single; wiki value',
    mkdn: ': attribute :: [[wikilink]]\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr wiki attribute">[[wikilink]]</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': '[[wikilink]]',
    },
    valData: {
      'attribute': 'wikilink',
    },
    parseData: {
      'attribute': [{
        type: 'wiki',
        string: '[[wikilink]]',
        value: 'wikilink',
      }],
    },
  },
  {
    descr: '[[wikirefs]]; unprefixed; single; wiki value',
    mkdn: 'attribute :: [[wikilink]]\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr wiki attribute">[[wikilink]]</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': '[[wikilink]]',
    },
    valData: {
      'attribute': 'wikilink',
    },
    parseData: {
      'attribute': [{
        type: 'wiki',
        string: '[[wikilink]]',
        value: 'wikilink',
      }],
    },
  },
  {
    descr: '[[wikirefs]]; unprefixed; single; wiki value with spaces',
    mkdn: 'attribute :: [[my page]]\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr wiki attribute">[[my page]]</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': '[[my page]]',
    },
    valData: {
      'attribute': 'my page',
    },
    parseData: {
      'attribute': [{
        type: 'wiki',
        string: '[[my page]]',
        value: 'my page',
      }],
    },
  },
  {
    descr: '[[wikirefs]]; unprefixed; single; wiki value with hyphens',
    mkdn: 'attribute :: [[my-page]]\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr wiki attribute">[[my-page]]</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': '[[my-page]]',
    },
    valData: {
      'attribute': 'my-page',
    },
    parseData: {
      'attribute': [{
        type: 'wiki',
        string: '[[my-page]]',
        value: 'my-page',
      }],
    },
  },
  {
    descr: '[[wikirefs]]; unprefixed; single; invalid wiki; unclosed',
    mkdn: 'attribute :: [[invalid\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">[[invalid</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': '[[invalid',
    },
    valData: {
      'attribute': '[[invalid',
    },
    parseData: {
      'attribute': [{
        type: 'string',
        string: '[[invalid',
        value: '[[invalid',
      }],
    },
  },
  {
    descr: '[[wikirefs]]; unprefixed; single; invalid wiki; empty brackets',
    mkdn: 'attribute :: [[]]\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">[[]]</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': '[[]]',
    },
    valData: {
      'attribute': '[[]]',
    },
    parseData: {
      'attribute': [{
        type: 'string',
        string: '[[]]',
        value: '[[]]',
      }],
    },
  },
  ////
  // list cases
  // all wikilinks
  {
    descr: '[[wikirefs]]; prefixed; list; mkdn-separated; all wiki',
    mkdn: ':attribute::\n- [[wikiref1]]\n- [[wikiref2]]\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr wiki attribute">[[wikiref1]]</span></dd>\n'
        + '<dd><span class="attr wiki attribute">[[wikiref2]]</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': '\n- [[wikiref1]]\n- [[wikiref2]]',
    },
    valData: {
      'attribute': ['wikiref1', 'wikiref2'],
    },
    parseData: {
      'attribute': [
        {
          type: 'wiki',
          string: '[[wikiref1]]',
          value: 'wikiref1',
        },
        {
          type: 'wiki',
          string: '[[wikiref2]]',
          value: 'wikiref2',
        },
      ],
    },
  },
  {
    descr: '[[wikirefs]]; prefixed; list; comma-separated; all wiki',
    mkdn: ':attribute::[[wikiref1]],[[wikiref2]]\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr wiki attribute">[[wikiref1]]</span></dd>\n'
        + '<dd><span class="attr wiki attribute">[[wikiref2]]</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': '[[wikiref1]],[[wikiref2]]',
    },
    valData: {
      'attribute': ['wikiref1', 'wikiref2'],
    },
    parseData: {
      'attribute': [
        {
          type: 'wiki',
          string: '[[wikiref1]]',
          value: 'wikiref1',
        },
        {
          type: 'wiki',
          string: '[[wikiref2]]',
          value: 'wikiref2',
        },
      ],
    },
  },
  {
    descr: '[[wikirefs]]; unprefixed; list; mkdn-separated; all wiki',
    mkdn: 'attribute::\n- [[wikiref1]]\n- [[wikiref2]]\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr wiki attribute">[[wikiref1]]</span></dd>\n'
        + '<dd><span class="attr wiki attribute">[[wikiref2]]</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': '\n- [[wikiref1]]\n- [[wikiref2]]',
    },
    valData: {
      'attribute': ['wikiref1', 'wikiref2'],
    },
    parseData: {
      'attribute': [
        {
          type: 'wiki',
          string: '[[wikiref1]]',
          value: 'wikiref1',
        },
        {
          type: 'wiki',
          string: '[[wikiref2]]',
          value: 'wikiref2',
        },
      ],
    },
  },
  {
    descr: '[[wikirefs]]; unprefixed; list; comma-separated; all wiki',
    mkdn: 'attribute::[[wikiref1]],[[wikiref2]]\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr wiki attribute">[[wikiref1]]</span></dd>\n'
        + '<dd><span class="attr wiki attribute">[[wikiref2]]</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': '[[wikiref1]],[[wikiref2]]',
    },
    valData: {
      'attribute': ['wikiref1', 'wikiref2'],
    },
    parseData: {
      'attribute': [
        {
          type: 'wiki',
          string: '[[wikiref1]]',
          value: 'wikiref1',
        },
        {
          type: 'wiki',
          string: '[[wikiref2]]',
          value: 'wikiref2',
        },
      ],
    },
  },
  // mixed wikilinks and primitives
  {
    descr: '[[wikirefs]]; prefixed; list; mkdn-separated; mixed wiki and int',
    mkdn: ':attribute::\n- [[wikiref]]\n- 42\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr wiki attribute">[[wikiref]]</span></dd>\n'
        + '<dd><span class="attr int attribute">42</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': '\n- [[wikiref]]\n- 42',
    },
    valData: {
      'attribute': ['wikiref', 42],
    },
    parseData: {
      'attribute': [
        {
          type: 'wiki',
          string: '[[wikiref]]',
          value: 'wikiref',
        },
        {
          type: 'int',
          string: '42',
          value: 42,
        },
      ],
    },
  },
  {
    descr: '[[wikirefs]]; prefixed; list; comma-separated; mixed wiki and int',
    mkdn: ':attribute::[[wikiref]],42\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr wiki attribute">[[wikiref]]</span></dd>\n'
        + '<dd><span class="attr int attribute">42</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': '[[wikiref]],42',
    },
    valData: {
      'attribute': ['wikiref', 42],
    },
    parseData: {
      'attribute': [
        {
          type: 'wiki',
          string: '[[wikiref]]',
          value: 'wikiref',
        },
        {
          type: 'int',
          string: '42',
          value: 42,
        },
      ],
    },
  },
  {
    descr: '[[wikirefs]]; unprefixed; list; mkdn-separated; mixed wiki and int',
    mkdn: 'attribute::\n- [[wikiref]]\n- 42\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr wiki attribute">[[wikiref]]</span></dd>\n'
        + '<dd><span class="attr int attribute">42</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': '\n- [[wikiref]]\n- 42',
    },
    valData: {
      'attribute': ['wikiref', 42],
    },
    parseData: {
      'attribute': [
        {
          type: 'wiki',
          string: '[[wikiref]]',
          value: 'wikiref',
        },
        {
          type: 'int',
          string: '42',
          value: 42,
        },
      ],
    },
  },
  {
    descr: '[[wikirefs]]; unprefixed; list; comma-separated; mixed wiki and int',
    mkdn: 'attribute::[[wikiref]],42\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr wiki attribute">[[wikiref]]</span></dd>\n'
        + '<dd><span class="attr int attribute">42</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': '[[wikiref]],42',
    },
    valData: {
      'attribute': ['wikiref', 42],
    },
    parseData: {
      'attribute': [
        {
          type: 'wiki',
          string: '[[wikiref]]',
          value: 'wikiref',
        },
        {
          type: 'int',
          string: '42',
          value: 42,
        },
      ],
    },
  },
  {
    descr: '[[wikirefs]]; prefixed; list; mkdn-separated; mixed wiki and bool',
    mkdn: ':attribute::\n- [[wikiref]]\n- true\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr wiki attribute">[[wikiref]]</span></dd>\n'
        + '<dd><span class="attr bool attribute">true</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': '\n- [[wikiref]]\n- true',
    },
    valData: {
      'attribute': ['wikiref', true],
    },
    parseData: {
      'attribute': [
        {
          type: 'wiki',
          string: '[[wikiref]]',
          value: 'wikiref',
        },
        {
          type: 'bool',
          string: 'true',
          value: true,
        },
      ],
    },
  },
  {
    descr: '[[wikirefs]]; unprefixed; list; comma-separated; mixed wiki and bool',
    mkdn: 'attribute::[[wikiref]],true\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr wiki attribute">[[wikiref]]</span></dd>\n'
        + '<dd><span class="attr bool attribute">true</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': '[[wikiref]],true',
    },
    valData: {
      'attribute': ['wikiref', true],
    },
    parseData: {
      'attribute': [
        {
          type: 'wiki',
          string: '[[wikiref]]',
          value: 'wikiref',
        },
        {
          type: 'bool',
          string: 'true',
          value: true,
        },
      ],
    },
  },
  // edge cases
  {
    descr: '[[wikirefs]]; prefixed; list; comma-separated; mixed wiki and invalid wiki (fallback to string)',
    mkdn: ':attribute::[[wikiref]],[[invalid\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr wiki attribute">[[wikiref]]</span></dd>\n'
        + '<dd><span class="attr string attribute">[[invalid</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': '[[wikiref]],[[invalid',
    },
    valData: {
      'attribute': ['wikiref', '[[invalid'],
    },
    parseData: {
      'attribute': [
        {
          type: 'wiki',
          string: '[[wikiref]]',
          value: 'wikiref',
        },
        {
          type: 'string',
          string: '[[invalid',
          value: '[[invalid',
        },
      ],
    },
  },
  {
    descr: '[[wikirefs]]; unprefixed; no val; none is not allowed (see no-val cases)',
    mkdn: 'attribute::\n',
    html: '<p>attribute::</p>\n',
    strData: {},
    valData: {},
    parseData: {},
  },
  {
    descr: '[[wikirefs]]; prefixed; list; mkdn-separated; invalid wiki (fallback to string)',
    mkdn: ':attribute::\n- [[invalid\n- 42\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">[[invalid</span></dd>\n'
        + '<dd><span class="attr int attribute">42</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': '\n- [[invalid\n- 42',
    },
    valData: {
      'attribute': ['[[invalid', 42],
    },
    parseData: {
      'attribute': [
        {
          type: 'string',
          string: '[[invalid',
          value: '[[invalid',
        },
        {
          type: 'int',
          string: '42',
          value: 42,
        },
      ],
    },
  },
];
