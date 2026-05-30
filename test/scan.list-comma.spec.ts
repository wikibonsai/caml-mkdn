import assert from 'node:assert/strict';

import * as caml from '../src';


describe('scan() -- list-comma', () => {

  const testListComma = (params: any) => () => {
    const mkdn: string = params.mkdn;
    const expdData: any = params.data;
    const actlData: any = caml.scan(mkdn);
    assert.deepStrictEqual(actlData, expdData);
  };

  describe('null', () => {

    it('lowercase', testListComma({
      mkdn: 'attr::null, null\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'null', val: { text: 'null', start: 6 } },
            { type: 'null', val: { text: 'null', start: 12 } },
          ],
        },
      ],
    }));

    it('camelCase', testListComma({
      mkdn: 'attr::Null, Null\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'null', val: { text: 'Null', start: 6 } },
            { type: 'null', val: { text: 'Null', start: 12 } },
          ],
        },
      ],
    }));

    it('uppercase', testListComma({
      mkdn: 'attr::NULL, NULL\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'null', val: { text: 'NULL', start: 6 } },
            { type: 'null', val: { text: 'NULL', start: 12 } },
          ],
        },
      ],
    }));

  });

  describe('bool', () => {

    it('lowercase', testListComma({
      mkdn: 'attr::true, false\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'bool', val: { text: 'true', start: 6 } },
            { type: 'bool', val: { text: 'false', start: 12 } },
          ],
        },
      ],
    }));

    it('camelCase', testListComma({
      mkdn: 'attr::True, False\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'bool', val: { text: 'True', start: 6 } },
            { type: 'bool', val: { text: 'False', start: 12 } },
          ],
        },
      ],
    }));

    it('uppercase', testListComma({
      mkdn: 'attr::TRUE, FALSE\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'bool', val: { text: 'TRUE', start: 6 } },
            { type: 'bool', val: { text: 'FALSE', start: 12 } },
          ],
        },
      ],
    }));

  });

  describe('int', () => {

    it('canonical', testListComma({
      mkdn: 'attr::10, -123\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'int', val: { text: '10', start: 6 } },
            { type: 'int', val: { text: '-123', start: 10 } },
          ],
        },
      ],
    }));

    it('octal', testListComma({
      mkdn: 'attr::0o10, 0o123\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'int', val: { text: '0o10', start: 6 } },
            { type: 'int', val: { text: '0o123', start: 12 } },
          ],
        },
      ],
    }));

    it('hexadecimal', testListComma({
      mkdn: 'attr::0xC, 0x14\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'int', val: { text: '0xC', start: 6 } },
            { type: 'int', val: { text: '0x14', start: 11 } },
          ],
        },
      ],
    }));

  });

  describe('float', () => {

    it('canonical', testListComma({
      mkdn: 'attr::1.23015, -1.23015\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'float', val: { text: '1.23015', start: 6 } },
            { type: 'float', val: { text: '-1.23015', start: 15 } },
          ],
        },
      ],
    }));

    it('exp -- exponential', testListComma({
      mkdn: 'attr::12.3015e+02, 12.3015e-02\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'float', val: { text: '12.3015e+02', start: 6 } },
            { type: 'float', val: { text: '12.3015e-02', start: 19 } },
          ],
        },
      ],
    }));

    it('nan -- not a number', testListComma({
      mkdn: 'attr::.NaN, .nan\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'float', val: { text: '.NaN', start: 6 } },
            { type: 'float', val: { text: '.nan', start: 12 } },
          ],
        },
      ],
    }));

  });

  describe('time', () => {

    it('canonical', testListComma({
      mkdn: 'attr::2001-12-15T02:59:43.1Z, 2022-12-15T02:59:43.1Z\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'time', val: { text: '2001-12-15T02:59:43.1Z', start: 6 } },
            { type: 'time', val: { text: '2022-12-15T02:59:43.1Z', start: 30 } },
          ],
        },
      ],
    }));

    it('iso8601', testListComma({
      mkdn: 'attr::2001-12-14t21:59:43.10-05:00, 2022-12-14t21:59:43.10-05:00\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'time', val: { text: '2001-12-14t21:59:43.10-05:00', start: 6 } },
            { type: 'time', val: { text: '2022-12-14t21:59:43.10-05:00', start: 36 } },
          ],
        },
      ],
    }));

    it('spaced', testListComma({
      mkdn: 'attr::2001-12-14 21:59:43.10 -5, 2022-12-14 21:59:43.10 -5\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'time', val: { text: '2001-12-14 21:59:43.10 -5', start: 6 } },
            { type: 'time', val: { text: '2022-12-14 21:59:43.10 -5', start: 33 } },
          ],
        },
      ],
    }));

    it('date only', testListComma({
      mkdn: 'attr::2001-12-14, 2022-12-14\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'time', val: { text: '2001-12-14', start: 6 } },
            { type: 'time', val: { text: '2022-12-14', start: 18 } },
          ],
        },
      ],
    }));

    it('int', testListComma({
      mkdn: 'attr::+12:00, 12:00\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'time', val: { text: '+12:00', start: 6 } },
            { type: 'time', val: { text: '12:00', start: 14 } },
          ],
        },
      ],
    }));

    it('float', testListComma({
      mkdn: 'attr::+12:00.123, 12:00.123\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'time', val: { text: '+12:00.123', start: 6 } },
            { type: 'time', val: { text: '12:00.123', start: 18 } },
          ],
        },
      ],
    }));

  });

  describe('string', () => {

    it('single-line; w/out whitespace', testListComma({
      mkdn: 'attr::value-w/out-whitespace, and-another\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'string', val: { text: 'value-w/out-whitespace', start: 6 } },
            { type: 'string', val: { text: 'and-another', start: 30 } },
          ],
        },
      ],
    }));

    it('single-line, w/ whitespace', testListComma({
      mkdn: 'attr::value with whitespace, and another\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'string', val: { text: 'value with whitespace', start: 6 } },
            { type: 'string', val: { text: 'and another', start: 29 } },
          ],
        },
      ],
    }));

    it('single-line, w/ colon prefix', testListComma({
      mkdn: ':attr::value with whitespace, and another\n',
      data: [
        {
          key: { text: 'attr', start: 1 },
          vals: [
            { type: 'string', val: { text: 'value with whitespace', start: 7 } },
            { type: 'string', val: { text: 'and another', start: 30 } },
          ],
        },
      ],
    }));

    it('single-line, w/ colon prefix; w/ whitespace pad', testListComma({
      mkdn: ': attr  ::value with whitespace, and another\n',
      data: [
        {
          key: { text: 'attr', start: 2 },
          vals: [
            { type: 'string', val: { text: 'value with whitespace', start: 10 } },
            { type: 'string', val: { text: 'and another', start: 33 } },
          ],
        },
      ],
    }));

    it('single-line, w/ duplicate values', testListComma({
      mkdn: 'attr::test,test,test\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'string', val: { text: 'test', start: 6 } },
            { type: 'string', val: { text: 'test', start: 11 } },
            { type: 'string', val: { text: 'test', start: 16 } },
          ],
        },
      ],
    }));

  });

});
