import { ExpressErrorMiddlewareInterface, Middleware } from 'routing-controllers';
import {ResponseStatus, RESPONSE_CODE} from './types';

@Middleware({ type: 'after' })
export class GlobalErrorHandler implements ExpressErrorMiddlewareInterface {
  error (error: any, request: any, response: any, next: () => any) {
    console.log(error);
    response.send(
      ResponseStatus.createErrorStatus(
        'Unknown error occured',
        RESPONSE_CODE.ERR_UNKNOWN,
      ),
    );
    next();
  }
}
