/**
 * EndsWith
 * @category String
 * @desc Check if a string ends with another string
 * @param {string} Value - The string to check
 * @param {string} Target - The target to check
 * @returns A boolean
 * @example
 * type Value = 'foobar';
 * type Target = 'bar';
 * type Result = EndsWith<Value, Target>; // true
 * @example
 * type Value = 'foobar';
 * type Target = 'foo';
 * type Result = EndsWith<Value, Target>; // false
 */
export type EndsWith<
  Value extends string,
  Target extends string
> = Value extends `${string}${Target}` ? true : false;

/**
 * Replace
 * @category String
 * @description Replace a string with another string
 * @param {string} Value - The value to replace
 * @param {string} Target - The target to replace
 * @param {string} Replacement [=''] - The replacement string
 * @param {boolean} Global [true] - Replace all occurrences
 * @returns The replaced string
 * @example
 * type Value = 'foobar';
 * type Target = 'foo';
 * type Replacement = 'bar';
 * type Result = Replace<Value, Target, Replacement>; // 'barbar'
 * @example
 * type Value = 'foofoofoo';
 * type Target = 'foo';
 * type Replacement = 'bar';
 * type Result = Replace<Value, Target, Replacement, false>; // 'barfoofoo'
 */
export type Replace<
  Value extends string,
  Target extends string,
  Replacement extends string = '',
  Global extends boolean = true
> = Value extends string
  ? Target extends string
    ? Replacement extends string
      ? Value extends `${infer Head extends string}${Target}${infer Tail extends string}`
        ? `${Head}${Replacement}${Global extends true ? Replace<Tail, Target, Replacement> : Tail}`
        : Value
      : Value
    : Value
  : Value;

/**
 * ReplaceLast
 * @category String
 * @description Replace the last occurrence of a string with another string
 * @param {string} Value - The value to replace
 * @param {string} Target - The target to replace
 * @param {string} Replacement [=''] - The replacement string
 * @param {boolean} Global [true] - Replace all occurrences
 * @returns The replaced string
 * @example
 * type Value = 'foofoofoo';
 * type Target = 'foo';
 * type Replacement = 'bar';
 * type Result = ReplaceLast<Value, Target, Replacement>; // 'barbarbar'
 * @example
 * type Value = 'foofoofoo';
 * type Target = 'foo';
 * type Replacement = 'bar';
 * type Result = ReplaceLast<Value, Target, Replacement, false>; // 'foofoobar'
 */
export type ReplaceLast<
  Value extends string,
  Target extends string,
  Replacement extends string = '',
  Global extends boolean = true
> = Reverse<Replace<Reverse<Value>, Reverse<Target>, Reverse<Replacement>, Global>>;

/**
 * Reverse
 * @category String
 * @description Reverse a string
 * @param {string} Value - The value to reverse
 * @example
 * type Value = 'foobar';
 * type Result = Reverse<Value>; // 'raboof'
 */
export type Reverse<Value extends string> = Value extends string
  ? Value extends `${infer First}${infer Rest}`
    ? `${Reverse<Rest>}${First}`
    : Value
  : Value;

/**
 * Split
 * @category String
 * @desc Split a string into an array of strings by a separator
 * @param {string} Value - The string to split
 * @param {string} [Separator=' '] - The separator to split by
 * @returns An array of strings
 * @example
 * type Value = 'i go to school by bus';
 * type Result = Split<Value>; // ['i', 'go', 'to', 'school', 'by', 'bus']
 * @example
 * type Value = 'i.go.to.school.by.bus';
 * type Separator = '.';
 * type Result = Split<Value, Separator>; // ['i', 'go', 'to', 'school', 'by', 'bus']
 */
export type Split<Value extends string, Separator extends string = ' '> = Value extends string
  ? Value extends `${infer First}${Separator}${infer Rest}`
    ? [First, ...Split<Rest, Separator>]
    : Value extends ''
    ? []
    : [Value]
  : Value;

/**
 * StartsWith
 * @category String
 * @desc Check if a string starts with another string
 * @param {string} Value - The string to check
 * @param {string} Target - The target to check
 * @returns A boolean
 * @example
 * type Value = 'foobar';
 * type Target = 'foo';
 * type Result = StartsWith<Value, Target>; // true
 * @example
 * type Value = 'foobar';
 * type Target = 'bar';
 * type Result = StartsWith<Value, Target>; // false
 */
export type StartsWith<
  Value extends string,
  Target extends string
> = Value extends `${Target}${string}` ? true : false;
