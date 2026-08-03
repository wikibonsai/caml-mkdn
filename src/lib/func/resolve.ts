import type { CamlResolveOpts, CamlValData } from './../types';
import {
  TYPE,
  constructYamlTimestamp,
  parseSexagesimal,
} from './../yaml';
import { CONST } from './../var/const';
import { RGX } from './../var/regex';


// YAML block scalar parser
// ref: https://yaml.org/spec/1.2.2/#81-block-scalar-headers
//
// Style:
//   literal (|): preserve newlines
//   folded  (>): replace newlines with spaces
//
// Chomping (controls trailing newlines):
//   clip (default): single trailing newline
//   strip (-):      no trailing newline
//   keep  (+):      preserve all trailing newlines
//
function parseYamlScalar(indicator: string, block: string): string {
  // Parse indicator into style and chomping mode
  const style = indicator[0]; // > or |
  const isLiteral: boolean = (style === '|');
  let chompMode: 'clip' | 'strip' | 'keep';
  if (indicator.endsWith('-')) {
    chompMode = 'strip';
  } else if (indicator.endsWith('+')) {
    chompMode = 'keep';
  } else {
    chompMode = 'clip';
  }

  let lines = block.split('\n');

  // Count trailing empty lines before stripping
  let trailingEmptyCount = 0;
  for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i].trim() === '') {
      trailingEmptyCount++;
    } else {
      break;
    }
  }

  // Remove leading empty lines
  while (lines.length > 0 && lines[0].trim() === '') {
    lines.shift();
  }

  // Remove trailing empty lines (we'll re-add per chomp mode)
  while (lines.length > 0 && lines[lines.length - 1].trim() === '') {
    lines.pop();
  }

  // Find minimum indentation (ignoring empty lines)
  const nonEmptyLines = lines.filter(line => line.trim() !== '');
  let minIndent = Infinity;
  for (const line of nonEmptyLines) {
    const indent = line.length - line.trimStart().length;
    if (indent < minIndent) {
      minIndent = indent;
    }
  }

  // Remove common indentation
  if (minIndent !== Infinity && minIndent > 0) {
    lines = lines.map(line => line.length >= minIndent ? line.slice(minIndent) : line);
  }

  // Join lines per style
  let result: string;
  if (isLiteral) {
    result = lines.join('\n');
  } else {
    result = lines.map(line => line.trim()).join(' ');
  }

  // Apply chomping
  switch (chompMode) {
  case 'strip':
    // no trailing newline
    return result;
  case 'keep':
    // preserve all trailing newlines
    return result + '\n'.repeat(trailingEmptyCount);
  case 'clip':
  default:
    // single trailing newline
    return result + '\n';
  }
}

// resolve a valid timestamp to a Date; return null for an invalid one (bad format or
// out-of-range) so resolution falls back to `string`. constructYamlTimestamp throws on
// invalid dates (js-yaml parity) — this contains the throw so resolve() can branch on it
// rather than swallow it. type resolution is total: a value that can't be a real date is
// a string.
function tryTimestamp(value: string): Date | null {
  try {
    return constructYamlTimestamp(value);
  } catch {
    return null;
  }
}

// todo: what if there's leading/trailing whitespace? (trimming beforehand, for now)
export function resolve(value: string, opts?: CamlResolveOpts): CamlValData {
  // wikilink — only recognized as a distinct 'wiki' type when the wikirefs plugin is
  // signalled (opts.wikirefs). caml is wikirefs-agnostic by DEFAULT: `[[x]]` falls
  // through to a plain string value (brackets kept), leaving link resolution to
  // wikirefs.
  if (opts?.wikirefs && RGX.WIKI.test(value.trim())) {
    const trimmed: string = value.trim();
    // strip [[ and ]] to extract filename
    const filename: string = trimmed.slice(2, -2);
    return {
      type: 'wiki',
      string: trimmed,
      value: filename,
    };
  }
  // if the value is a multi-line string, treat it as a string
  // must contain \n (actual block content) — bare indicators without
  // content are treated as literal string values
  // order matters: longer patterns first to avoid partial matches (see CONST.MLINE_INDICATORS)
  if (value.includes('\n') && CONST.MLINE_INDICATORS.some(ind => value.trim().startsWith(ind))) {
    const indicator: string = CONST.MLINE_INDICATORS.find(ind => value.trim().startsWith(ind))!;
    const trimmedValue = value.trim();
    const block: string = value.slice(value.trim().indexOf(indicator) + indicator.length + 1);
    const parsed: string = parseYamlScalar(indicator, block);
    return { type: 'string', string: value, value: parsed };
  }
  value = value.trim();
  // if the value is in single or double quotes, treat it as a string
  if ((value[0] === '\'' && value[value.length] === '\'') ||
      (value[0] === '"' && value[value.length] === '"')) {
    return {
      type: 'string',
      string: value,
      value: value,
    };
  }
  // null
  if (TYPE.NULL.exec(value)) {
    return {
      type: 'null',
      string: 'null',
      value: null,
    };
  }
  // bool
  if (TYPE.BOOL.exec(value)) {
    return {
      type: 'bool',
      string: value,
      value: Boolean((value.toLowerCase() === 'true')),
    };
  }
  // int
  if (TYPE.INT_HEX.exec(value)) {
    return {
      type: 'int',
      string: value,
      value: parseInt(value, 16),
    };
  }
  if (TYPE.INT_OCT.exec(value)) {
    return {
      type: 'int',
      string: value,
      value: parseInt(value.substring(2, 8), 8),
    };
  }
  if (TYPE.INT.exec(value)) {
    return {
      type: 'int',
      string: value,
      value: parseInt(value, 10),
    };
  }
  // float
  if (TYPE.FLOAT_EXP.exec(value)) {
    return {
      type: 'float',
      string: value,
      value: parseFloat(value),
    };
  }
  if (TYPE.FLOAT_NAN.exec(value)) {
    return {
      type: 'float',
      string: value,
      value: parseFloat(value),
    };
  }
  if (TYPE.FLOAT.exec(value)) {
    return {
      type: 'float',
      string: value,
      value: parseFloat(value),
    };
  }
  // time
  if (TYPE.TIMESTAMP.exec(value)) {
    const time: Date | null = tryTimestamp(value);
    if (time !== null) {
      return {
        type: 'time',
        string: value,
        value: time,
      };
    }
    // else: not a real date -> fall through to `string`
  }
  if (TYPE.TIME_INT.exec(value)) {
    return {
      type: 'time',
      string: value,
      value: parseSexagesimal(value),
    };
  }
  if (TYPE.TIME_FLOAT.exec(value)) {
    return {
      type: 'time',
      string: value,
      value: parseSexagesimal(value),
    };
  }
  // string
  return {
    type: 'string',
    string: value,
    value: value,
  };
}
