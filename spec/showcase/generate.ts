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

// every case, grouped by attr form. caml attributes render into a file-level
// attrbox (never in place), so this is a source catalog only.
const verboseGroups: ShowcaseGroup[] = [
  { title: 'Prefixed', cases: camlPrefixedCases },
  { title: 'Unprefixed', cases: camlUnprefixedCases },
  { title: 'Wiki', cases: camlWikiParseCases },
  { title: 'No Value', cases: camlNoValCases },
  { title: 'Invalid', cases: camlInvalidCases },
];

const verboseIntro: string = 'Every caml spec case, shown as source. caml attributes are collected into a file-level attrbox (they do not render at their source location) — run this through a caml processor (or your SSG) to see the rendered attrbox output.';

const content: string = buildMkdnCatalog(verboseGroups, { title: 'CAML (All Spec Cases)', intro: verboseIntro });

fs.mkdirSync(pagesDir, { recursive: true });
const dest: string = path.join(pagesDir, 'test-verbose.md');
fs.writeFileSync(dest, content);
console.log(`  wrote ${path.relative(specDir, dest)}`);
