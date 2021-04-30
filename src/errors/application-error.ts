export class ApplicationError extends Error {
  public readonly name = 'ApplicationError';
  public status: number;

  constructor(message: string, status: number) {
    super();

    this.message = message || 'Invalid method';
    this.status = status;
  }
}
