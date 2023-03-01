import assert from 'node:assert/strict';

import * as caml from '../src';


describe('scanUpdateAttr() -- single', () => {

  const testSingle = (params: any) => () => {
    const mkdn: string = params.mkdn;
    const key: string = params.key;
    const newVal: string = params.newVal;
    const type: string | undefined = params.type ? params.type : undefined;
    const expdResult: [number, number, string] | undefined = params.result;
    const actlResult: [number, number, string] | undefined = caml.scanUpdateAttr(mkdn, key, newVal, type);
    assert.deepStrictEqual(actlResult, expdResult);
  };

  describe('time', () => {

    it('canonical', testSingle({
      mkdn: 'attr::2001-12-15T02:59:43.1Z\n',
      key: 'attr',
      newVal: '2022-11-15T02:55:10.1Z',
      type: 'timestamp',
      result: [0, 28, 'attr::2022-11-15T02:55:10.1Z'],
    }));

    it('iso8601', testSingle({
      mkdn: 'attr::2001-12-14t21:59:43.10-05:00\n',
      key: 'attr',
      newVal: '2022-11-14t21:55:10.10-05:00',
      type: 'timestamp',
      result: [0, 34, 'attr::2022-11-14t21:55:10.10-05:00'],
    }));

    it('spaced', testSingle({
      mkdn: 'attr::2001-12-14 21:59:43.10 -5\n',
      key: 'attr',
      newVal: '2022-11-14 21:55:10.10 -5',
      type: 'timestamp',
      result: [0, 31, 'attr::2022-11-14 21:55:10.10 -5'],
    }));

    it('date only', testSingle({
      mkdn: 'attr::2001-12-14\n',
      key: 'attr',
      newVal: '2022-11-14',
      type: 'timestamp',
      result: [0, 16, 'attr::2022-11-14'],
    }));

    // prefixed; pad

    it('date only; prefixed; pad', testSingle({
      mkdn: ': attr :: 2001-12-14\n',
      key: 'attr',
      newVal: '2022-11-14',
      type: 'timestamp',
      result: [0, 20, ': attr :: 2022-11-14'],
    }));

    it('int', testSingle({
      mkdn: 'attr::+12:00\n',
      key: 'attr',
      newVal: '-09:30',
      type: 'time_int',
      result: [0, 12, 'attr::-09:30'],
    }));

    it('float', testSingle({
      mkdn: 'attr::+12:00.123\n',
      key: 'attr',
      newVal: '-09:30.321',
      type: 'time_float',
      result: [0, 16, 'attr::-09:30.321'],
    }));

  });

});
