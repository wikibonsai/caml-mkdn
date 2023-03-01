import { VAL } from '../yaml';


export const VAL_HASH = {
  'null'       : VAL.NULL,
  // bool
  'bool'       : VAL.BOOL,
  // int
  'int'        : VAL.INT,
  'int_hex'    : VAL.INT_HEX,
  'int_oct'    : VAL.INT_OCT,
  // float
  'float'      : VAL.FLOAT,
  'float_exp'  : VAL.FLOAT_EXP,
  'float_nan'  : VAL.FLOAT_NAN,
  // time
  'time_int'   : VAL.TIME_INT,
  'time_float' : VAL.TIME_FLOAT,
  'timestamp'  : VAL.TIMESTAMP,
  // (explicit) string
  'string'     : VAL.STRING,
} as const;
