import {Controller, Param, Body, Get, Post, Put, Delete} from 'routing-controllers';

import {Route} from '../types';
import {RoutesStorage} from '../storage/routes-storage';

const routesStorage = new RoutesStorage();

@Controller()
export class RoutesController {
  @Get('/routes')
  getAll() {
    return routesStorage.getAll();
  }

  @Get('/routes/:uuid')
  getOne(@Param('uuid') uuid: string) {
    return routesStorage.getByUuid(uuid);
  }

  @Post('/routes')
  post(@Body() route: Omit<Route, 'uuid'>) {
    return routesStorage.addRoute(route);
  }

  @Put('/routes/:uuid')
  put(@Param('uuid') uuid: string, @Body() route: Partial<Route>) {
    return routesStorage.updateRoute(uuid, route);
  }

  @Delete('/routes/:uuid')
  remove(@Param('uuid') uuid: string) {
    return routesStorage.removeRoute(uuid);
  }
}
