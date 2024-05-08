import { Branches } from '../Branches';
import { _EmptyArray, _Key, _Path, _Paths } from './constants';
import { _DestructurePath } from './DestructurePath';

/**
 * _Value
 * @category Object
 * @private
 * @desc Get the value of an index in an array or a key in an object
 * @param {object} Target - The array or object to get the value from
 * @param {string} Key - The index or key to get the value from
 * @returns The value of the index or key
 * @example
 * type Target = [1, 2, 3];
 * type Key = '[number]';
 * type Value = _Value<Target, Key>; // 1 | 2 | 3
 * @example
 * type Target = [1, 2, 3];
 * type Key = '[0]';
 * type Value = _Value<Target, Key>; // 1
 * @example
 * type Target = { a: string; b: number };
 * type Key = 'a';
 * type Value = _Value<Target, Key>; // string
 */
export type _Value<Target, Key extends _Key> = Target extends Array<unknown>
  ? Key extends `[${infer Index extends string}]`
    ? Index extends 'number'
      ? Target[number]
      : Index extends `${infer I extends number}`
      ? Target[I]
      : never // The index in "Key" is not an index e.g. "number" | 0 | 1 | ...
    : never // "Key" is not an index e.g. "[number]" | "[0]" | "[1]" | ...
  : Target extends object
  ? Key extends keyof Target
    ? Target[Key]
    : never // "Key" is not a key in "Target"
  : never; // "Target" is not an array or object

/**
 * _DeepGetType
 * @category Object
 * @private
 * @desc Search for a value in an array or object
 * @param {object} Target - The array or object to search in
 * @param {string[]} Paths - The paths to search for
 * @returns The value of the path
 * @example
 * type Target = { a: { b: { c: string } } };
 * type Paths = ['a', 'b', 'c'];
 * type Value = _DeepGetType<Target, Paths>; // string
 */
export type _DeepGetType<Target, Paths extends _Paths> = Target extends Array<unknown> | object
  ? Paths extends [infer First extends _Key, ...infer Rest extends _Paths]
    ? Rest extends _EmptyArray
      ? _Value<Target, First>
      : NonNullable<_Value<Target, First>> extends Array<unknown> | object
      ? _DeepGetType<NonNullable<_Value<Target, First>>, Rest>
      : never // Unable to dive into a non-array or non-object "Target"
    : never // Only empty array Paths will be able to access this branch, which is nearly impossible
  : never; // "Target" is not an array or object

/**
 * DeepGetType
 * @category Object
 * @desc Search for a value in an array or object
 * @param {object} Target - The array or object to search in
 * @param {string} Path - The path to search for
 * @returns The value of the path
 * @example
 * type Target = { a: { b: { c: string } } };
 * type Path = 'a.b.c';
 * type Value = DeepGetType<Target, Path>; // string
 */
export type DeepGetType<
  Target,
  Path extends Branches<Target> | _Path
> = Target extends Array<unknown>
  ? never // "Target" cannot be an array
  : Target extends object
  ? Path extends _Path
    ? _DeepGetType<Target, _DestructurePath<Path>>
    : never // "Path" is not a string
  : never; // "Target" is not an object
