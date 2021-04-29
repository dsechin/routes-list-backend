import {IResponseStatus} from './iresponse-status';
import {RESPONSE_CODE} from './response-code.enum';

export class ResponseStatus<T> implements IResponseStatus<T> {
  code: RESPONSE_CODE;
  message: string;
  successful: boolean;
  payload: T | null;

  constructor(
    message: string,
    code: RESPONSE_CODE,
    successful: boolean,
    payload: T | null = null,
  ) {
    this.message = message;
    this.code = code;
    this.payload = payload;
  }

  public static createSuccessStatus<T>(message: string, code: RESPONSE_CODE, payload: T | null = null) {
    return new ResponseStatus(message, code, true, payload);
  }

  public static createErrorStatus<T>(message: string, code: RESPONSE_CODE, payload: T | null = null) {
    return new ResponseStatus(message, code, false, payload);
  }
}
