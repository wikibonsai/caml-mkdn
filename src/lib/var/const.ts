/* eslint-disable @typescript-eslint/no-namespace */
import { VAL } from '../yaml';


// plain-string markers — the single source of truth for caml's delimiters.
// mirrors wikirefs' `CONST.MARKER` (PREFIX/TYPE): the string-based parsers build
// lines from these, the char-by-char parsers (micromark) consume them via
// `.charCodeAt()` / `.length`, and `RGX.MARKER` (regex.ts) derives its patterns
// from them — so `:` / `::` are declared in exactly one place.
export namespace CONST {

  export const MARKER = {
    // key prefix, e.g. the leading ':' in ':key::value'
    KEY_PRFX : ':',
    // key/value delimiter, e.g. the '::' in 'key::value'
    COL      : '::',
  } as const;

}

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
