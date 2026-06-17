import type { CamlDumpOpts } from '../types';


export function dump(attrs: any, opts?: CamlDumpOpts): string {
  if (JSON.stringify(attrs) === '{}') { return ''; }
  const format: 'none' | 'pad' | 'pretty'        = opts?.format     ?? 'pretty';
  const listFormat: 'mkdn' | 'comma'             = opts?.listFormat ?? 'mkdn';
  const prefixColon: boolean                     = opts?.prefix     ?? true;
  const multiLine: 'none' | 'literal' | 'folded' = opts?.multiLine  ?? 'none';
  const chomp: 'clip' | 'strip' | 'keep'         = opts?.chomp      ?? 'clip';
  const indent: number                           = opts?.indent     ?? 2;
  // validate: multi-line strings are not supported in comma-separated lists
  if (multiLine !== 'none' && listFormat === 'comma') {
    const hasMultiLineValues = Object.values(attrs).some((v: any) =>
      Array.isArray(v) && v.some((item: any) => `${item}`.includes('\n'))
    );
    if (hasMultiLineValues) {
      console.warn('dump(): multi-line strings are not supported in comma-separated lists. Use listFormat: \'mkdn\' instead.');
    }
  }
  let attrString: string = '';
  // find longest key to prettify against
  let prettyPad: number = 0;
  for (const key of Object.keys(attrs)) {
    prettyPad = (prettyPad > key.length) ? prettyPad : key.length;
  }
  // build dump string
  for (const [key, value] of Object.entries(attrs)) {
    // key
    if (prefixColon) {
      attrString += ':';
      if ((format === 'pad') || (format === 'pretty')) {
        attrString += ' ';
      }
    }
    attrString += key;
    switch (format) {
    case 'pad': {
      attrString += ' ';
      break;
    }
    case 'pretty': {
      const pad: number = prettyPad - key.length + 1;
      for (let i = 0; i < pad; i++) {
        attrString += ' ';
      }
      break;
    }
    default: { break; }
    }
    // docol
    attrString += '::';
    // value(s)
    if ((format === 'pad') || (format === 'pretty')) {
      attrString += ' ';
    }
    // single
    if (!Array.isArray(value)) {
      const strVal: string = `${value}`;
      // multi-line string serialization
      if (multiLine !== 'none' && strVal.includes('\n')) {
        attrString += serializeMultiLine(strVal, multiLine, chomp, indent);
      } else {
        attrString += strVal;
        // multi-line keep mode (|+, >+) strings end with \n\n — don't add another
        if (strVal.endsWith('\n\n')) {
          // keep mode: trailing newlines are already included
        } else {
          attrString += '\n';
        }
      }
    // list
    } else {
      for (const [i, v] of value.entries()) {
        switch (listFormat) {
        case 'comma':
          if (i === 0) {
            attrString += v;
            continue;
          } else {
            attrString += ',';
            if ((format === 'pad') || (format === 'pretty')) {
              attrString +=  ' ';
            }
            attrString += v;
            if (i === (value.length - 1)) {
              attrString += '\n';
            }
          }
          break;
        case 'mkdn':
          if (i === 0) {
            attrString += '\n';
          }
          if (format === 'pretty') {
            for (let i = 0; i < (prettyPad + 6); i++) {
              attrString += ' ';
            }
          }
          const strV: string = `${v}`;
          if (multiLine !== 'none' && strV.includes('\n')) {
            attrString += '- ' + serializeMultiLine(strV, multiLine, chomp, indent);
          } else {
            attrString += '- ' + strV + '\n';
          }
          break;
        default:
          console.error('not a valid listFormat');
          break;
        }
      }
    }
  }
  return attrString;
}

// serialize a value as a YAML block scalar
function serializeMultiLine(
  value: string,
  style: 'literal' | 'folded',
  chomp: 'clip' | 'strip' | 'keep',
  indent: number,
): string {
  const indentStr: string = ' '.repeat(indent);

  // build indicator
  const styleChar: string = (style === 'literal') ? '|' : '>';
  const chompChar: string = (chomp === 'strip') ? '-' : (chomp === 'keep') ? '+' : '';
  const indicator: string = styleChar + chompChar;

  // strip trailing newlines from value — we'll re-add per chomp mode
  let content: string = value.replace(/\n+$/, '');

  // for folded style, split long lines at word boundaries
  let lines: string[];
  if (style === 'folded') {
    lines = content.split('\n');
    // if a line is long (fully folded), wrap at word boundaries
    const wrapped: string[] = [];
    for (const line of lines) {
      if (line.length > 72) {
        const words = line.split(' ');
        let curLine = '';
        for (const word of words) {
          if (curLine.length > 0 && (curLine.length + word.length + 1) > 72) {
            wrapped.push(curLine);
            curLine = word;
          } else {
            curLine += (curLine.length > 0 ? ' ' : '') + word;
          }
        }
        if (curLine.length > 0) wrapped.push(curLine);
      } else {
        wrapped.push(line);
      }
    }
    lines = wrapped;
  } else {
    lines = content.split('\n');
  }

  // build output: indicator + indented lines
  let result = indicator + '\n';
  for (const line of lines) {
    if (line === '') {
      result += '\n';
    } else {
      result += indentStr + line + '\n';
    }
  }

  // add trailing newlines per chomp mode
  if (chomp === 'keep') {
    // count how many trailing newlines were in the original value
    const trailingMatch = value.match(/\n+$/);
    const trailingCount = trailingMatch ? trailingMatch[0].length : 0;
    // we already added one \n after the last content line,
    // so add (trailingCount - 1) more
    if (trailingCount > 1) {
      result += '\n'.repeat(trailingCount - 1);
    }
  }

  return result;
}
