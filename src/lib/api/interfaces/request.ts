export type ResponseCode =
  | 200 // Success
  | 400; // Failed

export interface Response<T> {
  code: ResponseCode;
  success: boolean;
  msg?: null | string;
  data: T;
}
export type PromiseResult<T> = Promise<Response<T>>;
