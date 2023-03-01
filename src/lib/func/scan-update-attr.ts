import { RGX } from './../var/regex';
import { VAL_HASH } from './../var/const';


export function scanUpdateAttr(
  content: string,
  key: string,
  newVal: string,
  type?: string,
): [number, number, string] | undefined {
  // build regex
  const typeRgxStr: string = (type && Object.keys(VAL_HASH).includes(type))
    ? '(' + VAL_HASH[type as keyof typeof VAL_HASH].source + ')?'
    : RGX.VALID_CHARS.VAL.source;
  const oldRgx: RegExp = new RegExp('^' + RGX.MARKER_WS.KEY_PRFX.source + key + RGX.MARKER_WS.COL.source + typeRgxStr, 'mg');
  // find
  const camlAttrMatch = oldRgx.exec(content);
  if (camlAttrMatch === null) { return undefined; }
  // breakdown match
  // const fullmatch        : string = camlAttrMatch[0];
  const colonPrefixAndPad: string = camlAttrMatch[1];
  const frontPad         : string = camlAttrMatch[2]; // front of '::'
  const backPad          : string = camlAttrMatch[3]; // back of '::'
  const oldValue         : string = camlAttrMatch[4];
  if (oldValue.includes(',') || (oldValue === '\n')) {
    console.error('"updateAttr()" does not yet support lists');
    return undefined;
  }
  const start: number = camlAttrMatch.index;
  const end: number = camlAttrMatch.index + camlAttrMatch[0].length;
  // build replacement text
  const updatedText: string = colonPrefixAndPad + key + frontPad + '::' + backPad + newVal;
  return [start, end, updatedText];
}
