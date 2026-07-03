import assert from 'node:assert/strict';

import * as caml from '../src';


describe('scan() -- single', () => {

  const testSingle = (params: any) => () => {
    const mkdn: string = params.mkdn;
    const expdData: any = params.data;
    const actlData: any = caml.scan(mkdn);
    assert.deepStrictEqual(actlData, expdData);
  };

  describe('null', () => {

    it('none is not allowed', testSingle({
      mkdn: 'attr::\n',
      data: [],
    }));

    it('lowercase', testSingle({
      mkdn: 'attr::null\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'null', val: { text: 'null', start: 6 } },
          ],
        },
      ],
    }));

    it('camelCase', testSingle({
      mkdn: 'attr::Null\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'null', val: { text: 'Null', start: 6 } },
          ],
        },
      ],
    }));

    it('uppercase', testSingle({
      mkdn: 'attr::NULL\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'null', val: { text: 'NULL', start: 6 } },
          ],
        },
      ],
    }));

  });

  describe('bool', () => {

    it('lowercase', testSingle({
      mkdn: 'attr::true\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'bool', val: { text: 'true', start: 6 } },
          ],
        },
      ],
    }));

    it('camelCase', testSingle({
      mkdn: 'attr::True\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'bool', val: { text: 'True', start: 6 } },
          ],
        },
      ],
    }));

    it('uppercase', testSingle({
      mkdn: 'attr::TRUE\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'bool', val: { text: 'TRUE', start: 6 } },
          ],
        },
      ],
    }));

  });

  describe('int', () => {

    it('canonical', testSingle({
      mkdn: 'attr::10\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'int', val: { text: '10', start: 6 } },
          ],
        },
      ],
    }));

    it('octal', testSingle({
      mkdn: 'attr::0o10\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'int', val: { text: '0o10', start: 6 } },
          ],
        },
      ],
    }));

    it('hexadecimal', testSingle({
      mkdn: 'attr::0x14\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'int', val: { text: '0x14', start: 6 } },
          ],
        },
      ],
    }));

  });

  describe('float', () => {

    it('canonical', testSingle({
      mkdn: 'attr::1.23015\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'float', val: { text: '1.23015', start: 6 } },
          ],
        },
      ],
    }));

    it('exp -- exponential', testSingle({
      mkdn: 'attr::12.3015e+02\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'float', val: { text: '12.3015e+02', start: 6 } },
          ],
        },
      ],
    }));

    it('nan -- not a number', testSingle({
      mkdn: 'attr::.nan\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'float', val: { text: '.nan', start: 6 } },
          ],
        },
      ],
    }));

  });

  describe('time', () => {

    it('canonical', testSingle({
      mkdn: 'attr::2001-12-15T02:59:43.1Z\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'time', val: { text: '2001-12-15T02:59:43.1Z', start: 6 } },
          ],
        },
      ],
    }));

    it('iso8601', testSingle({
      mkdn: 'attr::2001-12-14t21:59:43.10-05:00\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'time', val: { text: '2001-12-14t21:59:43.10-05:00', start: 6 } },
          ],
        },
      ],
    }));

    it('spaced', testSingle({
      mkdn: 'attr::2001-12-14 21:59:43.10 -5\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'time', val: { text: '2001-12-14 21:59:43.10 -5', start: 6 } },
          ],
        },
      ],
    }));

    it('date only', testSingle({
      mkdn: 'attr::2001-12-14\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'time', val: { text: '2001-12-14', start: 6 } },
          ],
        },
      ],
    }));

    it('int', testSingle({
      mkdn: 'attr::+12:00\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'time', val: { text: '+12:00', start: 6 } },
          ],
        },
      ],
    }));

    it('float', testSingle({
      mkdn: 'attr::+12:00.123\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'time', val: { text: '+12:00.123', start: 6 } },
          ],
        },
      ],
    }));

  });

  describe('string', () => {

    it('single-line; w/out whitespace', testSingle({
      mkdn: 'attr::value-w/out-whitespace\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'string', val: { text: 'value-w/out-whitespace', start: 6 } },
          ],
        },
      ],
    }));

    it('single-line, w/ whitespace', testSingle({
      mkdn: 'attr::value with whitespace\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'string', val: { text: 'value with whitespace', start: 6 } },
          ],
        },
      ],
    }));

    it('single-line; w/ colon prefix', testSingle({
      mkdn: ':attr::value with whitespace\n',
      data: [
        {
          key: { text: 'attr', start: 1 },
          vals: [
            { type: 'string', val: { text: 'value with whitespace', start: 7 } },
          ],
        },
      ],
    }));

    it('single-line; w/ colon prefix; w/ whitespace pad', testSingle({
      mkdn: ': attr  ::value with whitespace\n',
      data: [
        {
          key: { text: 'attr', start: 2 },
          vals: [
            { type: 'string', val: { text: 'value with whitespace', start: 10 } },
          ],
        },
      ],
    }));

    it('single-line; w/ colon prefix; math value', testSingle({
      mkdn: ': gravity :: 9.8m/s^2\n',
      data: [
        {
          key: { text: 'gravity', start: 2 },
          vals: [
            { type: 'string', val: { text: '9.8m/s^2', start: 13 } },
          ],
        },
      ],
    }));

    it('single-line; w/ colon prefix; skip wikiref', testSingle({
      mkdn: ': tldr :: \'\'\n\n[[wikilink]]\n',
      data: [
        {
          key: { text: 'tldr', start: 2 },
          vals: [
            { type: 'string', val: { text: '\'\'', start: 10 } },
          ],
        },
      ],
    }));

    it('single-line; w/ colon prefix; fixed bug', testSingle({
      mkdn: ': tldr :: tldr\n',
      data: [
        {
          key: { text: 'tldr', start: 2 },
          vals: [
            { type: 'string', val: { text: 'tldr', start: 10 } },
          ],
        },
      ],
    }));

    it('string; multi-line; folded (gt); basic', testSingle({
      mkdn: 'attr::>\n    this is a long string\n    that spans multiple\n    lines\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'string', val: { text: 'this is a long string that spans multiple lines\n', start: 6 } },
          ],
        },
      ],
    }));

  });

  describe('mixed', () => {

    it('multiple values', testSingle({
      mkdn: 'attr1::value-w/out-whitespace\nattr2::123\n',
      data: [
        {
          key: { text: 'attr1', start: 0 },
          vals: [
            { type: 'string', val: { text: 'value-w/out-whitespace', start: 7 } },
          ],
        },
        {
          key: { text: 'attr2', start: 30 },
          vals: [
            { type: 'int', val: { text: '123', start: 37 } },
          ],
        },
      ],
    }));

  });

  describe('wikilinks', () => {

    it('[[wikilinks]] resolved as wiki type', testSingle({
      mkdn: 'attr :: [[wikilink]]\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'wiki', val: { text: '[[wikilink]]', start: 8 } },
          ],
        },
      ],
    }));

    it('[[wikilinks]] alongside primitives', testSingle({
      mkdn: 'attr1 :: a string\nattr2 :: [[wikilink]]\n',
      data: [
        {
          key: { text: 'attr1', start: 0 },
          vals: [
            { type: 'string', val: { text: 'a string', start: 9 } },
          ],
        },
        {
          key: { text: 'attr2', start: 18 },
          vals: [
            { type: 'wiki', val: { text: '[[wikilink]]', start: 27 } },
          ],
        },
      ],
    }));

  });

  describe('escaped', () => {

    // code span (backticks) -- caught by escape-mkdn
    it('code span; skipped by default', testSingle({
      mkdn: '`attr::value`\n',
      data: [],
    }));

    // fenced code block -- caught by regex (backtick excluded from KEY)
    it('fenced code block; skipped by default', testSingle({
      mkdn: '```\nattr::value\n```\n',
      data: [],
    }));

    // indented code block (4+ spaces) -- caught by regex (indentation)
    it('indented code block; skipped by default', testSingle({
      mkdn: '    attr::value\n',
      data: [],
    }));

    // math span -- caught by escape-mkdn
    it('math span; skipped by default', testSingle({
      mkdn: '$attr::value$\n',
      data: [],
    }));

    // math fence -- caught by escape-mkdn
    it('math fence; skipped by default', testSingle({
      mkdn: '$$\nattr::value\n$$\n',
      data: [],
    }));

    // mixed: escaped + non-escaped
    it('non-escaped CAML alongside code span is found', () => {
      const mkdn: string = '`attr1::escaped`\nattr2::visible\n';
      const actlData: any = caml.scan(mkdn);
      assert.strictEqual(actlData.length, 1);
      assert.strictEqual(actlData[0].key.text, 'attr2');
    });

    it('non-escaped CAML alongside fenced code block is found', () => {
      const mkdn: string = '```\nattr1::escaped\n```\nattr2::visible\n';
      const actlData: any = caml.scan(mkdn);
      assert.strictEqual(actlData.length, 1);
      assert.strictEqual(actlData[0].key.text, 'attr2');
    });

    // prefixed code span
    it('prefixed code span; skipped by default', testSingle({
      mkdn: '`:attr::value`\n',
      data: [],
    }));

  });

  describe('multi-line; boundary', () => {

    it('multi-line folded stops at blank line; next attr parsed separately', testSingle({
      mkdn: ':desc:: >\n    folded text\n    here\n\ntitle:: Test\n',
      data: [
        {
          key: { text: 'desc', start: 1 },
          vals: [
            { type: 'string', val: { text: 'folded text here\n', start: 8 } },
          ],
        },
        {
          key: { text: 'title', start: 36 },
          vals: [
            { type: 'string', val: { text: 'Test', start: 44 } },
          ],
        },
      ],
    }));

    it('multi-line literal stops at blank line; next attr parsed separately', testSingle({
      mkdn: ':poem:: |\n    roses are red\n    violets are blue\n\n:author:: someone\n',
      data: [
        {
          key: { text: 'poem', start: 1 },
          vals: [
            { type: 'string', val: { text: 'roses are red\nviolets are blue\n', start: 8 } },
          ],
        },
        {
          key: { text: 'author', start: 51 },
          vals: [
            { type: 'string', val: { text: 'someone', start: 60 } },
          ],
        },
      ],
    }));

    it('multiple multi-line attrs separated by blank lines', testSingle({
      mkdn: ':first:: >\n    aaa\n    bbb\n\n:second:: |\n    ccc\n    ddd\n\ntitle:: end\n',
      data: [
        {
          key: { text: 'first', start: 1 },
          vals: [
            { type: 'string', val: { text: 'aaa bbb\n', start: 9 } },
          ],
        },
        {
          key: { text: 'second', start: 29 },
          vals: [
            { type: 'string', val: { text: 'ccc\nddd\n', start: 38 } },
          ],
        },
        {
          key: { text: 'title', start: 57 },
          vals: [
            { type: 'string', val: { text: 'end', start: 65 } },
          ],
        },
      ],
    }));

    it('multi-line does not swallow non-indented line after blank', testSingle({
      mkdn: ':note:: >\n    content\n\nnot-an-attr\n',
      data: [
        {
          key: { text: 'note', start: 1 },
          vals: [
            { type: 'string', val: { text: 'content\n', start: 8 } },
          ],
        },
      ],
    }));

    it('multi-line stops before parenthetical text after blank', testSingle({
      mkdn: ':description:: >\n    This is a long description\n    that spans multiple lines\n    and gets folded into one.\n\n(see attrbox for output)\n',
      data: [
        {
          key: { text: 'description', start: 1 },
          vals: [
            { type: 'string', val: { text: 'This is a long description that spans multiple lines and gets folded into one.\n', start: 15 } },
          ],
        },
      ],
    }));

    it('blank line within multi-line block is preserved', testSingle({
      mkdn: ':poem:: |\n    verse one\n\n    verse two\n\nnot indented\n',
      data: [
        {
          key: { text: 'poem', start: 1 },
          vals: [
            { type: 'string', val: { text: 'verse one\n\nverse two\n', start: 8 } },
          ],
        },
      ],
    }));

  });

  describe('multi-line; indentation (min 2-space continuation)', () => {

    it('4 spaces: continuation', testSingle({
      mkdn: ':note:: >\n    four spaces\n    continues\n',
      data: [
        {
          key: { text: 'note', start: 1 },
          vals: [
            { type: 'string', val: { text: 'four spaces continues\n', start: 8 } },
          ],
        },
      ],
    }));

    it('tab: continuation', testSingle({
      mkdn: ':note:: >\n\ttab indented\n\tcontinues\n',
      data: [
        {
          key: { text: 'note', start: 1 },
          vals: [
            { type: 'string', val: { text: 'tab indented continues\n', start: 8 } },
          ],
        },
      ],
    }));

    it('3 spaces: continuation', testSingle({
      mkdn: ':note:: >\n   three spaces\n',
      data: [
        {
          key: { text: 'note', start: 1 },
          vals: [
            { type: 'string', val: { text: 'three spaces\n', start: 8 } },
          ],
        },
      ],
    }));

    it('2 spaces: continuation', testSingle({
      mkdn: ':note:: >\n  two spaces\n',
      data: [
        {
          key: { text: 'note', start: 1 },
          vals: [
            { type: 'string', val: { text: 'two spaces\n', start: 8 } },
          ],
        },
      ],
    }));

    it('1 space: NOT continuation (below 2-space floor)', testSingle({
      mkdn: ':note:: >\n one space\n',
      data: [
        {
          key: { text: 'note', start: 1 },
          vals: [
            { type: 'string', val: { text: '\n', start: 8 } },
          ],
        },
      ],
    }));

    it('0 spaces: NOT continuation', testSingle({
      mkdn: ':note:: >\nno indent\n',
      data: [
        {
          key: { text: 'note', start: 1 },
          vals: [
            { type: 'string', val: { text: '\n', start: 8 } },
          ],
        },
      ],
    }));

    it('8 spaces: continuation', testSingle({
      mkdn: ':note:: >\n        eight spaces\n',
      data: [
        {
          key: { text: 'note', start: 1 },
          vals: [
            { type: 'string', val: { text: 'eight spaces\n', start: 8 } },
          ],
        },
      ],
    }));

    it('non-indented line terminates the block', testSingle({
      mkdn: ':note:: >\n    first line\nnot indented\n',
      data: [
        {
          key: { text: 'note', start: 1 },
          vals: [
            { type: 'string', val: { text: 'first line\n', start: 8 } },
          ],
        },
      ],
    }));

  });

});
