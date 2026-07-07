import assert from 'node:assert';

import type { CamlLoadPayload } from '../src';
import type { CamlTestCase } from '../spec/types';

import * as caml from '../src';
import {
  camlNoValCases,
  camlPrefixedCases,
  camlUnprefixedCases,
  camlWikiRefsCases,
} from '../spec';


describe('load()', () => {

  function run(contextMsg: string, tests: CamlTestCase[]): void {
    context(contextMsg, () => {
      let i: number = 0;
      for(const test of tests) {
        const desc: string = `[${('00' + (++i)).slice(-3)}] ` + (test.descr || '');
        if (!test.data) { return; }
        it(desc, () => {
          const mkdn: string = test.mkdn;
          const expdData: any = test.data!.value;
          const res: CamlLoadPayload = caml.load(mkdn);
          const actlData: any = res.data;
          assert.deepStrictEqual(actlData, expdData);
        });
      }
    });
  }

  // empty case
  it.skip('empty', () => {
    assert.deepStrictEqual(
      caml.load(''),
      {
        data: {},
        content: '',
      });
  });

  run('no value', camlNoValCases);
  run('[[wikirefs]]', camlWikiRefsCases);

  run('prefixed', camlPrefixedCases);
  run('unprefixed', camlUnprefixedCases);

  describe('load() multi-line in lists', () => {

    it('comma list does NOT support multi-line indicators (treated as literal strings)', () => {
      const r = caml.load(':attr::first, >\n');
      assert.deepStrictEqual(r.data['attr'], ['first', '>']);
      const r2 = caml.load(':attr::first, |\n');
      assert.deepStrictEqual(r2.data['attr'], ['first', '|']);
      const r3 = caml.load(':attr::first, >-\n');
      assert.deepStrictEqual(r3.data['attr'], ['first', '>-']);
    });

    it('mkdn list with all indicators', () => {
      const r = caml.load(':a::\n- x\n- >\n  folded\n:b::\n- x\n- |\n  literal\n:c::\n- x\n- >-\n  strip\n:d::\n- x\n- |-\n  lit-strip\n');
      assert.deepStrictEqual(r.data['a'], ['x', 'folded\n']);
      assert.deepStrictEqual(r.data['b'], ['x', 'literal\n']);
      assert.deepStrictEqual(r.data['c'], ['x', 'strip']);
      assert.deepStrictEqual(r.data['d'], ['x', 'lit-strip']);
    });

    // markdown allows '-', '+', and '*' as unordered-list bullets (parity with
    // single-line list parsing, which uses RGX.MARKER.BULLET = /[+*-]/)
    it('mkdn multi-line list supports + and * bullets (not just -)', () => {
      const rPlus = caml.load(':a::\n+ x\n+ >\n  folded\n');
      assert.deepStrictEqual(rPlus.data['a'], ['x', 'folded\n']);
      const rStar = caml.load(':b::\n* x\n* >\n  folded\n');
      assert.deepStrictEqual(rStar.data['b'], ['x', 'folded\n']);
      const rStripPlus = caml.load(':c::\n+ x\n+ >-\n  strip\n');
      assert.deepStrictEqual(rStripPlus.data['c'], ['x', 'strip']);
    });

  });

  describe('load() skipEsc (escape handling)', () => {

    it('single-line CAML in a fenced code block is skipped by default', () => {
      const res = caml.load('```\ncaged::inblock\n```\nreal::value\n');
      assert.deepStrictEqual(res.data, { real: 'value' });
    });

    it('escaped CAML is included when skipEsc:false', () => {
      const res = caml.load('```\ncaged::inblock\n```\nreal::value\n', { skipEsc: false });
      assert.deepStrictEqual(res.data, { caged: 'inblock', real: 'value' });
    });

    it('res.content preserves the escaped code block (not stripped)', () => {
      const res = caml.load('```\ncaged::inblock\n```\nreal::value\n');
      assert.ok(res.content.includes('```\ncaged::inblock\n```'), 'code block should remain in content');
    });

    it('non-escaped CAML alongside a fence is still found (regression)', () => {
      const res = caml.load('real::value\n```\ncode::here\n```\n');
      assert.deepStrictEqual(res.data, { real: 'value' });
    });

    it('multi-line CAML inside a fence is skipped by default', () => {
      const res = caml.load('```\nml:: >\n  folded\n```\ntitle::doc\n');
      assert.deepStrictEqual(res.data, { title: 'doc' });
    });

  });

});
