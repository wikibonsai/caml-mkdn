/*
 * note: newlines are added to the end of test values to illustrate that they
 * really are 'block' or 'flow' elements.
 */
import type { CamlTestCase } from '../types';


export const camlWikiRefsCases: CamlTestCase[] = [
  {
    descr: 'no val; prefixed; single; [[wikilinks]]; should not be processed here (see markdown-it-wikilinks)',
    mkdn: ': attribute ::\n\n[[wikilink]]\n',
    html: '<p>: attribute ::</p>\n<p>[[wikilink]]</p>\n',
    strData: {},
    valData: {},
    parseData: {},
  },
  {
    descr: '[[wikirefs]]; prefixed; single; [[wikilinks]]; should not interfere with empty string processing',
    mkdn: ': attribute :: \'\'\n\n[[wikilink]]\n',
    html:
`<aside class="attrbox">
<span class="attrbox-title">Attributes</span>
<dl>
<dt>attribute</dt>
<dd><span class="attr string attribute">''</span></dd>
</dl>
</aside>
<p>[[wikilink]]</p>
`,
    strData: {
      'attribute': '\'\'',
    },
    valData: {
      'attribute': '\'\'',
    },
    parseData: {
      'attribute': [{
        type: 'string',
        string: '\'\'',
        value: '\'\'',
      }],
    },
  },
  {
    descr: '[[wikirefs]]; unprefixed; single; [[wikilinks]]; should not be processed here (see markdown-it-wikilinks)',
    mkdn: ' attribute ::\n\n[[wikilink]]\n',
    html: '<p>attribute ::</p>\n<p>[[wikilink]]</p>\n',
    strData: {},
    valData: {},
    parseData:  {},
  },
  {
    descr: '[[wikirefs]]; unprefixed; single; [[wikilinks]]; should not interfere with empty string processing',
    mkdn: 'attribute :: \'\'\n\n[[wikilink]]\n',
    html:
`<aside class="attrbox">
<span class="attrbox-title">Attributes</span>
<dl>
<dt>attribute</dt>
<dd><span class="attr string attribute">''</span></dd>
</dl>
</aside>
<p>[[wikilink]]</p>
`,
    strData: {
      'attribute': '\'\'',
    },
    valData: {
      'attribute': '\'\'',
    },
    parseData: {
      'attribute': [{
        type: 'string',
        string: '\'\'',
        value: '\'\'',
      }],
    },
  },
];
