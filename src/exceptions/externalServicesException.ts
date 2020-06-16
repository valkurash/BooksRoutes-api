export default class ExternalServicesException extends Error {
  private _errorCode: number;
  constructor(message: string, errorCode: number) {
    super(message);
    this._errorCode = errorCode;
  }

  public getStatus(): number {
    return this._errorCode;
  }
}
