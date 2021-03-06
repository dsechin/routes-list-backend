import {ExpressErrorMiddlewareInterface, Middleware} from 'routing-controllers';
import {Service} from 'typedi';
import {ResponseStatus, RESPONSE_CODE} from '../types';

@Middleware({type: 'after'})
@Service()
export class GlobalErrorHandler implements ExpressErrorMiddlewareInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error (error: any, request: any, response: any, next: () => any) {
    if (error instanceof SyntaxError) {
      response.send(
        ResponseStatus.createErrorStatus(
          'JSON parse error',
          RESPONSE_CODE.ERR_INVALID_JSON,
        ),
      );
    }

    switch (error.name) {
      case 'InvalidMethodError':
        response.send(
          ResponseStatus.createErrorStatus(
            'Unsupported HTTP method',
            RESPONSE_CODE.ERR_INVALID_METHOD,
          ),
        );
        break;

      default:
        response.send(
          ResponseStatus.createErrorStatus(
            'Unknown error occured',
            RESPONSE_CODE.ERR_UNKNOWN,
          ),
        );
        break;
    }

    next();
  }
}
