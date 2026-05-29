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
        { key: ['attr', 0] },
        { type: 'wiki',   val: ['[[concept]]', 8] },
        { type: 'string', val: ['hello', 21] },
      ],
    }));

    it('string + wiki', testMixed({
      mkdn: 'attr :: hello, [[concept]]\n',
      data: [
        { key: ['attr', 0] },
        { type: 'string', val: ['hello', 8] },
        { type: 'wiki',   val: ['[[concept]]', 15] },
      ],
    }));

    it('wiki + int', testMixed({
      mkdn: 'attr :: [[concept]], 42\n',
      data: [
        { key: ['attr', 0] },
        { type: 'wiki', val: ['[[concept]]', 8] },
        { type: 'int',  val: ['42', 21] },
      ],
    }));

    it('wiki + bool', testMixed({
      mkdn: 'attr :: [[concept]], true\n',
      data: [
        { key: ['attr', 0] },
        { type: 'wiki', val: ['[[concept]]', 8] },
        { type: 'bool', val: ['true', 21] },
      ],
    }));

    it('wiki + string + int', testMixed({
      mkdn: 'attr :: [[concept]], hello, 42\n',
      data: [
        { key: ['attr', 0] },
        { type: 'wiki',   val: ['[[concept]]', 8] },
        { type: 'string', val: ['hello', 21] },
        { type: 'int',    val: ['42', 28] },
      ],
    }));

    it('multiple wiki + primitive', testMixed({
      mkdn: 'attr :: [[link-a]], [[link-b]], hello\n',
      data: [
        { key: ['attr', 0] },
        { type: 'wiki',   val: ['[[link-a]]', 8] },
        { type: 'wiki',   val: ['[[link-b]]', 20] },
        { type: 'string', val: ['hello', 32] },
      ],
    }));

    it('wiki + null', testMixed({
      mkdn: 'attr :: [[concept]], null\n',
      data: [
        { key: ['attr', 0] },
        { type: 'wiki', val: ['[[concept]]', 8] },
        { type: 'null', val: ['null', 21] },
      ],
    }));

    it('wiki + int_hex', testMixed({
      mkdn: 'attr :: [[concept]], 0xFF\n',
      data: [
        { key: ['attr', 0] },
        { type: 'wiki',    val: ['[[concept]]', 8] },
        { type: 'int',  val: ['0xFF', 21] },
      ],
    }));

    it('wiki + int_oct', testMixed({
      mkdn: 'attr :: [[concept]], 0o77\n',
      data: [
        { key: ['attr', 0] },
        { type: 'wiki',    val: ['[[concept]]', 8] },
        { type: 'int',  val: ['0o77', 21] },
      ],
    }));

    it('wiki + float', testMixed({
      mkdn: 'attr :: [[concept]], 3.14\n',
      data: [
        { key: ['attr', 0] },
        { type: 'wiki',  val: ['[[concept]]', 8] },
        { type: 'float', val: ['3.14', 21] },
      ],
    }));

    it('wiki + float_exp', testMixed({
      mkdn: 'attr :: [[concept]], 1.0e3\n',
      data: [
        { key: ['attr', 0] },
        { type: 'wiki',      val: ['[[concept]]', 8] },
        { type: 'float', val: ['1.0e3', 21] },
      ],
    }));

    it('wiki + float_nan', testMixed({
      mkdn: 'attr :: [[concept]], .NaN\n',
      data: [
        { key: ['attr', 0] },
        { type: 'wiki',      val: ['[[concept]]', 8] },
        { type: 'float', val: ['.NaN', 21] },
      ],
    }));

    it('wiki + timestamp', testMixed({
      mkdn: 'attr :: [[concept]], 2026-05-23\n',
      data: [
        { key: ['attr', 0] },
        { type: 'wiki',      val: ['[[concept]]', 8] },
        { type: 'time', val: ['2026-05-23', 21] },
      ],
    }));

  });

  describe('comma list; prefixed', () => {

    it('wiki + string', testMixed({
      mkdn: ': attr :: [[concept]], hello\n',
      data: [
        { key: ['attr', 2] },
        { type: 'wiki',   val: ['[[concept]]', 10] },
        { type: 'string', val: ['hello', 23] },
      ],
    }));

    it('string + wiki', testMixed({
      mkdn: ': attr :: hello, [[concept]]\n',
      data: [
        { key: ['attr', 2] },
        { type: 'string', val: ['hello', 10] },
        { type: 'wiki',   val: ['[[concept]]', 17] },
      ],
    }));

    it('wiki + int', testMixed({
      mkdn: ': attr :: [[concept]], 42\n',
      data: [
        { key: ['attr', 2] },
        { type: 'wiki', val: ['[[concept]]', 10] },
        { type: 'int',  val: ['42', 23] },
      ],
    }));

    it('wiki + bool', testMixed({
      mkdn: ': attr :: [[concept]], true\n',
      data: [
        { key: ['attr', 2] },
        { type: 'wiki', val: ['[[concept]]', 10] },
        { type: 'bool', val: ['true', 23] },
      ],
    }));

    it('wiki + string + int', testMixed({
      mkdn: ': attr :: [[concept]], hello, 42\n',
      data: [
        { key: ['attr', 2] },
        { type: 'wiki',   val: ['[[concept]]', 10] },
        { type: 'string', val: ['hello', 23] },
        { type: 'int',    val: ['42', 30] },
      ],
    }));

    it('multiple wiki + primitive', testMixed({
      mkdn: ': attr :: [[link-a]], [[link-b]], hello\n',
      data: [
        { key: ['attr', 2] },
        { type: 'wiki',   val: ['[[link-a]]', 10] },
        { type: 'wiki',   val: ['[[link-b]]', 22] },
        { type: 'string', val: ['hello', 34] },
      ],
    }));

  });

  describe('mkdn list; unprefixed', () => {

    it('wiki + string', testMixed({
      mkdn: 'attr::\n'
          + '- [[concept]]\n'
          + '- hello\n',
      data: [
        { key: ['attr', 0] },
        { type: 'wiki',   val: ['[[concept]]', 9] },
        { type: 'string', val: ['hello', 23] },
      ],
    }));

    it('string + wiki', testMixed({
      mkdn: 'attr::\n'
          + '- hello\n'
          + '- [[concept]]\n',
      data: [
        { key: ['attr', 0] },
        { type: 'string', val: ['hello', 9] },
        { type: 'wiki',   val: ['[[concept]]', 17] },
      ],
    }));

    it('wiki + int', testMixed({
      mkdn: 'attr::\n'
          + '- [[concept]]\n'
          + '- 42\n',
      data: [
        { key: ['attr', 0] },
        { type: 'wiki', val: ['[[concept]]', 9] },
        { type: 'int',  val: ['42', 23] },
      ],
    }));

    it('wiki + bool', testMixed({
      mkdn: 'attr::\n'
          + '- [[concept]]\n'
          + '- true\n',
      data: [
        { key: ['attr', 0] },
        { type: 'wiki', val: ['[[concept]]', 9] },
        { type: 'bool', val: ['true', 23] },
      ],
    }));

    it('wiki + string + int', testMixed({
      mkdn: 'attr::\n'
          + '- [[concept]]\n'
          + '- hello\n'
          + '- 42\n',
      data: [
        { key: ['attr', 0] },
        { type: 'wiki',   val: ['[[concept]]', 9] },
        { type: 'string', val: ['hello', 23] },
        { type: 'int',    val: ['42', 31] },
      ],
    }));

    it('multiple wiki + primitive', testMixed({
      mkdn: 'attr::\n'
          + '- [[link-a]]\n'
          + '- [[link-b]]\n'
          + '- hello\n',
      data: [
        { key: ['attr', 0] },
        { type: 'wiki',   val: ['[[link-a]]', 9] },
        { type: 'wiki',   val: ['[[link-b]]', 22] },
        { type: 'string', val: ['hello', 35] },
      ],
    }));

    it('wiki + null', testMixed({
      mkdn: 'attr::\n'
          + '- [[concept]]\n'
          + '- null\n',
      data: [
        { key: ['attr', 0] },
        { type: 'wiki', val: ['[[concept]]', 9] },
        { type: 'null', val: ['null', 23] },
      ],
    }));

    it('wiki + int_hex', testMixed({
      mkdn: 'attr::\n'
          + '- [[concept]]\n'
          + '- 0xFF\n',
      data: [
        { key: ['attr', 0] },
        { type: 'wiki', val: ['[[concept]]', 9] },
        { type: 'int',  val: ['0xFF', 23] },
      ],
    }));

    it('wiki + int_oct', testMixed({
      mkdn: 'attr::\n'
          + '- [[concept]]\n'
          + '- 0o77\n',
      data: [
        { key: ['attr', 0] },
        { type: 'wiki', val: ['[[concept]]', 9] },
        { type: 'int',  val: ['0o77', 23] },
      ],
    }));

    it('wiki + float', testMixed({
      mkdn: 'attr::\n'
          + '- [[concept]]\n'
          + '- 3.14\n',
      data: [
        { key: ['attr', 0] },
        { type: 'wiki',  val: ['[[concept]]', 9] },
        { type: 'float', val: ['3.14', 23] },
      ],
    }));

    it('wiki + float_exp', testMixed({
      mkdn: 'attr::\n'
          + '- [[concept]]\n'
          + '- 1.0e3\n',
      data: [
        { key: ['attr', 0] },
        { type: 'wiki',  val: ['[[concept]]', 9] },
        { type: 'float', val: ['1.0e3', 23] },
      ],
    }));

    it('wiki + float_nan', testMixed({
      mkdn: 'attr::\n'
          + '- [[concept]]\n'
          + '- .NaN\n',
      data: [
        { key: ['attr', 0] },
        { type: 'wiki',  val: ['[[concept]]', 9] },
        { type: 'float', val: ['.NaN', 23] },
      ],
    }));

    it('wiki + timestamp', testMixed({
      mkdn: 'attr::\n'
          + '- [[concept]]\n'
          + '- 2026-05-23\n',
      data: [
        { key: ['attr', 0] },
        { type: 'wiki', val: ['[[concept]]', 9] },
        { type: 'time', val: ['2026-05-23', 23] },
      ],
    }));

  });

  describe('mkdn list; prefixed', () => {

    it('wiki + string', testMixed({
      mkdn: ':attr::\n'
          + '- [[concept]]\n'
          + '- hello\n',
      data: [
        { key: ['attr', 1] },
        { type: 'wiki',   val: ['[[concept]]', 10] },
        { type: 'string', val: ['hello', 24] },
      ],
    }));

    it('string + wiki', testMixed({
      mkdn: ':attr::\n'
          + '- hello\n'
          + '- [[concept]]\n',
      data: [
        { key: ['attr', 1] },
        { type: 'string', val: ['hello', 10] },
        { type: 'wiki',   val: ['[[concept]]', 18] },
      ],
    }));

    it('wiki + int', testMixed({
      mkdn: ':attr::\n'
          + '- [[concept]]\n'
          + '- 42\n',
      data: [
        { key: ['attr', 1] },
        { type: 'wiki', val: ['[[concept]]', 10] },
        { type: 'int',  val: ['42', 24] },
      ],
    }));

    it('wiki + bool', testMixed({
      mkdn: ':attr::\n'
          + '- [[concept]]\n'
          + '- true\n',
      data: [
        { key: ['attr', 1] },
        { type: 'wiki', val: ['[[concept]]', 10] },
        { type: 'bool', val: ['true', 24] },
      ],
    }));

    it('wiki + string + int', testMixed({
      mkdn: ':attr::\n'
          + '- [[concept]]\n'
          + '- hello\n'
          + '- 42\n',
      data: [
        { key: ['attr', 1] },
        { type: 'wiki',   val: ['[[concept]]', 10] },
        { type: 'string', val: ['hello', 24] },
        { type: 'int',    val: ['42', 32] },
      ],
    }));

    it('multiple wiki + primitive', testMixed({
      mkdn: ':attr::\n'
          + '- [[link-a]]\n'
          + '- [[link-b]]\n'
          + '- hello\n',
      data: [
        { key: ['attr', 1] },
        { type: 'wiki',   val: ['[[link-a]]', 10] },
        { type: 'wiki',   val: ['[[link-b]]', 23] },
        { type: 'string', val: ['hello', 36] },
      ],
    }));

  });

  describe('existing wikilink tests (previously returned empty)', () => {

    it('single wiki value now returns data', testMixed({
      mkdn: 'attr :: [[wikilink]]\n',
      data: [
        { key: ['attr', 0] },
        { type: 'wiki', val: ['[[wikilink]]', 8] },
      ],
    }));

    it('wiki attr alongside primitive attr', testMixed({
      mkdn: 'attr1 :: a string\n'
          + 'attr2 :: [[wikilink]]\n',
      data: [
        { key: ['attr1', 0] },
        { type: 'string', val: ['a string', 9] },
        { key: ['attr2', 18] },
        { type: 'wiki', val: ['[[wikilink]]', 27] },
      ],
    }));

  });

});
