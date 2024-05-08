import { Assert } from '../__tests__';

import { _DestructureBracket, _DestructurePath } from './DestructurePath';
import { _DeepGetType, _Value, DeepGetType } from './index';

describe('DeepGetType', () => {
  describe('_DestructureBracket', () => {
    it('should destructure object key and array index', () => {
      const test: Assert<_DestructureBracket<'a[0]'>, ['a', '[0]']> = true;
      expect(test).toBe(true);
    });

    it('should destructure object key and number keyword', () => {
      const test: Assert<_DestructureBracket<'a[number]'>, ['a', '[number]']> = true;
      expect(test).toBe(true);
    });

    it('should ignore empty bracket', () => {
      const test: Assert<_DestructureBracket<'a[]'>, ['a']> = true;
      expect(test).toBe(true);
    });

    it('should return empty array on empty string', () => {
      const test: Assert<_DestructureBracket<''>, []> = true;
      expect(test).toBe(true);
    });

    it('should return only array index when no object key present', () => {
      const test: Assert<_DestructureBracket<'[0]'>, ['[0]']> = true;
      expect(test).toBe(true);
    });

    it('should return only number keyword when no object key present', () => {
      const test: Assert<_DestructureBracket<'[number]'>, ['[number]']> = true;
      expect(test).toBe(true);
    });

    it('should return only object key when no bracket present', () => {
      const test: Assert<_DestructureBracket<'a'>, ['a']> = true;
      expect(test).toBe(true);
    });
  });

  describe('_DestructurePath', () => {
    it('should destructure combination of dot notation & bracket notation', () => {
      const test: Assert<
        _DestructurePath<'a.b[number].c[0].d'>,
        ['a', 'b', '[number]', 'c', '[0]', 'd']
      > = true;
      expect(test).toBe(true);
    });

    it('should destructure dot notation', () => {
      const test: Assert<_DestructurePath<'a.b'>, ['a', 'b']> = true;
      expect(test).toBe(true);
    });

    it('should destructure dot notation & bracket notation with array index', () => {
      const test: Assert<_DestructurePath<'a.b[0]'>, ['a', 'b', '[0]']> = true;
      expect(test).toBe(true);
    });

    it('should destructure dot notation & bracket notation with number keyword', () => {
      const test: Assert<_DestructurePath<'a.b[number]'>, ['a', 'b', '[number]']> = true;
      expect(test).toBe(true);
    });

    it('should destructure single object key', () => {
      const test: Assert<_DestructurePath<'a'>, ['a']> = true;
      expect(test).toBe(true);
    });

    it('should return empty array on empty string', () => {
      const test: Assert<_DestructurePath<''>, []> = true;
      expect(test).toBe(true);
    });

    it('should skip invalid segment', () => {
      const test: Assert<_DestructurePath<'a.b[].c.[].d..e'>, ['a', 'b', 'c', 'd', 'e']> = true;
      expect(test).toBe(true);
    });
  });

  describe('_Value', () => {
    type SampleArray = [1, 2, 3];
    type SampleObject = { a: string };

    it('should get specific type index of array when using array index', () => {
      const test: Assert<_Value<SampleArray, '[0]'>, 1> = true;
      expect(test).toBe(true);
    });

    it('should get type of key when key exist in object', () => {
      const test: Assert<_Value<SampleObject, 'a'>, string> = true;
      expect(test).toBe(true);
    });

    it('should get union type of array when using number keyword', () => {
      const test: Assert<_Value<SampleArray, '[number]'>, 1 | 2 | 3> = true;
      expect(test).toBe(true);
    });

    it('should return never when array index is invalid', () => {
      const test1: Assert<_Value<SampleArray, 'a'>, never> = true;
      expect(test1).toBe(true);

      const test2: Assert<_Value<SampleArray, '[]'>, never> = true;
      expect(test2).toBe(true);
    });

    it('should return never when key absent in object', () => {
      const test: Assert<_Value<SampleObject, 'b'>, never> = true;
      expect(test).toBe(true);
    });

    it('should return never when object key is invalid', () => {
      const test: Assert<_Value<SampleObject, ''>, never> = true;
      expect(test).toBe(true);
    });

    it('should return never when target is not array or object', () => {
      const test: Assert<_Value<boolean, 'a'>, never> = true;
      expect(test).toBe(true);
    });
  });

  describe('_DeepGetType', () => {
    type Sample = {
      a: 1;
      b: {
        c: {
          d: 2;
          g: Array<string>;
        };
        e?: {
          f: 3;
          h: Array<{
            i: 4;
          }>;
          j?: Array<{
            k?: {
              l: 5;
            };
          }>;
        };
      };
    };

    it('should get type of first layer item', () => {
      const test: Assert<_DeepGetType<Sample, ['a']>, 1> = true;
      expect(test).toBe(true);
    });

    it('should get type of nested level item', () => {
      const test: Assert<_DeepGetType<Sample, ['b', 'c', 'd']>, 2> = true;
      expect(test).toBe(true);
    });

    it('should get type of nested level item with optional layer in between', () => {
      const test: Assert<_DeepGetType<Sample, ['b', 'e', 'f']>, 3> = true;
      expect(test).toBe(true);
    });

    it('should get type of nested level item with array & optional layer in between', () => {
      const test1: Assert<_DeepGetType<Sample, ['b', 'e', 'h', '[number]', 'i']>, 4> = true;
      expect(test1).toBe(true);

      const test2: Assert<_DeepGetType<Sample, ['b', 'e', 'j', '[number]', 'k', 'l']>, 5> = true;
      expect(test2).toBe(true);
    });

    it('should return never for invalid paths', () => {
      const test: Assert<
        _DeepGetType<Sample, ['b', 'e', 'j', '[number]', 'k', 'll']>,
        never
      > = true;
      expect(test).toBe(true);
    });
  });

  describe('DeepGetType', () => {
    type Sample = {
      a: 1;
      b: {
        c: {
          d: 2;
          g: Array<string>;
        };
        e?: {
          f: 3;
          h: Array<{
            i: 4;
          }>;
          j?: Array<{
            k?: {
              l: 5;
              m: [boolean, number, string];
            };
          }>;
        };
      };
    };

    it('should get type of first layer item', () => {
      const test: Assert<DeepGetType<Sample, 'a'>, 1> = true;
      expect(test).toBe(true);
    });

    it('should get type from tuple by index', () => {
      const test: Assert<DeepGetType<Sample, 'b.e.j[number].k.m[1]'>, number> = true;
      expect(test).toBe(true);
    });

    it('should get type of nested level item', () => {
      const test: Assert<DeepGetType<Sample, 'b.c.d'>, 2> = true;
      expect(test).toBe(true);
    });

    it('should get type of nested level item with optional layer in between', () => {
      const test: Assert<DeepGetType<Sample, 'b.e.f'>, 3> = true;
      expect(test).toBe(true);
    });

    it('should get type of nested level item with array & optional layer in between', () => {
      const test1: Assert<DeepGetType<Sample, 'b.e.h[number].i'>, 4> = true;
      expect(test1).toBe(true);

      const test2: Assert<DeepGetType<Sample, 'b.e.j[number].k.l'>, 5> = true;
      expect(test2).toBe(true);
    });

    it('should return never for invalid paths', () => {
      const test: Assert<DeepGetType<Sample, 'b.e.j[number].k.ll'>, never> = true;
      expect(test).toBe(true);
    });
  });
});
