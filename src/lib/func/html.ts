import type { CamlValData } from '../types';
import { slugify } from './css';


export interface CamlCssNames {
  attrbox: string;   // the <aside> wrapper
  attrItem: string;  // the per-key <div>
  attr: string;      // the value span's structural class
  key: string;       // the <dt> class PREFIX (prepended to the key slug)
}

const DEFAULTS: CamlCssNames = {
  attrbox: 'attrbox',
  attrItem: 'attr-item',
  attr: 'attr',
  key: 'key__',
};

export interface AttrBoxItem extends CamlValData {
  // pre-rendered dd body — a routed consumer drops in the co-registered
  // wikirefs anchor here (caml itself never resolves wikirefs; see the
  // caml-wikiref hand-off). Absent, the value renders as its display span.
  html?: string;
}

export interface AttrBoxData {
  [key: string]: AttrBoxItem[];
}

export interface CamlBuildHTMLOpts {
  cssNames?: Partial<CamlCssNames>;
  // the wikirefs delegation slot: wiki-typed items (without a per-item `html`
  // override) are offered here as their RAW scanned text — caml never parses
  // them. Return the dd body (e.g. wikirefs' attrValueBuilder() adapter, which
  // parses + resolves + builds the anchor), or null to fall back to the
  // standalone string span. Presence must be EXPLICIT (no ambient detection):
  // rendering wiki values as anchors requires the caller's resolvers, and
  // output must not depend on which packages happen to be installed.
  buildWikiValue?: (raw: string) => string | null;
}

// display precedence owned HERE (mirrors the renderers' displayText): the
// scanned string verbatim, EXCEPT multi-line strings, which display the loaded
// value (indentation/chomping already applied); newlines render as <br>.
function displayText(item: AttrBoxItem): string {
  const text: string = (item.string && item.string.includes('\n'))
    ? String(item.value)
    : item.string;
  return text.replace(/\n/g, '<br>');
}

// Build the canonical attrbox HTML for a collection of caml attrs. This is the
// ONE place the attrbox structure and its CSS-class contract live (the caml
// twin of wikirefs' buildHTML), so parsers + SSGs route through it and their
// output cannot drift. Display strings pass through unescaped, per caml-spec.
export function buildHTML(attrs: AttrBoxData, opts: CamlBuildHTMLOpts = {}): string {
  const keys: string[] = Object.keys(attrs);
  if (keys.length === 0) { return ''; }
  const cn: CamlCssNames = { ...DEFAULTS, ...opts.cssNames };

  let html: string = `<aside class="${cn.attrbox}">\n<dl>\n`;
  for (const key of keys) {
    html += `<div class="${cn.attrItem}">\n`;
    html += `<dt class="${cn.key + slugify(key)}">${key}</dt>\n`;
    for (const item of attrs[key]) {
      // precedence: per-item html override > wiki delegation > display span
      const delegated: string | null = (item.html === undefined && item.type === 'wiki' && opts.buildWikiValue)
        ? opts.buildWikiValue(item.string)
        : null;
      const body: string = item.html ?? delegated ?? `<span class="${valueClasses(item.type, cn)}">${displayText(item)}</span>`;
      html += `<dd>${body}</dd>\n`;
    }
    html += '</div>\n';
  }
  html += '</dl>\n</aside>\n';
  return html;
}

// buildHTML owns its class VOCABULARY (mirrors wikirefs' private buildClasses):
// structural token (cn.attr, overridable) + value type, with wiki -> string.
function valueClasses(valueType: string, cn: CamlCssNames): string {
  return [cn.attr, valueType === 'wiki' ? 'string' : valueType].join(' ');
}
