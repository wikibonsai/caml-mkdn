import { RGX } from './../var/regex';
import { VAL_HASH } from './../var/const';


export interface UpdateOpts {
  type?: string;
  format?: 'offsets' | 'content';
}

export function update(
  content: string,
  key: string,
  newVal: string,
  opts?: UpdateOpts,
): [number, number, string] | string | undefined {
  const type: string | undefined = opts?.type;
  const format: 'offsets' | 'content' = opts?.format ?? 'content';
  // build regex
  const typeRgxStr: string = (type && Object.keys(VAL_HASH).includes(type))
    ? '(' + VAL_HASH[type as keyof typeof VAL_HASH].source + ')?'
    : '(' + RGX.VALID_CHARS.VAL.source + ')';
  const oldRgx: RegExp = new RegExp('^' + RGX.MARKER_WS.KEY_PRFX.source + key + RGX.MARKER_WS.COL.source + typeRgxStr, 'mg');
  // find
  const camlAttrMatch = oldRgx.exec(content);
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
  if (format === 'content') {
    return content.replace(oldRgx, updatedText);
  }
  // offsets (default)
  const start: number = camlAttrMatch.index;
  const end: number = camlAttrMatch.index + camlAttrMatch[0].length;
  return [start, end, updatedText];
}
