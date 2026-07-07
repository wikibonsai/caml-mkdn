/*
 * note: newlines are added to the end of test values to illustrate that they
 * really are 'block' or 'flow' elements.
 */
import type { CamlTestCase } from '../types';


export const camlWikiRefsCases: CamlTestCase[] = [
  {
    descr: 'no val; prefixed; single; [[wikilinks]]; should not be processed here',
    mkdn: ': attribute ::\n'
          + '\n'
          + '[[fname-a]]\n',
    html: '<p>: attribute ::</p>\n<p>[[fname-a]]</p>\n',
    data: {
      string: {},
      value: {},
      parse: {},
    },
  },
  {
    descr: '[[wikirefs]]; prefixed; single; [[wikilinks]]; should not interfere with empty string processing',
    mkdn: ': attribute :: \'\'\n'
          + '\n'
          + '[[fname-a]]\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-item">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">\'\'</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n'
        + '<p>[[fname-a]]</p>\n',
    data: {
      string: {
        'attribute': '\'\'',
      },
      value: {
        'attribute': '\'\'',
      },
      parse: {
        'attribute': [{
          type: 'string',
          string: '\'\'',
          value: '\'\'',
        }],
      },
    },
  },
  {
    descr: '[[wikirefs]]; unprefixed; single; [[wikilinks]]; should not be processed here',
    mkdn: ' attribute ::\n'
          + '\n'
          + '[[fname-a]]\n',
    html: '<p>attribute ::</p>\n<p>[[fname-a]]</p>\n',
    data: {
      string: {},
      value: {},
      parse: {},
    },
  },
  {
    descr: '[[wikirefs]]; unprefixed; single; [[wikilinks]]; should not interfere with empty string processing',
    mkdn: 'attribute :: \'\'\n'
          + '\n'
          + '[[fname-a]]\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-item">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">\'\'</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n'
        + '<p>[[fname-a]]</p>\n',
    data: {
      string: {
        'attribute': '\'\'',
      },
      value: {
        'attribute': '\'\'',
      },
      parse: {
        'attribute': [{
          type: 'string',
          string: '\'\'',
          value: '\'\'',
        }],
      },
    },
  },
  ////
  // single wiki value
  {
    descr: '[[wikirefs]]; prefixed; single; wiki value',
    mkdn: ': attribute :: [[fname-a]]\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-item">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr wiki attribute">[[fname-a]]</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': '[[fname-a]]',
      },
      value: {
        'attribute': 'fname-a',
      },
      parse: {
        'attribute': [{
          type: 'wiki',
          string: '[[fname-a]]',
          value: 'fname-a',
        }],
      },
    },
  },
  {
    descr: '[[wikirefs]]; unprefixed; single; wiki value',
    mkdn: 'attribute :: [[fname-a]]\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-item">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr wiki attribute">[[fname-a]]</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': '[[fname-a]]',
      },
      value: {
        'attribute': 'fname-a',
      },
      parse: {
        'attribute': [{
          type: 'wiki',
          string: '[[fname-a]]',
          value: 'fname-a',
        }],
      },
    },
  },
  {
    descr: '[[wikirefs]]; unprefixed; single; wiki value with spaces',
    mkdn: 'attribute :: [[fname-a]]\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-item">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr wiki attribute">[[fname-a]]</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': '[[fname-a]]',
      },
      value: {
        'attribute': 'fname-a',
      },
      parse: {
        'attribute': [{
          type: 'wiki',
          string: '[[fname-a]]',
          value: 'fname-a',
        }],
      },
    },
  },
  {
    descr: '[[wikirefs]]; unprefixed; single; wiki value with hyphens',
    mkdn: 'attribute :: [[fname-a]]\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-item">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr wiki attribute">[[fname-a]]</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': '[[fname-a]]',
      },
      value: {
        'attribute': 'fname-a',
      },
      parse: {
        'attribute': [{
          type: 'wiki',
          string: '[[fname-a]]',
          value: 'fname-a',
        }],
      },
    },
  },
  {
    descr: '[[wikirefs]]; unprefixed; single; invalid wiki; unclosed',
    mkdn: 'attribute :: [[invalid\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-item">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">[[invalid</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': '[[invalid',
      },
      value: {
        'attribute': '[[invalid',
      },
      parse: {
        'attribute': [{
          type: 'string',
          string: '[[invalid',
          value: '[[invalid',
        }],
      },
    },
  },
  {
    descr: '[[wikirefs]]; unprefixed; single; invalid wiki; empty brackets',
    mkdn: 'attribute :: [[]]\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-item">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">[[]]</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': '[[]]',
      },
      value: {
        'attribute': '[[]]',
      },
      parse: {
        'attribute': [{
          type: 'string',
          string: '[[]]',
          value: '[[]]',
        }],
      },
    },
  },
  ////
  // list cases
  // all wikilinks
  {
    descr: '[[wikirefs]]; prefixed; list; mkdn-separated; all wiki',
    mkdn: ':attribute::\n'
          + '- [[fname-a]]\n'
          + '- [[fname-b]]\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-item">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr wiki attribute">[[fname-a]]</span></dd>\n'
        + '<dd><span class="attr wiki attribute">[[fname-b]]</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': '\n'
                     + '- [[fname-a]]\n'
                     + '- [[fname-b]]',
      },
      value: {
        'attribute': ['fname-a', 'fname-b'],
      },
      parse: {
        'attribute': [
          {
            type: 'wiki',
            string: '[[fname-a]]',
            value: 'fname-a',
          },
          {
            type: 'wiki',
            string: '[[fname-b]]',
            value: 'fname-b',
          },
        ],
      },
    },
  },
  {
    descr: '[[wikirefs]]; prefixed; list; comma-separated; all wiki',
    mkdn: ':attribute::[[fname-a]],[[fname-b]]\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-item">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr wiki attribute">[[fname-a]]</span></dd>\n'
        + '<dd><span class="attr wiki attribute">[[fname-b]]</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': '[[fname-a]],[[fname-b]]',
      },
      value: {
        'attribute': ['fname-a', 'fname-b'],
      },
      parse: {
        'attribute': [
          {
            type: 'wiki',
            string: '[[fname-a]]',
            value: 'fname-a',
          },
          {
            type: 'wiki',
            string: '[[fname-b]]',
            value: 'fname-b',
          },
        ],
      },
    },
  },
  {
    descr: '[[wikirefs]]; unprefixed; list; mkdn-separated; all wiki',
    mkdn: 'attribute::\n'
          + '- [[fname-a]]\n'
          + '- [[fname-b]]\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-item">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr wiki attribute">[[fname-a]]</span></dd>\n'
        + '<dd><span class="attr wiki attribute">[[fname-b]]</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': '\n'
                     + '- [[fname-a]]\n'
                     + '- [[fname-b]]',
      },
      value: {
        'attribute': ['fname-a', 'fname-b'],
      },
      parse: {
        'attribute': [
          {
            type: 'wiki',
            string: '[[fname-a]]',
            value: 'fname-a',
          },
          {
            type: 'wiki',
            string: '[[fname-b]]',
            value: 'fname-b',
          },
        ],
      },
    },
  },
  {
    descr: '[[wikirefs]]; unprefixed; list; comma-separated; all wiki',
    mkdn: 'attribute::[[fname-a]],[[fname-b]]\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-item">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr wiki attribute">[[fname-a]]</span></dd>\n'
        + '<dd><span class="attr wiki attribute">[[fname-b]]</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': '[[fname-a]],[[fname-b]]',
      },
      value: {
        'attribute': ['fname-a', 'fname-b'],
      },
      parse: {
        'attribute': [
          {
            type: 'wiki',
            string: '[[fname-a]]',
            value: 'fname-a',
          },
          {
            type: 'wiki',
            string: '[[fname-b]]',
            value: 'fname-b',
          },
        ],
      },
    },
  },
  // mixed wikilinks and primitives
  {
    descr: '[[wikirefs]]; prefixed; list; mkdn-separated; mixed wiki and int',
    mkdn: ':attribute::\n'
          + '- [[fname-a]]\n'
          + '- 42\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-item">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr wiki attribute">[[fname-a]]</span></dd>\n'
        + '<dd><span class="attr int attribute">42</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': '\n'
                     + '- [[fname-a]]\n'
                     + '- 42',
      },
      value: {
        'attribute': ['fname-a', 42],
      },
      parse: {
        'attribute': [
          {
            type: 'wiki',
            string: '[[fname-a]]',
            value: 'fname-a',
          },
          {
            type: 'int',
            string: '42',
            value: 42,
          },
        ],
      },
    },
  },
  {
    descr: '[[wikirefs]]; prefixed; list; comma-separated; mixed wiki and int',
    mkdn: ':attribute::[[fname-a]],42\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-item">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr wiki attribute">[[fname-a]]</span></dd>\n'
        + '<dd><span class="attr int attribute">42</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': '[[fname-a]],42',
      },
      value: {
        'attribute': ['fname-a', 42],
      },
      parse: {
        'attribute': [
          {
            type: 'wiki',
            string: '[[fname-a]]',
            value: 'fname-a',
          },
          {
            type: 'int',
            string: '42',
            value: 42,
          },
        ],
      },
    },
  },
  {
    descr: '[[wikirefs]]; unprefixed; list; mkdn-separated; mixed wiki and int',
    mkdn: 'attribute::\n'
          + '- [[fname-a]]\n'
          + '- 42\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-item">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr wiki attribute">[[fname-a]]</span></dd>\n'
        + '<dd><span class="attr int attribute">42</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': '\n'
                     + '- [[fname-a]]\n'
                     + '- 42',
      },
      value: {
        'attribute': ['fname-a', 42],
      },
      parse: {
        'attribute': [
          {
            type: 'wiki',
            string: '[[fname-a]]',
            value: 'fname-a',
          },
          {
            type: 'int',
            string: '42',
            value: 42,
          },
        ],
      },
    },
  },
  {
    descr: '[[wikirefs]]; unprefixed; list; comma-separated; mixed wiki and int',
    mkdn: 'attribute::[[fname-a]],42\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-item">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr wiki attribute">[[fname-a]]</span></dd>\n'
        + '<dd><span class="attr int attribute">42</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': '[[fname-a]],42',
      },
      value: {
        'attribute': ['fname-a', 42],
      },
      parse: {
        'attribute': [
          {
            type: 'wiki',
            string: '[[fname-a]]',
            value: 'fname-a',
          },
          {
            type: 'int',
            string: '42',
            value: 42,
          },
        ],
      },
    },
  },
  {
    descr: '[[wikirefs]]; prefixed; list; mkdn-separated; mixed wiki and bool',
    mkdn: ':attribute::\n'
          + '- [[fname-a]]\n'
          + '- true\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-item">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr wiki attribute">[[fname-a]]</span></dd>\n'
        + '<dd><span class="attr bool attribute">true</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': '\n'
                     + '- [[fname-a]]\n'
                     + '- true',
      },
      value: {
        'attribute': ['fname-a', true],
      },
      parse: {
        'attribute': [
          {
            type: 'wiki',
            string: '[[fname-a]]',
            value: 'fname-a',
          },
          {
            type: 'bool',
            string: 'true',
            value: true,
          },
        ],
      },
    },
  },
  {
    descr: '[[wikirefs]]; unprefixed; list; comma-separated; mixed wiki and bool',
    mkdn: 'attribute::[[fname-a]],true\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-item">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr wiki attribute">[[fname-a]]</span></dd>\n'
        + '<dd><span class="attr bool attribute">true</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': '[[fname-a]],true',
      },
      value: {
        'attribute': ['fname-a', true],
      },
      parse: {
        'attribute': [
          {
            type: 'wiki',
            string: '[[fname-a]]',
            value: 'fname-a',
          },
          {
            type: 'bool',
            string: 'true',
            value: true,
          },
        ],
      },
    },
  },
  // mixed wiki and bool (missing combos)
  {
    descr: '[[wikirefs]]; prefixed; list; comma-separated; mixed wiki and bool',
    mkdn: ':attribute::[[fname-a]],true\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-item">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr wiki attribute">[[fname-a]]</span></dd>\n'
        + '<dd><span class="attr bool attribute">true</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': '[[fname-a]],true',
      },
      value: {
        'attribute': ['fname-a', true],
      },
      parse: {
        'attribute': [
          {
            type: 'wiki',
            string: '[[fname-a]]',
            value: 'fname-a',
          },
          {
            type: 'bool',
            string: 'true',
            value: true,
          },
        ],
      },
    },
  },
  {
    descr: '[[wikirefs]]; unprefixed; list; mkdn-separated; mixed wiki and bool',
    mkdn: 'attribute::\n'
          + '- [[fname-a]]\n'
          + '- true\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-item">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr wiki attribute">[[fname-a]]</span></dd>\n'
        + '<dd><span class="attr bool attribute">true</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': '\n'
                     + '- [[fname-a]]\n'
                     + '- true',
      },
      value: {
        'attribute': ['fname-a', true],
      },
      parse: {
        'attribute': [
          {
            type: 'wiki',
            string: '[[fname-a]]',
            value: 'fname-a',
          },
          {
            type: 'bool',
            string: 'true',
            value: true,
          },
        ],
      },
    },
  },
  // mixed wiki and string
  {
    descr: '[[wikirefs]]; prefixed; list; comma-separated; mixed wiki and string',
    mkdn: ':attribute::[[fname-a]],hello\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-item">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr wiki attribute">[[fname-a]]</span></dd>\n'
        + '<dd><span class="attr string attribute">hello</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': '[[fname-a]],hello',
      },
      value: {
        'attribute': ['fname-a', 'hello'],
      },
      parse: {
        'attribute': [
          {
            type: 'wiki',
            string: '[[fname-a]]',
            value: 'fname-a',
          },
          {
            type: 'string',
            string: 'hello',
            value: 'hello',
          },
        ],
      },
    },
  },
  {
    descr: '[[wikirefs]]; unprefixed; list; mkdn-separated; mixed wiki and string',
    mkdn: 'attribute::\n'
          + '- [[fname-a]]\n'
          + '- hello\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-item">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr wiki attribute">[[fname-a]]</span></dd>\n'
        + '<dd><span class="attr string attribute">hello</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': '\n'
                     + '- [[fname-a]]\n'
                     + '- hello',
      },
      value: {
        'attribute': ['fname-a', 'hello'],
      },
      parse: {
        'attribute': [
          {
            type: 'wiki',
            string: '[[fname-a]]',
            value: 'fname-a',
          },
          {
            type: 'string',
            string: 'hello',
            value: 'hello',
          },
        ],
      },
    },
  },
  // mixed wiki and float
  {
    descr: '[[wikirefs]]; prefixed; list; comma-separated; mixed wiki and float',
    mkdn: ':attribute::[[fname-a]],1.5\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-item">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr wiki attribute">[[fname-a]]</span></dd>\n'
        + '<dd><span class="attr float attribute">1.5</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': '[[fname-a]],1.5',
      },
      value: {
        'attribute': ['fname-a', 1.5],
      },
      parse: {
        'attribute': [
          {
            type: 'wiki',
            string: '[[fname-a]]',
            value: 'fname-a',
          },
          {
            type: 'float',
            string: '1.5',
            value: 1.5,
          },
        ],
      },
    },
  },
  {
    descr: '[[wikirefs]]; unprefixed; list; mkdn-separated; mixed wiki and float',
    mkdn: 'attribute::\n'
          + '- [[fname-a]]\n'
          + '- 1.5\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-item">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr wiki attribute">[[fname-a]]</span></dd>\n'
        + '<dd><span class="attr float attribute">1.5</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': '\n'
                     + '- [[fname-a]]\n'
                     + '- 1.5',
      },
      value: {
        'attribute': ['fname-a', 1.5],
      },
      parse: {
        'attribute': [
          {
            type: 'wiki',
            string: '[[fname-a]]',
            value: 'fname-a',
          },
          {
            type: 'float',
            string: '1.5',
            value: 1.5,
          },
        ],
      },
    },
  },
  // mixed wiki and time
  {
    descr: '[[wikirefs]]; prefixed; list; comma-separated; mixed wiki and time',
    mkdn: ':attribute::[[fname-a]],2001-12-14\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-item">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr wiki attribute">[[fname-a]]</span></dd>\n'
        + '<dd><span class="attr time attribute">2001-12-14</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': '[[fname-a]],2001-12-14',
      },
      value: {
        'attribute': ['fname-a', new Date('2001-12-14')],
      },
      parse: {
        'attribute': [
          {
            type: 'wiki',
            string: '[[fname-a]]',
            value: 'fname-a',
          },
          {
            type: 'time',
            string: '2001-12-14',
            value: new Date('2001-12-14'),
          },
        ],
      },
    },
  },
  {
    descr: '[[wikirefs]]; unprefixed; list; mkdn-separated; mixed wiki and time',
    mkdn: 'attribute::\n'
          + '- [[fname-a]]\n'
          + '- 2001-12-14\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-item">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr wiki attribute">[[fname-a]]</span></dd>\n'
        + '<dd><span class="attr time attribute">2001-12-14</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': '\n'
                     + '- [[fname-a]]\n'
                     + '- 2001-12-14',
      },
      value: {
        'attribute': ['fname-a', new Date('2001-12-14')],
      },
      parse: {
        'attribute': [
          {
            type: 'wiki',
            string: '[[fname-a]]',
            value: 'fname-a',
          },
          {
            type: 'time',
            string: '2001-12-14',
            value: new Date('2001-12-14'),
          },
        ],
      },
    },
  },
  // mixed wiki and null
  {
    descr: '[[wikirefs]]; prefixed; list; comma-separated; mixed wiki and null',
    mkdn: ':attribute::[[fname-a]],null\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-item">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr wiki attribute">[[fname-a]]</span></dd>\n'
        + '<dd><span class="attr null attribute">null</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': '[[fname-a]],null',
      },
      value: {
        'attribute': ['fname-a', null],
      },
      parse: {
        'attribute': [
          {
            type: 'wiki',
            string: '[[fname-a]]',
            value: 'fname-a',
          },
          {
            type: 'null',
            string: 'null',
            value: null,
          },
        ],
      },
    },
  },
  {
    descr: '[[wikirefs]]; unprefixed; list; mkdn-separated; mixed wiki and null',
    mkdn: 'attribute::\n'
          + '- [[fname-a]]\n'
          + '- null\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-item">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr wiki attribute">[[fname-a]]</span></dd>\n'
        + '<dd><span class="attr null attribute">null</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': '\n'
                     + '- [[fname-a]]\n'
                     + '- null',
      },
      value: {
        'attribute': ['fname-a', null],
      },
      parse: {
        'attribute': [
          {
            type: 'wiki',
            string: '[[fname-a]]',
            value: 'fname-a',
          },
          {
            type: 'null',
            string: 'null',
            value: null,
          },
        ],
      },
    },
  },
  // edge cases
  {
    descr: '[[wikirefs]]; prefixed; list; comma-separated; mixed wiki and invalid wiki (fallback to string)',
    mkdn: ':attribute::[[fname-a]],[[invalid\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-item">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr wiki attribute">[[fname-a]]</span></dd>\n'
        + '<dd><span class="attr string attribute">[[invalid</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': '[[fname-a]],[[invalid',
      },
      value: {
        'attribute': ['fname-a', '[[invalid'],
      },
      parse: {
        'attribute': [
          {
            type: 'wiki',
            string: '[[fname-a]]',
            value: 'fname-a',
          },
          {
            type: 'string',
            string: '[[invalid',
            value: '[[invalid',
          },
        ],
      },
    },
  },
  {
    descr: '[[wikirefs]]; unprefixed; no val; none is not allowed (see no-val cases)',
    mkdn: 'attribute::\n',
    html: '<p>attribute::</p>\n',
    data: {
      string: {},
      value: {},
      parse: {},
    },
  },
  {
    descr: '[[wikirefs]]; prefixed; list; mkdn-separated; invalid wiki (fallback to string)',
    mkdn: ':attribute::\n'
          + '- [[invalid\n'
          + '- 42\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-item">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">[[invalid</span></dd>\n'
        + '<dd><span class="attr int attribute">42</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': '\n'
                     + '- [[invalid\n'
                     + '- 42',
      },
      value: {
        'attribute': ['[[invalid', 42],
      },
      parse: {
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
  },
];
