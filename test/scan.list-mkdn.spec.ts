import assert from 'node:assert/strict';

import * as caml from '../src';


describe('scan() -- list-mkdn', () => {

  const testListMkdn = (params: any) => () => {
    const mkdn: string = params.mkdn;
    const expdData: any = params.data;
    const actlData: any = caml.scan(mkdn);
    assert.deepStrictEqual(actlData, expdData);
  };

  describe('null', () => {

    it('none is not allowed', testListMkdn({
      mkdn: 'attr::\n- \n',
      data: [],
    }));

    it('lowercase', testListMkdn({
      mkdn: 'attr::\n- null\n- null\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'null', val: { text: 'null', start: 9 } },
            { type: 'null', val: { text: 'null', start: 16 } },
          ],
        },
      ],
    }));

    it('camelCase', testListMkdn({
      mkdn: 'attr::\n- Null\n- Null\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'null', val: { text: 'Null', start: 9 } },
            { type: 'null', val: { text: 'Null', start: 16 } },
          ],
        },
      ],
    }));

    it('uppercase', testListMkdn({
      mkdn: 'attr::\n- NULL\n- NULL\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'null', val: { text: 'NULL', start: 9 } },
            { type: 'null', val: { text: 'NULL', start: 16 } },
          ],
        },
      ],
    }));

  });

  describe('bool', () => {

    it('lowercase', testListMkdn({
      mkdn: 'attr::\n- true\n- false\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'bool', val: { text: 'true', start: 9 } },
            { type: 'bool', val: { text: 'false', start: 16 } },
          ],
        },
      ],
    }));

    it('camelCase', testListMkdn({
      mkdn: 'attr::\n- True\n- False\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'bool', val: { text: 'True', start: 9 } },
            { type: 'bool', val: { text: 'False', start: 16 } },
          ],
        },
      ],
    }));

    it('uppercase', testListMkdn({
      mkdn: 'attr::\n- TRUE\n- FALSE\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'bool', val: { text: 'TRUE', start: 9 } },
            { type: 'bool', val: { text: 'FALSE', start: 16 } },
          ],
        },
      ],
    }));

  });

  describe('int', () => {

    it('canonical', testListMkdn({
      mkdn: 'attr::\n- 10\n- -123\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'int', val: { text: '10', start: 9 } },
            { type: 'int', val: { text: '-123', start: 14 } },
          ],
        },
      ],
    }));

    it('octal', testListMkdn({
      mkdn: 'attr::\n- 0o10\n- 0o123\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'int', val: { text: '0o10', start: 9 } },
            { type: 'int', val: { text: '0o123', start: 16 } },
          ],
        },
      ],
    }));

    it('hexadecimal', testListMkdn({
      mkdn: 'attr::\n- 0xC\n- 0x14\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'int', val: { text: '0xC', start: 9 } },
            { type: 'int', val: { text: '0x14', start: 15 } },
          ],
        },
      ],
    }));

  });

  describe('float', () => {

    it('canonical', testListMkdn({
      mkdn: 'attr::\n- 1.23015\n- -1.23015\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'float', val: { text: '1.23015', start: 9 } },
            { type: 'float', val: { text: '-1.23015', start: 19 } },
          ],
        },
      ],
    }));

    it('exp -- exponential', testListMkdn({
      mkdn: 'attr::\n- 12.3015e+02\n- 12.3015e-02\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'float', val: { text: '12.3015e+02', start: 9 } },
            { type: 'float', val: { text: '12.3015e-02', start: 23 } },
          ],
        },
      ],
    }));

    it('nan -- not a number', testListMkdn({
      mkdn: 'attr::\n- .NaN\n- .nan\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'float', val: { text: '.NaN', start: 9 } },
            { type: 'float', val: { text: '.nan', start: 16 } },
          ],
        },
      ],
    }));

  });

  describe('time', () => {

    it('canonical', testListMkdn({
      mkdn: 'attr::\n- 2001-12-15T02:59:43.1Z\n- 2022-12-15T02:59:43.1Z\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'time', val: { text: '2001-12-15T02:59:43.1Z', start: 9 } },
            { type: 'time', val: { text: '2022-12-15T02:59:43.1Z', start: 34 } },
          ],
        },
      ],
    }));

    it('iso8601', testListMkdn({
      mkdn: 'attr::\n- 2001-12-14t21:59:43.10-05:00\n- 2022-12-14t21:59:43.10-05:00\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'time', val: { text: '2001-12-14t21:59:43.10-05:00', start: 9 } },
            { type: 'time', val: { text: '2022-12-14t21:59:43.10-05:00', start: 40 } },
          ],
        },
      ],
    }));

    it('spaced', testListMkdn({
      mkdn: 'attr::\n- 2001-12-14 21:59:43.10 -5\n- 2022-12-14 21:59:43.10 -5\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'time', val: { text: '2001-12-14 21:59:43.10 -5', start: 9 } },
            { type: 'time', val: { text: '2022-12-14 21:59:43.10 -5', start: 37 } },
          ],
        },
      ],
    }));

    it('date only', testListMkdn({
      mkdn: 'attr::\n- 2001-12-14\n- 2022-12-14\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'time', val: { text: '2001-12-14', start: 9 } },
            { type: 'time', val: { text: '2022-12-14', start: 22 } },
          ],
        },
      ],
    }));

    it('int', testListMkdn({
      mkdn: 'attr::\n- +12:00\n- 12:00\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'time', val: { text: '+12:00', start: 9 } },
            { type: 'time', val: { text: '12:00', start: 18 } },
          ],
        },
      ],
    }));

    it('float', testListMkdn({
      mkdn: 'attr::\n- +12:00.123\n- 12:00.123\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'time', val: { text: '+12:00.123', start: 9 } },
            { type: 'time', val: { text: '12:00.123', start: 22 } },
          ],
        },
      ],
    }));

  });

  describe('string', () => {

    it('single-line; w/out whitespace', testListMkdn({
      mkdn: 'attr::\n- value-w/out-whitespace\n- and-another\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'string', val: { text: 'value-w/out-whitespace', start: 9 } },
            { type: 'string', val: { text: 'and-another', start: 34 } },
          ],
        },
      ],
    }));

    it('single-line, w/ whitespace', testListMkdn({
      mkdn: 'attr::\n- value with whitespace\n-  and another\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'string', val: { text: 'value with whitespace', start: 9 } },
            { type: 'string', val: { text: 'and another', start: 34 } },
          ],
        },
      ],
    }));

    it('single-line, w/ colon prefix', testListMkdn({
      mkdn: ':attr::\n- value with whitespace\n-  and another\n',
      data: [
        {
          key: { text: 'attr', start: 1 },
          vals: [
            { type: 'string', val: { text: 'value with whitespace', start: 10 } },
            { type: 'string', val: { text: 'and another', start: 35 } },
          ],
        },
      ],
    }));

    it('single-line, w/ colon prefix; w/ whitespace pad', testListMkdn({
      mkdn: ': attr  ::\n- value with whitespace\n-  and another\n',
      data: [
        {
          key: { text: 'attr  ', start: 2 },
          vals: [
            { type: 'string', val: { text: 'value with whitespace', start: 13 } },
            { type: 'string', val: { text: 'and another', start: 38 } },
          ],
        },
      ],
    }));

    it('single-line; w/ duplicate values', testListMkdn({
      mkdn: 'attr::\n- test\n- test\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'string', val: { text: 'test', start: 9 } },
            { type: 'string', val: { text: 'test', start: 16 } },
          ],
        },
      ],
    }));

  });

  describe('wikilinks', () => {

    it('[[wikilinks]] resolved as wiki type', testListMkdn({
      mkdn: 'attr::\n- [[wikilink]]\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'wiki', val: { text: '[[wikilink]]', start: 9 } },
          ],
        },
      ],
    }));

  });

});
