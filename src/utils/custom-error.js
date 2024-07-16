export class CustomFetchError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.name = 'CustomFetchError';
    this.statusCode = statusCode;
  }
}
