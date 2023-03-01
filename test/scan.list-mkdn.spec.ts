import * as assert from 'assert';

import * as caml from '../src';


describe('scan() -- list-mkdn', () => {

  const testListMkdn = (params: any) => () => {
    const mkdn: string = params.mkdn;
    const expdData: any = params.data;
    const actlData: any = caml.scan(mkdn);
    assert.deepStrictEqual(actlData, expdData);
  };

  describe('null', () => {

    it('none is not allowed', testListMkdn({
      mkdn: 'attr::\n- \n',
      data: [],
    }));

    it('lowercase', testListMkdn({
      mkdn: 'attr::\n- null\n- null\n',
      data: [
        {
          key: ['attr', 0],
        },
        {
          type: 'null',
          val: ['null', 9],
        },
        {
          type: 'null',
          val: ['null', 16],
        }
      ],
    }));

    it('camelCase', testListMkdn({
      mkdn: 'attr::\n- Null\n- Null\n',
      data: [
        {
          key: ['attr', 0],
        },
        {
          type: 'null',
          val: ['Null', 9],
        },
        {
          type: 'null',
          val: ['Null', 16],
        }
      ],
    }));

    it('uppercase', testListMkdn({
      mkdn: 'attr::\n- NULL\n- NULL\n',
      data: [
        {
          key: ['attr', 0],
        },
        {
          type: 'null',
          val: ['NULL', 9],
        },
        {
          type: 'null',
          val: ['NULL', 16],
        }
      ],
    }));

  });

  describe('bool', () => {

    it('lowercase', testListMkdn({
      mkdn: 'attr::\n- true\n- false\n',
      data: [
        {
          key: ['attr', 0],
        },
        {
          type: 'bool',
          val: ['true', 9],
        },
        {
          type: 'bool',
          val: ['false', 16],
        },
      ],
    }));

    it('camelCase', testListMkdn({
      mkdn: 'attr::\n- True\n- False\n',
      data: [
        {
          key: ['attr', 0],
        },
        {
          type: 'bool',
          val: ['True', 9],
        },
        {
          type: 'bool',
          val: ['False', 16],
        },
      ],
    }));

    it('uppercase', testListMkdn({
      mkdn: 'attr::\n- TRUE\n- FALSE\n',
      data: [
        {
          key: ['attr', 0],
        },
        {
          type: 'bool',
          val: ['TRUE', 9],
        },
        {
          type: 'bool',
          val: ['FALSE', 16],
        },
      ],
    }));

  });

  describe('int', () => {

    it('canonical', testListMkdn({
      mkdn: 'attr::\n- 10\n- -123\n',
      data: [
        {
          key: ['attr', 0],
        },
        {
          type: 'int',
          val: ['10', 9],
        },
        {
          type: 'int',
          val: ['-123', 14],
        }
      ],
    }));

    it('octal', testListMkdn({
      mkdn: 'attr::\n- 0o10\n- 0o123\n',
      data: [
        {
          key: ['attr', 0],
        },
        {
          type: 'int',
          val: ['0o10', 9],
        },
        {
          type: 'int',
          val: ['0o123', 16],
        },
      ],
    }));

    it('hexadecimal', testListMkdn({
      mkdn: 'attr::\n- 0xC\n- 0x14\n',
      data: [
        {
          key: ['attr', 0],
        },
        {
          type: 'int',
          val: ['0xC', 9],
        },
        {
          type: 'int',
          val: ['0x14', 15],
        },
      ],
    }));

  });

  describe('float', () => {

    it('canonical', testListMkdn({
      mkdn: 'attr::\n- 1.23015\n- -1.23015\n',
      data: [
        {
          key: ['attr', 0],
        },
        {
          type: 'float',
          val: ['1.23015', 9],
        },
        {
          type: 'float',
          val: ['-1.23015', 19],
        }
      ],
    }));

    it('exp -- exponential', testListMkdn({
      mkdn: 'attr::\n- 12.3015e+02\n- 12.3015e-02\n',
      data: [
        {
          key: ['attr', 0],
        },
        {
          type: 'float',
          val: ['12.3015e+02', 9],
        },
        {
          type: 'float',
          val: ['12.3015e-02', 23],
        }
      ],
    }));

    it('nan -- not a number', testListMkdn({
      mkdn: 'attr::\n- .NaN\n- .nan\n',
      data: [
        {
          key: ['attr', 0],
        },
        {
          type: 'float',
          val: ['.NaN', 9],
        },
        {
          type: 'float',
          val: ['.nan', 16],
        }
      ],
    }));

  });

  describe('time', () => {

    it('canonical', testListMkdn({
      mkdn: 'attr::\n- 2001-12-15T02:59:43.1Z\n- 2022-12-15T02:59:43.1Z\n',
      data: [
        {
          key: ['attr', 0],
        },
        {
          type: 'time',
          val: ['2001-12-15T02:59:43.1Z', 9],
        },
        {
          type: 'time',
          val: ['2022-12-15T02:59:43.1Z', 34],
        }
      ],
    }));

    it('iso8601', testListMkdn({
      mkdn: 'attr::\n- 2001-12-14t21:59:43.10-05:00\n- 2022-12-14t21:59:43.10-05:00\n',
      data: [
        {
          key: ['attr', 0],
        },
        {
          type: 'time',
          val: ['2001-12-14t21:59:43.10-05:00', 9],
        },
        {
          type: 'time',
          val: ['2022-12-14t21:59:43.10-05:00', 40],
        }
      ],
    }));

    it('spaced', testListMkdn({
      mkdn: 'attr::\n- 2001-12-14 21:59:43.10 -5\n- 2022-12-14 21:59:43.10 -5\n',
      data: [
        {
          key: ['attr', 0],
        },
        {
          type: 'time',
          val: ['2001-12-14 21:59:43.10 -5', 9],
        },
        {
          type: 'time',
          val: ['2022-12-14 21:59:43.10 -5', 37],
        }
      ],
    }));

    it('date only', testListMkdn({
      mkdn: 'attr::\n- 2001-12-14\n- 2022-12-14\n',
      data: [
        {
          key: ['attr', 0],
        },
        {
          type: 'time',
          val: ['2001-12-14', 9],
        },
        {
          type: 'time',
          val: ['2022-12-14', 22],
        }
      ],
    }));

    it('int', testListMkdn({
      mkdn: 'attr::\n- +12:00\n- 12:00\n',
      data: [
        {
          key: ['attr', 0],
        },
        {
          type: 'time',
          val: ['+12:00', 9],
        },
        {
          type: 'time',
          val: ['12:00', 18],
        }
      ],
    }));

    it('float', testListMkdn({
      mkdn: 'attr::\n- +12:00.123\n- 12:00.123\n',
      data: [
        {
          key: ['attr', 0],
        },
        {
          type: 'time',
          val: ['+12:00.123', 9],
        },
        {
          type: 'time',
          val: ['12:00.123', 22],
        }
      ],
    }));

  });

  describe('string', () => {

    it('single-line; w/out whitespace', testListMkdn({
      mkdn: 'attr::\n- value-w/out-whitespace\n- and-another\n',
      data: [
        {
          key: ['attr', 0],
        },
        {
          type: 'string',
          val: ['value-w/out-whitespace', 9],
        },
        {
          type: 'string',
          val: ['and-another', 34],
        }
      ],
    }));

    it('single-line, w/ whitespace', testListMkdn({
      mkdn: 'attr::\n- value with whitespace\n-  and another\n',
      data: [
        {
          key: ['attr', 0],
        },
        {
          type: 'string',
          val: ['value with whitespace', 9],
        },
        {
          type: 'string',
          val: ['and another', 34],
        }
      ],
    }));

    it('single-line, w/ colon prefix', testListMkdn({
      mkdn: ':attr::\n- value with whitespace\n-  and another\n',
      data: [
        {
          key: ['attr', 1],
        },
        {
          type: 'string',
          val: ['value with whitespace', 10],
        },
        {
          type: 'string',
          val: ['and another', 35],
        }
      ],
    }));

    it('single-line, w/ colon prefix; w/ whitespace pad', testListMkdn({
      mkdn: ': attr  ::\n- value with whitespace\n-  and another\n',
      data: [
        {
          key: ['attr  ', 2],
        },
        {
          type: 'string',
          val: ['value with whitespace', 13],
        },
        {
          type: 'string',
          val: ['and another', 38],
        }
      ],
    }));

    it('single-line; w/ duplicate values', testListMkdn({
      mkdn: 'attr::\n- test\n- test\n',
      data: [
        {
          key: ['attr', 0],
        },
        {
          type: 'string',
          val: ['test', 9],
        },
        {
          type: 'string',
          val: ['test', 16],
        }
      ],
    }));

  });

  describe('wikilinks', () => {

    it('[[wikilinks]] should not be handled here', testListMkdn({
      mkdn: 'attr :: \n- [[wikilink]]\n',
      data: [],
    }));

  });

});