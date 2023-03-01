import assert from 'node:assert/strict';

import * as caml from '../src';

import type { CamlTestCase } from '../spec/types';
import {
  camlPrefixedListCommaCases,
  camlPrefixedListMkdnCases,
  camlPrefixedSingleCases,
  camlUnprefixedListCommaCases,
  camlUnprefixedListMkdnCases,
  camlUnprefixedSingleCases,
} from '../spec';


describe('dump()', () => {

  function run(contextMsg: string, tests: CamlTestCase[]): void {
    context(contextMsg, () => {
      let i: number = 0;
      for(const test of tests) {
        const desc: string = `[${('00' + (++i)).slice(-3)}] ` + (test.descr || '');
        it(desc, () => {
          const opts: any = test.opts;
          const data: any = test.strData;
          const expdMkdn: string = test.mkdn;
          const actlMkdn: string = caml.dump(data, opts);
          assert.deepStrictEqual(actlMkdn, expdMkdn);
        });
      }
    });
  }

  // empty case
  it('empty', () => {
    assert.deepStrictEqual(caml.dump({}), '');
  });

  ////
  // prefixed

  camlPrefixedSingleCases.forEach((testcase: CamlTestCase) => {
    testcase['opts'] = {
      prefix: true,
      format: 'none',
    };
  });
  run('prefixed; single', camlPrefixedSingleCases);

  camlPrefixedListCommaCases.forEach((testcase: CamlTestCase) => {
    testcase['opts'] = {
      prefix: true,
      listFormat: 'comma',
      format: 'none',
    };
  });
  run('prefixed; list; comma-separated', camlPrefixedListCommaCases);

  camlPrefixedListMkdnCases.forEach((testcase: CamlTestCase) => {
    testcase['opts'] = {
      prefix: true,
      listFormat: 'mkdn',
      format: 'none',
    };
  });
  run('prefixed; list; mkdn-separated', camlPrefixedListMkdnCases);

  ////
  // unprefixed

  camlUnprefixedSingleCases.forEach((testcase: CamlTestCase) => {
    testcase['opts'] = {
      prefix: false,
      format: 'none',
    };
  });
  run('unprefixed; single', camlUnprefixedSingleCases);

  camlUnprefixedListCommaCases.forEach((testcase: CamlTestCase) => {
    testcase['opts'] = {
      prefix: false,
      listFormat: 'comma',
      format: 'none',
    };
  });
  run('unprefixed; list; comma-separated', camlUnprefixedListCommaCases);

  camlUnprefixedListMkdnCases.forEach((testcase: CamlTestCase) => {
    testcase['opts'] = {
      prefix: false,
      listFormat: 'mkdn',
      format: 'none',
    };
  });
  run('unprefixed; list; mkdn-separated', camlUnprefixedListMkdnCases);

});
