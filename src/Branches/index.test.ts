import { Assert } from '../__tests__';

import { Branches } from './';

describe('Branches', () => {
  describe('Branches', () => {
    it('should list all branches of Sample interface', () => {
      interface SampleInterface {
        category: string;
        details: {
          availability: 'inStock' | 'outOfStock' | 'preOrder';
          description: string;
          images: {
            primary: string;
            secondary: string[];
          };
          stock: number;
        };
        id: number;
        name: string;
        price: number;
        reviews: Array<{
          comment?: string;
          rating: number;
        }>;
        tags?: string[];
      }

      const test: Assert<
        Branches<SampleInterface>,
        | 'category'
        | 'details'
        | 'details.availability'
        | 'details.description'
        | 'details.images'
        | 'details.images.primary'
        | 'details.images.secondary'
        | 'details.images.secondary[number]'
        | 'details.stock'
        | 'id'
        | 'name'
        | 'price'
        | 'reviews'
        | 'reviews[number].comment'
        | 'reviews[number].rating'
        | 'tags'
        | 'tags[number]'
      > = true;
      expect(test).toBe(true);
    });

    it('should list all branches of Sample type', () => {
      type SampleType = {
        a: string;
        b: {
          c: string;
          d?: {
            e?: string;
            f: Array<{
              g: string;
              h: {
                i?: string;
              };
            }>;
          };
        };
      };

      const test: Assert<
        Branches<SampleType>,
        | 'a'
        | 'b'
        | 'b.c'
        | 'b.d'
        | 'b.d.e'
        | 'b.d.f'
        | 'b.d.f[number].g'
        | 'b.d.f[number].h'
        | 'b.d.f[number].h.i'
      > = true;
      expect(test).toBe(true);
    });

    it('should return empty string when target is not object', () => {
      const test: Assert<Branches<boolean>, ''> = true;
      expect(test).toBe(true);
    });
  });
});
