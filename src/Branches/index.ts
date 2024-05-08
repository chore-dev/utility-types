import { Replace } from '../string';

/**
 * _Branches
 * @category Object
 * @private
 * @desc Recursive layer of the Branches utility type, accepting both array and object types
 * @param {array | object} Target - The object to get the branches of
 * @returns All possible branches of the object
 */
type _Branches<Target> = Target extends Array<infer Union>
  ? `[number]${_Branches<Union>}`
  : Target extends object
  ? `.${{
      [Key in keyof Target & (string | number)]: Key extends string | number
        ? `${Key}` | `${Key}${_Branches<Target[Key]>}`
        : '';
    }[keyof Target & (string | number)]}`
  : '';

/**
 * Branches
 * @category Object
 * @desc Get all possible branches of an object in dot & bracket notation
 * @param {object} Target - The object to get the branches of
 * @returns All possible branches of the object
 * @example
 * type Sample = {
 *   a: string;
 *   b: {
 *     c: string;
 *     d?: {
 *       e?: string;
 *       f: Array<{
 *         g: string;
 *         h: {
 *           i?: string;
 *         };
 *       }>;
 *     };
 *   };
 * }
 * type Result = Branches<Sample>; // 'a' | 'b' | 'b.c' | 'b.d' | 'b.d.e' | 'b.d.f' | 'b.d.f[number].g' | 'b.d.f[number].h' | 'b.d.f[number].h.i'
 */
export type Branches<Target> = Target extends Array<unknown>
  ? ''
  : Target extends object
  ? Replace<_Branches<Target>, '.', '', false>
  : '';
