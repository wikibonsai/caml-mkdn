import assert from 'node:assert/strict';

import * as caml from '../src';

describe('update()', () => {

  describe('format: content (default)', () => {

    const testContent = (params: any) => () => {
      const mkdn: string = params.mkdn;
      const key: string = params.key;
      const newVal: string = params.newVal;
      const type: string | undefined = params.type;
      const expdContent: string | undefined = params.result;
      const actlContent = caml.update(mkdn, key, newVal, { type });
      assert.deepStrictEqual(actlContent, expdContent);
    };

    const testContentExplicit = (params: any) => () => {
      const mkdn: string = params.mkdn;
      const key: string = params.key;
      const newVal: string = params.newVal;
      const type: string | undefined = params.type;
      const expdContent: string | undefined = params.result;
      const actlContent = caml.update(mkdn, key, newVal, { type, format: 'content' });
      assert.deepStrictEqual(actlContent, expdContent);
    };

    describe('default (no format specified)', () => {

      it('timestamp', testContent({
        mkdn: 'attr::2001-12-15T02:59:43.1Z\n',
        key: 'attr',
        newVal: '2022-11-15T02:55:10.1Z',
        type: 'timestamp',
        result: 'attr::2022-11-15T02:55:10.1Z\n',
      }));

      it('date only', testContent({
        mkdn: 'attr::2001-12-14\n',
        key: 'attr',
        newVal: '2022-11-14',
        type: 'timestamp',
        result: 'attr::2022-11-14\n',
      }));

      it('date only; prefixed; pad', testContent({
        mkdn: ': attr :: 2001-12-14\n',
        key: 'attr',
        newVal: '2022-11-14',
        type: 'timestamp',
        result: ': attr :: 2022-11-14\n',
      }));

      it('time int', testContent({
        mkdn: 'attr::+12:00\n',
        key: 'attr',
        newVal: '-09:30',
        type: 'time_int',
        result: 'attr::-09:30\n',
      }));

      it('time float', testContent({
        mkdn: 'attr::+12:00.123\n',
        key: 'attr',
        newVal: '-09:30.321',
        type: 'time_float',
        result: 'attr::-09:30.321\n',
      }));

      it('string', testContent({
        mkdn: 'attr::old value\n',
        key: 'attr',
        newVal: 'new value',
        result: 'attr::new value\n',
      }));

      it('int', testContent({
        mkdn: 'attr::42\n',
        key: 'attr',
        newVal: '99',
        type: 'int',
        result: 'attr::99\n',
      }));

      it('bool', testContent({
        mkdn: 'attr::true\n',
        key: 'attr',
        newVal: 'false',
        type: 'bool',
        result: 'attr::false\n',
      }));

      it('not found returns undefined', testContent({
        mkdn: 'attr::value\n',
        key: 'missing',
        newVal: 'x',
        result: undefined,
      }));

      it('preserves surrounding content', testContent({
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

      it('returns same as default', testContentExplicit({
        mkdn: 'attr::2001-12-14\n',
        key: 'attr',
        newVal: '2022-11-14',
        type: 'timestamp',
        result: 'attr::2022-11-14\n',
      }));

    });

  });

  describe('format: offsets', () => {

    const testOffsets = (params: any) => () => {
      const mkdn: string = params.mkdn;
      const key: string = params.key;
      const newVal: string = params.newVal;
      const type: string | undefined = params.type;
      const expdResult: [number, number, string] | undefined = params.result;
      const actlResult = caml.update(mkdn, key, newVal, { type, format: 'offsets' });
      assert.deepStrictEqual(actlResult, expdResult);
    };

    it('timestamp', testOffsets({
      mkdn: 'attr::2001-12-15T02:59:43.1Z\n',
      key: 'attr',
      newVal: '2022-11-15T02:55:10.1Z',
      type: 'timestamp',
      result: [0, 28, 'attr::2022-11-15T02:55:10.1Z'],
    }));

    it('date only', testOffsets({
      mkdn: 'attr::2001-12-14\n',
      key: 'attr',
      newVal: '2022-11-14',
      type: 'timestamp',
      result: [0, 16, 'attr::2022-11-14'],
    }));

    it('string', testOffsets({
      mkdn: 'attr::old value\n',
      key: 'attr',
      newVal: 'new value',
      result: [0, 15, 'attr::new value'],
    }));

    it('not found returns undefined', testOffsets({
      mkdn: 'attr::value\n',
      key: 'missing',
      newVal: 'x',
      result: undefined,
    }));

  });

  describe('whitespace preservation', () => {

    const testContent = (params: any) => () => {
      const actlResult = caml.update(params.mkdn, params.key, params.newVal, { type: params.type });
      assert.deepStrictEqual(actlResult, params.result);
    };

    it('no padding', testContent({
      mkdn: 'attr::old\n',
      key: 'attr',
      newVal: 'new',
      result: 'attr::new\n',
    }));

    it('space after ::', testContent({
      mkdn: 'attr:: old\n',
      key: 'attr',
      newVal: 'new',
      result: 'attr:: new\n',
    }));

    it('space before ::', testContent({
      mkdn: 'attr ::old\n',
      key: 'attr',
      newVal: 'new',
      result: 'attr ::new\n',
    }));

    it('prefixed; pad', testContent({
      mkdn: ': attr :: old\n',
      key: 'attr',
      newVal: 'new',
      result: ': attr :: new\n',
    }));

  });

  describe('skipEsc (escape handling)', () => {

    const testContent = (params: any) => () => {
      const opts: any = { type: params.type };
      if (params.skipEsc !== undefined) { opts.skipEsc = params.skipEsc; }
      if (params.format !== undefined) { opts.format = params.format; }
      const actlResult = caml.update(params.mkdn, params.key, params.newVal, opts);
      assert.deepStrictEqual(actlResult, params.result);
    };

    it('escaped attr (fenced code) skipped by default; updates the real one', testContent({
      mkdn: '```\nattr::caged\n```\nattr::real\n',
      key: 'attr',
      newVal: 'new',
      result: '```\nattr::caged\n```\nattr::new\n',
    }));

    it('escaped attr updated when skipEsc:false (first match)', testContent({
      mkdn: '```\nattr::caged\n```\nattr::real\n',
      key: 'attr',
      newVal: 'new',
      skipEsc: false,
      result: '```\nattr::new\n```\nattr::real\n',
    }));

    it('only an escaped attr; skipped by default returns undefined', testContent({
      mkdn: '```\nattr::caged\n```\n',
      key: 'attr',
      newVal: 'new',
      result: undefined,
    }));

    it('only an escaped attr; updated when skipEsc:false', testContent({
      mkdn: '```\nattr::caged\n```\n',
      key: 'attr',
      newVal: 'new',
      skipEsc: false,
      result: '```\nattr::new\n```\n',
    }));

    it('offsets format also skips escaped by default', testContent({
      mkdn: '```\nattr::caged\n```\nattr::real\n',
      key: 'attr',
      newVal: 'new',
      format: 'offsets',
      result: [20, 30, 'attr::new'],
    }));

  });

});
