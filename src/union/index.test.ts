import { Assert } from '../__tests__';

import { IsUnion, PopUnion, UnionToArray, UnionToIntersection } from './';

describe('union', () => {
  describe('IsUnion', () => {
    it('should return true for union', () => {
      const test: Assert<IsUnion<'a' | 'b'>, true> = true;
      expect(test).toBe(true);
    });

    it('should return false for non union', () => {
      const test: Assert<IsUnion<'a'>, false> = true;
      expect(test).toBe(true);
    });
  });

  describe('PopUnion', () => {
    it('should return the input item for non union', () => {
      const test: Assert<PopUnion<'a'>, 'a'> = true;
      expect(test).toBe(true);
    });

    it('should return the last item of union', () => {
      const test: Assert<PopUnion<'a' | 'b'>, 'b'> = true;
      expect(test).toBe(true);
    });
  });

  describe('UnionToArray', () => {
    it('should convert union to array', () => {
      const test1: Assert<UnionToArray<'a' | 'b' | 'c'>, ['a', 'b', 'c']> = true;
      expect(test1).toBe(true);

      const test2: Assert<UnionToArray<'a'>, ['a']> = true;
      expect(test2).toBe(true);
    });
  });

  describe('UnionToIntersection', () => {
    it('should convert union to intersection', () => {
      const test: Assert<
        UnionToIntersection<{ a: 1 } | { b: 2 } | { c: 3 }>,
        {
          a: 1;
        } & {
          b: 2;
        } & {
          c: 3;
        }
      > = true;
      expect(test).toBe(true);
    });

    it('should return never if inputs have no intersection', () => {
      const test: Assert<UnionToIntersection<'a' | 'b' | 'c'>, never> = true;
      expect(test).toBe(true);
    });
  });
});
