import assert from 'node:assert/strict';

import * as caml from '../src';


describe('scan() -- single', () => {

  const testSingle = (params: any) => () => {
    const mkdn: string = params.mkdn;
    const expdData: any = params.data;
    const actlData: any = caml.scan(mkdn);
    assert.deepStrictEqual(actlData, expdData);
  };

  describe('null', () => {

    it('none is not allowed', testSingle({
      mkdn: 'attr::\n',
      data: [],
    }));

    it('lowercase', testSingle({
      mkdn: 'attr::null\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'null', val: { text: 'null', start: 6 } },
          ],
        },
      ],
    }));

    it('camelCase', testSingle({
      mkdn: 'attr::Null\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'null', val: { text: 'Null', start: 6 } },
          ],
        },
      ],
    }));

    it('uppercase', testSingle({
      mkdn: 'attr::NULL\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'null', val: { text: 'NULL', start: 6 } },
          ],
        },
      ],
    }));

  });

  describe('bool', () => {

    it('lowercase', testSingle({
      mkdn: 'attr::true\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'bool', val: { text: 'true', start: 6 } },
          ],
        },
      ],
    }));

    it('camelCase', testSingle({
      mkdn: 'attr::True\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'bool', val: { text: 'True', start: 6 } },
          ],
        },
      ],
    }));

    it('uppercase', testSingle({
      mkdn: 'attr::TRUE\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'bool', val: { text: 'TRUE', start: 6 } },
          ],
        },
      ],
    }));

  });

  describe('int', () => {

    it('canonical', testSingle({
      mkdn: 'attr::10\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'int', val: { text: '10', start: 6 } },
          ],
        },
      ],
    }));

    it('octal', testSingle({
      mkdn: 'attr::0o10\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'int', val: { text: '0o10', start: 6 } },
          ],
        },
      ],
    }));

    it('hexadecimal', testSingle({
      mkdn: 'attr::0x14\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'int', val: { text: '0x14', start: 6 } },
          ],
        },
      ],
    }));

  });

  describe('float', () => {

    it('canonical', testSingle({
      mkdn: 'attr::1.23015\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'float', val: { text: '1.23015', start: 6 } },
          ],
        },
      ],
    }));

    it('exp -- exponential', testSingle({
      mkdn: 'attr::12.3015e+02\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'float', val: { text: '12.3015e+02', start: 6 } },
          ],
        },
      ],
    }));

    it('nan -- not a number', testSingle({
      mkdn: 'attr::.nan\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'float', val: { text: '.nan', start: 6 } },
          ],
        },
      ],
    }));

  });

  describe('time', () => {

    it('canonical', testSingle({
      mkdn: 'attr::2001-12-15T02:59:43.1Z\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'time', val: { text: '2001-12-15T02:59:43.1Z', start: 6 } },
          ],
        },
      ],
    }));

    it('iso8601', testSingle({
      mkdn: 'attr::2001-12-14t21:59:43.10-05:00\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'time', val: { text: '2001-12-14t21:59:43.10-05:00', start: 6 } },
          ],
        },
      ],
    }));

    it('spaced', testSingle({
      mkdn: 'attr::2001-12-14 21:59:43.10 -5\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'time', val: { text: '2001-12-14 21:59:43.10 -5', start: 6 } },
          ],
        },
      ],
    }));

    it('date only', testSingle({
      mkdn: 'attr::2001-12-14\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'time', val: { text: '2001-12-14', start: 6 } },
          ],
        },
      ],
    }));

    it('int', testSingle({
      mkdn: 'attr::+12:00\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'time', val: { text: '+12:00', start: 6 } },
          ],
        },
      ],
    }));

    it('float', testSingle({
      mkdn: 'attr::+12:00.123\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'time', val: { text: '+12:00.123', start: 6 } },
          ],
        },
      ],
    }));

  });

  describe('string', () => {

    it('single-line; w/out whitespace', testSingle({
      mkdn: 'attr::value-w/out-whitespace\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'string', val: { text: 'value-w/out-whitespace', start: 6 } },
          ],
        },
      ],
    }));

    it('single-line, w/ whitespace', testSingle({
      mkdn: 'attr::value with whitespace\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'string', val: { text: 'value with whitespace', start: 6 } },
          ],
        },
      ],
    }));

    it('single-line; w/ colon prefix', testSingle({
      mkdn: ':attr::value with whitespace\n',
      data: [
        {
          key: { text: 'attr', start: 1 },
          vals: [
            { type: 'string', val: { text: 'value with whitespace', start: 7 } },
          ],
        },
      ],
    }));

    it('single-line; w/ colon prefix; w/ whitespace pad', testSingle({
      mkdn: ': attr  ::value with whitespace\n',
      data: [
        {
          key: { text: 'attr', start: 2 },
          vals: [
            { type: 'string', val: { text: 'value with whitespace', start: 10 } },
          ],
        },
      ],
    }));

    it('single-line; w/ colon prefix; math value', testSingle({
      mkdn: ': gravity :: 9.8m/s^2\n',
      data: [
        {
          key: { text: 'gravity', start: 2 },
          vals: [
            { type: 'string', val: { text: '9.8m/s^2', start: 13 } },
          ],
        },
      ],
    }));

    it('single-line; w/ colon prefix; skip wikiref', testSingle({
      mkdn: ': tldr :: \'\'\n\n[[wikilink]]\n',
      data: [
        {
          key: { text: 'tldr', start: 2 },
          vals: [
            { type: 'string', val: { text: '\'\'', start: 10 } },
          ],
        },
      ],
    }));

    it('single-line; w/ colon prefix; fixed bug', testSingle({
      mkdn: ': tldr :: tldr\n',
      data: [
        {
          key: { text: 'tldr', start: 2 },
          vals: [
            { type: 'string', val: { text: 'tldr', start: 10 } },
          ],
        },
      ],
    }));

    // multi-line string

    it('multi-line; folded (gt); basic', testSingle({
      mkdn: 'attr::>\n  this is a long string\n  that spans multiple\n  lines\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'string', val: { text: 'this is a long string that spans multiple lines\n', start: 6 } },
          ],
        },
      ],
    }));

  });

  describe('mixed', () => {

    it('multiple values', testSingle({
      mkdn: 'attr1::value-w/out-whitespace\nattr2::123\n',
      data: [
        {
          key: { text: 'attr1', start: 0 },
          vals: [
            { type: 'string', val: { text: 'value-w/out-whitespace', start: 7 } },
          ],
        },
        {
          key: { text: 'attr2', start: 30 },
          vals: [
            { type: 'int', val: { text: '123', start: 37 } },
          ],
        },
      ],
    }));

  });

  describe('wikilinks', () => {

    it('[[wikilinks]] resolved as wiki type', testSingle({
      mkdn: 'attr :: [[wikilink]]\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'wiki', val: { text: '[[wikilink]]', start: 8 } },
          ],
        },
      ],
    }));

    it('[[wikilinks]] alongside primitives', testSingle({
      mkdn: 'attr1 :: a string\nattr2 :: [[wikilink]]\n',
      data: [
        {
          key: { text: 'attr1', start: 0 },
          vals: [
            { type: 'string', val: { text: 'a string', start: 9 } },
          ],
        },
        {
          key: { text: 'attr2', start: 18 },
          vals: [
            { type: 'wiki', val: { text: '[[wikilink]]', start: 27 } },
          ],
        },
      ],
    }));

  });

});
