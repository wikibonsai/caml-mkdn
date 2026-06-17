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


// infer multiLine + chomp from test description
function getMultiLineOpts(descr: string): { multiLine: 'literal' | 'folded'; chomp: 'clip' | 'strip' | 'keep' } | null {
  if (!descr.includes('multi-line')) return null;
  const chomp: 'clip' | 'strip' | 'keep' =
    (descr.includes('keep'))  ? 'keep' :
    (descr.includes('strip') || descr.includes('chomped')) ? 'strip' :
    'clip';
  const multiLine: 'literal' | 'folded' =
    (descr.includes('literal')) ? 'literal' : 'folded';
  return { multiLine, chomp };
}

describe('dump()', () => {

  // spec-driven: for single-value cases, compare dump(data.string) against mkdn.
  // for multi-line cases, round-trip: load(mkdn) -> dump(data.value, multiLine opts) -> load -> compare data.
  function run(contextMsg: string, tests: CamlTestCase[]): void {
    context(contextMsg, () => {
      let i: number = 0;
      for(const test of tests) {
        const desc: string = `[${('00' + (++i)).slice(-3)}] ` + (test.descr || '');
        if (!test.data) { return; }
        // skip multi-attr adjacent cases
        if (test.data && typeof test.data.string === 'object' && Object.keys(test.data.string).length > 1) { return; }
        const mlOpts = getMultiLineOpts(test.descr);
        if (mlOpts) {
          // comma lists don't support multi-line (indicators are literal strings)
          if (test.descr.includes('comma-separated')) { return; }
          // multi-line: round-trip test (data equality, not string equality)
          // add listFormat for mkdn list cases
          it(desc, () => {
            const loaded = caml.load(test.mkdn);
            const opts: any = { ...test.opts, ...mlOpts };
            if (test.descr.includes('mkdn-separated')) {
              opts.listFormat = 'mkdn';
            }
            const dumped: string = caml.dump(loaded.data, opts);
            const reloaded = caml.load(dumped);
            assert.deepStrictEqual(reloaded.data, loaded.data);
          });
        } else {
          // regular: string comparison
          it(desc, () => {
            const opts: any = test.opts;
            const data: any = test.data!.string;
            const expdMkdn: string = test.mkdn;
            const actlMkdn: string = caml.dump(data, opts);
            assert.deepStrictEqual(actlMkdn, expdMkdn);
          });
        }
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

  ////
  // dump-specific option tests (not driven by spec cases)

  describe('dump options', () => {

    it('custom indent (4 spaces)', () => {
      assert.strictEqual(
        caml.dump({ notes: 'line one\nline two\n' }, { prefix: true, format: 'none', multiLine: 'literal', chomp: 'clip', indent: 4 }),
        ':notes::|\n    line one\n    line two\n',
      );
    });

    it('no newlines in value; dumps inline regardless of multiLine', () => {
      assert.strictEqual(
        caml.dump({ title: 'simple' }, { prefix: true, format: 'none', multiLine: 'literal', chomp: 'clip' }),
        ':title::simple\n',
      );
    });

    it('comma list with multi-line value warns and dumps inline', () => {
      const warnings: string[] = [];
      const origWarn = console.warn;
      console.warn = (msg: string) => warnings.push(msg);
      caml.dump(
        { tags: ['first', 'line one\nline two\n'] },
        { prefix: true, format: 'none', listFormat: 'comma', multiLine: 'literal', chomp: 'clip' },
      );
      console.warn = origWarn;
      assert.strictEqual(warnings.length, 1);
      assert.ok(warnings[0].includes('not supported in comma-separated'));
    });

  });

});
