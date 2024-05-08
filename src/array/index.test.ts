import { Assert } from '../__tests__';

import { ArrayToUnion } from './';

describe('array', () => {
  describe('ArrayToUnion', () => {
    it('should convert array to union', () => {
      const test1: Assert<ArrayToUnion<['a', 'b', 'c']>, 'a' | 'b' | 'c'> = true;
      expect(test1).toBe(true);

      const test2: Assert<
        ArrayToUnion<[{ a: 1 }, { b: 2 }, { c: 3 }]>,
        | { a: 1 }
        | { b: 2 }
        | {
            c: 3;
          }
      > = true;
      expect(test2).toBe(true);
    });

    it('should return never when target is not an array', () => {
      const test: Assert<ArrayToUnion<boolean>, never> = true;
      expect(test).toBe(true);
    });
  });
});
