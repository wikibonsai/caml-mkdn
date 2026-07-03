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
      const r = caml.load(':a::\n- x\n- >\n    folded\n:b::\n- x\n- |\n    literal\n:c::\n- x\n- >-\n    strip\n:d::\n- x\n- |-\n    lit-strip\n');
      assert.deepStrictEqual(r.data['a'], ['x', 'folded\n']);
      assert.deepStrictEqual(r.data['b'], ['x', 'literal\n']);
      assert.deepStrictEqual(r.data['c'], ['x', 'strip']);
      assert.deepStrictEqual(r.data['d'], ['x', 'lit-strip']);
    });

  });

});
