import express from 'express';
import {ExpressMiddlewareInterface, Middleware} from 'routing-controllers';
import {Service} from 'typedi';
import {ResponseStatus, RESPONSE_CODE} from '../types';

const ALLOWED_METHODS = [
  'GET',
  'POST',
  'PUT',
  'DELETE',
];

@Middleware({type: 'before'})
@Service()
export class InvalidMethodErrorHandler implements ExpressMiddlewareInterface {
  public use(request: any, response: any, next: (err?: any) => any): any {

    if (!ALLOWED_METHODS.includes(request.method)) {
      next(new Error('Invalid method'));
    }

    next();
  }
}
