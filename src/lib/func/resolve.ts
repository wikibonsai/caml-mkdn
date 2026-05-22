import type { CamlValData } from './../types';
import {
  TYPE,
  constructYamlTimestamp,
  parseSexagesimal,
} from './../yaml';

function parseYamlScalar(indicator: string, block: string): string {
  const chomp = indicator.endsWith('-') || indicator.endsWith('|');
  const style = indicator[0]; // > or |
  const isLiteral = style === '|' || indicator === '>|';
  let lines = block.split('\n');
  
  // Check if there's a trailing newline in the original block
  const hasTrailingNewline = block.endsWith('\n');
  const hasDoubleNewline = block.endsWith('\n\n');
  
  // Remove leading/trailing empty lines and handle indentation
  while (lines.length > 0 && lines[0].trim() === '') {
    lines.shift();
  }
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
  
  if (isLiteral) {
    // Literal: preserve newlines
    const result = lines.join('\n');
    return chomp ? result : result + (hasDoubleNewline ? '\n' : '');
  } else {
    // Folded: join with spaces
    const result = lines.map(line => line.trim()).join(' ');
    return chomp ? result : result + (hasDoubleNewline ? ' ' : '');
  }
}

// todo: what if there's leading/trailing whitespace? (trimming beforehand, for now)
export function resolve(value: string): CamlValData {
  // if the value is a multi-line string, treat it as a string
  const multiLineIndicators: string[] = ['>-', '>|', '>', '|'];
  if (multiLineIndicators.some(ind => value.trim().startsWith(ind))) {
    const indicator: string = multiLineIndicators.find(ind => value.trim().startsWith(ind))!;
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
    return {
      type: 'time',
      string: value,
      value: constructYamlTimestamp(value),
    };
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
