import assert from 'node:assert/strict';

import * as caml from '../src';

import type { CamlTestCase } from '../spec/types';
import {
  camlPrefixedSingleCases,
  camlUnprefixedSingleCases,
  camlPrefixedListCommaCases,
  camlPrefixedListMkdnCases,
  camlUnprefixedListCommaCases,
  camlUnprefixedListMkdnCases,
  camlWikiRefsCases,
} from '../spec';


describe('resolve()', () => {

  // spec-driven: single values

  const SKIP_DESCR: string[] = [];

  function runSingle(contextMsg: string, tests: CamlTestCase[]): void {
    describe(contextMsg, () => {
      for (const test of tests) {
        if (!test.data) { continue; }
        if (SKIP_DESCR.some((s) => test.descr.includes(s))) { continue; }
        for (const [key, parsed] of Object.entries(test.data.parse as Record<string, any[]>)) {
          const strVal = (test.data.string as Record<string, any>)[key];
          if (typeof strVal !== 'string') { continue; }
          if (parsed.length !== 1) { continue; }
          it(test.descr, () => {
            const result = caml.resolve(strVal);
            assert.deepStrictEqual(result, parsed[0]);
          });
        }
      }
    });
  }

  runSingle('prefixed; single', camlPrefixedSingleCases);
  runSingle('unprefixed; single', camlUnprefixedSingleCases);

  // spec-driven: list values

  function runList(contextMsg: string, tests: CamlTestCase[]): void {
    describe(contextMsg, () => {
      for (const test of tests) {
        if (!test.data) { continue; }
        for (const [key, parsed] of Object.entries(test.data.parse as Record<string, any[]>)) {
          const strVals = (test.data.string as Record<string, any>)[key];
          if (!Array.isArray(strVals)) { continue; }
          for (let i = 0; i < strVals.length; i++) {
            it(`${test.descr} [${i}]`, () => {
              const result = caml.resolve(strVals[i]);
              assert.deepStrictEqual(result, parsed[i]);
            });
          }
        }
      }
    });
  }

  runList('prefixed; list; comma', camlPrefixedListCommaCases);
  runList('prefixed; list; mkdn', camlPrefixedListMkdnCases);
  runList('unprefixed; list; comma', camlUnprefixedListCommaCases);
  runList('unprefixed; list; mkdn', camlUnprefixedListMkdnCases);

  // spec-driven: wiki

  runSingle('wiki; single', camlWikiRefsCases);
  runList('wiki; list', camlWikiRefsCases);

});
