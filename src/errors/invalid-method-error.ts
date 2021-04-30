import {ApplicationError} from './application-error';

export class InvalidMethodError extends ApplicationError {
  public readonly name = 'InvalidMethodError';

  constructor(message) {
    super(message || 'Invalid method', 500);
  }
}
