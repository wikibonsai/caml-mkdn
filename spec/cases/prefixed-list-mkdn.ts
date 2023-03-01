/*
 * note: newlines are added to the end of test values to illustrate that they
 * really are 'block' or 'flow' elements.
 */
import type { CamlTestCase } from '../types';
import { htmlListMkdn } from '../const';


export const camlPrefixedListMkdnCases: CamlTestCase[] = [
  // null
  {
    descr: 'prefixed; list; mkdn-separated; null; all lowercase',
    mkdn: ':attribute::\n- null\n- null\n',
    html: htmlListMkdn(
      'attribute', 'null', 'null',
      'attribute', 'null', 'null',
    ),
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
    descr: 'prefixed; list; mkdn-separated; null; camelCase',
    mkdn: ':attribute::\n- Null\n- Null\n',
    html: htmlListMkdn(
      'attribute', 'null', 'null',
      'attribute', 'null', 'null',
    ),
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
    descr: 'prefixed; list; mkdn-separated; null; all uppercase',
    mkdn: ':attribute::\n- NULL\n- NULL\n',
    html: htmlListMkdn(
      'attribute', 'null', 'null',
      'attribute', 'null', 'null',
    ),
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
  {
    descr: 'prefixed; list; mkdn-separated; bool; all lowercase',
    mkdn: ':attribute::\n- true\n- false\n',
    html: htmlListMkdn(
      'attribute', 'bool', 'true',
      'attribute', 'bool', 'false',
    ),
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
    descr: 'prefixed; list; mkdn-separated; bool; camelCase',
    mkdn: ':attribute::\n- True\n- False\n',
    html: htmlListMkdn(
      'attribute', 'bool', 'True',
      'attribute', 'bool', 'False'
    ),
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
    descr: 'prefixed; list; mkdn-separated; bool; all uppercase',
    mkdn: ':attribute::\n- TRUE\n- FALSE\n',
    html: htmlListMkdn(
      'attribute', 'bool', 'TRUE',
      'attribute', 'bool', 'FALSE'
    ),
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
    descr: 'prefixed; list; mkdn-separated; int; canonical',
    mkdn: ':attribute::\n- 10\n- -123\n',
    html: htmlListMkdn(
      'attribute', 'int', '10',
      'attribute', 'int', '-123'
    ),
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
    descr: 'prefixed; list; mkdn-separated; int; octal',
    mkdn: ':attribute::\n- 0o10\n- 0o123\n',
    html: htmlListMkdn(
      'attribute', 'int', '0o10',
      'attribute', 'int', '0o123'
    ),
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
    descr: 'prefixed; list; mkdn-separated; int; hexadecimal',
    mkdn: ':attribute::\n- 0xC\n- 0x014D\n',
    html: htmlListMkdn(
      'attribute', 'int', '0xC',
      'attribute', 'int', '0x014D'
    ),
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
    descr: 'prefixed; list; mkdn-separated; float; canonical',
    mkdn: ':attribute::\n- 1.23015\n- -1.23015\n',
    html: htmlListMkdn(
      'attribute', 'float', '1.23015',
      'attribute', 'float', '-1.23015'
    ),
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
    descr: 'prefixed; list; mkdn-separated; float; exp -- exponential',
    mkdn: ':attribute::\n- 12.3015e+02\n- 12.3015e-02\n',
    html: htmlListMkdn(
      'attribute', 'float', '12.3015e+02',
      'attribute', 'float', '12.3015e-02'
    ),
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
    descr: 'prefixed; list; mkdn-separated; float; nan -- not a number',
    mkdn: ':attribute::\n- .NaN\n- .nan\n',
    html: htmlListMkdn(
      'attribute', 'float', '.NaN',
      'attribute', 'float', '.nan'
    ),
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
    descr: 'prefixed; list; mkdn-separated; time; canonical',
    mkdn: ':attribute::\n- 2001-12-15T02:59:43.1Z\n- 2022-12-15T02:59:43.1Z\n',
    html: htmlListMkdn(
      'attribute', 'time', '2001-12-15T02:59:43.1Z',
      'attribute', 'time', '2022-12-15T02:59:43.1Z'
    ),
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
    descr: 'prefixed; list; mkdn-separated; time; iso8601',
    mkdn: ':attribute::\n- 2001-12-14t21:59:43.10-05:00\n- 2022-12-14t21:59:43.10-05:00\n',
    html: htmlListMkdn(
      'attribute', 'time', '2001-12-14t21:59:43.10-05:00',
      'attribute', 'time', '2022-12-14t21:59:43.10-05:00'
    ),
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
    descr: 'prefixed; list; mkdn-separated; time; spaced',
    mkdn: ':attribute::\n- 2001-12-14 21:59:43.10 -5\n- 2022-12-14 21:59:43.10 -5\n',
    html: htmlListMkdn(
      'attribute', 'time', '2001-12-14 21:59:43.10 -5',
      'attribute', 'time', '2022-12-14 21:59:43.10 -5'
    ),
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
    descr: 'prefixed; list; mkdn-separated; time; date only',
    mkdn: ':attribute::\n- 2001-12-14\n- 2022-12-14\n',
    html: htmlListMkdn(
      'attribute', 'time', '2001-12-14',
      'attribute', 'time', '2022-12-14'
    ),
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
    descr: 'prefixed; list; mkdn-separated; time; int',
    mkdn: ':attribute::\n- +12:00\n- 12:00\n',
    html: htmlListMkdn(
      'attribute', 'time', '+12:00',
      'attribute', 'time', '12:00'
    ),
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
    descr: 'prefixed; list; mkdn-separated; time; float',
    mkdn: ':attribute::\n- +12:00.123\n- 12:00.123\n',
    html: htmlListMkdn(
      'attribute', 'time', '+12:00.123',
      'attribute', 'time', '12:00.123'
    ),
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
    descr: 'prefixed; list; mkdn-separated; string; single-line; w/o whitespace',
    mkdn: ':attribute::\n- this-is-a-string\n- and-another-string\n',
    html: htmlListMkdn(
      'attribute', 'string', 'this-is-a-string',
      'attribute', 'string', 'and-another-string'
    ),
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
    descr: 'prefixed; list; mkdn-separated; string; single-line; w/ whitespace',
    mkdn: ':attribute::\n- this is a string\n- and another string\n',
    html: htmlListMkdn(
      'attribute', 'string', 'this is a string',
      'attribute', 'string', 'and another string'
    ),
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
    descr: 'prefixed; list; mkdn-separated; string; single-line; w/o whitespace; quotes (double); comma',
    mkdn: ':attribute::\n- "this-is,a-string"\n- and-another-string\n',
    html: htmlListMkdn(
      'attribute', 'string', '"this-is,a-string"',
      'attribute', 'string', 'and-another-string'
    ),
    valData: {
      'attribute': [ '"this-is,a-string"', 'and-another-string' ],
    },
    strData: {
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
];
