import assert from 'node:assert/strict';

import * as caml from '../src';


describe('scan() -- single', () => {

  const testSingle = (params: any) => () => { 
    const mkdn: string = params.mkdn;
    const expdData: any = params.data;
    const actlData: any = caml.scan(mkdn);
    assert.deepStrictEqual(actlData, expdData);
  };

  describe('null', () => {

    it('none is not allowed', testSingle({
      mkdn: 'attr::\n',
      data: [],
    }));

    it('lowercase', testSingle({
      mkdn: 'attr::null\n',
      data: [
        {
          key: ['attr', 0],
        },
        {
          type: 'null',
          val: ['null', 6],
        }
      ],
    }));

    it('camelCase', testSingle({
      mkdn: 'attr::Null\n',
      data: [
        {
          key: ['attr', 0],
        },
        {
          type: 'null',
          val: ['Null', 6],
        }
      ],
    }));

    it('uppercase', testSingle({
      mkdn: 'attr::NULL\n',
      data: [
        {
          key: ['attr', 0],
        },
        {
          type: 'null',
          val: ['NULL', 6],
        }
      ],
    }));

  });

  describe('bool', () => {

    it('lowercase', testSingle({
      mkdn: 'attr::true\n',
      data: [
        {
          key: ['attr', 0],
        },
        {
          type: 'bool',
          val: ['true', 6],
        }
      ],
    }));

    it('camelCase', testSingle({
      mkdn: 'attr::True\n',
      data: [
        {
          key: ['attr', 0],
        },
        {
          type: 'bool',
          val: ['True', 6],
        }
      ],
    }));

    it('uppercase', testSingle({
      mkdn: 'attr::TRUE\n',
      data: [
        {
          key: ['attr', 0],
        },
        {
          type: 'bool',
          val: ['TRUE', 6],
        }
      ],
    }));

  });

  describe('int', () => {

    it('canonical', testSingle({
      mkdn: 'attr::10\n',
      data: [
        {
          key: ['attr', 0],
        },
        {
          type: 'int',
          val: ['10', 6],
        }
      ],
    }));

    it('octal', testSingle({
      mkdn: 'attr::0o10\n',
      data: [
        {
          key: ['attr', 0],
        },
        {
          type: 'int',
          val: ['0o10', 6],
        }
      ],
    }));

    it('hexadecimal', testSingle({
      mkdn: 'attr::0x14\n',
      data: [
        {
          key: ['attr', 0],
        },
        {
          type: 'int',
          val: ['0x14', 6],
        }
      ],
    }));

  });

  describe('float', () => {

    it('canonical', testSingle({
      mkdn: 'attr::1.23015\n',
      data: [
        {
          key: ['attr', 0],
        },
        {
          type: 'float',
          val: ['1.23015', 6],
        }
      ],
    }));

    it('exp -- exponential', testSingle({
      mkdn: 'attr::12.3015e+02\n',
      data: [
        {
          key: ['attr', 0],
        },
        {
          type: 'float',
          val: ['12.3015e+02', 6],
        }
      ],
    }));

    it('nan -- not a number', testSingle({
      mkdn: 'attr::.nan\n',
      data: [
        {
          key: ['attr', 0],
        },
        {
          type: 'float',
          val: ['.nan', 6],
        }
      ],
    }));

  });

  describe('time', () => {

    it('canonical', testSingle({
      mkdn: 'attr::2001-12-15T02:59:43.1Z\n',
      data: [
        {
          key: ['attr', 0],
        },
        {
          type: 'time',
          val: ['2001-12-15T02:59:43.1Z', 6],
        }
      ],
    }));

    it('iso8601', testSingle({
      mkdn: 'attr::2001-12-14t21:59:43.10-05:00\n',
      data: [
        {
          key: ['attr', 0],
        },
        {
          type: 'time',
          val: ['2001-12-14t21:59:43.10-05:00', 6],
        }
      ],
    }));

    it('spaced', testSingle({
      mkdn: 'attr::2001-12-14 21:59:43.10 -5\n',
      data: [
        {
          key: ['attr', 0],
        },
        {
          type: 'time',
          val: ['2001-12-14 21:59:43.10 -5', 6],
        }
      ],
    }));

    it('date only', testSingle({
      mkdn: 'attr::2001-12-14\n',
      data: [
        {
          key: ['attr', 0],
        },
        {
          type: 'time',
          val: ['2001-12-14', 6],
        }
      ],
    }));

    it('int', testSingle({
      mkdn: 'attr::+12:00\n',
      data: [
        {
          key: ['attr', 0],
        },
        {
          type: 'time',
          val: ['+12:00', 6],
        }
      ],
    }));

    it('float', testSingle({
      mkdn: 'attr::+12:00.123\n',
      data: [
        {
          key: ['attr', 0],
        },
        {
          type: 'time',
          val: ['+12:00.123', 6],
        }
      ],
    }));

  });

  describe('string', () => {

    it('single-line; w/out whitespace', testSingle({
      mkdn: 'attr::value-w/out-whitespace\n',
      data: [
        {
          key: ['attr', 0],
        },
        {
          type: 'string',
          val: ['value-w/out-whitespace', 6],
        }
      ],
    }));

    it('single-line, w/ whitespace', testSingle({
      mkdn: 'attr::value with whitespace\n',
      data: [
        {
          key: ['attr', 0],
        },
        {
          type: 'string',
          val: ['value with whitespace', 6],
        }
      ],
    }));

    it('single-line; w/ colon prefix', testSingle({
      mkdn: ':attr::value with whitespace\n',
      data: [
        {
          key: ['attr', 1],
        },
        {
          type: 'string',
          val: ['value with whitespace', 7],
        }
      ],
    }));

    it('single-line; w/ colon prefix; w/ whitespace pad', testSingle({
      mkdn: ': attr  ::value with whitespace\n',
      data: [
        {
          key: ['attr', 2],
        },
        {
          type: 'string',
          val: ['value with whitespace', 10],
        }
      ],
    }));

    it('single-line; w/ colon prefix; math', testSingle({
      mkdn: ': gravity :: 9.8m/s^2\n',
      data: [
        {
          key: ['gravity', 2],
        },
        {
          type: 'string',
          val: ['9.8m/s^2', 13],
        }
      ],
    }));

    it('single-line; w/ colon prefix; math', testSingle({
      mkdn: ': tldr :: \'\'\n\n[[wikilink]]\n',
      data: [
        {
          key: ['tldr', 2],
        },
        {
          type: 'string',
          val: ['\'\'', 10],
        }
      ],
    }));

    it('single-line; w/ colon prefix; math', testSingle({
      mkdn: ': tldr :: tldr\n',
      data: [
        {
          key: ['tldr', 2],
        },
        {
          type: 'string',
          val: ['tldr', 10],
        }
      ],
    }));

  });

  describe('mixed', () => {

    it('multiple values', testSingle({
      mkdn: 'attr1::value-w/out-whitespace\nattr2::123\n',
      data: [
        {
          key: ['attr1', 0],
        },
        {
          type: 'string',
          val: ['value-w/out-whitespace', 7],
        },
        {
          key: ['attr2', 30],
        },
        {
          type: 'int',
          val: ['123', 37],
        },
      ],
    }));

  });

  describe('wikilinks', () => {

    it('[[wikilinks]] should not be handled here', testSingle({
      mkdn: 'attr :: [[wikilink]]\n',
      data: [],
    }));

    it('[[wikilinks]] should not be handled here, but primitives still handled', testSingle({
      mkdn: 'attr1 :: a string\nattr2 :: [[wikilink]]\n',
      data: [
        {
          key: ['attr1', 0],
        },
        {
          type: 'string',
          val: ['a string', 9],
        },
      ],
    }));

  });

});
