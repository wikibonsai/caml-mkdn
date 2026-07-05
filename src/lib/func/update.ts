import { getEscIndices, isStrEscaped } from 'escape-mkdn';

import { RGX } from './../var/regex';
import { VAL_HASH } from './../var/const';


export interface UpdateOpts {
  type?: string;
  format?: 'offsets' | 'content';
  skipEsc?: boolean;    // if true (default), skip escaped CAML (e.g. in code blocks)
}

export function update(
  content: string,
  key: string,
  newVal: string,
  opts?: UpdateOpts,
): [number, number, string] | string | undefined {
  const type: string | undefined = opts?.type;
  const format: 'offsets' | 'content' = opts?.format ?? 'content';
  const skipEsc: boolean = (opts?.skipEsc !== undefined) ? opts.skipEsc : true;
  // build regex
  const typeRgxStr: string = (type && Object.keys(VAL_HASH).includes(type))
    ? '(' + VAL_HASH[type as keyof typeof VAL_HASH].source + ')?'
    : '(' + RGX.VALID_CHARS.VAL.source + ')';
  const oldRgx: RegExp = new RegExp('^' + RGX.MARKER_WS.KEY_PRFX.source + key + RGX.MARKER_WS.COL.source + typeRgxStr, 'mg');
  // find first non-escaped match — skipEsc gates escaped CAML (e.g. inside code
  // blocks) from being rewritten, mirroring wikirefs' string.replace gate.
  const escdIndices: number[] = skipEsc ? getEscIndices(content) : [];
  let camlAttrMatch: RegExpExecArray | null = null;
  let m: RegExpExecArray | null;
  while ((m = oldRgx.exec(content)) !== null) {
    if (!skipEsc || !isStrEscaped(m[0], content, m.index, escdIndices)) {
      camlAttrMatch = m;
      break;
    }
  }
  if (camlAttrMatch === null) { return undefined; }
  // breakdown match
  const colonPrefixAndPad: string = camlAttrMatch[1];
  const frontPad         : string = camlAttrMatch[2]; // front of '::'
  const backPad          : string = camlAttrMatch[3]; // back of '::'
  const oldValue         : string = camlAttrMatch[4];
  if (oldValue.includes(',') || (oldValue === '\n')) {
    console.error('"update()" does not yet support lists');
    return undefined;
  }
  // build replacement text
  const updatedText: string = colonPrefixAndPad + key + frontPad + '::' + backPad + newVal;
  const start: number = camlAttrMatch.index;
  const end: number = camlAttrMatch.index + camlAttrMatch[0].length;
  if (format === 'content') {
    // splice the single matched attr (consistent with the offsets format; the old
    // global String.replace rewrote every same-key line with the first's padding).
    return content.slice(0, start) + updatedText + content.slice(end);
  }
  // offsets (default)
  return [start, end, updatedText];
}
