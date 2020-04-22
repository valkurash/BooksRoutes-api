export default class BaseApiResponse<T> {
  errorCode: number;
  errorMessage: string;
  result: T;
  validation?: string;
}
