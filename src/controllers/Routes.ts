import {JsonController, QueryParam, Param, Body, Get, Post, Put, Delete} from 'routing-controllers';

import {Route} from '../types';
import {RoutesStorage} from '../storage/routes-storage';

const routesStorage = new RoutesStorage();

@JsonController()
export class RoutesController {
  @Get('/routes')
  getAll() {
    return routesStorage.getAll();
  }

  @Get('/routes/:uuid')
  getOne(@Param('uuid') uuid: string) {
    return routesStorage.getByUuid(uuid);
  }

  @Get('/routes/for-ip/:ip')
  getRouteForIp(
    @QueryParam('most-specific') mostSpecific: boolean,
    @Param('ip') ip: string,
  ) {
    return routesStorage.getRouteForIp(ip, mostSpecific);
  }

  @Post('/routes')
  create(@Body() route: Omit<Route, 'uuid'>) {
    return routesStorage.addRoute(route);
  }

  @Put('/routes/:uuid')
  update(@Param('uuid') uuid: string, @Body({required: true}) route: Partial<Omit<Route, 'uuid'>>) {
    return routesStorage.updateRoute(uuid, route);
  }

  @Delete('/routes/:uuid')
  remove(@Param('uuid') uuid: string) {
    return routesStorage.removeRoute(uuid);
  }
}
