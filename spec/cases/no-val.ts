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
    data: {
      string: {},
      value: {},
      parse: {},
    },
  },
  {
    descr: 'no val; unprefixed; single; no caml value; none is not allowed',
    mkdn: 'attribute::\n',
    html: '<p>attribute::</p>\n',
    data: {
      string: {},
      value: {},
      parse: {},
    },
  },
  // no-val
  {
    descr: 'no val; unprefixed; single; immediately before thematic break (setext); none is not allowed',
    mkdn: 'attribute::\n---\n',
    html: '<h2>attribute::</h2>\n',
    data: {
      string: {},
      value: {},
      parse: {},
    },
  },
  {
    descr: 'no val; prefixed; single; immediately before thematic break (setext); none is not allowed',
    mkdn: ':attribute::\n---\n',
    html: '<h2>:attribute::</h2>\n',
    data: {
      string: {},
      value: {},
      parse: {},
    },
  },
  {
    descr: 'no val; unprefixed; single; immediately before blockquote; none is not allowed',
    mkdn: 'attribute::\n> quote text\n',
    html: '<p>attribute::</p>\n<blockquote>\n<p>quote text</p>\n</blockquote>\n',
    data: {
      string: {},
      value: {},
      parse: {},
    },
  },
  {
    descr: 'no val; prefixed; single; immediately before blockquote; none is not allowed',
    mkdn: ':attribute::\n> quote text\n',
    html: '<p>:attribute::</p>\n<blockquote>\n<p>quote text</p>\n</blockquote>\n',
    data: {
      string: {},
      value: {},
      parse: {},
    },
  },
];
