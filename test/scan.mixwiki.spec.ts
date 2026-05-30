import assert from 'node:assert/strict';

import * as caml from '../src';


describe('scan() -- mixed wiki + primitive types', () => {

  const testMixed = (params: any) => () => {
    const mkdn: string = params.mkdn;
    const expdData: any = params.data;
    const actlData: any = caml.scan(mkdn);
    assert.deepStrictEqual(actlData, expdData);
  };

  describe('comma list; unprefixed', () => {

    it('wiki + string', testMixed({
      mkdn: 'attr :: [[concept]], hello\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'wiki',   val: { text: '[[concept]]', start: 8 } },
            { type: 'string', val: { text: 'hello', start: 21 } },
          ],
        },
      ],
    }));

    it('string + wiki', testMixed({
      mkdn: 'attr :: hello, [[concept]]\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'string', val: { text: 'hello', start: 8 } },
            { type: 'wiki',   val: { text: '[[concept]]', start: 15 } },
          ],
        },
      ],
    }));

    it('wiki + int', testMixed({
      mkdn: 'attr :: [[concept]], 42\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'wiki', val: { text: '[[concept]]', start: 8 } },
            { type: 'int',  val: { text: '42', start: 21 } },
          ],
        },
      ],
    }));

    it('wiki + bool', testMixed({
      mkdn: 'attr :: [[concept]], true\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'wiki', val: { text: '[[concept]]', start: 8 } },
            { type: 'bool', val: { text: 'true', start: 21 } },
          ],
        },
      ],
    }));

    it('wiki + string + int', testMixed({
      mkdn: 'attr :: [[concept]], hello, 42\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'wiki',   val: { text: '[[concept]]', start: 8 } },
            { type: 'string', val: { text: 'hello', start: 21 } },
            { type: 'int',    val: { text: '42', start: 28 } },
          ],
        },
      ],
    }));

    it('multiple wiki + primitive', testMixed({
      mkdn: 'attr :: [[link-a]], [[link-b]], hello\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'wiki',   val: { text: '[[link-a]]', start: 8 } },
            { type: 'wiki',   val: { text: '[[link-b]]', start: 20 } },
            { type: 'string', val: { text: 'hello', start: 32 } },
          ],
        },
      ],
    }));

    it('wiki + null', testMixed({
      mkdn: 'attr :: [[concept]], null\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'wiki', val: { text: '[[concept]]', start: 8 } },
            { type: 'null', val: { text: 'null', start: 21 } },
          ],
        },
      ],
    }));

    it('wiki + int_hex', testMixed({
      mkdn: 'attr :: [[concept]], 0xFF\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'wiki', val: { text: '[[concept]]', start: 8 } },
            { type: 'int',  val: { text: '0xFF', start: 21 } },
          ],
        },
      ],
    }));

    it('wiki + int_oct', testMixed({
      mkdn: 'attr :: [[concept]], 0o77\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'wiki', val: { text: '[[concept]]', start: 8 } },
            { type: 'int',  val: { text: '0o77', start: 21 } },
          ],
        },
      ],
    }));

    it('wiki + float', testMixed({
      mkdn: 'attr :: [[concept]], 3.14\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'wiki',  val: { text: '[[concept]]', start: 8 } },
            { type: 'float', val: { text: '3.14', start: 21 } },
          ],
        },
      ],
    }));

    it('wiki + float_exp', testMixed({
      mkdn: 'attr :: [[concept]], 1.0e3\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'wiki',  val: { text: '[[concept]]', start: 8 } },
            { type: 'float', val: { text: '1.0e3', start: 21 } },
          ],
        },
      ],
    }));

    it('wiki + float_nan', testMixed({
      mkdn: 'attr :: [[concept]], .NaN\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'wiki',  val: { text: '[[concept]]', start: 8 } },
            { type: 'float', val: { text: '.NaN', start: 21 } },
          ],
        },
      ],
    }));

    it('wiki + timestamp', testMixed({
      mkdn: 'attr :: [[concept]], 2026-05-23\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'wiki', val: { text: '[[concept]]', start: 8 } },
            { type: 'time', val: { text: '2026-05-23', start: 21 } },
          ],
        },
      ],
    }));

  });

  describe('comma list; prefixed', () => {

    it('wiki + string', testMixed({
      mkdn: ': attr :: [[concept]], hello\n',
      data: [
        {
          key: { text: 'attr', start: 2 },
          vals: [
            { type: 'wiki',   val: { text: '[[concept]]', start: 10 } },
            { type: 'string', val: { text: 'hello', start: 23 } },
          ],
        },
      ],
    }));

    it('string + wiki', testMixed({
      mkdn: ': attr :: hello, [[concept]]\n',
      data: [
        {
          key: { text: 'attr', start: 2 },
          vals: [
            { type: 'string', val: { text: 'hello', start: 10 } },
            { type: 'wiki',   val: { text: '[[concept]]', start: 17 } },
          ],
        },
      ],
    }));

    it('wiki + int', testMixed({
      mkdn: ': attr :: [[concept]], 42\n',
      data: [
        {
          key: { text: 'attr', start: 2 },
          vals: [
            { type: 'wiki', val: { text: '[[concept]]', start: 10 } },
            { type: 'int',  val: { text: '42', start: 23 } },
          ],
        },
      ],
    }));

    it('wiki + bool', testMixed({
      mkdn: ': attr :: [[concept]], true\n',
      data: [
        {
          key: { text: 'attr', start: 2 },
          vals: [
            { type: 'wiki', val: { text: '[[concept]]', start: 10 } },
            { type: 'bool', val: { text: 'true', start: 23 } },
          ],
        },
      ],
    }));

    it('wiki + string + int', testMixed({
      mkdn: ': attr :: [[concept]], hello, 42\n',
      data: [
        {
          key: { text: 'attr', start: 2 },
          vals: [
            { type: 'wiki',   val: { text: '[[concept]]', start: 10 } },
            { type: 'string', val: { text: 'hello', start: 23 } },
            { type: 'int',    val: { text: '42', start: 30 } },
          ],
        },
      ],
    }));

    it('multiple wiki + primitive', testMixed({
      mkdn: ': attr :: [[link-a]], [[link-b]], hello\n',
      data: [
        {
          key: { text: 'attr', start: 2 },
          vals: [
            { type: 'wiki',   val: { text: '[[link-a]]', start: 10 } },
            { type: 'wiki',   val: { text: '[[link-b]]', start: 22 } },
            { type: 'string', val: { text: 'hello', start: 34 } },
          ],
        },
      ],
    }));

  });

  describe('mkdn list; unprefixed', () => {

    it('wiki + string', testMixed({
      mkdn: 'attr::\n'
          + '- [[concept]]\n'
          + '- hello\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'wiki',   val: { text: '[[concept]]', start: 9 } },
            { type: 'string', val: { text: 'hello', start: 23 } },
          ],
        },
      ],
    }));

    it('string + wiki', testMixed({
      mkdn: 'attr::\n'
          + '- hello\n'
          + '- [[concept]]\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'string', val: { text: 'hello', start: 9 } },
            { type: 'wiki',   val: { text: '[[concept]]', start: 17 } },
          ],
        },
      ],
    }));

    it('wiki + int', testMixed({
      mkdn: 'attr::\n'
          + '- [[concept]]\n'
          + '- 42\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'wiki', val: { text: '[[concept]]', start: 9 } },
            { type: 'int',  val: { text: '42', start: 23 } },
          ],
        },
      ],
    }));

    it('wiki + bool', testMixed({
      mkdn: 'attr::\n'
          + '- [[concept]]\n'
          + '- true\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'wiki', val: { text: '[[concept]]', start: 9 } },
            { type: 'bool', val: { text: 'true', start: 23 } },
          ],
        },
      ],
    }));

    it('wiki + string + int', testMixed({
      mkdn: 'attr::\n'
          + '- [[concept]]\n'
          + '- hello\n'
          + '- 42\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'wiki',   val: { text: '[[concept]]', start: 9 } },
            { type: 'string', val: { text: 'hello', start: 23 } },
            { type: 'int',    val: { text: '42', start: 31 } },
          ],
        },
      ],
    }));

    it('multiple wiki + primitive', testMixed({
      mkdn: 'attr::\n'
          + '- [[link-a]]\n'
          + '- [[link-b]]\n'
          + '- hello\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'wiki',   val: { text: '[[link-a]]', start: 9 } },
            { type: 'wiki',   val: { text: '[[link-b]]', start: 22 } },
            { type: 'string', val: { text: 'hello', start: 35 } },
          ],
        },
      ],
    }));

    it('wiki + null', testMixed({
      mkdn: 'attr::\n'
          + '- [[concept]]\n'
          + '- null\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'wiki', val: { text: '[[concept]]', start: 9 } },
            { type: 'null', val: { text: 'null', start: 23 } },
          ],
        },
      ],
    }));

    it('wiki + int_hex', testMixed({
      mkdn: 'attr::\n'
          + '- [[concept]]\n'
          + '- 0xFF\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'wiki', val: { text: '[[concept]]', start: 9 } },
            { type: 'int',  val: { text: '0xFF', start: 23 } },
          ],
        },
      ],
    }));

    it('wiki + int_oct', testMixed({
      mkdn: 'attr::\n'
          + '- [[concept]]\n'
          + '- 0o77\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'wiki', val: { text: '[[concept]]', start: 9 } },
            { type: 'int',  val: { text: '0o77', start: 23 } },
          ],
        },
      ],
    }));

    it('wiki + float', testMixed({
      mkdn: 'attr::\n'
          + '- [[concept]]\n'
          + '- 3.14\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'wiki',  val: { text: '[[concept]]', start: 9 } },
            { type: 'float', val: { text: '3.14', start: 23 } },
          ],
        },
      ],
    }));

    it('wiki + float_exp', testMixed({
      mkdn: 'attr::\n'
          + '- [[concept]]\n'
          + '- 1.0e3\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'wiki',  val: { text: '[[concept]]', start: 9 } },
            { type: 'float', val: { text: '1.0e3', start: 23 } },
          ],
        },
      ],
    }));

    it('wiki + float_nan', testMixed({
      mkdn: 'attr::\n'
          + '- [[concept]]\n'
          + '- .NaN\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'wiki',  val: { text: '[[concept]]', start: 9 } },
            { type: 'float', val: { text: '.NaN', start: 23 } },
          ],
        },
      ],
    }));

    it('wiki + timestamp', testMixed({
      mkdn: 'attr::\n'
          + '- [[concept]]\n'
          + '- 2026-05-23\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'wiki', val: { text: '[[concept]]', start: 9 } },
            { type: 'time', val: { text: '2026-05-23', start: 23 } },
          ],
        },
      ],
    }));

  });

  describe('mkdn list; prefixed', () => {

    it('wiki + string', testMixed({
      mkdn: ':attr::\n'
          + '- [[concept]]\n'
          + '- hello\n',
      data: [
        {
          key: { text: 'attr', start: 1 },
          vals: [
            { type: 'wiki',   val: { text: '[[concept]]', start: 10 } },
            { type: 'string', val: { text: 'hello', start: 24 } },
          ],
        },
      ],
    }));

    it('string + wiki', testMixed({
      mkdn: ':attr::\n'
          + '- hello\n'
          + '- [[concept]]\n',
      data: [
        {
          key: { text: 'attr', start: 1 },
          vals: [
            { type: 'string', val: { text: 'hello', start: 10 } },
            { type: 'wiki',   val: { text: '[[concept]]', start: 18 } },
          ],
        },
      ],
    }));

    it('wiki + int', testMixed({
      mkdn: ':attr::\n'
          + '- [[concept]]\n'
          + '- 42\n',
      data: [
        {
          key: { text: 'attr', start: 1 },
          vals: [
            { type: 'wiki', val: { text: '[[concept]]', start: 10 } },
            { type: 'int',  val: { text: '42', start: 24 } },
          ],
        },
      ],
    }));

    it('wiki + bool', testMixed({
      mkdn: ':attr::\n'
          + '- [[concept]]\n'
          + '- true\n',
      data: [
        {
          key: { text: 'attr', start: 1 },
          vals: [
            { type: 'wiki', val: { text: '[[concept]]', start: 10 } },
            { type: 'bool', val: { text: 'true', start: 24 } },
          ],
        },
      ],
    }));

    it('wiki + string + int', testMixed({
      mkdn: ':attr::\n'
          + '- [[concept]]\n'
          + '- hello\n'
          + '- 42\n',
      data: [
        {
          key: { text: 'attr', start: 1 },
          vals: [
            { type: 'wiki',   val: { text: '[[concept]]', start: 10 } },
            { type: 'string', val: { text: 'hello', start: 24 } },
            { type: 'int',    val: { text: '42', start: 32 } },
          ],
        },
      ],
    }));

    it('multiple wiki + primitive', testMixed({
      mkdn: ':attr::\n'
          + '- [[link-a]]\n'
          + '- [[link-b]]\n'
          + '- hello\n',
      data: [
        {
          key: { text: 'attr', start: 1 },
          vals: [
            { type: 'wiki',   val: { text: '[[link-a]]', start: 10 } },
            { type: 'wiki',   val: { text: '[[link-b]]', start: 23 } },
            { type: 'string', val: { text: 'hello', start: 36 } },
          ],
        },
      ],
    }));

  });

  describe('existing wikilink tests (previously returned empty)', () => {

    it('single wiki value now returns data', testMixed({
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

    it('wiki attr alongside primitive attr', testMixed({
      mkdn: 'attr1 :: a string\n'
          + 'attr2 :: [[wikilink]]\n',
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
