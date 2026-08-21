/**
 * slugify — the one shared css primitive for the caml attrbox.
 *
 * The render plugins (markdown-it-caml / marked-caml / mdast-util-caml /
 * micromark-extension-caml) each OWN their class-string assembly, driven by their
 * own `cssNames` options (mirroring wikirefs' parsers). The ONLY thing they share
 * from caml-mkdn is this slug, so a key name slugs identically as `key__<slug>`
 * (caml attrbox) and `reftype__<slug>` (wikirefs attrbox) for the shared
 * type -> color pipeline. buildHTML() (the SSG / routed-consumer entry) likewise
 * assembles its classes internally; it just reuses this slug.
 *
 * NO resolution happens here — the class carries the NAME from the markdown;
 * colors are a stylesheet concern (consumers inject `.key__<slug> { color }`
 * rules from their attr schema, e.g. tendr-app from t.attr.toml, mirroring the
 * `doctype__` pattern).
 */

/** Slugify an attr key the same way consumers do (see tendr-app attrKeySlug):
 *  trim, lowercase, whitespace -> hyphens, strip non-word chars, collapse + trim
 *  hyphen runs. MUST match wikirefs' slugify: the same name must slug identically
 *  as `key__` (caml attrbox) and `reftype__` (wikirefs attrbox) for the shared
 *  type -> color pipeline (a stripped interior char, e.g. 'Cause & Effect',
 *  otherwise leaves a double hyphen on one side only). */
export function slugify(key: string): string {
  return key
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}
