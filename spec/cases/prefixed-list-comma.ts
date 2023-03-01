/*
 * note: newlines are added to the end of test values to illustrate that they
 * really are 'block' or 'flow' elements.
 */
import type { CamlTestCase } from '../types';
import { htmlListComma } from '../const';


export const camlPrefixedListCommaCases: CamlTestCase[] = [
  // null
  {
    descr: 'prefixed; list; comma-separated; null; all lowercase',
    mkdn: ':attribute::null,null\n',
    html: htmlListComma(
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
    descr: 'prefixed; list; comma-separated; null; camelCase',
    mkdn: ':attribute::Null,Null\n',
    html: htmlListComma(
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
    descr: 'prefixed; list; comma-separated; null; all lowercase',
    mkdn: ':attribute::NULL,NULL\n',
    html: htmlListComma(
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
  // bool
  {
    descr: 'prefixed; list; comma-separated; bool; all lowercase',
    mkdn: ':attribute::true,false\n',
    html: htmlListComma(
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
    descr: 'prefixed; list; comma-separated; bool; camelCase',
    mkdn: ':attribute::True,False\n',
    html: htmlListComma(
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
    descr: 'prefixed; list; comma-separated; bool; all uppercase',
    mkdn: ':attribute::TRUE,FALSE\n',
    html: htmlListComma(
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
    descr: 'prefixed; list; comma-separated; int; canonical',
    mkdn: ':attribute::10,-123\n',
    html: htmlListComma(
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
    descr: 'prefixed; list; comma-separated; int; octal',
    mkdn: ':attribute::0o10,0o123\n',
    html: htmlListComma(
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
    descr: 'prefixed; list; comma-separated; int; hexadecimal',
    mkdn: ':attribute::0xC,0x014D\n',
    html: htmlListComma(
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
    descr: 'prefixed; list; comma-separated; float; canonical',
    mkdn: ':attribute::1.23015,-1.23015\n',
    html: htmlListComma(
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
    descr: 'prefixed; list; comma-separated; float; exp -- exponential',
    mkdn: ':attribute::12.3015e+02,12.3015e-02\n',
    html: htmlListComma(
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
    descr: 'prefixed; list; comma-separated; float; nan -- not a number',
    mkdn: ':attribute::.NaN,.nan\n',
    html: htmlListComma(
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
    descr: 'prefixed; list; comma-separated; time; canonical',
    mkdn: ':attribute::2001-12-15T02:59:43.1Z,2022-12-15T02:59:43.1Z\n',
    html: htmlListComma(
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
    descr: 'prefixed; list; comma-separated; time; iso8601',
    mkdn: ':attribute::2001-12-14t21:59:43.10-05:00,2022-12-14t21:59:43.10-05:00\n',
    html: htmlListComma(
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
    descr: 'prefixed; list; comma-separated; time; spaced',
    mkdn: ':attribute::2001-12-14 21:59:43.10 -5,2022-12-14 21:59:43.10 -5\n',
    html: htmlListComma(
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
    descr: 'prefixed; list; comma-separated; time; date only',
    mkdn: ':attribute::2001-12-14,2022-12-14\n',
    html: htmlListComma(
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
    descr: 'prefixed; list; comma-separated; time; int',
    mkdn: ':attribute::+12:00,12:00\n',
    html: htmlListComma(
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
    descr: 'prefixed; list; comma-separated; time; float',
    mkdn: ':attribute::+12:00.123,12:00.123\n',
    html: htmlListComma(
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
    descr: 'prefixed; list; comma-separated; string; single-line; w/o whitespace',
    mkdn: ':attribute::this-is-a-string,and-another-string\n',
    html: htmlListComma(
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
    descr: 'prefixed; list; comma-separated; string; single-line; w/ whitespace',
    mkdn: ':attribute::this is a string,and another string\n',
    html: htmlListComma(
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
    descr: 'prefixed; list; comma-separated; string; single-line; w/o whitespace; quotes (double); comma',
    mkdn: ':attribute::"this-is,a-string",and-another-string\n',
    html: htmlListComma(
      'attribute', 'string', '"this-is,a-string"',
      'attribute', 'string', 'and-another-string'
    ),
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
];
