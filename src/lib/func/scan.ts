import type {
  CamlScanResVal,
  CamlScanResult,
} from './../types';
import { RGX } from './../var/regex';
import { resolve} from './resolve';


// scan -- useful for syntax highlights

export function scan(content: string): CamlScanResult[] {
  const res: CamlScanResult[] = [];
  let attrMatch, valMatch: RegExpExecArray | null;
  const attrsGottaCatchEmAll: RegExp = new RegExp(RGX.CAML, 'gim');
  const multiLineGottaCatchEmAll: RegExp = new RegExp(RGX.MLINE.SINGLE, 'gim');
  const listItemsGottaCatchEmAll: RegExp = new RegExp(RGX.LINE.LIST_ITEM, 'gim');

  // Handle multi-line strings first
  do {
    attrMatch = multiLineGottaCatchEmAll.exec(content);
    if (attrMatch) {
      // extract match text
      const matchText: string = attrMatch[0];
      const keyText: string = attrMatch[1];
      const indicator: string = attrMatch[2];
      const blockContent: string = attrMatch[3];
      // build results
      const contentOffset: number = attrMatch.index;
      const keyOffset: number = attrMatch.index + matchText.indexOf(keyText);

      // Handle multi-line string
      const fullValue = ` ${indicator}\n${blockContent}`;
      const valParsed = resolve(fullValue);
      const trimmedKey: string = keyText.trim();
      res.push({
        key: { text: trimmedKey, start: keyOffset },
        vals: [
          {
            type: valParsed.type,
            val: { text: valParsed.value as string, start: contentOffset + matchText.indexOf(indicator) },
          },
        ],
      });
    }
  } while (attrMatch);

  // Handle regular CAML attributes
  do {
    attrMatch = attrsGottaCatchEmAll.exec(content);
    if (attrMatch) {
      // extract match text
      const matchText: string = attrMatch[0];
      const keyText: string = attrMatch[1];
      const valText: string = attrMatch[2];
      // build results (handle key alongside values in case keys without values were found)
      const contentOffset: number = attrMatch.index;
      const keyOffset: number = attrMatch.index + matchText.indexOf(keyText);
      let itemOffset: number = 0;
      if (valText && !/^\s*$/.exec(valText) && !valText.includes('\n') && !/^[>-|]\|?$/.test(valText)) {
        // key + values
        const trimmedKey: string = keyText.trim();
        const vals: CamlScanResVal[] = [];

        // value(s):                                 // list              // single
        const valParts: string[] = valText.includes(',') ? valText.split(',') : [valText];
        if (keyText.includes(valParts[0])) {
          itemOffset += keyOffset + keyText.length;
        }
        for (const val of valParts) {
          const trimmedVal: string = val.trim();
          itemOffset = matchText.indexOf(trimmedVal, itemOffset);
          const valParsed = resolve(trimmedVal);
          vals.push({
            type: valParsed.type,
            val: { text: trimmedVal, start: contentOffset + itemOffset },
          });
          itemOffset += val.length;
        }
        res.push({
          key: { text: trimmedKey, start: keyOffset },
          vals,
        });
      // list-mkdn
      } else {
        if (RGX.LINE.LIST_ITEM.exec(matchText)) {
          const vals: CamlScanResVal[] = [];
          do {
            valMatch = listItemsGottaCatchEmAll.exec(matchText);
            if (valMatch) {
              const valText: string = valMatch[2];
              const trimmedVal: string = valText.trim();
              itemOffset = matchText.indexOf(trimmedVal, itemOffset);
              const valParsed = resolve(trimmedVal);
              vals.push({
                type: valParsed.type,
                val: { text: trimmedVal, start: contentOffset + itemOffset },
              });
              itemOffset += valText.length;
            }
          } while (valMatch);
          res.push({
            key: { text: keyText, start: keyOffset },
            vals,
          });
        }
      }
    }
  } while (attrMatch);
  // only return the results if both keys and values were found
  const hasValues = res.some((item) => item.vals.length > 0);
  if (!hasValues) {
    return [];
  } else {
    return res;
  }
}
