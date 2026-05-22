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
      
      // key
      const trimmedKey: string = keyText.trim();
      res.push({
        key: [trimmedKey, keyOffset],
      } as CamlScanResKey);
      
      // Handle multi-line string
      const fullValue = ` ${indicator}\n${blockContent}`;
      const valParsed = resolve(fullValue);
      res.push({
        type: valParsed.type,
        val: [valParsed.value, contentOffset + matchText.indexOf(indicator)],
      } as CamlScanResVal);
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
