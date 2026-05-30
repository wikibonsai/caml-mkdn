/*
 * note: newlines are added to the end of test values to illustrate that they
 * really are 'block' or 'flow' elements.
 */
import type { CamlTestCase } from '../types';


export const camlPrefixedSingleCases: CamlTestCase[] = [
  // null
  {
    descr: 'prefixed; single; null; all lowercase',
    mkdn: ':attribute::null\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr null attribute">null</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': 'null',
    },
    valData: {
      'attribute': null,
    },
    parseData: {
      'attribute': [{
        type: 'null',
        string: 'null',
        value: null,
      }],
    },
  },
  {
    descr: 'prefixed; single; null; camelCase',
    mkdn: ':attribute::Null\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr null attribute">null</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': 'Null',
    },
    valData: {
      'attribute': null,
    },
    parseData: {
      'attribute': [{
        type: 'null',
        string: 'null',
        value: null,
      }],
    },
  },
  {
    descr: 'prefixed; single; null; all uppercase',
    mkdn: ':attribute::NULL\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr null attribute">null</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': 'NULL',
    },
    valData: {
      'attribute': null,
    },
    parseData: {
      'attribute': [{
        type: 'null',
        string: 'null',
        value: null,
      }],
    },
  },
  // bool
  {
    descr: 'prefixed; single; bool; all lowercase',
    mkdn: ':attribute::true\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr bool attribute">true</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': 'true',
    },
    valData: {
      'attribute': true,
    },
    parseData: {
      'attribute': [{
        type: 'bool',
        string: 'true',
        value: true,
      }],
    },
  },
  {
    descr: 'prefixed; single; bool; camelCase',
    mkdn: ':attribute::True\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr bool attribute">True</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': 'True',
    },
    valData: {
      'attribute': true,
    },
    parseData: {
      'attribute': [{
        type: 'bool',
        string: 'True',
        value: true,
      }],
    },
  },
  {
    descr: 'prefixed; single; bool; all uppercase',
    mkdn: ':attribute::TRUE\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr bool attribute">TRUE</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': 'TRUE',
    },
    valData: {
      'attribute': true,
    },
    parseData: {
      'attribute': [{
        type: 'bool',
        string: 'TRUE',
        value: true,
      }],
    },
  },
  // int
  {
    descr: 'prefixed; single; int; canonical',
    mkdn: ':attribute::1\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr int attribute">1</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': '1',
    },
    valData: {
      'attribute': 1,
    },
    parseData: {
      'attribute': [{
        type: 'int',
        string: '1',
        value: 1,
      }],
    },
  },
  {
    descr: 'prefixed; single; int; octal',
    mkdn: ':attribute::0o14\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr int attribute">0o14</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': '0o14',
    },
    valData: {
      'attribute': 0o14,
    },
    parseData: {
      'attribute': [{
        type: 'int',
        string: '0o14',
        value: 12,
      }],
    },
  },
  {
    descr: 'prefixed; single; int; hexadecimal',
    mkdn: ':attribute::0xC\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr int attribute">0xC</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': '0xC',
    },
    valData: {
      'attribute': 0xC,
    },
    parseData: {
      'attribute': [{
        type: 'int',
        string: '0xC',
        value: 12,
      }],
    },
  },
  // float
  {
    descr: 'prefixed; single; float; canonical',
    mkdn: ':attribute::1.23015\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr float attribute">1.23015</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': '1.23015',
    },
    valData: {
      'attribute': 1.23015,
    },
    parseData: {
      'attribute': [{
        type: 'float',
        string: '1.23015',
        value: 1.23015,
      }],
    },
  },
  {
    descr: 'prefixed; single; float; exp -- exponential',
    mkdn: ':attribute::12.3015e+02\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr float attribute">12.3015e+02</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': '12.3015e+02',
    },
    valData: {
      'attribute': 12.3015e+02,
    },
    parseData: {
      'attribute': [{
        type: 'float',
        string: '12.3015e+02',
        value: 1230.15,
      }],
    },
  },
  {
    descr: 'prefixed; single; float; nan -- not a number',
    mkdn: ':attribute::.nan\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr float attribute">.nan</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': '.nan',
    },
    valData: {
      'attribute': NaN,
    },
    parseData: {
      'attribute': [{
        type: 'float',
        string: '.nan',
        value: NaN,
      }],
    },
  },
  // time
  {
    descr: 'prefixed; single; time; canonical',
    mkdn: ':attribute::2001-12-15T02:59:43.1Z\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr time attribute">2001-12-15T02:59:43.1Z</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': '2001-12-15T02:59:43.1Z',
    },
    valData: {
      'attribute': new Date('2001-12-15T02:59:43.1Z'),
    },
    parseData: {
      'attribute': [{
        type: 'time',
        string: '2001-12-15T02:59:43.1Z',
        value: new Date('2001-12-15T02:59:43.1Z'),
      }],
    },
  },
  {
    descr: 'prefixed; single; time; iso8601',
    mkdn: ':attribute::2001-12-14t21:59:43.10-05:00\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr time attribute">2001-12-14t21:59:43.10-05:00</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': '2001-12-14t21:59:43.10-05:00',
    },
    valData: {
      'attribute': new Date('2001-12-14t21:59:43.10-05:00'),
    },
    parseData: {
      'attribute': [{
        type: 'time',
        string: '2001-12-14t21:59:43.10-05:00',
        value: new Date('2001-12-14t21:59:43.10-05:00'),
      }],
    },
  },
  {
    descr: 'prefixed; single; time; spaced',
    mkdn: ':attribute::2001-12-14 21:59:43.10 -5\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr time attribute">2001-12-14 21:59:43.10 -5</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': '2001-12-14 21:59:43.10 -5',
    },
    valData: {
      'attribute': new Date('2001-12-14 21:59:43.10 -5'),
    },
    parseData: {
      'attribute': [{
        type: 'time',
        string: '2001-12-14 21:59:43.10 -5',
        value: new Date('2001-12-14 21:59:43.10 -5'),
      }],
    },
  },
  {
    descr: 'prefixed; single; time; date only',
    mkdn: ':attribute::2001-12-14\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr time attribute">2001-12-14</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': '2001-12-14',
    },
    valData: {
      'attribute': new Date('2001-12-14'),
    },
    parseData: {
      'attribute': [{
        type: 'time',
        string: '2001-12-14',
        value: new Date('2001-12-14'),
      }],
    },
  },
  {
    descr: 'prefixed; single; time; int',
    mkdn: ':attribute::+12:00\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr time attribute">+12:00</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': '+12:00',
    },
    valData: {
      'attribute': 720,
    },
    parseData: {
      'attribute': [{
        type: 'time',
        string: '+12:00',
        value: 720,
      }],
    },
  },
  {
    descr: 'prefixed; single; time; float',
    mkdn: ':attribute::+12:00.123\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr time attribute">+12:00.123</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': '+12:00.123',
    },
    valData: {
      'attribute': 720.123,
    },
    parseData: {
      'attribute': [{
        type: 'time',
        string: '+12:00.123',
        value: 720.123,
      }],
    },
  },
  // string
  {
    descr: 'prefixed; single; string; single-line; w/o whitespace',
    mkdn: ':attribute::this-is-a-string\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">this-is-a-string</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': 'this-is-a-string',
    },
    valData: {
      'attribute': 'this-is-a-string',
    },
    parseData: {
      'attribute': [{
        type: 'string',
        string: 'this-is-a-string',
        value: 'this-is-a-string',
      }],
    },
  },
  {
    descr: 'prefixed; single; string; single-line; w/ whitespace',
    mkdn: ':attribute::this is a string\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">this is a string</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': 'this is a string',
    },
    valData: {
      'attribute': 'this is a string',
    },
    parseData: {
      'attribute': [{
        type: 'string',
        string: 'this is a string',
        value: 'this is a string',
      }],
    },
  },
  {
    descr: 'prefixed; single; string; single-line; quotes (double); escape commas',
    mkdn: ':attribute::"this, is, a, string"\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">"this, is, a, string"</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': '"this, is, a, string"',
    },
    valData: {
      'attribute': '"this, is, a, string"',
    },
    parseData: {
      'attribute': [{
        type: 'string',
        string: '"this, is, a, string"',
        value: '"this, is, a, string"',
      }],
    },
  },
  // multi-line strings
  // folded style (>)
  {
    descr: 'prefixed; single; string; folded (>); basic',
    mkdn: ':attribute:: >\n'
          + '  line one\n'
          + '  line two\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">line one line two</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': ' >\n'
                   + '  line one\n'
                   + '  line two',
    },
    valData: {
      'attribute': 'line one line two',
    },
    parseData: {
      'attribute': [{
        type: 'string',
        string: ' >\n  line one\n  line two',
        value: 'line one line two',
      }],
    },
  },
  {
    descr: 'prefixed; single; string; folded (>); with trailing newline',
    mkdn: ':attribute:: >\n'
          + '  line one\n'
          + '  line two\n'
          + '\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">line one line two </span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': ' >\n'
                   + '  line one\n'
                   + '  line two\n',
    },
    valData: {
      'attribute': 'line one line two ',
    },
    parseData: {
      'attribute': [{
        type: 'string',
        string: ' >\n  line one\n  line two\n',
        value: 'line one line two ',
      }],
    },
  },
  // literal style (|)
  {
    descr: 'prefixed; single; string; literal (|); basic',
    mkdn: ':attribute:: |\n'
          + '  line one\n'
          + '  line two\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">line one\nline two</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': ' |\n'
                   + '  line one\n'
                   + '  line two',
    },
    valData: {
      'attribute': 'line one\nline two',
    },
    parseData: {
      'attribute': [{
        type: 'string',
        string: ' |\n  line one\n  line two',
        value: 'line one\nline two',
      }],
    },
  },
  // chomped folded (>-)
  {
    descr: 'prefixed; single; string; folded chomped (>-); strips trailing newlines',
    mkdn: ':attribute:: >-\n'
          + '  line one\n'
          + '  line two\n'
          + '\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">line one line two</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': ' >-\n'
                   + '  line one\n'
                   + '  line two\n',
    },
    valData: {
      'attribute': 'line one line two',
    },
    parseData: {
      'attribute': [{
        type: 'string',
        string: ' >-\n  line one\n  line two\n',
        value: 'line one line two',
      }],
    },
  },
  // chomped literal (>|)
  {
    descr: 'prefixed; single; string; literal chomped (>|); strips trailing newlines',
    mkdn: ':attribute:: >|\n'
          + '  line one\n'
          + '  line two\n'
          + '\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">line one\nline two</span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': ' >|\n'
                   + '  line one\n'
                   + '  line two\n',
    },
    valData: {
      'attribute': 'line one\nline two',
    },
    parseData: {
      'attribute': [{
        type: 'string',
        string: ' >|\n  line one\n  line two\n',
        value: 'line one\nline two',
      }],
    },
  },
  // edge cases
  {
    descr: 'prefixed; single; string; folded (>); empty block',
    mkdn: ':attribute:: >\n'
          + '\n',
    html: '<aside class="attrbox">\n'
        + '<span class="attrbox-title">Attributes</span>\n'
        + '<dl>\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute"></span></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
    strData: {
      'attribute': ' >\n',
    },
    valData: {
      'attribute': '',
    },
    parseData: {
      'attribute': [{
        type: 'string',
        string: ' >\n',
        value: '',
      }],
    },
  },
];
