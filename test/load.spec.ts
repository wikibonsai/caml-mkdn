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
        it(desc, () => {
          const mkdn: string = test.mkdn;
          const expdData: any = test.valData;
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

});
