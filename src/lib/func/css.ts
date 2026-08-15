/**
 * CSS class composition — ONE source of truth for the caml html contract.
 *
 * The render plugins (markdown-it-caml / marked-caml / mdast-util-caml) import
 * these instead of hand-assembling class strings, so the attrbox contract can't
 * drift between parser families:
 *
 *   <dt class="key__<slug>">key</dt>          <- the KEY wears its identity
 *   <dd><span class="attr <valuetype>">…      <- values carry structure + type ONLY
 *
 * The `key__` prefix namespaces user-space key names away from the structural
 * classes (`attr`, `string`, `wiki`, …) — a key literally named `attr` used to
 * collide. The dt class is the hook for type-sensitive syntax highlighting:
 * consumers inject `.key__<slug> { color }` rules from their attr schema (e.g.
 * tendr-app from t.attr.toml), mirroring the `doctype__` pattern. NO resolution
 * happens here — the class carries the NAME from the markdown; colors are a
 * stylesheet concern.
 */

/** Slugify an attr key the same way consumers do (see tendr-app attrKeySlug):
 *  trim, lowercase, spaces -> hyphens, strip non-word chars. */
export function slugifyKey(key: string): string {
  return key.trim().toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
}

/** The dt's css class for a key: `key__<slug>`. */
export function keyCssClass(key: string): string {
  return 'key__' + slugifyKey(key);
}

/**
 * The value span's css classes: structure (`attr`) + value type — the raw key
 * NO LONGER rides along (it lives on the dt as `key__<slug>` instead).
 * Wiki values render as string spans — caml does not resolve wikirefs (the
 * co-registered wikirefs plugin upgrades them; see caml-wikiref-handoff).
 */
export function attrCssClasses(valueType: string): string[] {
  return ['attr', valueType === 'wiki' ? 'string' : valueType];
}
