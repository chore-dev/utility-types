import { ArrayToUnion } from '../array';
import { Branches } from '../Branches';
import { StartsWith } from '../string';
import { UnionToArray } from '../union';

/**
 * _Exist
 * @category Object
 * @private
 * @desc Check if a key exists in an array of keys
 * @param {string} Key - The key to check for
 * @param {Array<string>} Keys - The array of keys to check in
 * @returns A boolean
 * @example
 * type Keys = ['a', 'b', 'c'];
 * type Result = _Exist<'a', Keys>; // true
 * @example
 * type Keys = ['a', 'b', 'c'];
 * type Result = _Exist<'d', Keys>; // false
 * @example
 * type Keys = ['a', 'b.d', 'c'];
 * type Result = _Exist<'b', Keys>; // true
 */
export type _Exist<Key extends string, Keys extends Array<string>> = Keys extends [
  infer First extends string,
  ...infer Rest extends Array<string>
]
  ? StartsWith<First, Key> extends true
    ? true
    : _Exist<Key, Rest>
  : false;

/**
 * _LeafNodes
 * @category Object
 * @private
 * @desc Recursive layer of the LeafNodes utility type
 * @param {Array<string>} Branches - The branches to check for leaf nodes
 * @param {Array<string>} [Result=[]] - The result array to accumulate the leaf nodes
 * @returns An array of strings
 */
export type _LeafNodes<Branches, Result extends Array<string> = []> = Branches extends Array<string>
  ? Branches extends [infer First extends string, ...infer Rest extends Array<string>]
    ? Rest extends []
      ? [...Result, First]
      : _Exist<First, Rest> extends true
      ? _LeafNodes<Rest, Result>
      : _LeafNodes<Rest, [...Result, First]>
    : Result // "Branches" is an empty array
  : Result; // "Branches" is not a string array

/**
 * LeafNodes
 * @category Object
 * @desc Get all possible leaf nodes of an object in dot notation, skipping the intermediate branches
 * @oaram {object} Target - The object to get the leaf nodes of
 * @returns A union of strings
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
 * type Result = Branches<Sample>; // 'a' | 'b.c' | 'b.d.e' | 'b.d.f[number].g' | 'b.d.f[number].h.i'
 */
export type LeafNodes<Target> = Target extends Array<unknown>
  ? ''
  : Target extends object
  ? ArrayToUnion<_LeafNodes<UnionToArray<Branches<Target>>>>
  : '';
