export type Success<T> = {
  success: true;
  data: T;
};
export type Failure<E> = {
  success: false;
  error: E;
};
export type Result<T, E> = Success<T> | Failure<E>;
