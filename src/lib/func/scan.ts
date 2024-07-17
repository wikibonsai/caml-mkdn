import type {
  CamlScanResKey,
  CamlScanResVal,
} from './../types';
import { RGX } from './../var/regex';
import { resolve} from './resolve';


// scan -- useful for syntax highlights

export function scan(content: string): (CamlScanResKey | CamlScanResVal)[] {
  const res: any[] = [];
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
      // build results (handle key alongside values in case keys without values were found)
      const contentOffset: number = attrMatch.index;
      const keyOffset: number = attrMatch.index + matchText.indexOf(keyText);
      let itemOffset: number = 0;
      if (valText && !/^\s*$/.exec(valText) && !valText.includes('\n')) {
        // key
        const trimmedKey: string = keyText.trim();
        res.push({
          key: [trimmedKey, keyOffset],
        } as CamlScanResKey);
        // value(s):                                 // list              // single
        const vals: string[] = valText.includes(',') ? valText.split(',') : [valText];
        if (keyText.includes(vals[0])) {
          itemOffset += keyOffset + keyText.length;
        }
        for (const val of vals) {
          const trimmedVal: string = val.trim();
          itemOffset = matchText.indexOf(trimmedVal, itemOffset);
          const valParsed = resolve(trimmedVal);
          res.push({
            type: valParsed.type,
            val: [trimmedVal, contentOffset + itemOffset],
          } as CamlScanResVal);
          itemOffset += val.length;
        }
      // list-mkdn
      } else {
        if (RGX.LINE.LIST_ITEM.exec(matchText)) {
          // key
          res.push({
            key: [keyText, keyOffset],
          } as CamlScanResKey);
        }
        do {
          valMatch = listItemsGottaCatchEmAll.exec(matchText);
          if (valMatch) {
            const valText: string = valMatch[2];
            const trimmedVal: string = valText.trim();
            itemOffset = matchText.indexOf(trimmedVal, itemOffset);
            const valParsed = resolve(trimmedVal);
            res.push({
              type: valParsed.type,
              val: [trimmedVal, contentOffset + itemOffset],
            } as CamlScanResVal);
            itemOffset += valText.length;
          }
        } while (valMatch);
      }
    }
  } while (attrMatch);
  // only return the results if both keys and values were found
  const values = res.filter((item) => item.type);
  if (values.length === 0) {
    return [];
  } else {
    return res;
  }
}
