import { Assert } from '../__tests__';

import { Prettify, ValuesOf } from './index';

describe('object', () => {
  describe('Prettify', () => {
    it('should prettify the provided ', () => {
      type Sample = { a: string } & { b: number } & { c: boolean };

      const test: Assert<Prettify<Sample>, { a: string; b: number; c: boolean }> = true;
      expect(test).toBe(true);
    });
  });

  describe('ValuesOf', () => {
    it('should return types of values of Sample', () => {
      type Sample = {
        a: boolean;
        d: null;
        b: number;
        c: string;
        e: undefined;
      };

      const test: Assert<ValuesOf<Sample>, boolean | null | number | string | undefined> = true;
      expect(test).toBe(true);
    });
  });
});
