import assert from 'node:assert/strict';

import * as caml from '../src';

describe('load() -- mixed wiki + primitive types', () => {

  const testLoad = (params: any) => () => {
    const mkdn: string = params.mkdn;
    const expdData: any = params.data;
    const res = caml.load(mkdn);
    assert.deepStrictEqual(res.data, expdData);
  };

  describe('comma list; unprefixed', () => {

    it('wiki + string', testLoad({
      mkdn: 'attr :: [[concept]], hello\n',
      data: { 'attr': ['concept', 'hello'] },
    }));

    it('string + wiki', testLoad({
      mkdn: 'attr :: hello, [[concept]]\n',
      data: { 'attr': ['hello', 'concept'] },
    }));

    it('wiki + int', testLoad({
      mkdn: 'attr :: [[concept]], 42\n',
      data: { 'attr': ['concept', 42] },
    }));

    it('wiki + bool', testLoad({
      mkdn: 'attr :: [[concept]], true\n',
      data: { 'attr': ['concept', true] },
    }));

    it('wiki + string + int', testLoad({
      mkdn: 'attr :: [[concept]], hello, 42\n',
      data: { 'attr': ['concept', 'hello', 42] },
    }));

    it('multiple wiki + primitive', testLoad({
      mkdn: 'attr :: [[link-a]], [[link-b]], hello\n',
      data: { 'attr': ['link-a', 'link-b', 'hello'] },
    }));

    it('wiki + null', testLoad({
      mkdn: 'attr :: [[concept]], null\n',
      data: { 'attr': ['concept', null] },
    }));

    it('wiki + float', testLoad({
      mkdn: 'attr :: [[concept]], 3.14\n',
      data: { 'attr': ['concept', 3.14] },
    }));

    it('wiki + time', testLoad({
      mkdn: 'attr :: [[concept]], 2026-05-23\n',
      data: { 'attr': ['concept', new Date('2026-05-23T00:00:00.000Z')] },
    }));

  });

  describe('comma list; prefixed', () => {

    it('wiki + string', testLoad({
      mkdn: ': attr :: [[concept]], hello\n',
      data: { 'attr': ['concept', 'hello'] },
    }));

    it('string + wiki', testLoad({
      mkdn: ': attr :: hello, [[concept]]\n',
      data: { 'attr': ['hello', 'concept'] },
    }));

    it('wiki + int', testLoad({
      mkdn: ': attr :: [[concept]], 42\n',
      data: { 'attr': ['concept', 42] },
    }));

    it('wiki + bool', testLoad({
      mkdn: ': attr :: [[concept]], true\n',
      data: { 'attr': ['concept', true] },
    }));

    it('wiki + string + int', testLoad({
      mkdn: ': attr :: [[concept]], hello, 42\n',
      data: { 'attr': ['concept', 'hello', 42] },
    }));

    it('multiple wiki + primitive', testLoad({
      mkdn: ': attr :: [[link-a]], [[link-b]], hello\n',
      data: { 'attr': ['link-a', 'link-b', 'hello'] },
    }));

  });

  describe('mkdn list; unprefixed', () => {

    it('wiki + string', testLoad({
      mkdn: 'attr::\n'
          + '- [[concept]]\n'
          + '- hello\n',
      data: { 'attr': ['concept', 'hello'] },
    }));

    it('string + wiki', testLoad({
      mkdn: 'attr::\n'
          + '- hello\n'
          + '- [[concept]]\n',
      data: { 'attr': ['hello', 'concept'] },
    }));

    it('wiki + int', testLoad({
      mkdn: 'attr::\n'
          + '- [[concept]]\n'
          + '- 42\n',
      data: { 'attr': ['concept', 42] },
    }));

    it('wiki + bool', testLoad({
      mkdn: 'attr::\n'
          + '- [[concept]]\n'
          + '- true\n',
      data: { 'attr': ['concept', true] },
    }));

    it('wiki + string + int', testLoad({
      mkdn: 'attr::\n'
          + '- [[concept]]\n'
          + '- hello\n'
          + '- 42\n',
      data: { 'attr': ['concept', 'hello', 42] },
    }));

    it('multiple wiki + primitive', testLoad({
      mkdn: 'attr::\n'
          + '- [[link-a]]\n'
          + '- [[link-b]]\n'
          + '- hello\n',
      data: { 'attr': ['link-a', 'link-b', 'hello'] },
    }));

    it('wiki + null', testLoad({
      mkdn: 'attr::\n'
          + '- [[concept]]\n'
          + '- null\n',
      data: { 'attr': ['concept', null] },
    }));

    it('wiki + float', testLoad({
      mkdn: 'attr::\n'
          + '- [[concept]]\n'
          + '- 3.14\n',
      data: { 'attr': ['concept', 3.14] },
    }));

    it('wiki + time', testLoad({
      mkdn: 'attr::\n'
          + '- [[concept]]\n'
          + '- 2026-05-23\n',
      data: { 'attr': ['concept', new Date('2026-05-23T00:00:00.000Z')] },
    }));

  });

  describe('mkdn list; prefixed', () => {

    it('wiki + string', testLoad({
      mkdn: ':attr::\n'
          + '- [[concept]]\n'
          + '- hello\n',
      data: { 'attr': ['concept', 'hello'] },
    }));

    it('string + wiki', testLoad({
      mkdn: ':attr::\n'
          + '- hello\n'
          + '- [[concept]]\n',
      data: { 'attr': ['hello', 'concept'] },
    }));

    it('wiki + int', testLoad({
      mkdn: ':attr::\n'
          + '- [[concept]]\n'
          + '- 42\n',
      data: { 'attr': ['concept', 42] },
    }));

    it('wiki + bool', testLoad({
      mkdn: ':attr::\n'
          + '- [[concept]]\n'
          + '- true\n',
      data: { 'attr': ['concept', true] },
    }));

    it('wiki + string + int', testLoad({
      mkdn: ':attr::\n'
          + '- [[concept]]\n'
          + '- hello\n'
          + '- 42\n',
      data: { 'attr': ['concept', 'hello', 42] },
    }));

    it('multiple wiki + primitive', testLoad({
      mkdn: ':attr::\n'
          + '- [[link-a]]\n'
          + '- [[link-b]]\n'
          + '- hello\n',
      data: { 'attr': ['link-a', 'link-b', 'hello'] },
    }));

  });

  describe('single wiki value', () => {

    it('unprefixed', testLoad({
      mkdn: 'attr :: [[wikilink]]\n',
      data: { 'attr': 'wikilink' },
    }));

    it('prefixed', testLoad({
      mkdn: ': attr :: [[wikilink]]\n',
      data: { 'attr': 'wikilink' },
    }));

  });

  describe('wiki alongside primitive attr', () => {

    it('separate attrs', testLoad({
      mkdn: 'attr1 :: a string\n'
          + 'attr2 :: [[wikilink]]\n',
      data: {
        'attr1': 'a string',
        'attr2': 'wikilink',
      },
    }));

  });

});
