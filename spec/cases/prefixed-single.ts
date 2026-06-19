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
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr null attribute">null</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': 'null',
      },
      value: {
        'attribute': null,
      },
      parse: {
        'attribute': [{
          type: 'null',
          string: 'null',
          value: null,
        }],
      },
    },
  },
  {
    descr: 'prefixed; single; null; camelCase',
    mkdn: ':attribute::Null\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr null attribute">null</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': 'Null',
      },
      value: {
        'attribute': null,
      },
      parse: {
        'attribute': [{
          type: 'null',
          string: 'null',
          value: null,
        }],
      },
    },
  },
  {
    descr: 'prefixed; single; null; all uppercase',
    mkdn: ':attribute::NULL\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr null attribute">null</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': 'NULL',
      },
      value: {
        'attribute': null,
      },
      parse: {
        'attribute': [{
          type: 'null',
          string: 'null',
          value: null,
        }],
      },
    },
  },
  // bool
  {
    descr: 'prefixed; single; bool; all lowercase',
    mkdn: ':attribute::true\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr bool attribute">true</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': 'true',
      },
      value: {
        'attribute': true,
      },
      parse: {
        'attribute': [{
          type: 'bool',
          string: 'true',
          value: true,
        }],
      },
    },
  },
  {
    descr: 'prefixed; single; bool; camelCase',
    mkdn: ':attribute::True\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr bool attribute">True</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': 'True',
      },
      value: {
        'attribute': true,
      },
      parse: {
        'attribute': [{
          type: 'bool',
          string: 'True',
          value: true,
        }],
      },
    },
  },
  {
    descr: 'prefixed; single; bool; all uppercase',
    mkdn: ':attribute::TRUE\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr bool attribute">TRUE</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': 'TRUE',
      },
      value: {
        'attribute': true,
      },
      parse: {
        'attribute': [{
          type: 'bool',
          string: 'TRUE',
          value: true,
        }],
      },
    },
  },
  // int
  {
    descr: 'prefixed; single; int; canonical',
    mkdn: ':attribute::1\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr int attribute">1</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': '1',
      },
      value: {
        'attribute': 1,
      },
      parse: {
        'attribute': [{
          type: 'int',
          string: '1',
          value: 1,
        }],
      },
    },
  },
  {
    descr: 'prefixed; single; int; octal',
    mkdn: ':attribute::0o14\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr int attribute">0o14</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': '0o14',
      },
      value: {
        'attribute': 0o14,
      },
      parse: {
        'attribute': [{
          type: 'int',
          string: '0o14',
          value: 12,
        }],
      },
    },
  },
  {
    descr: 'prefixed; single; int; hexadecimal',
    mkdn: ':attribute::0xC\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr int attribute">0xC</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': '0xC',
      },
      value: {
        'attribute': 0xC,
      },
      parse: {
        'attribute': [{
          type: 'int',
          string: '0xC',
          value: 12,
        }],
      },
    },
  },
  // float
  {
    descr: 'prefixed; single; float; canonical',
    mkdn: ':attribute::1.23015\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr float attribute">1.23015</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': '1.23015',
      },
      value: {
        'attribute': 1.23015,
      },
      parse: {
        'attribute': [{
          type: 'float',
          string: '1.23015',
          value: 1.23015,
        }],
      },
    },
  },
  {
    descr: 'prefixed; single; float; exp -- exponential',
    mkdn: ':attribute::12.3015e+02\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr float attribute">12.3015e+02</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': '12.3015e+02',
      },
      value: {
        'attribute': 12.3015e+02,
      },
      parse: {
        'attribute': [{
          type: 'float',
          string: '12.3015e+02',
          value: 1230.15,
        }],
      },
    },
  },
  {
    descr: 'prefixed; single; float; nan -- not a number',
    mkdn: ':attribute::.nan\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr float attribute">.nan</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': '.nan',
      },
      value: {
        'attribute': NaN,
      },
      parse: {
        'attribute': [{
          type: 'float',
          string: '.nan',
          value: NaN,
        }],
      },
    },
  },
  // time
  {
    descr: 'prefixed; single; time; canonical',
    mkdn: ':attribute::2001-12-15T02:59:43.1Z\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr time attribute">2001-12-15T02:59:43.1Z</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': '2001-12-15T02:59:43.1Z',
      },
      value: {
        'attribute': new Date('2001-12-15T02:59:43.1Z'),
      },
      parse: {
        'attribute': [{
          type: 'time',
          string: '2001-12-15T02:59:43.1Z',
          value: new Date('2001-12-15T02:59:43.1Z'),
        }],
      },
    },
  },
  {
    descr: 'prefixed; single; time; iso8601',
    mkdn: ':attribute::2001-12-14t21:59:43.10-05:00\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr time attribute">2001-12-14t21:59:43.10-05:00</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': '2001-12-14t21:59:43.10-05:00',
      },
      value: {
        'attribute': new Date('2001-12-14t21:59:43.10-05:00'),
      },
      parse: {
        'attribute': [{
          type: 'time',
          string: '2001-12-14t21:59:43.10-05:00',
          value: new Date('2001-12-14t21:59:43.10-05:00'),
        }],
      },
    },
  },
  {
    descr: 'prefixed; single; time; spaced',
    mkdn: ':attribute::2001-12-14 21:59:43.10 -5\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr time attribute">2001-12-14 21:59:43.10 -5</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': '2001-12-14 21:59:43.10 -5',
      },
      value: {
        'attribute': new Date('2001-12-14 21:59:43.10 -5'),
      },
      parse: {
        'attribute': [{
          type: 'time',
          string: '2001-12-14 21:59:43.10 -5',
          value: new Date('2001-12-14 21:59:43.10 -5'),
        }],
      },
    },
  },
  {
    descr: 'prefixed; single; time; date only',
    mkdn: ':attribute::2001-12-14\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr time attribute">2001-12-14</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': '2001-12-14',
      },
      value: {
        'attribute': new Date('2001-12-14'),
      },
      parse: {
        'attribute': [{
          type: 'time',
          string: '2001-12-14',
          value: new Date('2001-12-14'),
        }],
      },
    },
  },
  {
    descr: 'prefixed; single; time; int',
    mkdn: ':attribute::+12:00\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr time attribute">+12:00</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': '+12:00',
      },
      value: {
        'attribute': 720,
      },
      parse: {
        'attribute': [{
          type: 'time',
          string: '+12:00',
          value: 720,
        }],
      },
    },
  },
  {
    descr: 'prefixed; single; time; float',
    mkdn: ':attribute::+12:00.123\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr time attribute">+12:00.123</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': '+12:00.123',
      },
      value: {
        'attribute': 720.123,
      },
      parse: {
        'attribute': [{
          type: 'time',
          string: '+12:00.123',
          value: 720.123,
        }],
      },
    },
  },
  // string
  {
    descr: 'prefixed; single; string; single-line; w/o whitespace',
    mkdn: ':attribute::this-is-a-string\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">this-is-a-string</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': 'this-is-a-string',
      },
      value: {
        'attribute': 'this-is-a-string',
      },
      parse: {
        'attribute': [{
          type: 'string',
          string: 'this-is-a-string',
          value: 'this-is-a-string',
        }],
      },
    },
  },
  {
    descr: 'prefixed; single; string; single-line; w/ whitespace',
    mkdn: ':attribute::this is a string\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">this is a string</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': 'this is a string',
      },
      value: {
        'attribute': 'this is a string',
      },
      parse: {
        'attribute': [{
          type: 'string',
          string: 'this is a string',
          value: 'this is a string',
        }],
      },
    },
  },
  {
    descr: 'prefixed; single; string; single-line; quotes (double); escape commas',
    mkdn: ':attribute::"this, is, a, string"\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">"this, is, a, string"</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': '"this, is, a, string"',
      },
      value: {
        'attribute': '"this, is, a, string"',
      },
      parse: {
        'attribute': [{
          type: 'string',
          string: '"this, is, a, string"',
          value: '"this, is, a, string"',
        }],
      },
    },
  },
  // multi-line strings
  // folded style (>)
  {
    descr: 'prefixed; single; string; multi-line; folded (>); basic',
    mkdn: ':attribute:: >\n'
          + '  line one\n'
          + '  line two\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">line one line two<br></span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': ' >\n'
                     + '  line one\n'
                     + '  line two',
      },
      value: {
        'attribute': 'line one line two\n',
      },
      parse: {
        'attribute': [{
          type: 'string',
          string: ' >\n  line one\n  line two',
          value: 'line one line two\n',
        }],
      },
    },
  },
  {
    descr: 'prefixed; single; string; multi-line; folded (>); with trailing newline',
    mkdn: ':attribute:: >\n'
          + '  line one\n'
          + '  line two\n'
          + '\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">line one line two<br></span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': ' >\n'
                     + '  line one\n'
                     + '  line two\n',
      },
      value: {
        'attribute': 'line one line two\n',
      },
      parse: {
        'attribute': [{
          type: 'string',
          string: ' >\n  line one\n  line two\n',
          value: 'line one line two\n',
        }],
      },
    },
  },
  // literal style (|)
  {
    descr: 'prefixed; single; string; multi-line; literal (|); basic',
    mkdn: ':attribute:: |\n'
          + '  line one\n'
          + '  line two\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">line one<br>line two<br></span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': ' |\n'
                     + '  line one\n'
                     + '  line two',
      },
      value: {
        'attribute': 'line one\nline two\n',
      },
      parse: {
        'attribute': [{
          type: 'string',
          string: ' |\n  line one\n  line two',
          value: 'line one\nline two\n',
        }],
      },
    },
  },
  // chomped folded (>-)
  {
    descr: 'prefixed; single; string; multi-line; folded chomped (>-); strips trailing newlines',
    mkdn: ':attribute:: >-\n'
          + '  line one\n'
          + '  line two\n'
          + '\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">line one line two</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': ' >-\n'
                     + '  line one\n'
                     + '  line two\n',
      },
      value: {
        'attribute': 'line one line two',
      },
      parse: {
        'attribute': [{
          type: 'string',
          string: ' >-\n  line one\n  line two\n',
          value: 'line one line two',
        }],
      },
    },
  },
  // empty block
  {
    descr: 'prefixed; single; string; multi-line; folded (>); empty block',
    mkdn: ':attribute:: >\n'
          + '\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute"><br></span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': ' >\n',
      },
      value: {
        'attribute': '\n',
      },
      parse: {
        'attribute': [{
          type: 'string',
          string: ' >\n',
          value: '\n',
        }],
      },
    },
  },
  // multi-paragraph: blank line within folded block
  {
    descr: 'prefixed; single; string; multi-line; folded (>); multi-paragraph',
    mkdn: ':attribute:: >\n'
          + '  line one\n'
          + '\n'
          + '  line two\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">line one  line two<br></span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': ' >\n  line one\n\n  line two',
      },
      value: {
        'attribute': 'line one  line two\n',
      },
      parse: {
        'attribute': [{
          type: 'string',
          string: ' >\n  line one\n\n  line two',
          value: 'line one  line two\n',
        }],
      },
    },
  },
  // multi-paragraph: blank line within literal block
  {
    descr: 'prefixed; single; string; multi-line; literal (|); multi-paragraph',
    mkdn: ':attribute:: |\n'
          + '  line one\n'
          + '\n'
          + '  line two\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">line one<br><br>line two<br></span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': ' |\n  line one\n\n  line two',
      },
      value: {
        'attribute': 'line one\n\nline two\n',
      },
      parse: {
        'attribute': [{
          type: 'string',
          string: ' |\n  line one\n\n  line two',
          value: 'line one\n\nline two\n',
        }],
      },
    },
  },
  // nested indentation: relative indent preserved in literal
  {
    descr: 'prefixed; single; string; multi-line; literal (|); nested indentation',
    mkdn: ':attribute:: |\n'
          + '  line one\n'
          + '    indented\n'
          + '  line two\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">line one<br>  indented<br>line two<br></span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': ' |\n  line one\n    indented\n  line two',
      },
      value: {
        'attribute': 'line one\n  indented\nline two\n',
      },
      parse: {
        'attribute': [{
          type: 'string',
          string: ' |\n  line one\n    indented\n  line two',
          value: 'line one\n  indented\nline two\n',
        }],
      },
    },
  },
  // YAML chomping variants
  // per YAML spec: https://yaml.org/spec/1.2.2/#8112-block-chomping-indicator
  //   clip (default): single trailing newline
  //   strip (-): no trailing newline
  //   keep (+): preserve all trailing newlines
  //
  // literal strip (|-)
  {
    descr: 'prefixed; single; string; multi-line; literal strip (|-); strips trailing newlines',
    mkdn: ':attribute:: |-\n'
          + '  line one\n'
          + '  line two\n'
          + '\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">line one<br>line two</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': ' |-\n  line one\n  line two\n',
      },
      value: {
        'attribute': 'line one\nline two',
      },
      parse: {
        'attribute': [{
          type: 'string',
          string: ' |-\n  line one\n  line two\n',
          value: 'line one\nline two',
        }],
      },
    },
  },
  // literal keep (|+)
  {
    descr: 'prefixed; single; string; multi-line; literal keep (|+); preserves trailing newlines',
    mkdn: ':attribute:: |+\n'
          + '  line one\n'
          + '  line two\n'
          + '\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">line one<br>line two<br><br></span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': ' |+\n  line one\n  line two\n\n',
      },
      value: {
        'attribute': 'line one\nline two\n\n',
      },
      parse: {
        'attribute': [{
          type: 'string',
          string: ' |+\n  line one\n  line two\n\n',
          value: 'line one\nline two\n\n',
        }],
      },
    },
  },
  // folded keep (>+)
  {
    descr: 'prefixed; single; string; multi-line; folded keep (>+); preserves trailing newlines',
    mkdn: ':attribute:: >+\n'
          + '  line one\n'
          + '  line two\n'
          + '\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">line one line two<br><br></span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': ' >+\n  line one\n  line two\n\n',
      },
      value: {
        'attribute': 'line one line two\n\n',
      },
      parse: {
        'attribute': [{
          type: 'string',
          string: ' >+\n  line one\n  line two\n\n',
          value: 'line one line two\n\n',
        }],
      },
    },
  },
  {
    descr: 'prefixed; single; string; multi-line; adjacent; two multi-line attrs back-to-back',
    mkdn: ':description:: >\n'
        + '  This is folded text.\n'
        + ':notes:: |\n'
        + '  line one\n'
        + '  line two\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>description</dt>\n'
        + '<dd><span class="attr string description">This is folded text.<br></span></dd>\n'
        + '</div>\n'
        + '<div class="attr-group">\n'
        + '<dt>notes</dt>\n'
        + '<dd><span class="attr string notes">line one<br>line two<br></span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'description': ' >\n  This is folded text.',
        'notes': ' |\n  line one\n  line two',
      },
      value: {
        'description': 'This is folded text.\n',
        'notes': 'line one\nline two\n',
      },
      parse: {
        'description': [{ type: 'string', string: ' >\n  This is folded text.', value: 'This is folded text.\n' }],
        'notes': [{ type: 'string', string: ' |\n  line one\n  line two', value: 'line one\nline two\n' }],
      },
    },
  },
  {
    descr: 'prefixed; single; string; multi-line; adjacent; multi-line followed by regular attr',
    mkdn: ':description:: >\n'
        + '  folded text.\n'
        + ':count:: 42\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>description</dt>\n'
        + '<dd><span class="attr string description">folded text.<br></span></dd>\n'
        + '</div>\n'
        + '<div class="attr-group">\n'
        + '<dt>count</dt>\n'
        + '<dd><span class="attr int count">42</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'description': ' >\n  folded text.',
        'count': '42',
      },
      value: {
        'description': 'folded text.\n',
        'count': 42,
      },
      parse: {
        'description': [{ type: 'string', string: ' >\n  folded text.', value: 'folded text.\n' }],
        'count': [{ type: 'int', string: '42', value: 42 }],
      },
    },
  },
  {
    descr: 'prefixed; single; string; multi-line; adjacent; regular attr followed by multi-line',
    mkdn: ':title:: Doc\n'
        + ':description:: >\n'
        + '  folded text.\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>title</dt>\n'
        + '<dd><span class="attr string title">Doc</span></dd>\n'
        + '</div>\n'
        + '<div class="attr-group">\n'
        + '<dt>description</dt>\n'
        + '<dd><span class="attr string description">folded text.<br></span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'title': 'Doc',
        'description': ' >\n  folded text.',
      },
      value: {
        'title': 'Doc',
        'description': 'folded text.\n',
      },
      parse: {
        'title': [{ type: 'string', string: 'Doc', value: 'Doc' }],
        'description': [{ type: 'string', string: ' >\n  folded text.', value: 'folded text.\n' }],
      },
    },
  },
  {
    descr: 'prefixed; single; string; multi-line; adjacent; four indicators back-to-back',
    mkdn: ':a:: >\n'
        + '  folded\n'
        + ':b:: |\n'
        + '  literal\n'
        + ':c:: >-\n'
        + '  strip-folded\n'
        + ':d:: |-\n'
        + '  strip-literal\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>a</dt>\n'
        + '<dd><span class="attr string a">folded<br></span></dd>\n'
        + '</div>\n'
        + '<div class="attr-group">\n'
        + '<dt>b</dt>\n'
        + '<dd><span class="attr string b">literal<br></span></dd>\n'
        + '</div>\n'
        + '<div class="attr-group">\n'
        + '<dt>c</dt>\n'
        + '<dd><span class="attr string c">strip-folded</span></dd>\n'
        + '</div>\n'
        + '<div class="attr-group">\n'
        + '<dt>d</dt>\n'
        + '<dd><span class="attr string d">strip-literal</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'a': ' >\n  folded',
        'b': ' |\n  literal',
        'c': ' >-\n  strip-folded',
        'd': ' |-\n  strip-literal',
      },
      value: {
        'a': 'folded\n',
        'b': 'literal\n',
        'c': 'strip-folded',
        'd': 'strip-literal',
      },
      parse: {
        'a': [{ type: 'string', string: ' >\n  folded', value: 'folded\n' }],
        'b': [{ type: 'string', string: ' |\n  literal', value: 'literal\n' }],
        'c': [{ type: 'string', string: ' >-\n  strip-folded', value: 'strip-folded' }],
        'd': [{ type: 'string', string: ' |-\n  strip-literal', value: 'strip-literal' }],
      },
    },
  },
  {
    descr: 'prefixed; single; string; multi-line; adjacent; multi-line with content preserved',
    mkdn: ':title:: Test\n'
        + ':desc:: >\n'
        + '  folded text.\n'
        + ':tags:: a, b, c\n'
        + '\n'
        + 'Some paragraph content.\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>title</dt>\n'
        + '<dd><span class="attr string title">Test</span></dd>\n'
        + '</div>\n'
        + '<div class="attr-group">\n'
        + '<dt>desc</dt>\n'
        + '<dd><span class="attr string desc">folded text.<br></span></dd>\n'
        + '</div>\n'
        + '<div class="attr-group">\n'
        + '<dt>tags</dt>\n'
        + '<dd><span class="attr string tags">a</span></dd>\n'
        + '<dd><span class="attr string tags">b</span></dd>\n'
        + '<dd><span class="attr string tags">c</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n'
        + '<p>Some paragraph content.</p>\n',
    data: {
      string: {
        'title': 'Test',
        'desc': ' >\n  folded text.',
        'tags': 'a, b, c',
      },
      value: {
        'title': 'Test',
        'desc': 'folded text.\n',
        'tags': ['a', 'b', 'c'],
      },
      parse: {
        'title': [{ type: 'string', string: 'Test', value: 'Test' }],
        'desc': [{ type: 'string', string: ' >\n  folded text.', value: 'folded text.\n' }],
        'tags': [
          { type: 'string', string: 'a', value: 'a' },
          { type: 'string', string: 'b', value: 'b' },
          { type: 'string', string: 'c', value: 'c' },
        ],
      },
    },
  },
  // escaped: inline code span
  //
  // note: unprefixed code span is NOT tested because backtick is a valid
  // CAML key character — `attribute:: value` is legitimate CAML at the
  // block level. the prefixed variant works because `:` is the expected
  // first character, not backtick.
  {
    descr: 'prefixed; single; escaped; code span',
    mkdn: '`:attribute:: value`\n',
    html: '<p><code>:attribute:: value</code></p>\n',
  },
  // escaped: fenced code block
  {
    descr: 'prefixed; single; escaped; fenced code block',
    mkdn: '```\n:attribute:: value\n```\n',
    html: '<pre><code>:attribute:: value\n</code></pre>\n',
  },
  // escaped: indented code block (4+ spaces)
  {
    descr: 'prefixed; single; escaped; indented code block (4 spaces)',
    mkdn: '    :attribute:: value\n',
    html: '<pre><code>:attribute:: value\n</code></pre>\n',
  },
  // nested: blockquote; not allowed inside
  {
    descr: 'prefixed; single; w/ other mkdn constructs; nested; blockquote; not allowed inside',
    mkdn: '> :attribute:: value\n',
    html: '<blockquote>\n<p>:attribute:: value</p>\n</blockquote>\n',
  },
  // nested: list item; not allowed inside
  {
    descr: 'prefixed; single; w/ other mkdn constructs; nested; list; not allowed inside',
    mkdn: '- :attribute:: value\n',
    html: '<ul>\n<li>:attribute:: value</li>\n</ul>\n',
  },
  // near: headers
  {
    descr: 'prefixed; single; w/ other mkdn constructs; near headers; before',
    mkdn: ':attribute:: value\n'
        + '\n'
        + '# heading\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">value</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n'
        + '<h1>heading</h1>\n',
    data: {
      string: { 'attribute': 'value' },
      value: { 'attribute': 'value' },
      parse: { 'attribute': [{ type: 'string', string: 'value', value: 'value' }] },
    },
  },
  {
    descr: 'prefixed; single; w/ other mkdn constructs; near headers; after',
    mkdn: '# heading\n'
        + '\n'
        + ':attribute:: value\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">value</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n'
        + '<h1>heading</h1>\n',
    data: {
      string: { 'attribute': 'value' },
      value: { 'attribute': 'value' },
      parse: { 'attribute': [{ type: 'string', string: 'value', value: 'value' }] },
    },
  },
  // near: blockquotes
  {
    descr: 'prefixed; single; w/ other mkdn constructs; near blockquotes; before',
    mkdn: ':attribute:: value\n'
        + '\n'
        + '> some text\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">value</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n'
        + '<blockquote>\n'
        + '<p>some text</p>\n'
        + '</blockquote>\n',
    data: {
      string: { 'attribute': 'value' },
      value: { 'attribute': 'value' },
      parse: { 'attribute': [{ type: 'string', string: 'value', value: 'value' }] },
    },
  },
  // near: blockquotes; after
  {
    descr: 'prefixed; single; w/ other mkdn constructs; near blockquotes; after',
    mkdn: '> some text\n'
        + '\n'
        + ':attribute:: value\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">value</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n'
        + '<blockquote>\n'
        + '<p>some text</p>\n'
        + '</blockquote>\n',
    data: {
      string: { 'attribute': 'value' },
      value: { 'attribute': 'value' },
      parse: { 'attribute': [{ type: 'string', string: 'value', value: 'value' }] },
    },
  },
  // near: lists
  {
    descr: 'prefixed; single; w/ other mkdn constructs; near lists; before',
    mkdn: ':attribute:: value\n'
        + '\n'
        + '- list item\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">value</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n'
        + '<ul>\n'
        + '<li>list item</li>\n'
        + '</ul>\n',
    data: {
      string: { 'attribute': 'value' },
      value: { 'attribute': 'value' },
      parse: { 'attribute': [{ type: 'string', string: 'value', value: 'value' }] },
    },
  },
  // near: lists; after
  {
    descr: 'prefixed; single; w/ other mkdn constructs; near lists; after',
    mkdn: '- list item\n'
        + '\n'
        + ':attribute:: value\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-group">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">value</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n'
        + '<ul>\n'
        + '<li>list item</li>\n'
        + '</ul>\n',
    data: {
      string: { 'attribute': 'value' },
      value: { 'attribute': 'value' },
      parse: { 'attribute': [{ type: 'string', string: 'value', value: 'value' }] },
    },
  },
];
