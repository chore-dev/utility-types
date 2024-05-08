/**
 * _UnionToFn
 * @category Union
 * @private
 * @desc Extract a function from a union
 * @param {unknown} Union - The union to extract the function from
 * @returns A function
 * @example
 * type Union = { a: string } | { b: number };
 * type UnionToFn = _UnionToFn<Union>; // (u: { a: string }) => void | (u: { b: number }) => void
 */
export type _UnionToFn<Union> = UnionToIntersection<Union extends any ? (u: Union) => void : never>;

/**
 * IsUnion
 * @category Union
 * @desc Check if `Target` is a union
 * @param {unknown} Target - The type to check
 * @returns A boolean
 * @example
 * type Value = 'i.go.to.school.by.bus';
 * type IsUnionValue = IsUnion<Value>; // false
 * @example
 * type Union = { a: string } | { b: number };
 * type IsUnionUnion = IsUnion<Union>; // true
 * @example
 * type Intersection = { a: string } & { b: number };
 * type IsUnionIntersection = IsUnion<Intersection>; // false
 */
export type IsUnion<Target> = [Target] extends [UnionToIntersection<Target>] ? false : true;

/**
 * PopUnion
 * @category Union
 * @desc Remove the last item from a union
 * @param {unknown} Union - The union to remove the last item from
 * @returns The union without the last item
 * @example
 * type Union = { a: string } | { b: number };
 * type Pop = PopUnion<Union>; // { b: number }
 */
export type PopUnion<Union> = _UnionToFn<Union> extends (a: infer Argument) => void
  ? Argument
  : Union;

/**
 * UnionToArray
 * @category Union
 * @desc Convert a union to an array
 * @param {unknown} Target - The union to convert
 * @returns An array
 * @example
 * type Union = { a: string } | { b: number };
 * type Array = UnionToArray<Union>; // [{ a: string }, { b: number }]
 */
export type UnionToArray<Target, Result extends unknown[] = []> = IsUnion<Target> extends true
  ? UnionToArray<Exclude<Target, PopUnion<Target>>, [PopUnion<Target>, ...Result]>
  : [Target, ...Result];

/**
 * UnionToIntersection
 * @category Union
 * @desc Convert a union to an intersection
 * @param {unknown} Union - The union to convert
 * @returns An intersection
 * @example
 * type Union = { a: string } | { b: number };
 * type Intersection = UnionToIntersection<Union>; // { a: string } & { b: number }
 */
export type UnionToIntersection<Union> = (
  Union extends unknown ? (u: Union) => void : never
) extends (u: infer Intersection) => void
  ? Intersection
  : never;
