import {Middleware, ExpressMiddlewareInterface} from 'routing-controllers';
import {Service} from 'typedi';

@Middleware({type: 'before'})
@Service()
export class LoggerMiddleware implements ExpressMiddlewareInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  use(request: any, response: any, next: (err?: any) => any): void {
    console.log(JSON.stringify(request.body));
    next();
  }
}