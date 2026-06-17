import type { CamlLoadPayload } from './../types';
import { RGX } from './../var/regex';
import { resolve} from './resolve';


function preprocessMultiLineStrings(content: string, res: CamlLoadPayload): string {
  let result = content;
  
  // Handle standalone multi-line strings first - parse them directly
  result = handleStandaloneMultiLine(result, res);

  // Handle multi-line strings in markdown lists
  // Note: multi-line strings are NOT supported in comma-separated lists.
  // Indicators (>, |, etc.) in comma lists are treated as literal string values.
  result = handleMkdnListMultiLine(result, res);
  
  return result;
}

// Shared function for parsing multi-line string content
function parseMultiLineString(indicator: string, blockContent: string): any {
  const normalizedContent = normalizeMultiLineContent(blockContent);
  const fullValue = ` ${indicator}\n${normalizedContent}`;
  const parsed = resolve(fullValue);
  return parsed.value;
}

function handleStandaloneMultiLine(content: string, res: CamlLoadPayload): string {
  const lines = content.split('\n');
  const headerRgx = new RegExp(
    '^' + RGX.MARKER.KEY_PRFX.source + '?'
    + '(' + RGX.VALID_CHARS.KEY.source + ')'
    + RGX.MARKER.COL.source
    + ' *' + RGX.MARKER.MLINE_STR.source + '$'
  , 'i');
  const consumed: Set<number> = new Set();

  for (let i = 0; i < lines.length; i++) {
    const headerMatch = headerRgx.exec(lines[i]);
    if (!headerMatch) continue;
    const trimmedKey = headerMatch[1].trim();
    const indicator = headerMatch[2];
    consumed.add(i);
    // collect continuation lines: indented or empty (but stop at non-indented content)
    const blockLines: string[] = [];
    let j = i + 1;
    while (j < lines.length) {
      const line = lines[j];
      if (line.trim() === '') {
        // empty line: include if next line is indented, otherwise end
        if (j + 1 < lines.length && /^\s+/.test(lines[j + 1])) {
          blockLines.push(line);
          consumed.add(j);
          j++;
        } else {
          // trailing empty line(s) — collect all for keep mode
          while (j < lines.length && lines[j].trim() === '') {
            blockLines.push(lines[j]);
            consumed.add(j);
            j++;
          }
          break;
        }
      } else if (/^\s/.test(line)) {
        blockLines.push(line);
        consumed.add(j);
        j++;
      } else {
        break;
      }
    }
    i = j - 1;
    const blockContent = blockLines.join('\n');
    const parsedValue = parseMultiLineString(indicator, blockContent);
    res.data[trimmedKey] = parsedValue;
  }

  // rebuild content without consumed lines
  const remaining = lines.filter((_, idx) => !consumed.has(idx));
  return remaining.join('\n');
}


function handleMkdnListMultiLine(content: string, res: CamlLoadPayload): string {
  // Pattern: ":key::\n- value1\n- >\n  multi-line content"
  const mkdnMultiLinePattern = new RegExp(
    '^' + RGX.MARKER.KEY_PRFX.source + '?'
    + '(' + RGX.VALID_CHARS.KEY.source + ')'
    + RGX.MARKER.COL.source + '\\n'
    + '((?:- [^\\n]*\\n)*?)- *'
    + RGX.MARKER.MLINE_STR.source + '\\s*\\n'
    + '((?:\\s+.*\\n?)*)'
  , 'gm');
  
  return content.replace(mkdnMultiLinePattern, (match, key, previousItems, indicator, blockContent) => {
    // Parse the multi-line part using shared function
    const parsedValue = parseMultiLineString(indicator, blockContent);
    
    // Parse previous list items
    const trimmedKey = key.replace(/^: ?/, '').trim();
    const values: any[] = [];
    
    // Extract previous items
    const itemMatches = previousItems.matchAll(/^- *([^\n]*)/gm);
    for (const itemMatch of itemMatches) {
      const itemValue = itemMatch[1].trim();
      if (itemValue) {
        const itemParsed = resolve(itemValue);
        values.push(itemParsed.value);
      }
    }
    
    // Add the multi-line value
    values.push(parsedValue);
    
    // Store the complete array
    res.data[trimmedKey] = values;
    
    // Return empty string to remove this from content
    return '';
  });
}


function normalizeMultiLineContent(content: string): string {
  // Remove common leading whitespace but preserve relative indentation
  const lines = content.split('\n');
  const nonEmptyLines = lines.filter(line => line.trim() !== '');
  
  if (nonEmptyLines.length === 0) return '';
  
  // Find minimum indentation
  let minIndent = Infinity;
  for (const line of nonEmptyLines) {
    const indent = line.length - line.trimStart().length;
    if (indent < minIndent) {
      minIndent = indent;
    }
  }
  
  // Remove common indentation
  const normalizedLines = lines.map(line => 
    line.length >= minIndent ? line.slice(minIndent) : line
  );
  
  return normalizedLines.join('\n');
}

export function load(content: string): CamlLoadPayload {
  const res: CamlLoadPayload = {
    data: {},
    content: '',
  } as CamlLoadPayload;
  
  // Preprocess multi-line strings - they get parsed directly into res.data
  content = preprocessMultiLineStrings(content, res);
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
            const valText: string = valMatch[2];
            const trimmedVal: string = valText.trim();
            const valParsed = resolve(trimmedVal);
            itemOffset = matchText.indexOf(trimmedVal, itemOffset);
            res.data[trimmedKey].push(valParsed.value);
            itemOffset += valText.length;
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
