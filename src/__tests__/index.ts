export type Assert<T, U> = IfEquals<
  T,
  U,
  true,
  {
    error: 'Actual type does not match expected type';
    expected: U;
    actual: T;
  }
>;

export type IfEquals<T, U, Y = unknown, N = never> = (<G>() => G extends T ? 1 : 2) extends <
  G
>() => G extends U ? 1 : 2
  ? Y
  : N;
