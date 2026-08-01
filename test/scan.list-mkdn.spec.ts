import assert from 'node:assert/strict';

import * as caml from '../src';


describe('scan() -- list-mkdn', () => {

  // wikirefs-aware: these suites include `[[x]]` wiki-value cases (type 'wiki'), so
  // scan runs with wikirefs:true. primitive cases are unaffected (no `[[x]]`).
  const testScan = (params: any) => (): void => {
    assert.deepStrictEqual(caml.scan(params.mkdn, { wikirefs: true }), params.data);
  };

  describe('null', () => {

    it('none is not allowed', testScan({
      mkdn: 'attr::\n- \n',
      data: [],
    }));

    it('lowercase', testScan({
      mkdn: 'attr::\n- null\n- null\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'null', val: { text: 'null', start: 9 } },
            { type: 'null', val: { text: 'null', start: 16 } },
          ],
        },
      ],
    }));

    it('camelCase', testScan({
      mkdn: 'attr::\n- Null\n- Null\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'null', val: { text: 'Null', start: 9 } },
            { type: 'null', val: { text: 'Null', start: 16 } },
          ],
        },
      ],
    }));

    it('uppercase', testScan({
      mkdn: 'attr::\n- NULL\n- NULL\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'null', val: { text: 'NULL', start: 9 } },
            { type: 'null', val: { text: 'NULL', start: 16 } },
          ],
        },
      ],
    }));

  });

  describe('bool', () => {

    it('lowercase', testScan({
      mkdn: 'attr::\n- true\n- false\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'bool', val: { text: 'true', start: 9 } },
            { type: 'bool', val: { text: 'false', start: 16 } },
          ],
        },
      ],
    }));

    it('camelCase', testScan({
      mkdn: 'attr::\n- True\n- False\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'bool', val: { text: 'True', start: 9 } },
            { type: 'bool', val: { text: 'False', start: 16 } },
          ],
        },
      ],
    }));

    it('uppercase', testScan({
      mkdn: 'attr::\n- TRUE\n- FALSE\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'bool', val: { text: 'TRUE', start: 9 } },
            { type: 'bool', val: { text: 'FALSE', start: 16 } },
          ],
        },
      ],
    }));

  });

  describe('int', () => {

    it('canonical', testScan({
      mkdn: 'attr::\n- 10\n- -123\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'int', val: { text: '10', start: 9 } },
            { type: 'int', val: { text: '-123', start: 14 } },
          ],
        },
      ],
    }));

    it('octal', testScan({
      mkdn: 'attr::\n- 0o10\n- 0o123\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'int', val: { text: '0o10', start: 9 } },
            { type: 'int', val: { text: '0o123', start: 16 } },
          ],
        },
      ],
    }));

    it('hexadecimal', testScan({
      mkdn: 'attr::\n- 0xC\n- 0x14\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'int', val: { text: '0xC', start: 9 } },
            { type: 'int', val: { text: '0x14', start: 15 } },
          ],
        },
      ],
    }));

  });

  describe('float', () => {

    it('canonical', testScan({
      mkdn: 'attr::\n- 1.23015\n- -1.23015\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'float', val: { text: '1.23015', start: 9 } },
            { type: 'float', val: { text: '-1.23015', start: 19 } },
          ],
        },
      ],
    }));

    it('exp -- exponential', testScan({
      mkdn: 'attr::\n- 12.3015e+02\n- 12.3015e-02\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'float', val: { text: '12.3015e+02', start: 9 } },
            { type: 'float', val: { text: '12.3015e-02', start: 23 } },
          ],
        },
      ],
    }));

    it('nan -- not a number', testScan({
      mkdn: 'attr::\n- .NaN\n- .nan\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'float', val: { text: '.NaN', start: 9 } },
            { type: 'float', val: { text: '.nan', start: 16 } },
          ],
        },
      ],
    }));

  });

  describe('time', () => {

    it('canonical', testScan({
      mkdn: 'attr::\n- 2001-12-15T02:59:43.1Z\n- 2022-12-15T02:59:43.1Z\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'time', val: { text: '2001-12-15T02:59:43.1Z', start: 9 } },
            { type: 'time', val: { text: '2022-12-15T02:59:43.1Z', start: 34 } },
          ],
        },
      ],
    }));

    it('iso8601', testScan({
      mkdn: 'attr::\n- 2001-12-14t21:59:43.10-05:00\n- 2022-12-14t21:59:43.10-05:00\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'time', val: { text: '2001-12-14t21:59:43.10-05:00', start: 9 } },
            { type: 'time', val: { text: '2022-12-14t21:59:43.10-05:00', start: 40 } },
          ],
        },
      ],
    }));

    it('spaced', testScan({
      mkdn: 'attr::\n- 2001-12-14 21:59:43.10 -5\n- 2022-12-14 21:59:43.10 -5\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'time', val: { text: '2001-12-14 21:59:43.10 -5', start: 9 } },
            { type: 'time', val: { text: '2022-12-14 21:59:43.10 -5', start: 37 } },
          ],
        },
      ],
    }));

    it('date only', testScan({
      mkdn: 'attr::\n- 2001-12-14\n- 2022-12-14\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'time', val: { text: '2001-12-14', start: 9 } },
            { type: 'time', val: { text: '2022-12-14', start: 22 } },
          ],
        },
      ],
    }));

    it('int', testScan({
      mkdn: 'attr::\n- +12:00\n- 12:00\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'time', val: { text: '+12:00', start: 9 } },
            { type: 'time', val: { text: '12:00', start: 18 } },
          ],
        },
      ],
    }));

    it('float', testScan({
      mkdn: 'attr::\n- +12:00.123\n- 12:00.123\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'time', val: { text: '+12:00.123', start: 9 } },
            { type: 'time', val: { text: '12:00.123', start: 22 } },
          ],
        },
      ],
    }));

  });

  describe('string', () => {

    it('single-line; w/out whitespace', testScan({
      mkdn: 'attr::\n- value-w/out-whitespace\n- and-another\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'string', val: { text: 'value-w/out-whitespace', start: 9 } },
            { type: 'string', val: { text: 'and-another', start: 34 } },
          ],
        },
      ],
    }));

    it('single-line, w/ whitespace', testScan({
      mkdn: 'attr::\n- value with whitespace\n-  and another\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'string', val: { text: 'value with whitespace', start: 9 } },
            { type: 'string', val: { text: 'and another', start: 34 } },
          ],
        },
      ],
    }));

    it('single-line, w/ colon prefix', testScan({
      mkdn: ':attr::\n- value with whitespace\n-  and another\n',
      data: [
        {
          key: { text: 'attr', start: 1 },
          vals: [
            { type: 'string', val: { text: 'value with whitespace', start: 10 } },
            { type: 'string', val: { text: 'and another', start: 35 } },
          ],
        },
      ],
    }));

    it('single-line, w/ colon prefix; w/ whitespace pad', testScan({
      mkdn: ': attr  ::\n- value with whitespace\n-  and another\n',
      data: [
        {
          key: { text: 'attr  ', start: 2 },
          vals: [
            { type: 'string', val: { text: 'value with whitespace', start: 13 } },
            { type: 'string', val: { text: 'and another', start: 38 } },
          ],
        },
      ],
    }));

    it('single-line; w/ duplicate values', testScan({
      mkdn: 'attr::\n- test\n- test\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'string', val: { text: 'test', start: 9 } },
            { type: 'string', val: { text: 'test', start: 16 } },
          ],
        },
      ],
    }));

  });

  describe('wikilinks', () => {

    it('[[wikilinks]] resolved as wiki type', testScan({
      mkdn: 'attr::\n- [[wikilink]]\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'wiki', val: { text: '[[wikilink]]', start: 9 } },
          ],
        },
      ],
    }));

  });


  ////
  // mixed wiki + primitive types (relocated from scan.mixwiki.spec.ts)

  describe('mixed wiki + primitive types', () => {

    describe('mkdn list; unprefixed', () => {

      it('wiki + string', testScan({
        mkdn: 'attr::\n'
            + '- [[concept]]\n'
            + '- hello\n',
        data: [
          {
            key: { text: 'attr', start: 0 },
            vals: [
              { type: 'wiki',   val: { text: '[[concept]]', start: 9 } },
              { type: 'string', val: { text: 'hello', start: 23 } },
            ],
          },
        ],
      }));

      it('string + wiki', testScan({
        mkdn: 'attr::\n'
            + '- hello\n'
            + '- [[concept]]\n',
        data: [
          {
            key: { text: 'attr', start: 0 },
            vals: [
              { type: 'string', val: { text: 'hello', start: 9 } },
              { type: 'wiki',   val: { text: '[[concept]]', start: 17 } },
            ],
          },
        ],
      }));

      it('wiki + int', testScan({
        mkdn: 'attr::\n'
            + '- [[concept]]\n'
            + '- 42\n',
        data: [
          {
            key: { text: 'attr', start: 0 },
            vals: [
              { type: 'wiki', val: { text: '[[concept]]', start: 9 } },
              { type: 'int',  val: { text: '42', start: 23 } },
            ],
          },
        ],
      }));

      it('wiki + bool', testScan({
        mkdn: 'attr::\n'
            + '- [[concept]]\n'
            + '- true\n',
        data: [
          {
            key: { text: 'attr', start: 0 },
            vals: [
              { type: 'wiki', val: { text: '[[concept]]', start: 9 } },
              { type: 'bool', val: { text: 'true', start: 23 } },
            ],
          },
        ],
      }));

      it('wiki + string + int', testScan({
        mkdn: 'attr::\n'
            + '- [[concept]]\n'
            + '- hello\n'
            + '- 42\n',
        data: [
          {
            key: { text: 'attr', start: 0 },
            vals: [
              { type: 'wiki',   val: { text: '[[concept]]', start: 9 } },
              { type: 'string', val: { text: 'hello', start: 23 } },
              { type: 'int',    val: { text: '42', start: 31 } },
            ],
          },
        ],
      }));

      it('multiple wiki + primitive', testScan({
        mkdn: 'attr::\n'
            + '- [[link-a]]\n'
            + '- [[link-b]]\n'
            + '- hello\n',
        data: [
          {
            key: { text: 'attr', start: 0 },
            vals: [
              { type: 'wiki',   val: { text: '[[link-a]]', start: 9 } },
              { type: 'wiki',   val: { text: '[[link-b]]', start: 22 } },
              { type: 'string', val: { text: 'hello', start: 35 } },
            ],
          },
        ],
      }));

      it('wiki + null', testScan({
        mkdn: 'attr::\n'
            + '- [[concept]]\n'
            + '- null\n',
        data: [
          {
            key: { text: 'attr', start: 0 },
            vals: [
              { type: 'wiki', val: { text: '[[concept]]', start: 9 } },
              { type: 'null', val: { text: 'null', start: 23 } },
            ],
          },
        ],
      }));

      it('wiki + int_hex', testScan({
        mkdn: 'attr::\n'
            + '- [[concept]]\n'
            + '- 0xFF\n',
        data: [
          {
            key: { text: 'attr', start: 0 },
            vals: [
              { type: 'wiki', val: { text: '[[concept]]', start: 9 } },
              { type: 'int',  val: { text: '0xFF', start: 23 } },
            ],
          },
        ],
      }));

      it('wiki + int_oct', testScan({
        mkdn: 'attr::\n'
            + '- [[concept]]\n'
            + '- 0o77\n',
        data: [
          {
            key: { text: 'attr', start: 0 },
            vals: [
              { type: 'wiki', val: { text: '[[concept]]', start: 9 } },
              { type: 'int',  val: { text: '0o77', start: 23 } },
            ],
          },
        ],
      }));

      it('wiki + float', testScan({
        mkdn: 'attr::\n'
            + '- [[concept]]\n'
            + '- 3.14\n',
        data: [
          {
            key: { text: 'attr', start: 0 },
            vals: [
              { type: 'wiki',  val: { text: '[[concept]]', start: 9 } },
              { type: 'float', val: { text: '3.14', start: 23 } },
            ],
          },
        ],
      }));

      it('wiki + float_exp', testScan({
        mkdn: 'attr::\n'
            + '- [[concept]]\n'
            + '- 1.0e3\n',
        data: [
          {
            key: { text: 'attr', start: 0 },
            vals: [
              { type: 'wiki',  val: { text: '[[concept]]', start: 9 } },
              { type: 'float', val: { text: '1.0e3', start: 23 } },
            ],
          },
        ],
      }));

      it('wiki + float_nan', testScan({
        mkdn: 'attr::\n'
            + '- [[concept]]\n'
            + '- .NaN\n',
        data: [
          {
            key: { text: 'attr', start: 0 },
            vals: [
              { type: 'wiki',  val: { text: '[[concept]]', start: 9 } },
              { type: 'float', val: { text: '.NaN', start: 23 } },
            ],
          },
        ],
      }));

      it('wiki + timestamp', testScan({
        mkdn: 'attr::\n'
            + '- [[concept]]\n'
            + '- 2026-05-23\n',
        data: [
          {
            key: { text: 'attr', start: 0 },
            vals: [
              { type: 'wiki', val: { text: '[[concept]]', start: 9 } },
              { type: 'time', val: { text: '2026-05-23', start: 23 } },
            ],
          },
        ],
      }));

    });

    describe('mkdn list; prefixed', () => {

      it('wiki + string', testScan({
        mkdn: ':attr::\n'
            + '- [[concept]]\n'
            + '- hello\n',
        data: [
          {
            key: { text: 'attr', start: 1 },
            vals: [
              { type: 'wiki',   val: { text: '[[concept]]', start: 10 } },
              { type: 'string', val: { text: 'hello', start: 24 } },
            ],
          },
        ],
      }));

      it('string + wiki', testScan({
        mkdn: ':attr::\n'
            + '- hello\n'
            + '- [[concept]]\n',
        data: [
          {
            key: { text: 'attr', start: 1 },
            vals: [
              { type: 'string', val: { text: 'hello', start: 10 } },
              { type: 'wiki',   val: { text: '[[concept]]', start: 18 } },
            ],
          },
        ],
      }));

      it('wiki + int', testScan({
        mkdn: ':attr::\n'
            + '- [[concept]]\n'
            + '- 42\n',
        data: [
          {
            key: { text: 'attr', start: 1 },
            vals: [
              { type: 'wiki', val: { text: '[[concept]]', start: 10 } },
              { type: 'int',  val: { text: '42', start: 24 } },
            ],
          },
        ],
      }));

      it('wiki + bool', testScan({
        mkdn: ':attr::\n'
            + '- [[concept]]\n'
            + '- true\n',
        data: [
          {
            key: { text: 'attr', start: 1 },
            vals: [
              { type: 'wiki', val: { text: '[[concept]]', start: 10 } },
              { type: 'bool', val: { text: 'true', start: 24 } },
            ],
          },
        ],
      }));

      it('wiki + string + int', testScan({
        mkdn: ':attr::\n'
            + '- [[concept]]\n'
            + '- hello\n'
            + '- 42\n',
        data: [
          {
            key: { text: 'attr', start: 1 },
            vals: [
              { type: 'wiki',   val: { text: '[[concept]]', start: 10 } },
              { type: 'string', val: { text: 'hello', start: 24 } },
              { type: 'int',    val: { text: '42', start: 32 } },
            ],
          },
        ],
      }));

      it('multiple wiki + primitive', testScan({
        mkdn: ':attr::\n'
            + '- [[link-a]]\n'
            + '- [[link-b]]\n'
            + '- hello\n',
        data: [
          {
            key: { text: 'attr', start: 1 },
            vals: [
              { type: 'wiki',   val: { text: '[[link-a]]', start: 10 } },
              { type: 'wiki',   val: { text: '[[link-b]]', start: 23 } },
              { type: 'string', val: { text: 'hello', start: 36 } },
            ],
          },
        ],
      }));

    });

  });

});
