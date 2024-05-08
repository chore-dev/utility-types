import {Assert} from '../__tests__';

import {LeafNodes} from './';

describe('LeafNodes', () => {
  describe('LeafNodes', () => {
    it('should list all leaf nodes of Sample interface', () => {
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
        LeafNodes<SampleInterface>,
        | 'category'
        | 'details.availability'
        | 'details.description'
        | 'details.images.primary'
        | 'details.images.secondary[number]'
        | 'details.stock'
        | 'id'
        | 'name'
        | 'price'
        | 'reviews[number].comment'
        | 'reviews[number].rating'
        | 'tags[number]'
      > = true;
      expect(test).toBe(true);
    });

    it('should list all leaf nodes of Sample type', () => {
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
        LeafNodes<SampleType>,
        'a' | 'b.c' | 'b.d.e' | 'b.d.f[number].g' | 'b.d.f[number].h.i'
      > = true;
      expect(test).toBe(true);
    });

    it('should return empty string when target is not object', () => {
      const test: Assert<LeafNodes<boolean>, ''> = true;
      expect(test).toBe(true);
    });
  });
});
