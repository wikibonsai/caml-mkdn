/*
 * Invalid / edge value cases. CAML type resolution is TOTAL: a scalar that does not
 * cleanly match a recognized type (null / bool / int / float / time) falls back to
 * `string` — never throws, never silently produces wrong data. This mirrors YAML
 * (an unmatched scalar resolves to `str`).
 *
 * Dates follow js-yaml: only the strict 2-digit date form (`2025-01-30`) is a `time`.
 * Unpadded input (`2025-1-30`) is NOT a date -> `string`. The one deliberate divergence
 * from YAML is out-of-range values (`2025-13-45`, `2025-02-30`): YAML silently rolls them
 * over via `Date`; CAML rejects them to `string` to avoid silent bad data.
 */
import type { CamlTestCase } from '../types';


export const camlInvalidCases: CamlTestCase[] = [
  // date: out-of-range -> string (no such date; YAML would silently roll over)
  {
    descr: 'prefixed; single; date; invalid; month out of range',
    mkdn: ':attribute::2025-13-45\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-item">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">2025-13-45</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': '2025-13-45',
      },
      value: {
        'attribute': '2025-13-45',
      },
      parse: {
        'attribute': [{
          type: 'string',
          string: '2025-13-45',
          value: '2025-13-45',
        }],
      },
    },
  },
  {
    descr: 'prefixed; single; date; invalid; day out of range',
    mkdn: ':attribute::2025-02-30\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-item">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">2025-02-30</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': '2025-02-30',
      },
      value: {
        'attribute': '2025-02-30',
      },
      parse: {
        'attribute': [{
          type: 'string',
          string: '2025-02-30',
          value: '2025-02-30',
        }],
      },
    },
  },
  {
    descr: 'prefixed; single; date; invalid; month zero',
    mkdn: ':attribute::2025-00-01\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-item">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">2025-00-01</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': '2025-00-01',
      },
      value: {
        'attribute': '2025-00-01',
      },
      parse: {
        'attribute': [{
          type: 'string',
          string: '2025-00-01',
          value: '2025-00-01',
        }],
      },
    },
  },
  // date: non-zero-padded -> string (strict 2-digit, js-yaml parity; unpadded is not a date)
  {
    descr: 'prefixed; single; date; invalid; non-zero-padded',
    mkdn: ':attribute::2025-1-30\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-item">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">2025-1-30</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': '2025-1-30',
      },
      value: {
        'attribute': '2025-1-30',
      },
      parse: {
        'attribute': [{
          type: 'string',
          string: '2025-1-30',
          value: '2025-1-30',
        }],
      },
    },
  },
  {
    descr: 'prefixed; single; date; invalid; non-zero-padded month and day',
    mkdn: ':attribute::2025-1-1\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-item">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">2025-1-1</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': '2025-1-1',
      },
      value: {
        'attribute': '2025-1-1',
      },
      parse: {
        'attribute': [{
          type: 'string',
          string: '2025-1-1',
          value: '2025-1-1',
        }],
      },
    },
  },
  {
    descr: 'prefixed; single; date; zero-padded',
    mkdn: ':attribute::2025-01-30\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-item">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr time attribute">2025-01-30</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': '2025-01-30',
      },
      value: {
        'attribute': new Date('2025-01-30T00:00:00.000Z'),
      },
      parse: {
        'attribute': [{
          type: 'time',
          string: '2025-01-30',
          value: new Date('2025-01-30T00:00:00.000Z'),
        }],
      },
    },
  },
  // int: invalid -> string
  {
    descr: 'prefixed; single; int; invalid; incomplete hex',
    mkdn: ':attribute::0x\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-item">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">0x</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': '0x',
      },
      value: {
        'attribute': '0x',
      },
      parse: {
        'attribute': [{
          type: 'string',
          string: '0x',
          value: '0x',
        }],
      },
    },
  },
  {
    descr: 'prefixed; single; int; invalid; non-hex digits',
    mkdn: ':attribute::0xZZ\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-item">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">0xZZ</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': '0xZZ',
      },
      value: {
        'attribute': '0xZZ',
      },
      parse: {
        'attribute': [{
          type: 'string',
          string: '0xZZ',
          value: '0xZZ',
        }],
      },
    },
  },
  {
    descr: 'prefixed; single; int; invalid; non-octal digit',
    mkdn: ':attribute::0o8\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-item">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">0o8</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': '0o8',
      },
      value: {
        'attribute': '0o8',
      },
      parse: {
        'attribute': [{
          type: 'string',
          string: '0o8',
          value: '0o8',
        }],
      },
    },
  },
  {
    descr: 'prefixed; single; int; invalid; trailing letters',
    mkdn: ':attribute::12abc\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-item">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">12abc</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': '12abc',
      },
      value: {
        'attribute': '12abc',
      },
      parse: {
        'attribute': [{
          type: 'string',
          string: '12abc',
          value: '12abc',
        }],
      },
    },
  },
  // float: invalid -> string
  {
    descr: 'prefixed; single; float; invalid; two decimal points',
    mkdn: ':attribute::1.2.3\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-item">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">1.2.3</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': '1.2.3',
      },
      value: {
        'attribute': '1.2.3',
      },
      parse: {
        'attribute': [{
          type: 'string',
          string: '1.2.3',
          value: '1.2.3',
        }],
      },
    },
  },
  {
    descr: 'prefixed; single; float; invalid; bare exponent',
    mkdn: ':attribute::1e\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-item">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">1e</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': '1e',
      },
      value: {
        'attribute': '1e',
      },
      parse: {
        'attribute': [{
          type: 'string',
          string: '1e',
          value: '1e',
        }],
      },
    },
  },
  {
    descr: 'prefixed; single; float; invalid; double dot',
    mkdn: ':attribute::1..2\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-item">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">1..2</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': '1..2',
      },
      value: {
        'attribute': '1..2',
      },
      parse: {
        'attribute': [{
          type: 'string',
          string: '1..2',
          value: '1..2',
        }],
      },
    },
  },
  // bool: invalid -> string
  {
    descr: 'prefixed; single; bool; invalid; typo',
    mkdn: ':attribute::treu\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-item">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">treu</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': 'treu',
      },
      value: {
        'attribute': 'treu',
      },
      parse: {
        'attribute': [{
          type: 'string',
          string: 'treu',
          value: 'treu',
        }],
      },
    },
  },
  {
    descr: 'prefixed; single; bool; invalid; near-word',
    mkdn: ':attribute::truthy\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<div class="attr-item">\n'
        + '<dt>attribute</dt>\n'
        + '<dd><span class="attr string attribute">truthy</span></dd>\n'
        + '</div>\n'
        + '</dl>\n'
        + '</aside>\n',
    data: {
      string: {
        'attribute': 'truthy',
      },
      value: {
        'attribute': 'truthy',
      },
      parse: {
        'attribute': [{
          type: 'string',
          string: 'truthy',
          value: 'truthy',
        }],
      },
    },
  },
];
