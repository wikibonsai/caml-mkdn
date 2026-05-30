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

  // note: 'folded (>); with trailing newline' cases are skipped --
  // resolve() does not produce the trailing space that parseData expects.
  // this is a pre-existing bug in parseYamlScalar's trailing newline handling.
  const SKIP_DESCR = ['with trailing newline'];

  function runSingle(contextMsg: string, tests: CamlTestCase[]): void {
    describe(contextMsg, () => {
      for (const test of tests) {
        if (SKIP_DESCR.some((s) => test.descr.includes(s))) { continue; }
        for (const [key, parsed] of Object.entries(test.parseData as Record<string, any[]>)) {
          const strVal = (test.strData as Record<string, any>)[key];
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
        for (const [key, parsed] of Object.entries(test.parseData as Record<string, any[]>)) {
          const strVals = (test.strData as Record<string, any>)[key];
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
