import assert from 'node:assert/strict';

import * as caml from '../src';

import type { CamlTestCase } from '../spec/types';
import {
  camlNoValCases,
  camlPrefixedSingleCases,
  camlUnprefixedSingleCases,
  camlPrefixedListCommaCases,
  camlPrefixedListMkdnCases,
  camlUnprefixedListCommaCases,
  camlUnprefixedListMkdnCases,
  camlWikiNoParseCases,
  camlWikiParseCases,
  camlInvalidCases,
} from '../spec';


describe('resolve()', () => {

  // spec-driven: single values

  const SKIP_DESCR: string[] = [];

  // resolve() takes ONE value-string at a time. a case's `data.string[key]` is either a
  // scalar string (single-value attr) or an array of strings (list attr); `data.parse[key]`
  // is always an array of the resolved value(s). one runner handles both shapes:
  //   - array `.string`  -> resolve each element vs `parsed[i]`, one `it` per element.
  //   - scalar `.string` -> resolve it vs `parsed[0]`, but ONLY when the parse is a single
  //     value. a scalar whose parse is multi-valued (e.g. a single-fixture whose value later
  //     splits, like a multi-line-adjacent case) is NOT a resolve()-single scenario, so it is
  //     skipped here (covered by scan). this `parsed.length === 1` gate is load-bearing.
  // mixed case-sets (invalid, wiki) carry both shapes and so run once through this runner.
  function run(contextMsg: string, tests: CamlTestCase[], opts?: { wikirefs?: boolean }): void {
    describe(contextMsg, () => {
      for (const test of tests) {
        if (!test.data) { continue; }
        if (SKIP_DESCR.some((s) => test.descr.includes(s))) { continue; }
        for (const [key, parsed] of Object.entries(test.data.parse as Record<string, any[]>)) {
          const raw = (test.data.string as Record<string, any>)[key];
          if (Array.isArray(raw)) {
            raw.forEach((strVal: string, i: number) => {
              it(`${test.descr} [${i}]`, () => {
                assert.deepStrictEqual(caml.resolve(strVal, opts), parsed[i]);
              });
            });
          } else if (typeof raw === 'string' && parsed.length === 1) {
            it(test.descr, () => {
              assert.deepStrictEqual(caml.resolve(raw, opts), parsed[0]);
            });
          }
        }
      }
    });
  }

  // single
  run('prefixed; single', camlPrefixedSingleCases);
  run('unprefixed; single', camlUnprefixedSingleCases);

  // list
  run('prefixed; list; comma', camlPrefixedListCommaCases);
  run('prefixed; list; mkdn', camlPrefixedListMkdnCases);
  run('unprefixed; list; comma', camlUnprefixedListCommaCases);
  run('unprefixed; list; mkdn', camlUnprefixedListMkdnCases);
  run('no val', camlNoValCases);
  run('invalid', camlInvalidCases);

  // wikiref values, plugin ABSENT (default) — `[[x]]` resolves to a plain string (brackets
  // kept). caml's wikirefs-agnostic default.
  run('wiki-no-parse (default → string)', camlWikiNoParseCases);
  // wikiref values, plugin SIGNALLED (`{ wikirefs: true }`) — `[[x]]` resolves to a 'wiki'
  // type (brackets stripped), handed to wikirefs for link resolution.
  run('wiki-parse (wikirefs:true → wiki)', camlWikiParseCases, { wikirefs: true });

});
