import type { CamlTestCase } from '../types';

// Showcase builder: turn spec test cases into a human-facing "how does the syntax
// render" source catalog. A pure string builder (no fs) so it can be bundled into
// the published package and imported by downstream tooling. The fs-writing
// entrypoint lives in `showcase/generate.ts`.
//
// caml attributes render into a file-level attrbox (never in place), so the
// showcase is markdown *source* only — render it through a caml processor to see
// the attrbox output.

export interface ShowcaseGroup {
  title: string;
  cases: CamlTestCase[];
  live?: boolean;   // (mkdn catalog) override opts.live for this group
  note?: string;    // (mkdn catalog) emitted under the group heading
}

export interface ShowcaseDocOpts {
  title: string;
  intro?: string;
  generated?: boolean;  // stamp a "do not edit by hand" banner (default: true)
  live?: boolean;       // (mkdn catalog) emit the live construct after the fenced source
}

const GEN_BANNER: string = 'Generated from the caml-spec test cases by `showcase/generate.ts` — do not edit by hand; run `yarn gen:showcase`.';

// pick a code fence long enough to wrap content that may itself contain backticks
function fence(content: string, lang: string = 'markdown'): string {
  let ticks: string = '```';
  while (content.includes(ticks)) { ticks += '`'; }
  return `${ticks}${lang}\n${content}\n${ticks}`;
}

// show source with trailing newlines trimmed (cases append '\n' to mark block-ness)
function displaySource(mkdn: string): string {
  return mkdn.replace(/\n+$/, '');
}

// -- markdown catalog -------------------------------------------------------
//
// Each case shows its `mkdn` fenced (the source). caml attributes are collected
// into a file-level attrbox (or dropped) — they never render at their source
// location, so this catalog is source-only.
//
// The `opts.live` / `group.live` machinery is retained for parity with the
// wikirefs showcase (where inline constructs render in place), but caml has no
// in-place constructs, so it stays off.

export function buildMkdnCatalog(groups: ShowcaseGroup[], opts: ShowcaseDocOpts): string {
  const parts: string[] = [];
  parts.push(`# ${opts.title}\n`);
  if (opts.intro) { parts.push(`${opts.intro}\n`); }
  if (opts.generated !== false) { parts.push(`> ${GEN_BANNER}\n`); }
  for (const group of groups) {
    const emitLive: boolean = Boolean(opts.live) && group.live !== false;
    parts.push(`## ${group.title}\n`);
    if (group.note) { parts.push(`> ${group.note}\n`); }
    for (const tc of group.cases) {
      parts.push(`### ${tc.descr}\n`);
      parts.push(`${fence(displaySource(tc.mkdn))}\n`);
      if (emitLive) {
        parts.push(`${displaySource(tc.mkdn)}\n`);
      }
    }
  }
  return parts.join('\n') + '\n';
}
