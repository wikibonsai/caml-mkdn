/*
 * note: newlines are added to the end of test values to illustrate that they
 * really are 'block' or 'flow' elements.
 */
import type { CamlTestCase } from '../types';


export const camlUnprefixedListCommaCases: CamlTestCase[] = [
  // null
  {
    descr: 'unprefixed; list; comma-separated; null; all lowercase',
    mkdn: 'attribute::null,null\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr null attribute">null</span></dd>\n'
        + '<dd><span class="attr null attribute">null</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': [ 'null', 'null' ],
    },
    valData: {
      'attribute': [ null, null ],
    },
    parseData: {
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
  {
    descr: 'unprefixed; list; comma-separated; null; camelCase',
    mkdn: 'attribute::Null,Null\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr null attribute">null</span></dd>\n'
        + '<dd><span class="attr null attribute">null</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': [ 'Null', 'Null' ],
    },
    valData: {
      'attribute': [ null, null ],
    },
    parseData: {
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
  {
    descr: 'unprefixed; list; comma-separated; null; all lowercase',
    mkdn: 'attribute::NULL,NULL\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr null attribute">null</span></dd>\n'
        + '<dd><span class="attr null attribute">null</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': [ 'NULL', 'NULL' ],
    },
    valData: {
      'attribute': [ null, null ],
    },
    parseData: {
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
  // bool
  {
    descr: 'unprefixed; list; comma-separated; bool; all lowercase',
    mkdn: 'attribute::true,false\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr bool attribute">true</span></dd>\n'
        + '<dd><span class="attr bool attribute">false</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': [ 'true', 'false' ],
    },
    valData: {
      'attribute': [ true, false ],
    },
    parseData: {
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
  {
    descr: 'unprefixed; list; comma-separated; bool; camelCase',
    mkdn: 'attribute::True,False\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr bool attribute">True</span></dd>\n'
        + '<dd><span class="attr bool attribute">False</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': [ 'True', 'False' ],
    },
    valData: {
      'attribute': [ true, false ],
    },
    parseData: {
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
  {
    descr: 'unprefixed; list; comma-separated; bool; all uppercase',
    mkdn: 'attribute::TRUE,FALSE\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr bool attribute">TRUE</span></dd>\n'
        + '<dd><span class="attr bool attribute">FALSE</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': [ 'TRUE', 'FALSE' ],
    },
    valData: {
      'attribute': [ true, false ],
    },
    parseData: {
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
  // int
  {
    descr: 'unprefixed; list; comma-separated; int; canonical',
    mkdn: 'attribute::10,-123\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr int attribute">10</span></dd>\n'
        + '<dd><span class="attr int attribute">-123</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': [ '10', '-123' ],
    },
    valData: {
      'attribute': [ 10, -123 ],
    },
    parseData: {
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
  {
    descr: 'unprefixed; list; comma-separated; int; octal',
    mkdn: 'attribute::0o10,0o123\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr int attribute">0o10</span></dd>\n'
        + '<dd><span class="attr int attribute">0o123</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': [ '0o10', '0o123' ],
    },
    valData: {
      'attribute': [ 0o10, 0o123 ],
    },
    parseData: {
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
  {
    descr: 'unprefixed; list; comma-separated; int; hexadecimal',
    mkdn: 'attribute::0xC,0x014D\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr int attribute">0xC</span></dd>\n'
        + '<dd><span class="attr int attribute">0x014D</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': [ '0xC', '0x014D' ],
    },
    valData: {
      'attribute': [ 0xC, 0x014D ],
    },
    parseData: {
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
  // float
  {
    descr: 'unprefixed; list; comma-separated; float; canonical',
    mkdn: 'attribute::1.23015,-1.23015\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr float attribute">1.23015</span></dd>\n'
        + '<dd><span class="attr float attribute">-1.23015</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': [ '1.23015', '-1.23015' ],
    },
    valData: {
      'attribute': [ 1.23015, -1.23015 ],
    },
    parseData: {
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
  {
    descr: 'unprefixed; list; comma-separated; float; exp -- exponential',
    mkdn: 'attribute::12.3015e+02,12.3015e-02\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr float attribute">12.3015e+02</span></dd>\n'
        + '<dd><span class="attr float attribute">12.3015e-02</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': [ '12.3015e+02', '12.3015e-02' ],
    },
    valData: {
      'attribute': [ 12.3015e+02, 12.3015e-02 ],
    },
    parseData: {
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
  {
    descr: 'unprefixed; list; comma-separated; float; nan -- not a number',
    mkdn: 'attribute::.NaN,.nan\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr float attribute">.NaN</span></dd>\n'
        + '<dd><span class="attr float attribute">.nan</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': [ '.NaN', '.nan' ],
    },
    valData: {
      'attribute': [ NaN, NaN ],
    },
    parseData: {
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
  // time
  {
    descr: 'unprefixed; list; comma-separated; time; canonical',
    mkdn: 'attribute::2001-12-15T02:59:43.1Z,2022-12-15T02:59:43.1Z\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr time attribute">2001-12-15T02:59:43.1Z</span></dd>\n'
        + '<dd><span class="attr time attribute">2022-12-15T02:59:43.1Z</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': [ '2001-12-15T02:59:43.1Z', '2022-12-15T02:59:43.1Z' ],
    },
    valData: {
      'attribute': [ new Date('2001-12-15T02:59:43.1Z'), new Date('2022-12-15T02:59:43.1Z') ],
    },
    parseData: {
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
  {
    descr: 'unprefixed; list; comma-separated; time; iso8601',
    mkdn: 'attribute::2001-12-14t21:59:43.10-05:00,2022-12-14t21:59:43.10-05:00\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr time attribute">2001-12-14t21:59:43.10-05:00</span></dd>\n'
        + '<dd><span class="attr time attribute">2022-12-14t21:59:43.10-05:00</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': [ '2001-12-14t21:59:43.10-05:00', '2022-12-14t21:59:43.10-05:00' ],
    },
    valData: {
      'attribute': [ new Date('2001-12-14t21:59:43.10-05:00'), new Date('2022-12-14t21:59:43.10-05:00') ],
    },
    parseData: {
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
  {
    descr: 'unprefixed; list; comma-separated; time; spaced',
    mkdn: 'attribute::2001-12-14 21:59:43.10 -5,2022-12-14 21:59:43.10 -5\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr time attribute">2001-12-14 21:59:43.10 -5</span></dd>\n'
        + '<dd><span class="attr time attribute">2022-12-14 21:59:43.10 -5</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': [ '2001-12-14 21:59:43.10 -5', '2022-12-14 21:59:43.10 -5' ],
    },
    valData: {
      'attribute': [ new Date('2001-12-14 21:59:43.10 -5'), new Date('2022-12-14 21:59:43.10 -5') ],
    },
    parseData: {
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
  {
    descr: 'unprefixed; list; comma-separated; time; date only',
    mkdn: 'attribute::2001-12-14,2022-12-14\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr time attribute">2001-12-14</span></dd>\n'
        + '<dd><span class="attr time attribute">2022-12-14</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': [ '2001-12-14', '2022-12-14' ],
    },
    valData: {
      'attribute': [ new Date('2001-12-14'), new Date('2022-12-14') ],
    },
    parseData: {
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
  {
    descr: 'unprefixed; list; comma-separated; time; int',
    mkdn: 'attribute::+12:00,12:00\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr time attribute">+12:00</span></dd>\n'
        + '<dd><span class="attr time attribute">12:00</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': [ '+12:00', '12:00' ],
    },
    valData: {
      'attribute': [ 720, 720 ],
    },
    parseData: {
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
  {
    descr: 'unprefixed; list; comma-separated; time; float',
    mkdn: 'attribute::+12:00.123,12:00.123\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr time attribute">+12:00.123</span></dd>\n'
        + '<dd><span class="attr time attribute">12:00.123</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': [ '+12:00.123', '12:00.123' ],
    },
    valData: {
      'attribute': [ 720.123, 720.123 ],
    },
    parseData: {
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
  // string
  {
    descr: 'unprefixed; list; comma-separated; string; single-line; w/o whitespace',
    mkdn: 'attribute::this-is-a-string,and-another-string\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">this-is-a-string</span></dd>\n'
        + '<dd><span class="attr string attribute">and-another-string</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': [ 'this-is-a-string', 'and-another-string' ],
    },
    valData: {
      'attribute': [ 'this-is-a-string', 'and-another-string' ],
    },
    parseData: {
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
  {
    descr: 'unprefixed; list; comma-separated; string; single-line; w/ whitespace',
    mkdn: 'attribute::this is a string,and another string\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">this is a string</span></dd>\n'
        + '<dd><span class="attr string attribute">and another string</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': [ 'this is a string', 'and another string' ],
    },
    valData: {
      'attribute': [ 'this is a string', 'and another string' ],
    },
    parseData: {
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
  {
    descr: 'unprefixed; list; comma-separated; string; single-line; w/o whitespace; quotes (double); comma',
    mkdn: 'attribute::"this-is,a-string",and-another-string\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">"this-is,a-string"</span></dd>\n'
        + '<dd><span class="attr string attribute">and-another-string</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': [ '"this-is,a-string"', 'and-another-string' ],
    },
    valData: {
      'attribute': [ '"this-is,a-string"', 'and-another-string' ],
    },
    parseData: {
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
  // multi-line strings
  // folded style (>)
  {
    descr: 'unprefixed; list; comma-separated; string; folded (>); basic',
    mkdn: 'attribute::first, >\n'
          + '  line one\n'
          + '  line two\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">first</span></dd>\n'
        + '<dd><span class="attr string attribute">line one line two</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': 'first, >\n'
                   + '  line one\n'
                   + '  line two',
    },
    valData: {
      'attribute': ['first', 'line one line two'],
    },
    parseData: {
      'attribute': [
        {
          type: 'string',
          string: 'first',
          value: 'first',
        },
        {
          type: 'string',
          string: '>\n  line one\n  line two',
          value: 'line one line two',
        },
      ],
    },
  },
  {
    descr: 'unprefixed; list; comma-separated; string; folded (>); with trailing newline',
    mkdn: 'attribute::first, >\n'
          + '  line one\n'
          + '  line two\n'
          + '\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">first</span></dd>\n'
        + '<dd><span class="attr string attribute">line one line two </span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': 'first, >\n'
                   + '  line one\n'
                   + '  line two\n',
    },
    valData: {
      'attribute': ['first', 'line one line two '],
    },
    parseData: {
      'attribute': [
        {
          type: 'string',
          string: 'first',
          value: 'first',
        },
        {
          type: 'string',
          string: '>\n  line one\n  line two\n',
          value: 'line one line two ',
        },
      ],
    },
  },
  // literal style (|)
  {
    descr: 'unprefixed; list; comma-separated; string; literal (|); basic',
    mkdn: 'attribute::first, |\n'
          + '  line one\n'
          + '  line two\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">first</span></dd>\n'
        + '<dd><span class="attr string attribute">line one\nline two</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': 'first, |\n'
                   + '  line one\n'
                   + '  line two',
    },
    valData: {
      'attribute': ['first', 'line one\nline two'],
    },
    parseData: {
      'attribute': [
        {
          type: 'string',
          string: 'first',
          value: 'first',
        },
        {
          type: 'string',
          string: '|\n  line one\n  line two',
          value: 'line one\nline two',
        },
      ],
    },
  },
  // chomped folded (>-)
  {
    descr: 'unprefixed; list; comma-separated; string; folded chomped (>-); strips trailing newlines',
    mkdn: 'attribute::first, >-\n'
          + '  line one\n'
          + '  line two\n'
          + '\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">first</span></dd>\n'
        + '<dd><span class="attr string attribute">line one line two</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': 'first, >-\n'
                   + '  line one\n'
                   + '  line two\n',
    },
    valData: {
      'attribute': ['first', 'line one line two'],
    },
    parseData: {
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
  // chomped literal (>|)
  {
    descr: 'unprefixed; list; comma-separated; string; literal chomped (>|); strips trailing newlines',
    mkdn: 'attribute::first, >|\n'
          + '  line one\n'
          + '  line two\n'
          + '\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">first</span></dd>\n'
        + '<dd><span class="attr string attribute">line one\nline two</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': 'first, >|\n'
                   + '  line one\n'
                   + '  line two\n',
    },
    valData: {
      'attribute': ['first', 'line one\nline two'],
    },
    parseData: {
      'attribute': [
        {
          type: 'string',
          string: 'first',
          value: 'first',
        },
        {
          type: 'string',
          string: '>|\n  line one\n  line two\n',
          value: 'line one\nline two',
        },
      ],
    },
  },
  // edge cases
  {
    descr: 'unprefixed; list; comma-separated; string; folded (>); empty block',
    mkdn: 'attribute::first, >\n'
          + '\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">first</span></dd>\n'
        + '<dd><span class="attr string attribute"></span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': 'first, >\n',
    },
    valData: {
      'attribute': ['first', ''],
    },
    parseData: {
      'attribute': [
        {
          type: 'string',
          string: 'first',
          value: 'first',
        },
        {
          type: 'string',
          string: '>\n',
          value: '',
        },
      ],
    },
  },
];
