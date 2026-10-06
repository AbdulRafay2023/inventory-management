export type ApiResponseType<T> = {
  success: true;
  message: string;
  data: T;
};
