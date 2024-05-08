/**
 * Pretty
 * @category Object
 * @desc Takes an object type and makes the hover overlay more readable. Credits to Matt Pocock for the idea.
 * @see https://www.totaltypescript.com/concepts/the-prettify-helper
 * @see https://www.youtube.com/watch?v=2lCCKiWGlC0&ab_channel=MattPocock
 * @param {object} Target - The object to prettify
 * @returns The prettified object
 * @example
 * type Mess = {
 *  a: string;
 * } & {
 *  b: number;
 * } & {
 *  c: boolean;
 * };
 * type Pretty = Prettify<Mess> // { a: string; b: number; c: boolean; }
 */
export type Prettify<Target> = {
  [Keys in keyof Target]: Target[Keys];
} & {};

/**
 * ValuesOf
 * @category Object
 * @desc Get the value type of an object
 * @param {object} Target - The object to get the value type of
 * @returns The value type of the object
 * @example
 * type Object = { a: string; b: number };
 * type Value = ValuesOf<Object>; // string | number
 */
export type ValuesOf<Target extends object> = Target extends object ? Target[keyof Target] : never;
