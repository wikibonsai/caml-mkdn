import type { CamlLoadPayload } from './../types';
import { RGX } from './../var/regex';
import { resolve} from './resolve';


export function load(content: string): CamlLoadPayload {
  const res: CamlLoadPayload = {
    data: {},
    content: '',
  } as CamlLoadPayload;
  const replaceMatches: string[] = [];
  let attrMatch, valMatch: RegExpExecArray | null;
  const attrsGottaCatchEmAll: RegExp = new RegExp(RGX.CAML, 'gim');
  const listItemsGottaCatchEmAll: RegExp = new RegExp(RGX.LINE.LIST_ITEM, 'gim');
  // do-while: https://stackoverflow.com/a/6323598
  do {
    attrMatch = attrsGottaCatchEmAll.exec(content);
    if (attrMatch) {
      // extract match text
      const matchText: string = attrMatch[0];
      const keyText: string = attrMatch[1];
      const valText: string = attrMatch[2];
      // const keyOffset: number = attrMatch.index + matchText.indexOf(keyText);
      let itemOffset: number = 0;
      // single / list-comma
      if (valText && !/^\s*$/.exec(valText) && !valText.includes('\n')) {
        // key
        const trimmedKey: string = keyText.trim();
        res.data[trimmedKey] = [];
        // handle quotes and comma-separation (this allows quotes to escape commas)
        const vals: string[] = [];
        let curVal: string = '';
        let inDoubleQuote: boolean = false;
        let inSingleQuote: boolean = false;
        for (const char of valText) {
          // comma separation
          if ((!inDoubleQuote && !inSingleQuote) && (char === ',')) {
            vals.push(curVal);
            curVal = '';
            continue;
          }
          // quote
          if (/"/.test(char)) {
            inDoubleQuote = !inDoubleQuote;
          }
          if (/'/.test(char)) {
            inSingleQuote = !inSingleQuote;
          }
          // char
          curVal += char;
        }
        // single / last value
        vals.push(curVal);
        if (vals.length === 1) {
          const trimmedVal: string = vals[0].trim();
          const valParsed = resolve(trimmedVal);
          itemOffset = matchText.indexOf(trimmedVal, itemOffset);
          res.data[trimmedKey] = valParsed.value;
        } else {
          for (const val of vals) {
            const trimmedVal: string = val.trim();
            const valParsed = resolve(trimmedVal);
            itemOffset = matchText.indexOf(trimmedVal, itemOffset);
            res.data[trimmedKey].push(valParsed.value);
            itemOffset += val.length;
          }
        }
        replaceMatches.push(matchText + '\n'); // newlines not included in match
      // list-mkdn
      } else {
        const trimmedKey: string = keyText.trim();
        if (RGX.LINE.LIST_ITEM.exec(matchText)) {
          // key
          res.data[trimmedKey] = [];
          replaceMatches.push(matchText); // newlines included in match
        }
        do {
          valMatch = listItemsGottaCatchEmAll.exec(matchText);
          if (valMatch) {
            const trimmedVal: string = valMatch[2].trim();
            const valParsed = resolve(trimmedVal);
            itemOffset = matchText.indexOf(trimmedVal, itemOffset);
            res.data[trimmedKey].push(valParsed.value);
            itemOffset += valMatch[2].length;
          }
        } while (valMatch);
      }
    }
  } while (attrMatch);
  for (const m of replaceMatches) {
    content = content.replace(m, '');
  }
  res.content = content;
  return res;
}
