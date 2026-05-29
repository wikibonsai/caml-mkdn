import assert from 'node:assert/strict';

import * as caml from '../src';


describe('dump() -- mixed wiki + primitive types', () => {

  const testDump = (params: any) => () => {
    const data: any = params.data;
    const opts: any = params.opts;
    const expdMkdn: string = params.mkdn;
    const actlMkdn: string = caml.dump(data, opts);
    assert.strictEqual(actlMkdn, expdMkdn);
  };

  // -- comma list; unprefixed ---------------------------------------------

  describe('comma list; unprefixed', () => {

    it('wiki + string', testDump({
      data: { 'attr': '[[concept]],hello' },
      opts: { prefix: false, listFormat: 'comma', format: 'none' },
      mkdn: 'attr::[[concept]],hello\n',
    }));

    it('string + wiki', testDump({
      data: { 'attr': 'hello,[[concept]]' },
      opts: { prefix: false, listFormat: 'comma', format: 'none' },
      mkdn: 'attr::hello,[[concept]]\n',
    }));

    it('wiki + int', testDump({
      data: { 'attr': '[[concept]],42' },
      opts: { prefix: false, listFormat: 'comma', format: 'none' },
      mkdn: 'attr::[[concept]],42\n',
    }));

    it('wiki + bool', testDump({
      data: { 'attr': '[[concept]],true' },
      opts: { prefix: false, listFormat: 'comma', format: 'none' },
      mkdn: 'attr::[[concept]],true\n',
    }));

    it('multiple wiki + primitive', testDump({
      data: { 'attr': '[[link-a]],[[link-b]],hello' },
      opts: { prefix: false, listFormat: 'comma', format: 'none' },
      mkdn: 'attr::[[link-a]],[[link-b]],hello\n',
    }));

  });

  // -- comma list; prefixed -----------------------------------------------

  describe('comma list; prefixed', () => {

    it('wiki + string', testDump({
      data: { 'attr': '[[concept]],hello' },
      opts: { prefix: true, listFormat: 'comma', format: 'none' },
      mkdn: ':attr::[[concept]],hello\n',
    }));

    it('string + wiki', testDump({
      data: { 'attr': 'hello,[[concept]]' },
      opts: { prefix: true, listFormat: 'comma', format: 'none' },
      mkdn: ':attr::hello,[[concept]]\n',
    }));

    it('wiki + int', testDump({
      data: { 'attr': '[[concept]],42' },
      opts: { prefix: true, listFormat: 'comma', format: 'none' },
      mkdn: ':attr::[[concept]],42\n',
    }));

    it('wiki + bool', testDump({
      data: { 'attr': '[[concept]],true' },
      opts: { prefix: true, listFormat: 'comma', format: 'none' },
      mkdn: ':attr::[[concept]],true\n',
    }));

    it('multiple wiki + primitive', testDump({
      data: { 'attr': '[[link-a]],[[link-b]],hello' },
      opts: { prefix: true, listFormat: 'comma', format: 'none' },
      mkdn: ':attr::[[link-a]],[[link-b]],hello\n',
    }));

  });

  // -- mkdn list; unprefixed ----------------------------------------------

  describe('mkdn list; unprefixed', () => {

    it('wiki + string', testDump({
      data: { 'attr': '\n- [[concept]]\n- hello' },
      opts: { prefix: false, listFormat: 'mkdn', format: 'none' },
      mkdn: 'attr::\n- [[concept]]\n- hello\n',
    }));

    it('string + wiki', testDump({
      data: { 'attr': '\n- hello\n- [[concept]]' },
      opts: { prefix: false, listFormat: 'mkdn', format: 'none' },
      mkdn: 'attr::\n- hello\n- [[concept]]\n',
    }));

    it('wiki + int', testDump({
      data: { 'attr': '\n- [[concept]]\n- 42' },
      opts: { prefix: false, listFormat: 'mkdn', format: 'none' },
      mkdn: 'attr::\n- [[concept]]\n- 42\n',
    }));

    it('wiki + bool', testDump({
      data: { 'attr': '\n- [[concept]]\n- true' },
      opts: { prefix: false, listFormat: 'mkdn', format: 'none' },
      mkdn: 'attr::\n- [[concept]]\n- true\n',
    }));

    it('multiple wiki + primitive', testDump({
      data: { 'attr': '\n- [[link-a]]\n- [[link-b]]\n- hello' },
      opts: { prefix: false, listFormat: 'mkdn', format: 'none' },
      mkdn: 'attr::\n- [[link-a]]\n- [[link-b]]\n- hello\n',
    }));

  });

  // -- mkdn list; prefixed ------------------------------------------------

  describe('mkdn list; prefixed', () => {

    it('wiki + string', testDump({
      data: { 'attr': '\n- [[concept]]\n- hello' },
      opts: { prefix: true, listFormat: 'mkdn', format: 'none' },
      mkdn: ':attr::\n- [[concept]]\n- hello\n',
    }));

    it('string + wiki', testDump({
      data: { 'attr': '\n- hello\n- [[concept]]' },
      opts: { prefix: true, listFormat: 'mkdn', format: 'none' },
      mkdn: ':attr::\n- hello\n- [[concept]]\n',
    }));

    it('wiki + int', testDump({
      data: { 'attr': '\n- [[concept]]\n- 42' },
      opts: { prefix: true, listFormat: 'mkdn', format: 'none' },
      mkdn: ':attr::\n- [[concept]]\n- 42\n',
    }));

    it('wiki + bool', testDump({
      data: { 'attr': '\n- [[concept]]\n- true' },
      opts: { prefix: true, listFormat: 'mkdn', format: 'none' },
      mkdn: ':attr::\n- [[concept]]\n- true\n',
    }));

    it('multiple wiki + primitive', testDump({
      data: { 'attr': '\n- [[link-a]]\n- [[link-b]]\n- hello' },
      opts: { prefix: true, listFormat: 'mkdn', format: 'none' },
      mkdn: ':attr::\n- [[link-a]]\n- [[link-b]]\n- hello\n',
    }));

  });

  // -- single wiki value --------------------------------------------------

  describe('single wiki value', () => {

    it('unprefixed', testDump({
      data: { 'attr': '[[wikilink]]' },
      opts: { prefix: false, format: 'none' },
      mkdn: 'attr::[[wikilink]]\n',
    }));

    it('prefixed', testDump({
      data: { 'attr': '[[wikilink]]' },
      opts: { prefix: true, format: 'none' },
      mkdn: ':attr::[[wikilink]]\n',
    }));

  });

});
