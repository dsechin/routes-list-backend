import {RESPONSE_CODE} from './response-code.enum';

export interface IResponseStatus<T> {
  message: string;
  code: RESPONSE_CODE;
  successful: boolean;
  payload: T | null;
}
