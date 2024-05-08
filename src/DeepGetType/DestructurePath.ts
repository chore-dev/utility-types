import { _Path, _Paths } from './constants';

/**
 * _DestructureBracket
 * @category Object
 * @private
 * @desc Destructure a bracket notation into an array of strings
 * @param {string} Target - The bracket notation to destructure, e.g. 'a[0]', 'b[number]'
 * @returns An array of strings
 * @example
 * type Target = 'a[0]';
 * type Result = _DestructureBracket<Target>; // ['a', '[0]']
 * @example
 * type Target = 'b[number]';
 * type Result = _DestructureBracket<Target>; // ['b', '[number]']
 */
export type _DestructureBracket<Target extends string> =
  Target extends `${infer Key}[${infer Index}]`
    ? Key extends ''
      ? Index extends ''
        ? []
        : [`[${Index}]`]
      : Index extends ''
      ? [Key]
      : [Key, `[${Index}]`]
    : Target extends ''
    ? []
    : [Target];

/**
 * _DestructurePath
 * @category Object
 * @private
 * @desc Destructure a path into an array of strings
 * @param {string} Path - The path to destructure, formation of dot notation and bracket notation, e.g. 'a.b.c', 'a[0].b.c', 'a[0].b[number].c'
 * @param {string[]} [Result=[]] - The result array
 * @returns An array of strings
 * @example
 * type Path = 'a.b.c';
 * type Result = _DestructurePath<Path>; // ['a', 'b', 'c']
 * @example
 * type Path = 'a[0].b.c';
 * type Result = _DestructurePath<Path>; // ['a', '[0]', 'b', 'c']
 * @example
 * type Path = 'a[0].b[number].c';
 * type Result = _DestructurePath<Path>; // ['a', '[0]', 'b', '[number]', 'c']
 */
export type _DestructurePath<Path extends _Path, Result extends _Paths = []> = Path extends _Path
  ? Result extends _Paths
    ? Path extends `${infer First}.${infer Rest}`
      ? _DestructurePath<Rest, [...Result, ..._DestructureBracket<First>]>
      : [...Result, ..._DestructureBracket<Path>]
    : never // "Result" is not a string array
  : never; // "Path" is not a string
