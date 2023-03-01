import assert from 'node:assert/strict';

import * as caml from '../src';


describe('updateAttr() -- single', () => {

  const testSingle = (params: any) => () => {
    const mkdn: string = params.mkdn;
    const key: string = params.key;
    const newVal: string = params.newVal;
    const type: string | undefined = params.type ? params.type : undefined;
    const expdContent: string | undefined = params.result;
    const actlContent: string | undefined = caml.updateAttr(mkdn, key, newVal, type);
    assert.deepStrictEqual(actlContent, expdContent);
  };

  describe('time', () => {

    it('canonical', testSingle({
      mkdn: 'attr::2001-12-15T02:59:43.1Z\n',
      key: 'attr',
      newVal: '2022-11-15T02:55:10.1Z',
      type: 'timestamp',
      result: 'attr::2022-11-15T02:55:10.1Z\n',
    }));

    it('iso8601', testSingle({
      mkdn: 'attr::2001-12-14t21:59:43.10-05:00\n',
      key: 'attr',
      newVal: '2022-11-14t21:55:10.10-05:00',
      type: 'timestamp',
      result: 'attr::2022-11-14t21:55:10.10-05:00\n',
    }));

    it('spaced', testSingle({
      mkdn: 'attr::2001-12-14 21:59:43.10 -5\n',
      key: 'attr',
      newVal: '2022-11-14 21:55:10.10 -5',
      type: 'timestamp',
      result: 'attr::2022-11-14 21:55:10.10 -5\n',
    }));

    it('date only', testSingle({
      mkdn: 'attr::2001-12-14\n',
      key: 'attr',
      newVal: '2022-11-14',
      type: 'timestamp',
      result: 'attr::2022-11-14\n',
    }));

    it('int', testSingle({
      mkdn: 'attr::+12:00\n',
      key: 'attr',
      newVal: '-09:30',
      type: 'time_int',
      result: 'attr::-09:30\n',
    }));

    it('float', testSingle({
      mkdn: 'attr::+12:00.123\n',
      key: 'attr',
      newVal: '-09:30.321',
      type: 'time_float',
      result: 'attr::-09:30.321\n',
    }));
  });

});
