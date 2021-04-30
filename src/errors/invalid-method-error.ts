export class InvalidMethodError extends Error {
  public readonly name = 'InvalidMethodError';

  constructor(message) {
    super(message || 'Invalid method');
  }
}
