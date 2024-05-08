/**
 * ArrayToUnion
 * @category Array
 * @desc Convert an array to a union
 * @param {array} Target - The array to convert
 * @returns A union
 * @example
 * type Array = ['a', 'b', 'c'];
 * type Union = ArrayToUnion<Array>; // 'a' | 'b' | 'c'
 */
export type ArrayToUnion<Target> = Target extends Array<unknown> ? Target[number] : never;
