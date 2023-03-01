import type { CamlValData } from './../types';
import {
  TYPE,
  constructYamlTimestamp,
  parseSexagesimal,
} from './../yaml';


// todo: what if there's leading/trailing whitespace? (trimming beforehand, for now)
export function resolve(value: string): CamlValData {
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
