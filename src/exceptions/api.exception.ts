export default class ApiException extends Error {
  private _errorCode: number;

  constructor(message: string, errorCode: number) {
    super(message);
    this._errorCode = errorCode;
  }

  getStatus(): number {
    return this._errorCode;
  }
}
