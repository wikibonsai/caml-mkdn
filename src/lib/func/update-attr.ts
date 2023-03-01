import { RGX } from './../var/regex';
import { VAL_HASH } from './../var/const';


export function updateAttr(
  content: string,
  key: string,
  newVal: string,
  type?: string,
): string | undefined {
  // build regex
  const rgxTypedVal: string = '(' + VAL_HASH[type as keyof typeof VAL_HASH].source + ')?';
  const rgxUntypedVal: string = RGX.VALID_CHARS.VAL.source;
  const rgxVal: string = (type && Object.keys(VAL_HASH).includes(type)) ? rgxTypedVal : rgxUntypedVal;
  const oldRgx: RegExp = new RegExp('^' + RGX.MARKER_WS.KEY_PRFX.source + key + RGX.MARKER_WS.COL.source + rgxVal, 'mg');
  // find
  const camlAttrMatch = oldRgx.exec(content);
  if (camlAttrMatch === null) { return undefined; }
  // breakdown match
  // const fullmatch: string = camlAttrMatch[0];
  const colonPrefixAndPad: string = camlAttrMatch[1];
  const frontPad         : string = camlAttrMatch[2]; // front of '::'
  const backPad          : string = camlAttrMatch[3]; // back of '::'
  const oldValue         : string = camlAttrMatch[4];
  // todo: disallow updating list attrs?
  if (oldValue.includes(',') || (oldValue === '\n')) {
    console.error('"updateAttr()" does not yet support lists');
    return undefined;
  }
  // build replacement text
  const updatedText: string = colonPrefixAndPad + key + frontPad + '::' + backPad + newVal;
  return content.replace(oldRgx, updatedText);
}
