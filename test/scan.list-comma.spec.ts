import * as assert from 'assert';

import * as caml from '../src';


describe('scan() -- list-comma', () => {

  const testListComma = (params: any) => () => { 
    const mkdn: string = params.mkdn;
    const expdData: any = params.data;
    const actlData: any = caml.scan(mkdn);
    assert.deepStrictEqual(actlData, expdData);
  };

  describe('null', () => {

    it('lowercase', testListComma({
      mkdn: 'attr::null, null\n',
      data: [
        {
          key: ['attr', 0],
        },
        {
          type: 'null',
          val: ['null', 6],
        },
        {
          type: 'null',
          val: ['null', 12],
        }
      ],
    }));

    it('camelCase', testListComma({
      mkdn: 'attr::Null, Null\n',
      data: [
        {
          key: ['attr', 0],
        },
        {
          type: 'null',
          val: ['Null', 6],
        },
        {
          type: 'null',
          val: ['Null', 12],
        }
      ],
    }));

    it('uppercase', testListComma({
      mkdn: 'attr::NULL, NULL\n',
      data: [
        {
          key: ['attr', 0],
        },
        {
          type: 'null',
          val: ['NULL', 6],
        },
        {
          type: 'null',
          val: ['NULL', 12],
        }
      ],
    }));

  });

  describe('bool', () => {

    it('lowercase', testListComma({
      mkdn: 'attr::true, false\n',
      data: [
        {
          key: ['attr', 0],
        },
        {
          type: 'bool',
          val: ['true', 6],
        },
        {
          type: 'bool',
          val: ['false', 12],
        }
      ],
    }));

    it('camelCase', testListComma({
      mkdn: 'attr::True, False\n',
      data: [
        {
          key: ['attr', 0],
        },
        {
          type: 'bool',
          val: ['True', 6],
        },
        {
          type: 'bool',
          val: ['False', 12],
        }
      ],
    }));

    it('uppercase', testListComma({
      mkdn: 'attr::TRUE, FALSE\n',
      data: [
        {
          key: ['attr', 0],
        },
        {
          type: 'bool',
          val: ['TRUE', 6],
        },
        {
          type: 'bool',
          val: ['FALSE', 12],
        }
      ],
    }));

  });

  describe('int', () => {

    it('canonical', testListComma({
      mkdn: 'attr::10, -123\n',
      data: [
        {
          key: ['attr', 0],
        },
        {
          type: 'int',
          val: ['10', 6],
        },
        {
          type: 'int',
          val: ['-123', 10],
        }
      ],
    }));

    it('octal', testListComma({
      mkdn: 'attr::0o10, 0o123\n',
      data: [
        {
          key: ['attr', 0],
        },
        {
          type: 'int',
          val: ['0o10', 6],
        },
        {
          type: 'int',
          val: ['0o123', 12],
        }
      ],
    }));

    it('hexadecimal', testListComma({
      mkdn: 'attr::0xC, 0x14\n',
      data: [
        {
          key: ['attr', 0],
        },
        {
          type: 'int',
          val: ['0xC', 6],
        },
        {
          type: 'int',
          val: ['0x14', 11],
        }
      ],
    }));

  });

  describe('float', () => {

    it('canonical', testListComma({
      mkdn: 'attr::1.23015, -1.23015\n',
      data: [
        {
          key: ['attr', 0],
        },
        {
          type: 'float',
          val: ['1.23015', 6],
        },
        {
          type: 'float',
          val: ['-1.23015', 15],
        }
      ],
    }));

    it('exp -- exponential', testListComma({
      mkdn: 'attr::12.3015e+02, 12.3015e-02\n',
      data: [
        {
          key: ['attr', 0],
        },
        {
          type: 'float',
          val: ['12.3015e+02', 6],
        },
        {
          type: 'float',
          val: ['12.3015e-02', 19],
        }
      ],
    }));

    it('nan -- not a number', testListComma({
      mkdn: 'attr::.NaN, .nan\n',
      data: [
        {
          key: ['attr', 0],
        },
        {
          type: 'float',
          val: ['.NaN', 6],
        },
        {
          type: 'float',
          val: ['.nan', 12],
        }
      ],
    }));

  });

  describe('time', () => {

    it('canonical', testListComma({
      mkdn: 'attr::2001-12-15T02:59:43.1Z, 2022-12-15T02:59:43.1Z\n',
      data: [
        {
          key: ['attr', 0],
        },
        {
          type: 'time',
          val: ['2001-12-15T02:59:43.1Z', 6],
        },
        {
          type: 'time',
          val: ['2022-12-15T02:59:43.1Z', 30],
        }
      ],
    }));

    it('iso8601', testListComma({
      mkdn: 'attr::2001-12-14t21:59:43.10-05:00, 2022-12-14t21:59:43.10-05:00\n',
      data: [
        {
          key: ['attr', 0],
        },
        {
          type: 'time',
          val: ['2001-12-14t21:59:43.10-05:00', 6],
        },
        {
          type: 'time',
          val: ['2022-12-14t21:59:43.10-05:00', 36],
        }
      ],
    }));

    it('spaced', testListComma({
      mkdn: 'attr::2001-12-14 21:59:43.10 -5, 2022-12-14 21:59:43.10 -5\n',
      data: [
        {
          key: ['attr', 0],
        },
        {
          type: 'time',
          val: ['2001-12-14 21:59:43.10 -5', 6],
        },
        {
          type: 'time',
          val: ['2022-12-14 21:59:43.10 -5', 33],
        }
      ],
    }));

    it('date only', testListComma({
      mkdn: 'attr::2001-12-14, 2022-12-14\n',
      data: [
        {
          key: ['attr', 0],
        },
        {
          type: 'time',
          val: ['2001-12-14', 6],
        },
        {
          type: 'time',
          val: ['2022-12-14', 18],
        }
      ],
    }));

    it('int', testListComma({
      mkdn: 'attr::+12:00, 12:00\n',
      data: [
        {
          key: ['attr', 0],
        },
        {
          type: 'time',
          val: ['+12:00', 6],
        },
        {
          type: 'time',
          val: ['12:00', 14],
        }
      ],
    }));

    it('float', testListComma({
      mkdn: 'attr::+12:00.123, 12:00.123\n',
      data: [
        {
          key: ['attr', 0],
        },
        {
          type: 'time',
          val: ['+12:00.123', 6],
        },
        {
          type: 'time',
          val: ['12:00.123', 18],
        }
      ],
    }));

  });

  describe('string', () => {

    it('single-line; w/out whitespace', testListComma({
      mkdn: 'attr::value-w/out-whitespace, and-another\n',
      data: [
        {
          key: ['attr', 0],
        },
        {
          type: 'string',
          val: ['value-w/out-whitespace', 6],
        },
        {
          type: 'string',
          val: ['and-another', 30],
        }
      ],
    }));

    it('single-line, w/ whitespace', testListComma({
      mkdn: 'attr::value with whitespace, and another\n',
      data: [
        {
          key: ['attr', 0],
        },
        {
          type: 'string',
          val: ['value with whitespace', 6],
        },
        {
          type: 'string',
          val: ['and another', 29],
        }
      ],
    }));

    it('single-line, w/ colon prefix', testListComma({
      mkdn: ':attr::value with whitespace, and another\n',
      data: [
        {
          key: ['attr', 1],
        },
        {
          type: 'string',
          val: ['value with whitespace', 7],
        },
        {
          type: 'string',
          val: ['and another', 30],
        }
      ],
    }));

    it('single-line, w/ colon prefix; w/ whitespace pad', testListComma({
      mkdn: ': attr  ::value with whitespace, and another\n',
      data: [
        {
          key: ['attr', 2],
        },
        {
          type: 'string',
          val: ['value with whitespace', 10],
        },
        {
          type: 'string',
          val: ['and another', 33],
        }
      ],
    }));

    it('single-line, w/ duplicate values', testListComma({
      mkdn: 'attr::test,test,test\n',
      data: [
        {
          key: ['attr', 0],
        },
        {
          type: 'string',
          val: ['test', 6],
        },
        {
          type: 'string',
          val: ['test', 11],
        },
        {
          type: 'string',
          val: ['test', 16],
        }
      ],
    }));

  });

});
