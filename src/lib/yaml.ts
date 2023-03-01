/******************************************************************************
from: https://github.com/eemeli/yaml

licensing permission:

Copyright Eemeli Aro <eemeli@gmail.com>

Permission to use, copy, modify, and/or distribute this software for any purpose
with or without fee is hereby granted, provided that the above copyright notice
and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS
OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER
TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF
THIS SOFTWARE.
******************************************************************************/

// 'val' as in, "i want to extract the value" and likely used in conjunction
// with other regexes to interact with caml attributes
export const VAL = {
  // null
  NULL       : /(?:~|[Nn]ull|NULL)?/,
  // bool
  BOOL       : /(?:[Tt]rue|TRUE|[Ff]alse|FALSE)/,
  // int
  INT        : /[-+]?[0-9]+/,
  INT_HEX    : /0x[0-9a-fA-F]+/,
  INT_OCT    : /0o[0-7]+/,
  // float
  FLOAT      : /[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)/,
  FLOAT_EXP  : /[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+/,
  FLOAT_NAN  : /(?:[-+]?\.(?:inf|Inf|INF|nan|NaN|NAN))/,
  // time
  TIME_INT   : /[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+/,
  TIME_FLOAT : /[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*/,
  TIMESTAMP  : RegExp('([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})' +                // YYYY-Mm-Dd
                      '(?:' +                                                 // (time is optional)
                      '(?:t|T|[ \\t]+)' +                                     // t | T | whitespace
                      '([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)' +  // Hh:Mm:Ss(.ss)?
                      '(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?' +       // Z | +5 | -03:30
                      ')?'),
  // (explicit) string
  STRING     : /["'].*["']/,
} as const;

// 'type' as in, "i want to determine the type of the value" and likely used in isolation
// to narrowly determine the type of a given value, perhaps to 'rgx.test(str)' for example.
export const TYPE = {
  // null
  NULL       : new RegExp('^' + VAL.NULL.source + '$'),
  // bool
  BOOL       : new RegExp('^' + VAL.BOOL.source + '$'),
  // int
  INT        : new RegExp('^' + VAL.INT.source + '$'),
  INT_HEX    : new RegExp('^' + VAL.INT_HEX.source + '$'),
  INT_OCT    : new RegExp('^' + VAL.INT_OCT.source + '$'),
  // float
  FLOAT      : new RegExp('^' + VAL.FLOAT.source + '$'),
  FLOAT_EXP  : new RegExp('^' + VAL.FLOAT_EXP.source + '$'),
  FLOAT_NAN  : new RegExp('^' + VAL.FLOAT_NAN.source + '$'),
  // time
  TIME_INT   : new RegExp('^' + VAL.TIME_INT.source + '$'),
  TIME_FLOAT : new RegExp('^' + VAL.TIME_FLOAT.source + '$'),
  TIMESTAMP  : new RegExp('^' + VAL.TIMESTAMP.source + '$'),
  // (explicit) string
  STRING     : new RegExp('^' + VAL.STRING.source + '$'),
} as const;

// from: https://github.com/eemeli/yaml/blob/27bd4faa79c4ff01410c8c6fcf8baa8586769320/src/schema/yaml-1.1/timestamp.ts#L6
export function parseSexagesimal<B extends boolean>(str: string, asBigInt?: B) {
  const sign = str[0];
  const parts = sign === '-' || sign === '+' ? str.substring(1) : str;
  const num = (n: number | string) =>
    asBigInt ? (BigInt(n) as unknown as number) : Number(n);
  const res = parts
    .replace(/_/g, '')
    .split(':')
    .reduce((res, p) => res * num(60) + num(p), num(0));
  return (sign === '-' ? num(-1) * res : res) as B extends true
    ? number | bigint
    : number;
}

////////////////////////////////////////////////////////////////////////////////

// todo: merge time regexes so that there aren't multiple implementations floating around

const YAML_DATE_REGEXP = new RegExp(
  '^([0-9][0-9][0-9][0-9])'          + // [1] year
  '-([0-9][0-9])'                    + // [2] month
  '-([0-9][0-9])$');                   // [3] day

const YAML_TIMESTAMP_REGEXP = new RegExp(
  '^([0-9][0-9][0-9][0-9])'          + // [1] year
  '-([0-9][0-9]?)'                   + // [2] month
  '-([0-9][0-9]?)'                   + // [3] day
  '(?:[Tt]|[ \\t]+)'                 + // ...
  '([0-9][0-9]?)'                    + // [4] hour
  ':([0-9][0-9])'                    + // [5] minute
  ':([0-9][0-9])'                    + // [6] second
  '(?:\\.([0-9]*))?'                 + // [7] fraction
  '(?:[ \\t]*(Z|([-+])([0-9][0-9]?)' + // [8] tz [9] tz_sign [10] tz_hour
  '(?::([0-9][0-9]))?))?$');           // [11] tz_minute

// from js-yaml: https://github.com/nodeca/js-yaml/blob/master/lib/type/timestamp.js#L29
export function constructYamlTimestamp(data: any): Date {
  let year     : number = 0;
  let month    : number = 0;
  let day      : number = 0;
  let hour     : number = 0;
  let minute   : number = 0;
  let second   : number = 0;
  let fraction : number | string = 0;
  let delta    : number | string | Date | null = null;
  let tz_hour  : number;
  let tz_minute: number;

  // note: if this regex causes problems, use js-yaml's:
  // YAML_DATE_REGEXP     : https://github.com/nodeca/js-yaml/blob/master/lib/type/timestamp.js#L5
  // YAML_TIMESTAMP_REGEXP: https://github.com/nodeca/js-yaml/blob/master/lib/type/timestamp.js#L10
  // const match : RegExpMatchArray | null = VAL.TIMESTAMP.exec(data);
  // if (match === null) throw new Error('Date resolve error');
  let match : RegExpMatchArray | null = YAML_DATE_REGEXP.exec(data);
  if (match === null) match = YAML_TIMESTAMP_REGEXP.exec(data);
  if (match === null) throw new Error('Date resolve error');

  // match: [1] year [2] month [3] day

  year = +(match[1]);
  month = +(match[2]) - 1; // JS month starts with 0
  day = +(match[3]);

  if (!match[4]) { // no hour
    return new Date(Date.UTC(year, month, day));
  }

  // match: [4] hour [5] minute [6] second [7] fraction

  hour = +(match[4]);
  minute = +(match[5]);
  second = +(match[6]);

  if (match[7]) {
    fraction = match[7].slice(0, 3);
    while (fraction.length < 3) { // milli-seconds
      fraction += '0';
    }
    fraction = +fraction;
  }

  // match: [8] tz [9] tz_sign [10] tz_hour [11] tz_minute

  if (match[9]) {
    tz_hour = +(match[10]);
    tz_minute = +(match[11] || 0);
    delta = (tz_hour * 60 + tz_minute) * 60000; // delta in mili-seconds
    if (match[9] === '-') delta = -delta;
  }

  const date: Date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));

  if (delta) date.setTime(date.getTime() - delta);

  return date;
}
