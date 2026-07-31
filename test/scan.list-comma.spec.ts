import assert from 'node:assert/strict';

import * as caml from '../src';


describe('scan() -- list-comma', () => {

  const testScan = (params: any) => (): void => {
    assert.deepStrictEqual(caml.scan(params.mkdn), params.data);
  };

  describe('null', () => {

    it('lowercase', testScan({
      mkdn: 'attr::null, null\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'null', val: { text: 'null', start: 6 } },
            { type: 'null', val: { text: 'null', start: 12 } },
          ],
        },
      ],
    }));

    it('camelCase', testScan({
      mkdn: 'attr::Null, Null\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'null', val: { text: 'Null', start: 6 } },
            { type: 'null', val: { text: 'Null', start: 12 } },
          ],
        },
      ],
    }));

    it('uppercase', testScan({
      mkdn: 'attr::NULL, NULL\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'null', val: { text: 'NULL', start: 6 } },
            { type: 'null', val: { text: 'NULL', start: 12 } },
          ],
        },
      ],
    }));

  });

  describe('bool', () => {

    it('lowercase', testScan({
      mkdn: 'attr::true, false\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'bool', val: { text: 'true', start: 6 } },
            { type: 'bool', val: { text: 'false', start: 12 } },
          ],
        },
      ],
    }));

    it('camelCase', testScan({
      mkdn: 'attr::True, False\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'bool', val: { text: 'True', start: 6 } },
            { type: 'bool', val: { text: 'False', start: 12 } },
          ],
        },
      ],
    }));

    it('uppercase', testScan({
      mkdn: 'attr::TRUE, FALSE\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'bool', val: { text: 'TRUE', start: 6 } },
            { type: 'bool', val: { text: 'FALSE', start: 12 } },
          ],
        },
      ],
    }));

  });

  describe('int', () => {

    it('canonical', testScan({
      mkdn: 'attr::10, -123\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'int', val: { text: '10', start: 6 } },
            { type: 'int', val: { text: '-123', start: 10 } },
          ],
        },
      ],
    }));

    it('octal', testScan({
      mkdn: 'attr::0o10, 0o123\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'int', val: { text: '0o10', start: 6 } },
            { type: 'int', val: { text: '0o123', start: 12 } },
          ],
        },
      ],
    }));

    it('hexadecimal', testScan({
      mkdn: 'attr::0xC, 0x14\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'int', val: { text: '0xC', start: 6 } },
            { type: 'int', val: { text: '0x14', start: 11 } },
          ],
        },
      ],
    }));

  });

  describe('float', () => {

    it('canonical', testScan({
      mkdn: 'attr::1.23015, -1.23015\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'float', val: { text: '1.23015', start: 6 } },
            { type: 'float', val: { text: '-1.23015', start: 15 } },
          ],
        },
      ],
    }));

    it('exp -- exponential', testScan({
      mkdn: 'attr::12.3015e+02, 12.3015e-02\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'float', val: { text: '12.3015e+02', start: 6 } },
            { type: 'float', val: { text: '12.3015e-02', start: 19 } },
          ],
        },
      ],
    }));

    it('nan -- not a number', testScan({
      mkdn: 'attr::.NaN, .nan\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'float', val: { text: '.NaN', start: 6 } },
            { type: 'float', val: { text: '.nan', start: 12 } },
          ],
        },
      ],
    }));

  });

  describe('time', () => {

    it('canonical', testScan({
      mkdn: 'attr::2001-12-15T02:59:43.1Z, 2022-12-15T02:59:43.1Z\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'time', val: { text: '2001-12-15T02:59:43.1Z', start: 6 } },
            { type: 'time', val: { text: '2022-12-15T02:59:43.1Z', start: 30 } },
          ],
        },
      ],
    }));

    it('iso8601', testScan({
      mkdn: 'attr::2001-12-14t21:59:43.10-05:00, 2022-12-14t21:59:43.10-05:00\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'time', val: { text: '2001-12-14t21:59:43.10-05:00', start: 6 } },
            { type: 'time', val: { text: '2022-12-14t21:59:43.10-05:00', start: 36 } },
          ],
        },
      ],
    }));

    it('spaced', testScan({
      mkdn: 'attr::2001-12-14 21:59:43.10 -5, 2022-12-14 21:59:43.10 -5\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'time', val: { text: '2001-12-14 21:59:43.10 -5', start: 6 } },
            { type: 'time', val: { text: '2022-12-14 21:59:43.10 -5', start: 33 } },
          ],
        },
      ],
    }));

    it('date only', testScan({
      mkdn: 'attr::2001-12-14, 2022-12-14\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'time', val: { text: '2001-12-14', start: 6 } },
            { type: 'time', val: { text: '2022-12-14', start: 18 } },
          ],
        },
      ],
    }));

    it('int', testScan({
      mkdn: 'attr::+12:00, 12:00\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'time', val: { text: '+12:00', start: 6 } },
            { type: 'time', val: { text: '12:00', start: 14 } },
          ],
        },
      ],
    }));

    it('float', testScan({
      mkdn: 'attr::+12:00.123, 12:00.123\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'time', val: { text: '+12:00.123', start: 6 } },
            { type: 'time', val: { text: '12:00.123', start: 18 } },
          ],
        },
      ],
    }));

  });

  describe('string', () => {

    it('single-line; w/out whitespace', testScan({
      mkdn: 'attr::value-w/out-whitespace, and-another\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'string', val: { text: 'value-w/out-whitespace', start: 6 } },
            { type: 'string', val: { text: 'and-another', start: 30 } },
          ],
        },
      ],
    }));

    it('single-line, w/ whitespace', testScan({
      mkdn: 'attr::value with whitespace, and another\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'string', val: { text: 'value with whitespace', start: 6 } },
            { type: 'string', val: { text: 'and another', start: 29 } },
          ],
        },
      ],
    }));

    it('single-line, w/ colon prefix', testScan({
      mkdn: ':attr::value with whitespace, and another\n',
      data: [
        {
          key: { text: 'attr', start: 1 },
          vals: [
            { type: 'string', val: { text: 'value with whitespace', start: 7 } },
            { type: 'string', val: { text: 'and another', start: 30 } },
          ],
        },
      ],
    }));

    it('single-line, w/ colon prefix; w/ whitespace pad', testScan({
      mkdn: ': attr  ::value with whitespace, and another\n',
      data: [
        {
          key: { text: 'attr', start: 2 },
          vals: [
            { type: 'string', val: { text: 'value with whitespace', start: 10 } },
            { type: 'string', val: { text: 'and another', start: 33 } },
          ],
        },
      ],
    }));

    it('single-line, w/ duplicate values', testScan({
      mkdn: 'attr::test,test,test\n',
      data: [
        {
          key: { text: 'attr', start: 0 },
          vals: [
            { type: 'string', val: { text: 'test', start: 6 } },
            { type: 'string', val: { text: 'test', start: 11 } },
            { type: 'string', val: { text: 'test', start: 16 } },
          ],
        },
      ],
    }));

  });


  ////
  // mixed wiki + primitive types (relocated from scan.mixwiki.spec.ts)

  describe('mixed wiki + primitive types', () => {

    describe('comma list; unprefixed', () => {

      it('wiki + string', testScan({
        mkdn: 'attr :: [[concept]], hello\n',
        data: [
          {
            key: { text: 'attr', start: 0 },
            vals: [
              { type: 'wiki',   val: { text: '[[concept]]', start: 8 } },
              { type: 'string', val: { text: 'hello', start: 21 } },
            ],
          },
        ],
      }));

      it('string + wiki', testScan({
        mkdn: 'attr :: hello, [[concept]]\n',
        data: [
          {
            key: { text: 'attr', start: 0 },
            vals: [
              { type: 'string', val: { text: 'hello', start: 8 } },
              { type: 'wiki',   val: { text: '[[concept]]', start: 15 } },
            ],
          },
        ],
      }));

      it('wiki + int', testScan({
        mkdn: 'attr :: [[concept]], 42\n',
        data: [
          {
            key: { text: 'attr', start: 0 },
            vals: [
              { type: 'wiki', val: { text: '[[concept]]', start: 8 } },
              { type: 'int',  val: { text: '42', start: 21 } },
            ],
          },
        ],
      }));

      it('wiki + bool', testScan({
        mkdn: 'attr :: [[concept]], true\n',
        data: [
          {
            key: { text: 'attr', start: 0 },
            vals: [
              { type: 'wiki', val: { text: '[[concept]]', start: 8 } },
              { type: 'bool', val: { text: 'true', start: 21 } },
            ],
          },
        ],
      }));

      it('wiki + string + int', testScan({
        mkdn: 'attr :: [[concept]], hello, 42\n',
        data: [
          {
            key: { text: 'attr', start: 0 },
            vals: [
              { type: 'wiki',   val: { text: '[[concept]]', start: 8 } },
              { type: 'string', val: { text: 'hello', start: 21 } },
              { type: 'int',    val: { text: '42', start: 28 } },
            ],
          },
        ],
      }));

      it('multiple wiki + primitive', testScan({
        mkdn: 'attr :: [[link-a]], [[link-b]], hello\n',
        data: [
          {
            key: { text: 'attr', start: 0 },
            vals: [
              { type: 'wiki',   val: { text: '[[link-a]]', start: 8 } },
              { type: 'wiki',   val: { text: '[[link-b]]', start: 20 } },
              { type: 'string', val: { text: 'hello', start: 32 } },
            ],
          },
        ],
      }));

      it('wiki + null', testScan({
        mkdn: 'attr :: [[concept]], null\n',
        data: [
          {
            key: { text: 'attr', start: 0 },
            vals: [
              { type: 'wiki', val: { text: '[[concept]]', start: 8 } },
              { type: 'null', val: { text: 'null', start: 21 } },
            ],
          },
        ],
      }));

      it('wiki + int_hex', testScan({
        mkdn: 'attr :: [[concept]], 0xFF\n',
        data: [
          {
            key: { text: 'attr', start: 0 },
            vals: [
              { type: 'wiki', val: { text: '[[concept]]', start: 8 } },
              { type: 'int',  val: { text: '0xFF', start: 21 } },
            ],
          },
        ],
      }));

      it('wiki + int_oct', testScan({
        mkdn: 'attr :: [[concept]], 0o77\n',
        data: [
          {
            key: { text: 'attr', start: 0 },
            vals: [
              { type: 'wiki', val: { text: '[[concept]]', start: 8 } },
              { type: 'int',  val: { text: '0o77', start: 21 } },
            ],
          },
        ],
      }));

      it('wiki + float', testScan({
        mkdn: 'attr :: [[concept]], 3.14\n',
        data: [
          {
            key: { text: 'attr', start: 0 },
            vals: [
              { type: 'wiki',  val: { text: '[[concept]]', start: 8 } },
              { type: 'float', val: { text: '3.14', start: 21 } },
            ],
          },
        ],
      }));

      it('wiki + float_exp', testScan({
        mkdn: 'attr :: [[concept]], 1.0e3\n',
        data: [
          {
            key: { text: 'attr', start: 0 },
            vals: [
              { type: 'wiki',  val: { text: '[[concept]]', start: 8 } },
              { type: 'float', val: { text: '1.0e3', start: 21 } },
            ],
          },
        ],
      }));

      it('wiki + float_nan', testScan({
        mkdn: 'attr :: [[concept]], .NaN\n',
        data: [
          {
            key: { text: 'attr', start: 0 },
            vals: [
              { type: 'wiki',  val: { text: '[[concept]]', start: 8 } },
              { type: 'float', val: { text: '.NaN', start: 21 } },
            ],
          },
        ],
      }));

      it('wiki + timestamp', testScan({
        mkdn: 'attr :: [[concept]], 2026-05-23\n',
        data: [
          {
            key: { text: 'attr', start: 0 },
            vals: [
              { type: 'wiki', val: { text: '[[concept]]', start: 8 } },
              { type: 'time', val: { text: '2026-05-23', start: 21 } },
            ],
          },
        ],
      }));

    });

    describe('comma list; prefixed', () => {

      it('wiki + string', testScan({
        mkdn: ': attr :: [[concept]], hello\n',
        data: [
          {
            key: { text: 'attr', start: 2 },
            vals: [
              { type: 'wiki',   val: { text: '[[concept]]', start: 10 } },
              { type: 'string', val: { text: 'hello', start: 23 } },
            ],
          },
        ],
      }));

      it('string + wiki', testScan({
        mkdn: ': attr :: hello, [[concept]]\n',
        data: [
          {
            key: { text: 'attr', start: 2 },
            vals: [
              { type: 'string', val: { text: 'hello', start: 10 } },
              { type: 'wiki',   val: { text: '[[concept]]', start: 17 } },
            ],
          },
        ],
      }));

      it('wiki + int', testScan({
        mkdn: ': attr :: [[concept]], 42\n',
        data: [
          {
            key: { text: 'attr', start: 2 },
            vals: [
              { type: 'wiki', val: { text: '[[concept]]', start: 10 } },
              { type: 'int',  val: { text: '42', start: 23 } },
            ],
          },
        ],
      }));

      it('wiki + bool', testScan({
        mkdn: ': attr :: [[concept]], true\n',
        data: [
          {
            key: { text: 'attr', start: 2 },
            vals: [
              { type: 'wiki', val: { text: '[[concept]]', start: 10 } },
              { type: 'bool', val: { text: 'true', start: 23 } },
            ],
          },
        ],
      }));

      it('wiki + string + int', testScan({
        mkdn: ': attr :: [[concept]], hello, 42\n',
        data: [
          {
            key: { text: 'attr', start: 2 },
            vals: [
              { type: 'wiki',   val: { text: '[[concept]]', start: 10 } },
              { type: 'string', val: { text: 'hello', start: 23 } },
              { type: 'int',    val: { text: '42', start: 30 } },
            ],
          },
        ],
      }));

      it('multiple wiki + primitive', testScan({
        mkdn: ': attr :: [[link-a]], [[link-b]], hello\n',
        data: [
          {
            key: { text: 'attr', start: 2 },
            vals: [
              { type: 'wiki',   val: { text: '[[link-a]]', start: 10 } },
              { type: 'wiki',   val: { text: '[[link-b]]', start: 22 } },
              { type: 'string', val: { text: 'hello', start: 34 } },
            ],
          },
        ],
      }));

    });
  });
});
