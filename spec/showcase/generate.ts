/*
 * generate.ts
 *
 * Writes the caml showcase artifact into `spec/showcase/pages/`:
 *   - test-verbose.md : source catalog of EVERY spec case
 *
 * `test.md` (also in pages/) is the one hand-authored artifact (the human-facing
 * curated page that downstream SSGs vendor); test-verbose.md is regenerated from
 * the spec cases so it can never drift. Run with `yarn gen:showcase`.
 */

import * as fs from 'fs';
import * as path from 'path';

import {
  camlPrefixedCases,
  camlUnprefixedCases,
  camlWikiParseCases,
  camlNoValCases,
  camlInvalidCases,
} from '../index';
import { buildMkdnCatalog } from './build';
import type { ShowcaseGroup } from './build';

const pagesDir: string = path.join(__dirname, 'pages');
const specDir: string = path.join(__dirname, '..');

// every case, grouped by attr form. each case shows its fenced source example and
// the live attribute below it. caml collects attributes into a file-level attrbox
// (rendered at the top of the page, keyed by attr name), so the live attributes
// surface there rather than in place.
const verboseGroups: ShowcaseGroup[] = [
  { title: 'Prefixed', cases: camlPrefixedCases },
  { title: 'Unprefixed', cases: camlUnprefixedCases },
  { title: 'Wiki', cases: camlWikiParseCases },
  { title: 'No Value', cases: camlNoValCases },
  { title: 'Invalid', cases: camlInvalidCases },
];

const verboseIntro: string = 'Every caml spec case: the fenced source example, then the live attribute below it. caml collects attributes into a file-level attrbox (rendered at the top of the page, keyed by attr name), so the live attributes below surface together there.';

const content: string = buildMkdnCatalog(verboseGroups, { title: 'CAML (All Spec Cases)', intro: verboseIntro, live: true });

fs.mkdirSync(pagesDir, { recursive: true });
const dest: string = path.join(pagesDir, 'test-verbose.md');
fs.writeFileSync(dest, content);
console.log(`  wrote ${path.relative(specDir, dest)}`);
