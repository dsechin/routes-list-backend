import {ExpressMiddlewareInterface, Middleware} from 'routing-controllers';
import {Service} from 'typedi';
import {InvalidMethodError} from '../errors';

const ALLOWED_METHODS = [
  'GET',
  'POST',
  'PUT',
  'DELETE',
];

@Middleware({type: 'before'})
@Service()
export class InvalidMethodErrorHandler implements ExpressMiddlewareInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public use(request: any, response: any, next: (err?: any) => any): any {
    if (!ALLOWED_METHODS.includes(request.method)) {
      next(new InvalidMethodError('Invalid method'));
    }

    next();
  }
}
