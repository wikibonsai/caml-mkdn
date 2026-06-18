/*
 * note: newlines are added to the end of test values to illustrate that they
 * really are 'block' or 'flow' elements.
 */
import type { CamlTestCase } from '../types';


export const camlUnprefixedListMkdnCases: CamlTestCase[] = [
  // null
  {
    descr: 'unprefixed; list; mkdn-separated; null; all lowercase',
    mkdn: 'attribute::\n'
          + '- null\n'
          + '- null\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr null attribute">null</span></dd>\n'
        + '<dd><span class="attr null attribute">null</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': [ 'null', 'null' ],
      },
      value: {
        'attribute': [ null, null ],
      },
      parse: {
        'attribute': [
          {
            type: 'null',
            string: 'null',
            value: null,
          },
          {
            type: 'null',
            string: 'null',
            value: null,
          }
        ],
      },
    },
  },
  {
    descr: 'unprefixed; list; mkdn-separated; null; camelCase',
    mkdn: 'attribute::\n'
          + '- Null\n'
          + '- Null\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr null attribute">null</span></dd>\n'
        + '<dd><span class="attr null attribute">null</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': [ 'Null', 'Null' ],
      },
      value: {
        'attribute': [ null, null ],
      },
      parse: {
        'attribute': [
          {
            type: 'null',
            string: 'null',
            value: null,
          },
          {
            type: 'null',
            string: 'null',
            value: null,
          }
        ],
      },
    },
  },
  {
    descr: 'unprefixed; list; mkdn-separated; null; all uppercase',
    mkdn: 'attribute::\n'
          + '- NULL\n'
          + '- NULL\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr null attribute">null</span></dd>\n'
        + '<dd><span class="attr null attribute">null</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': [ 'NULL', 'NULL' ],
      },
      value: {
        'attribute': [ null, null ],
      },
      parse: {
        'attribute': [
          {
            type: 'null',
            string: 'null',
            value: null,
          },
          {
            type: 'null',
            string: 'null',
            value: null,
          }
        ],
      },
    },
  },
  {
    descr: 'unprefixed; list; mkdn-separated; bool; all lowercase',
    mkdn: 'attribute::\n'
          + '- true\n'
          + '- false\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr bool attribute">true</span></dd>\n'
        + '<dd><span class="attr bool attribute">false</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': [ 'true', 'false' ],
      },
      value: {
        'attribute': [ true, false ],
      },
      parse: {
        'attribute': [
          {
            type: 'bool',
            string: 'true',
            value: true,
          },
          {
            type: 'bool',
            string: 'false',
            value: false,
          },
        ],
      },
    },
  },
  {
    descr: 'unprefixed; list; mkdn-separated; bool; camelCase',
    mkdn: 'attribute::\n'
          + '- True\n'
          + '- False\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr bool attribute">True</span></dd>\n'
        + '<dd><span class="attr bool attribute">False</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': [ 'True', 'False' ],
      },
      value: {
        'attribute': [ true, false ],
      },
      parse: {
        'attribute': [
          {
            type: 'bool',
            string: 'True',
            value: true,
          },
          {
            type: 'bool',
            string: 'False',
            value: false,
          },
        ],
      },
    },
  },
  {
    descr: 'unprefixed; list; mkdn-separated; bool; all uppercase',
    mkdn: 'attribute::\n'
          + '- TRUE\n'
          + '- FALSE\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr bool attribute">TRUE</span></dd>\n'
        + '<dd><span class="attr bool attribute">FALSE</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': [ 'TRUE', 'FALSE' ],
      },
      value: {
        'attribute': [ true, false ],
      },
      parse: {
        'attribute': [
          {
            type: 'bool',
            string: 'TRUE',
            value: true,
          },
          {
            type: 'bool',
            string: 'FALSE',
            value: false,
          },
        ],
      },
    },
  },
  // int
  {
    descr: 'unprefixed; list; mkdn-separated; int; canonical',
    mkdn: 'attribute::\n'
          + '- 10\n'
          + '- -123\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr int attribute">10</span></dd>\n'
        + '<dd><span class="attr int attribute">-123</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': [ '10', '-123' ],
      },
      value: {
        'attribute': [ 10, -123 ],
      },
      parse: {
        'attribute': [
          {
            type: 'int',
            string: '10',
            value: 10,
          },
          {
            type: 'int',
            string: '-123',
            value: -123,
          },
        ],
      },
    },
  },
  {
    descr: 'unprefixed; list; mkdn-separated; int; octal',
    mkdn: 'attribute::\n'
          + '- 0o10\n'
          + '- 0o123\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr int attribute">0o10</span></dd>\n'
        + '<dd><span class="attr int attribute">0o123</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': [ '0o10', '0o123' ],
      },
      value: {
        'attribute': [ 0o10, 0o123 ],
      },
      parse: {
        'attribute': [
          {
            type: 'int',
            string: '0o10',
            value: 0o10,
          },
          {
            type: 'int',
            string: '0o123',
            value: 0o123,
          },
        ],
      },
    },
  },
  {
    descr: 'unprefixed; list; mkdn-separated; int; hexadecimal',
    mkdn: 'attribute::\n'
          + '- 0xC\n'
          + '- 0x014D\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr int attribute">0xC</span></dd>\n'
        + '<dd><span class="attr int attribute">0x014D</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': [ '0xC', '0x014D' ],
      },
      value: {
        'attribute': [ 0xC, 0x014D ],
      },
      parse: {
        'attribute': [
          {
            type: 'int',
            string: '0xC',
            value: 12,
          },
          {
            type: 'int',
            string: '0x014D',
            value: 333,
          },
        ],
      },
    },
  },
  // float
  {
    descr: 'unprefixed; list; mkdn-separated; float; canonical',
    mkdn: 'attribute::\n'
          + '- 1.23015\n'
          + '- -1.23015\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr float attribute">1.23015</span></dd>\n'
        + '<dd><span class="attr float attribute">-1.23015</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': [ '1.23015', '-1.23015' ],
      },
      value: {
        'attribute': [ 1.23015, -1.23015 ],
      },
      parse: {
        'attribute': [
          {
            type: 'float',
            string: '1.23015',
            value: 1.23015,
          },
          {
            type: 'float',
            string: '-1.23015',
            value: -1.23015,
          },
        ],
      },
    },
  },
  {
    descr: 'unprefixed; list; mkdn-separated; float; exp -- exponential',
    mkdn: 'attribute::\n'
          + '- 12.3015e+02\n'
          + '- 12.3015e-02\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr float attribute">12.3015e+02</span></dd>\n'
        + '<dd><span class="attr float attribute">12.3015e-02</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': [ '12.3015e+02', '12.3015e-02' ],
      },
      value: {
        'attribute': [ 12.3015e+02, 12.3015e-02 ],
      },
      parse: {
        'attribute': [
          {
            type: 'float',
            string: '12.3015e+02',
            value: 1230.15,
          },
          {
            type: 'float',
            string: '12.3015e-02',
            value: 0.123015,
          },
        ],
      },
    },
  },
  {
    descr: 'unprefixed; list; mkdn-separated; float; nan -- not a number',
    mkdn: 'attribute::\n'
          + '- .NaN\n'
          + '- .nan\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr float attribute">.NaN</span></dd>\n'
        + '<dd><span class="attr float attribute">.nan</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': [ '.NaN', '.nan' ],
      },
      value: {
        'attribute': [ NaN, NaN ],
      },
      parse: {
        'attribute': [
          {
            type: 'float',
            string: '.NaN',
            value: NaN,
          },
          {
            type: 'float',
            string: '.nan',
            value: NaN,
          },
        ],
      },
    },
  },
  // time
  {
    descr: 'unprefixed; list; mkdn-separated; time; canonical',
    mkdn: 'attribute::\n'
          + '- 2001-12-15T02:59:43.1Z\n'
          + '- 2022-12-15T02:59:43.1Z\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr time attribute">2001-12-15T02:59:43.1Z</span></dd>\n'
        + '<dd><span class="attr time attribute">2022-12-15T02:59:43.1Z</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': [ '2001-12-15T02:59:43.1Z', '2022-12-15T02:59:43.1Z' ],
      },
      value: {
        'attribute': [ new Date('2001-12-15T02:59:43.1Z'), new Date('2022-12-15T02:59:43.1Z') ],
      },
      parse: {
        'attribute': [
          {
            type: 'time',
            string: '2001-12-15T02:59:43.1Z',
            value: new Date('2001-12-15T02:59:43.1Z'),
          },
          {
            type: 'time',
            string: '2022-12-15T02:59:43.1Z',
            value: new Date('2022-12-15T02:59:43.1Z'),
          },
        ],
      },
    },
  },
  {
    descr: 'unprefixed; list; mkdn-separated; time; iso8601',
    mkdn: 'attribute::\n'
          + '- 2001-12-14t21:59:43.10-05:00\n'
          + '- 2022-12-14t21:59:43.10-05:00\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr time attribute">2001-12-14t21:59:43.10-05:00</span></dd>\n'
        + '<dd><span class="attr time attribute">2022-12-14t21:59:43.10-05:00</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': [ '2001-12-14t21:59:43.10-05:00', '2022-12-14t21:59:43.10-05:00' ],
      },
      value: {
        'attribute': [ new Date('2001-12-14t21:59:43.10-05:00'), new Date('2022-12-14t21:59:43.10-05:00') ],
      },
      parse: {
        'attribute': [
          {
            type: 'time',
            string: '2001-12-14t21:59:43.10-05:00',
            value: new Date('2001-12-14t21:59:43.10-05:00'),
          },
          {
            type: 'time',
            string: '2022-12-14t21:59:43.10-05:00',
            value: new Date('2022-12-14t21:59:43.10-05:00'),
          },
        ],
      },
    },
  },
  {
    descr: 'unprefixed; list; mkdn-separated; time; spaced',
    mkdn: 'attribute::\n'
          + '- 2001-12-14 21:59:43.10 -5\n'
          + '- 2022-12-14 21:59:43.10 -5\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr time attribute">2001-12-14 21:59:43.10 -5</span></dd>\n'
        + '<dd><span class="attr time attribute">2022-12-14 21:59:43.10 -5</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': [ '2001-12-14 21:59:43.10 -5', '2022-12-14 21:59:43.10 -5' ],
      },
      value: {
        'attribute': [ new Date('2001-12-14 21:59:43.10 -5'), new Date('2022-12-14 21:59:43.10 -5') ],
      },
      parse: {
        'attribute': [
          {
            type: 'time',
            string: '2001-12-14 21:59:43.10 -5',
            value: new Date('2001-12-14 21:59:43.10 -5'),
          },
          {
            type: 'time',
            string: '2022-12-14 21:59:43.10 -5',
            value: new Date('2022-12-14 21:59:43.10 -5'),
          },
        ],
      },
    },
  },
  {
    descr: 'unprefixed; list; mkdn-separated; time; date only',
    mkdn: 'attribute::\n'
          + '- 2001-12-14\n'
          + '- 2022-12-14\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr time attribute">2001-12-14</span></dd>\n'
        + '<dd><span class="attr time attribute">2022-12-14</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': [ '2001-12-14', '2022-12-14' ],
      },
      value: {
        'attribute': [ new Date('2001-12-14'), new Date('2022-12-14') ],
      },
      parse: {
        'attribute': [
          {
            type: 'time',
            string: '2001-12-14',
            value: new Date('2001-12-14'),
          },
          {
            type: 'time',
            string: '2022-12-14',
            value: new Date('2022-12-14'),
          },
        ],
      },
    },
  },
  {
    descr: 'unprefixed; list; mkdn-separated; time; int',
    mkdn: 'attribute::\n'
          + '- +12:00\n'
          + '- 12:00\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr time attribute">+12:00</span></dd>\n'
        + '<dd><span class="attr time attribute">12:00</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': [ '+12:00', '12:00' ],
      },
      value: {
        'attribute': [ 720, 720 ],
      },
      parse: {
        'attribute': [
          {
            type: 'time',
            string: '+12:00',
            value: 720,
          },
          {
            type: 'time',
            string: '12:00',
            value: 720,
          },
        ],
      },
    },
  },
  {
    descr: 'unprefixed; list; mkdn-separated; time; float',
    mkdn: 'attribute::\n'
          + '- +12:00.123\n'
          + '- 12:00.123\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr time attribute">+12:00.123</span></dd>\n'
        + '<dd><span class="attr time attribute">12:00.123</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': [ '+12:00.123', '12:00.123' ],
      },
      value: {
        'attribute': [ 720.123, 720.123 ],
      },
      parse: {
        'attribute': [
          {
            type: 'time',
            string: '+12:00.123',
            value: 720.123,
          },
          {
            type: 'time',
            string: '12:00.123',
            value: 720.123,
          },
        ],
      },
    },
  },
  // string
  {
    descr: 'unprefixed; list; mkdn-separated; string; single-line; w/o whitespace',
    mkdn: 'attribute::\n'
          + '- this-is-a-string\n'
          + '- and-another-string\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">this-is-a-string</span></dd>\n'
        + '<dd><span class="attr string attribute">and-another-string</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': [ 'this-is-a-string', 'and-another-string' ],
      },
      value: {
        'attribute': [ 'this-is-a-string', 'and-another-string' ],
      },
      parse: {
        'attribute': [
          {
            type: 'string',
            string: 'this-is-a-string',
            value: 'this-is-a-string',
          },
          {
            type: 'string',
            string: 'and-another-string',
            value: 'and-another-string',
          },
        ],
      },
    },
  },
  {
    descr: 'unprefixed; list; mkdn-separated; string; single-line; w/ whitespace',
    mkdn: 'attribute::\n'
          + '- this is a string\n'
          + '- and another string\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">this is a string</span></dd>\n'
        + '<dd><span class="attr string attribute">and another string</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': [ 'this is a string', 'and another string' ],
      },
      value: {
        'attribute': [ 'this is a string', 'and another string' ],
      },
      parse: {
        'attribute': [
          {
            type: 'string',
            string: 'this is a string',
            value: 'this is a string',
          },
          {
            type: 'string',
            string: 'and another string',
            value: 'and another string',
          },
        ],
      },
    },
  },
  {
    descr: 'unprefixed; list; mkdn-separated; string; single-line; w/o whitespace; quotes (double); comma',
    mkdn: 'attribute::\n'
          + '- "this-is,a-string"\n'
          + '- and-another-string\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">"this-is,a-string"</span></dd>\n'
        + '<dd><span class="attr string attribute">and-another-string</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': [ '"this-is,a-string"', 'and-another-string' ],
      },
      value: {
        'attribute': [ '"this-is,a-string"', 'and-another-string' ],
      },
      parse: {
        'attribute': [
          {
            type: 'string',
            string: '"this-is,a-string"',
            value: '"this-is,a-string"',
          },
          {
            type: 'string',
            string: 'and-another-string',
            value: 'and-another-string',
          },
        ],
      },
    },
  },
  // multi-line strings
  // folded style (>)
  {
    descr: 'unprefixed; list; mkdn-separated; string; multi-line; folded (>); basic',
    mkdn: 'attribute::\n'
          + '- first\n'
          + '- >\n'
          + '  line one\n'
          + '  line two\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">first</span></dd>\n'
        + '<dd><span class="attr string attribute">line one line two<br></span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': '\n'
                     + '- first\n'
                     + '- >\n'
                     + '  line one\n'
                     + '  line two',
      },
      value: {
        'attribute': ['first', 'line one line two\n'],
      },
      parse: {
        'attribute': [
          {
            type: 'string',
            string: 'first',
            value: 'first',
          },
          {
            type: 'string',
            string: '>\n  line one\n  line two',
            value: 'line one line two\n',
          },
        ],
      },
    },
  },
  {
    descr: 'unprefixed; list; mkdn-separated; string; multi-line; folded (>); with trailing newline',
    mkdn: 'attribute::\n'
          + '- first\n'
          + '- >\n'
          + '  line one\n'
          + '  line two\n'
          + '\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">first</span></dd>\n'
        + '<dd><span class="attr string attribute">line one line two<br></span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': '\n'
                     + '- first\n'
                     + '- >\n'
                     + '  line one\n'
                     + '  line two\n',
      },
      value: {
        'attribute': ['first', 'line one line two\n'],
      },
      parse: {
        'attribute': [
          {
            type: 'string',
            string: 'first',
            value: 'first',
          },
          {
            type: 'string',
            string: '>\n  line one\n  line two\n',
            value: 'line one line two\n',
          },
        ],
      },
    },
  },
  // literal style (|)
  {
    descr: 'unprefixed; list; mkdn-separated; string; multi-line; literal (|); basic',
    mkdn: 'attribute::\n'
          + '- first\n'
          + '- |\n'
          + '  line one\n'
          + '  line two\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">first</span></dd>\n'
        + '<dd><span class="attr string attribute">line one<br>line two<br></span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': '\n'
                     + '- first\n'
                     + '- |\n'
                     + '  line one\n'
                     + '  line two',
      },
      value: {
        'attribute': ['first', 'line one\nline two\n'],
      },
      parse: {
        'attribute': [
          {
            type: 'string',
            string: 'first',
            value: 'first',
          },
          {
            type: 'string',
            string: '|\n  line one\n  line two',
            value: 'line one\nline two\n',
          },
        ],
      },
    },
  },
  // chomped folded (>-)
  {
    descr: 'unprefixed; list; mkdn-separated; string; multi-line; folded chomped (>-); strips trailing newlines',
    mkdn: 'attribute::\n'
          + '- first\n'
          + '- >-\n'
          + '  line one\n'
          + '  line two\n'
          + '\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">first</span></dd>\n'
        + '<dd><span class="attr string attribute">line one line two</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': '\n'
                     + '- first\n'
                     + '- >-\n'
                     + '  line one\n'
                     + '  line two\n',
      },
      value: {
        'attribute': ['first', 'line one line two'],
      },
      parse: {
        'attribute': [
          {
            type: 'string',
            string: 'first',
            value: 'first',
          },
          {
            type: 'string',
            string: '>-\n  line one\n  line two\n',
            value: 'line one line two',
          },
        ],
      },
    },
  },
  // literal strip (|-)
  {
    descr: 'unprefixed; list; mkdn-separated; string; multi-line; literal strip (|-); strips trailing newlines',
    mkdn: 'attribute::\n'
          + '- first\n'
          + '- |-\n'
          + '  line one\n'
          + '  line two\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">first</span></dd>\n'
        + '<dd><span class="attr string attribute">line one<br>line two</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': '\n'
                     + '- first\n'
                     + '- |-\n'
                     + '  line one\n'
                     + '  line two',
      },
      value: {
        'attribute': ['first', 'line one\nline two'],
      },
      parse: {
        'attribute': [
          {
            type: 'string',
            string: 'first',
            value: 'first',
          },
          {
            type: 'string',
            string: '|-\n  line one\n  line two',
            value: 'line one\nline two',
          },
        ],
      },
    },
  },
  // literal keep (|+)
  {
    descr: 'unprefixed; list; mkdn-separated; string; multi-line; literal keep (|+); preserves trailing newlines',
    mkdn: 'attribute::\n'
          + '- first\n'
          + '- |+\n'
          + '  line one\n'
          + '  line two\n'
          + '\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">first</span></dd>\n'
        + '<dd><span class="attr string attribute">line one<br>line two<br><br></span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': '\n'
                     + '- first\n'
                     + '- |+\n'
                     + '  line one\n'
                     + '  line two\n',
      },
      value: {
        'attribute': ['first', 'line one\nline two\n\n'],
      },
      parse: {
        'attribute': [
          {
            type: 'string',
            string: 'first',
            value: 'first',
          },
          {
            type: 'string',
            string: '|+\n  line one\n  line two\n\n',
            value: 'line one\nline two\n\n',
          },
        ],
      },
    },
  },
  // folded keep (>+)
  {
    descr: 'unprefixed; list; mkdn-separated; string; multi-line; folded keep (>+); preserves trailing newlines',
    mkdn: 'attribute::\n'
          + '- first\n'
          + '- >+\n'
          + '  line one\n'
          + '  line two\n'
          + '\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">first</span></dd>\n'
        + '<dd><span class="attr string attribute">line one line two<br><br></span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': '\n'
                     + '- first\n'
                     + '- >+\n'
                     + '  line one\n'
                     + '  line two\n',
      },
      value: {
        'attribute': ['first', 'line one line two\n\n'],
      },
      parse: {
        'attribute': [
          {
            type: 'string',
            string: 'first',
            value: 'first',
          },
          {
            type: 'string',
            string: '>+\n  line one\n  line two\n\n',
            value: 'line one line two\n\n',
          },
        ],
      },
    },
  },
  // edge cases
  {
    descr: 'unprefixed; list; mkdn-separated; string; multi-line; folded (>); empty block',
    mkdn: 'attribute::\n'
          + '- first\n'
          + '- >\n'
          + '\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">first</span></dd>\n'
        + '<dd><span class="attr string attribute"><br></span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': '\n'
                     + '- first\n'
                     + '- >\n',
      },
      value: {
        'attribute': ['first', '\n'],
      },
      parse: {
        'attribute': [
          {
            type: 'string',
            string: 'first',
            value: 'first',
          },
          {
            type: 'string',
            string: '>\n',
            value: '\n',
          },
        ],
      },
    },
  },
];
