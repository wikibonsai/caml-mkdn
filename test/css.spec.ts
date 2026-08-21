import assert from 'node:assert/strict';

import { slugify } from '../src/index';


describe('css primitive (the shared caml attrbox slug)', () => {

  describe('slugify()', () => {

    it('lowercases + hyphenates spaces', () => {
      assert.strictEqual(slugify('My Key'), 'my-key');
    });

    it('strips non-word characters', () => {
      assert.strictEqual(slugify('key (v2)!'), 'key-v2');
    });

    it('trims surrounding whitespace (pretty-padded keys)', () => {
      assert.strictEqual(slugify('  tags  '), 'tags');
    });

    it('passes clean keys through', () => {
      assert.strictEqual(slugify('author'), 'author');
    });

  });

});
