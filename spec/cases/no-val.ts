/*
 * note: newlines are added to the end of test values to illustrate that they
 * really are 'block' or 'flow' elements.
 */
import type { CamlTestCase } from '../types';


export const camlNoValCases: CamlTestCase[] = [
  // no caml value
  {
    descr: 'no val; prefixed; single; no caml value; none is not allowed',
    mkdn: ':attribute::\n',
    html: '<p>:attribute::</p>\n',
    strData: {},
    valData:  {},
    parseData: {},
  },
  {
    descr: 'no val; unprefixed; single; no caml value; none is not allowed (',
    mkdn: 'attribute::\n',
    html: '<p>attribute::</p>\n',
    strData: {},
    valData:  {},
    parseData:  {},
  },
];
