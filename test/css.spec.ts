import assert from 'node:assert/strict';

import { slugifyKey, keyCssClass, attrCssClasses } from '../src/index';


describe('css class composer (the caml html contract)', () => {

  describe('slugifyKey()', () => {

    it('lowercases + hyphenates spaces', () => {
      assert.strictEqual(slugifyKey('My Key'), 'my-key');
    });

    it('strips non-word characters', () => {
      assert.strictEqual(slugifyKey('key (v2)!'), 'key-v2');
    });

    it('trims surrounding whitespace (pretty-padded keys)', () => {
      assert.strictEqual(slugifyKey('  tags  '), 'tags');
    });

    it('passes clean keys through', () => {
      assert.strictEqual(slugifyKey('author'), 'author');
    });

  });

  describe('keyCssClass()', () => {

    it('prefixes the slug with key__', () => {
      assert.strictEqual(keyCssClass('tags'), 'key__tags');
      assert.strictEqual(keyCssClass('My Key'), 'key__my-key');
    });

    it('namespaces AWAY the structural-class collision', () => {
      // a key literally named 'attr' / 'string' / 'wiki' must not collide with
      // the structural classes on the value spans
      assert.strictEqual(keyCssClass('attr'), 'key__attr');
      assert.strictEqual(keyCssClass('string'), 'key__string');
    });

  });

  describe('attrCssClasses()', () => {

    it('value spans carry structure + value-type ONLY (no raw key)', () => {
      assert.deepStrictEqual(attrCssClasses('string'), ['attr', 'string']);
      assert.deepStrictEqual(attrCssClasses('number'), ['attr', 'number']);
    });

    it('wiki values render as string spans (the caml side of the handoff)', () => {
      assert.deepStrictEqual(attrCssClasses('wiki'), ['attr', 'string']);
    });

  });

});
