import assert from 'node:assert/strict';

import * as caml from '../src';

describe('update()', () => {

  const testUpdate = (params: any) => (): void => {
    const opts: any = { type: params.type };
    if (params.skipEsc !== undefined) { opts.skipEsc = params.skipEsc; }
    if (params.format !== undefined) { opts.format = params.format; }
    assert.deepStrictEqual(caml.update(params.mkdn, params.key, params.newVal, opts), params.result);
  };

  describe('format: content (default)', () => {

    describe('default (no format specified)', () => {

      it('timestamp', testUpdate({
        mkdn: 'attr::2001-12-15T02:59:43.1Z\n',
        key: 'attr',
        newVal: '2022-11-15T02:55:10.1Z',
        type: 'timestamp',
        result: 'attr::2022-11-15T02:55:10.1Z\n',
      }));

      it('date only', testUpdate({
        mkdn: 'attr::2001-12-14\n',
        key: 'attr',
        newVal: '2022-11-14',
        type: 'timestamp',
        result: 'attr::2022-11-14\n',
      }));

      it('date only; prefixed; pad', testUpdate({
        mkdn: ': attr :: 2001-12-14\n',
        key: 'attr',
        newVal: '2022-11-14',
        type: 'timestamp',
        result: ': attr :: 2022-11-14\n',
      }));

      it('time int', testUpdate({
        mkdn: 'attr::+12:00\n',
        key: 'attr',
        newVal: '-09:30',
        type: 'time_int',
        result: 'attr::-09:30\n',
      }));

      it('time float', testUpdate({
        mkdn: 'attr::+12:00.123\n',
        key: 'attr',
        newVal: '-09:30.321',
        type: 'time_float',
        result: 'attr::-09:30.321\n',
      }));

      it('string', testUpdate({
        mkdn: 'attr::old value\n',
        key: 'attr',
        newVal: 'new value',
        result: 'attr::new value\n',
      }));

      it('int', testUpdate({
        mkdn: 'attr::42\n',
        key: 'attr',
        newVal: '99',
        type: 'int',
        result: 'attr::99\n',
      }));

      it('bool', testUpdate({
        mkdn: 'attr::true\n',
        key: 'attr',
        newVal: 'false',
        type: 'bool',
        result: 'attr::false\n',
      }));

      it('not found returns undefined', testUpdate({
        mkdn: 'attr::value\n',
        key: 'missing',
        newVal: 'x',
        result: undefined,
      }));

      it('preserves surrounding content', testUpdate({
        mkdn: 'title::hello\n'
            + 'attr::old value\n'
            + 'tags::wiki\n',
        key: 'attr',
        newVal: 'new value',
        result: 'title::hello\n'
              + 'attr::new value\n'
              + 'tags::wiki\n',
      }));

    });

    describe('explicit format: content', () => {

      it('returns same as default', testUpdate({
        mkdn: 'attr::2001-12-14\n',
        key: 'attr',
        newVal: '2022-11-14',
        type: 'timestamp',
        result: 'attr::2022-11-14\n',
      }));

    });

  });

  describe('format: offsets', () => {

    it('timestamp', testUpdate({
      mkdn: 'attr::2001-12-15T02:59:43.1Z\n',
      key: 'attr',
      newVal: '2022-11-15T02:55:10.1Z',
      type: 'timestamp',
      format: 'offsets',
      result: [0, 28, 'attr::2022-11-15T02:55:10.1Z'],
    }));

    it('date only', testUpdate({
      mkdn: 'attr::2001-12-14\n',
      key: 'attr',
      newVal: '2022-11-14',
      type: 'timestamp',
      format: 'offsets',
      result: [0, 16, 'attr::2022-11-14'],
    }));

    it('string', testUpdate({
      mkdn: 'attr::old value\n',
      key: 'attr',
      newVal: 'new value',
      format: 'offsets',
      result: [0, 15, 'attr::new value'],
    }));

    it('not found returns undefined', testUpdate({
      mkdn: 'attr::value\n',
      key: 'missing',
      newVal: 'x',
      result: undefined,
    }));

  });

  describe('whitespace preservation', () => {

    it('no padding', testUpdate({
      mkdn: 'attr::old\n',
      key: 'attr',
      newVal: 'new',
      result: 'attr::new\n',
    }));

    it('space after ::', testUpdate({
      mkdn: 'attr:: old\n',
      key: 'attr',
      newVal: 'new',
      result: 'attr:: new\n',
    }));

    it('space before ::', testUpdate({
      mkdn: 'attr ::old\n',
      key: 'attr',
      newVal: 'new',
      result: 'attr ::new\n',
    }));

    it('prefixed; pad', testUpdate({
      mkdn: ': attr :: old\n',
      key: 'attr',
      newVal: 'new',
      result: ': attr :: new\n',
    }));

  });

  describe('skipEsc (escape handling)', () => {

    it('escaped attr (fenced code) skipped by default; updates the real one', testUpdate({
      mkdn: '```\nattr::caged\n```\nattr::real\n',
      key: 'attr',
      newVal: 'new',
      result: '```\nattr::caged\n```\nattr::new\n',
    }));

    it('escaped attr updated when skipEsc:false (first match)', testUpdate({
      mkdn: '```\nattr::caged\n```\nattr::real\n',
      key: 'attr',
      newVal: 'new',
      skipEsc: false,
      result: '```\nattr::new\n```\nattr::real\n',
    }));

    it('only an escaped attr; skipped by default returns undefined', testUpdate({
      mkdn: '```\nattr::caged\n```\n',
      key: 'attr',
      newVal: 'new',
      result: undefined,
    }));

    it('only an escaped attr; updated when skipEsc:false', testUpdate({
      mkdn: '```\nattr::caged\n```\n',
      key: 'attr',
      newVal: 'new',
      skipEsc: false,
      result: '```\nattr::new\n```\n',
    }));

    it('offsets format also skips escaped by default', testUpdate({
      mkdn: '```\nattr::caged\n```\nattr::real\n',
      key: 'attr',
      newVal: 'new',
      format: 'offsets',
      result: [20, 30, 'attr::new'],
    }));

  });

});
