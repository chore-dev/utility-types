import { Assert } from '../__tests__';

import { EndsWith, Replace, ReplaceLast, Reverse, Split, StartsWith } from './';

describe('string', () => {
  describe('EndsWith', () => {
    it('should return true when foobar ends with bar', () => {
      const test: Assert<EndsWith<'foobar', 'bar'>, true> = true;
      expect(test).toBe(true);
    });

    it('should return false when barbar start with foo', () => {
      const test: Assert<EndsWith<'barbar', 'foo'>, false> = true;
      expect(test).toBe(true);
    });
  });

  describe('Replace', () => {
    it('should remain the same', () => {
      const test: Assert<Replace<'foo foo foo', 'bar', 'bar'>, 'foo foo foo'> = true;
      expect(test).toBe(true);
    });

    it('should replace every foo with bar', () => {
      const test: Assert<Replace<'foo foo foo', 'foo', 'bar'>, 'bar bar bar'> = true;
      expect(test).toBe(true);
    });

    it('should replace foo with bar', () => {
      const test: Assert<Replace<'foo', 'foo', 'bar'>, 'bar'> = true;
      expect(test).toBe(true);
    });

    it('should replace the first foo with bar', () => {
      const test: Assert<Replace<'foo foo foo', 'foo', 'bar', false>, 'bar foo foo'> = true;
      expect(test).toBe(true);
    });
  });

  describe('ReplaceLast', () => {
    it('should remain the same', () => {
      const test: Assert<ReplaceLast<'foo foo foo', 'bar', 'bar'>, 'foo foo foo'> = true;
      expect(test).toBe(true);
    });

    it('should replace every foo with bar', () => {
      const test: Assert<ReplaceLast<'foo foo foo', 'foo', 'bar'>, 'bar bar bar'> = true;
      expect(test).toBe(true);
    });

    it('should replace foo with bar', () => {
      const test: Assert<ReplaceLast<'foo', 'foo', 'bar'>, 'bar'> = true;
      expect(test).toBe(true);
    });

    it('should replace the last foo with bar', () => {
      const test: Assert<ReplaceLast<'foo foo foo', 'foo', 'bar', false>, 'foo foo bar'> = true;
      expect(test).toBe(true);
    });
  });

  describe('Reverse', () => {
    it('should reverse the input', () => {
      const test1: Assert<Reverse<'abcde'>, 'edcba'> = true;
      expect(test1).toBe(true);

      const test2: Assert<Reverse<'i go to school by bus'>, 'sub yb loohcs ot og i'> = true;
      expect(test2).toBe(true);
    });
  });

  describe('Split', () => {
    it('should not split due to the absent of separator', () => {
      const test: Assert<Split<'i go to school by bus', '.'>, ['i go to school by bus']> = true;
      expect(test).toBe(true);
    });

    it('should split into array by dot', () => {
      const test: Assert<Split<'a.b.c.d.e', '.'>, ['a', 'b', 'c', 'd', 'e']> = true;
      expect(test).toBe(true);
    });

    it('should split into array by space', () => {
      const test: Assert<
        Split<'i go to school by bus'>,
        ['i', 'go', 'to', 'school', 'by', 'bus']
      > = true;
      expect(test).toBe(true);
    });
  });

  describe('StartsWith', () => {
    it('should return true when foobar starts with foo', () => {
      const test: Assert<StartsWith<'foobar', 'foo'>, true> = true;
      expect(test).toBe(true);
    });

    it('should return false when barbar starts with foo', () => {
      const test: Assert<StartsWith<'barbar', 'foo'>, false> = true;
      expect(test).toBe(true);
    });
  });
});
