import {JsonController, QueryParam, Param, Body, Get, Post, Put, Delete} from 'routing-controllers';
import {Service} from 'typedi';
import {Route} from '../types';
import {RoutesStorage} from '../storage/routes-storage';

const delayBy = (value: unknown, delay: number) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), Math.max(delay, 0));
  });
};

const delayRandomly = (value: unknown, maxDelay: number = 500) => {
  const delay = Math.floor(Math.random() * Math.max(0, maxDelay));

  return delayBy(value, delay);
};

@JsonController()
@Service()
export class RoutesController {
  constructor(
    private routesStorage: RoutesStorage,
  ) {}

  @Get('/routes')
  getAll() {
    return delayRandomly(
      this.routesStorage.getAll(),
    );
  }

  @Get('/routes/:uuid')
  getOne(@Param('uuid') uuid: string) {
    return delayRandomly(
      this.routesStorage.getByUuid(uuid),
    );
  }

  @Get('/route/for-ip/:ip')
  getRouteForIp(
    @QueryParam('most-specific') mostSpecific: boolean,
    @Param('ip') ip: string,
  ) {
    return delayRandomly(
      this.routesStorage.getRouteForIp(ip, mostSpecific),
    );
  }

  @Post('/routes')
  create(@Body() route: Omit<Route, 'uuid'>) {
    return delayRandomly(
      this.routesStorage.addRoute(route),
    );
  }

  @Put('/routes/:uuid')
  update(@Param('uuid') uuid: string, @Body({required: true}) route: Partial<Omit<Route, 'uuid'>>) {
    return delayRandomly(
      this.routesStorage.updateRoute(uuid, route),
    );
  }

  @Delete('/routes/:uuid')
  remove(@Param('uuid') uuid: string) {
    return delayRandomly(
      this.routesStorage.removeRoute(uuid),
    );
  }
}
