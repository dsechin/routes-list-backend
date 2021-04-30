import {JsonController, QueryParam, Param, Body, Get, Post, Put, Delete} from 'routing-controllers';
import {Service} from 'typedi';
import {Route} from '../types';
import {RoutesStorage} from '../storage/routes-storage';

@JsonController()
@Service()
export class RoutesController {
  constructor(
    private routesStorage: RoutesStorage,
  ) {}

  @Get('/routes')
  getAll() {
    return this.routesStorage.getAll();
  }

  @Get('/routes/:uuid')
  getOne(@Param('uuid') uuid: string) {
    return this.routesStorage.getByUuid(uuid);
  }

  @Get('/route/for-ip/:ip')
  getRouteForIp(
    @QueryParam('most-specific') mostSpecific: boolean,
    @Param('ip') ip: string,
  ) {
    return this.routesStorage.getRouteForIp(ip, mostSpecific);
  }

  @Post('/routes')
  create(@Body() route: Omit<Route, 'uuid'>) {
    return this.routesStorage.addRoute(route);
  }

  @Put('/routes/:uuid')
  update(@Param('uuid') uuid: string, @Body({required: true}) route: Partial<Omit<Route, 'uuid'>>) {
    return this.routesStorage.updateRoute(uuid, route);
  }

  @Delete('/routes/:uuid')
  remove(@Param('uuid') uuid: string) {
    return this.routesStorage.removeRoute(uuid);
  }
}
