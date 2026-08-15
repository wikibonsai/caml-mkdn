import assert from 'node:assert/strict';

import { buildHTML } from '../src/index';
import type { AttrBoxItem } from '../src/index';


// canonical attrbox builder — expected strings mirror caml-spec cases exactly.
describe('buildHTML() (the canonical attrbox builder)', () => {

  const str = (s: string): AttrBoxItem => ({ type: 'string', string: s, value: s });

  it('empty attrs -> empty string (no attrbox)', () => {
    assert.strictEqual(buildHTML({}), '');
  });

  it('single null value (spec: prefixed-single)', () => {
    const html: string = buildHTML({
      'attribute': [{ type: 'null', string: 'null', value: null }],
    });
    assert.strictEqual(html,
      '<aside class="attrbox">\n'
      + '<dl>\n'
      + '<div class="attr-item">\n'
      + '<dt class="key__attribute">attribute</dt>\n'
      + '<dd><span class="attr null">null</span></dd>\n'
      + '</div>\n'
      + '</dl>\n'
      + '</aside>\n');
  });

  it('value list -> one attr-item, one dd per value', () => {
    const html: string = buildHTML({
      'attrtype': [str('string-a'), str('string-b'), str('string-c')],
    });
    assert.strictEqual(html,
      '<aside class="attrbox">\n'
      + '<dl>\n'
      + '<div class="attr-item">\n'
      + '<dt class="key__attrtype">attrtype</dt>\n'
      + '<dd><span class="attr string">string-a</span></dd>\n'
      + '<dd><span class="attr string">string-b</span></dd>\n'
      + '<dd><span class="attr string">string-c</span></dd>\n'
      + '</div>\n'
      + '</dl>\n'
      + '</aside>\n');
  });

  it('multiple keys -> one attr-item per key, in insertion order', () => {
    const html: string = buildHTML({
      'first': [str('a')],
      'second': [{ type: 'number', string: '12', value: 12 }],
    });
    assert.strictEqual(html,
      '<aside class="attrbox">\n'
      + '<dl>\n'
      + '<div class="attr-item">\n'
      + '<dt class="key__first">first</dt>\n'
      + '<dd><span class="attr string">a</span></dd>\n'
      + '</div>\n'
      + '<div class="attr-item">\n'
      + '<dt class="key__second">second</dt>\n'
      + '<dd><span class="attr number">12</span></dd>\n'
      + '</div>\n'
      + '</dl>\n'
      + '</aside>\n');
  });

  it('dt shows the raw key; its class carries the slug', () => {
    const html: string = buildHTML({ 'My Key': [str('a')] });
    assert.ok(html.includes('<dt class="key__my-key">My Key</dt>'));
  });

  it('wiki value -> plain string span (the caml side of the wikiref hand-off)', () => {
    const html: string = buildHTML({
      'attribute': [{ type: 'wiki', string: '[[fname-a]]', value: 'fname-a' }],
    });
    assert.ok(html.includes('<dd><span class="attr string">[[fname-a]]</span></dd>'));
  });

  it('html slot overrides the dd body (routed consumers drop in wikirefs anchors)', () => {
    const anchor: string = '<a class="attr wiki" href="/fname-a" data-href="/fname-a">title a</a>';
    const html: string = buildHTML({
      'attribute': [{ type: 'wiki', string: '[[fname-a]]', value: 'fname-a', html: anchor }],
    });
    assert.ok(html.includes(`<dd>${anchor}</dd>`));
    assert.ok(!html.includes('[[fname-a]]'));
  });

  it('multi-line strings render newlines as <br> (spec: multi-line)', () => {
    const html: string = buildHTML({
      'attrtype': [str('line one\nline two\n')],
    });
    assert.ok(html.includes('<dd><span class="attr string">line one<br>line two<br></span></dd>'));
  });

  it('cssNames overrides rename any class token', () => {
    const html: string = buildHTML(
      { 'attribute': [str('a')] },
      { cssNames: { attrbox: 'meta-box', attrItem: 'meta-item', attr: 'meta', key: 'reftype__' } },
    );
    assert.ok(html.includes('<aside class="meta-box">'));
    assert.ok(html.includes('<div class="meta-item">'));
    assert.ok(html.includes('<dt class="reftype__attribute">attribute</dt>'));
    assert.ok(html.includes('<dd><span class="meta string">a</span></dd>'));
  });

});

  describe('buildWikiValue (the wikirefs delegation slot)', () => {

    it('wiki items are offered to the callback; its string becomes the dd body', () => {
      const html: string = buildHTML(
        { 'author': [{ type: 'wiki', string: '[[alice]]', value: 'alice' }] },
        { buildWikiValue: (raw: string) => `<a class="attr wiki" href="/alice" data-href="/alice">alice</a>` },
      );
      assert.ok(html.includes('<dd><a class="attr wiki" href="/alice" data-href="/alice">alice</a></dd>'));
      assert.ok(!html.includes('[[alice]]'));
    });

    it('callback receives the RAW scanned value (caml never parses it)', () => {
      const seen: string[] = [];
      buildHTML(
        { 'author': [{ type: 'wiki', string: '[[alice]]', value: 'alice' }] },
        { buildWikiValue: (raw: string) => { seen.push(raw); return null; } },
      );
      assert.deepStrictEqual(seen, ['[[alice]]']);
    });

    it('null falls back to the standalone string span (spec conformance)', () => {
      const html: string = buildHTML(
        { 'author': [{ type: 'wiki', string: '[[alice]]', value: 'alice' }] },
        { buildWikiValue: () => null },
      );
      assert.ok(html.includes('<dd><span class="attr string">[[alice]]</span></dd>'));
    });

    it('a per-item html slot wins over the callback', () => {
      const html: string = buildHTML(
        { 'author': [{ type: 'wiki', string: '[[alice]]', value: 'alice', html: '<b>pre</b>' }] },
        { buildWikiValue: () => '<i>cb</i>' },
      );
      assert.ok(html.includes('<dd><b>pre</b></dd>'));
    });

    it('non-wiki items are never offered', () => {
      let called: boolean = false;
      const html: string = buildHTML(
        { 'title': [{ type: 'string', string: 'plain', value: 'plain' }] },
        { buildWikiValue: () => { called = true; return '<i>no</i>'; } },
      );
      assert.strictEqual(called, false);
      assert.ok(html.includes('<dd><span class="attr string">plain</span></dd>'));
    });

  });
