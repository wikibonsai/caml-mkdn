import type { CamlDumpOpts } from '../types';


// todo:
//  - strict strings
//  - multiline strings
export function dump(attrs: any, opts?: CamlDumpOpts): string {
  if (JSON.stringify(attrs) === '{}') { return ''; }
  const format: 'none' | 'pad' | 'pretty' = (opts && Object.keys(opts).includes('format'))     ? opts.format     : 'pretty';
  const listFormat: 'mkdn' | 'comma'      = (opts && Object.keys(opts).includes('listFormat')) ? opts.listFormat : 'mkdn';
  const prefixColon: boolean              = (opts && Object.keys(opts).includes('prefix'))     ? opts.prefix     : true;
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
      attrString += `${value}\n`;
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
          attrString += '- ' + v + '\n';
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
