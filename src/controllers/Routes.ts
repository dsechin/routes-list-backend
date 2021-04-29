import { Controller, Param, Body, Get, Post, Put, Delete } from 'routing-controllers';

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
    return routesStorage.findByUuid(uuid);
  }

  @Post('/routes')
  post(@Body() route: Omit<Route, 'uuid'>) {
    return routesStorage.addRoute(route);
  }

  //   @Put('/routes/:id')
  //   put(@Param('id') id: number, @Body() user: any) {
  //     return 'Updating a user...';
  //   }

  // @Delete('/routes/:uuid')
  // remove(@Param('uuid') uuid: string) {
  //   const index = _.findIndex(routes, item => item.uuid === uuid);

  //   if (index === -1) {
  //     return ErrorResponse.create(`Route with uuid "${uuid}" not found`, RESPONSE_CODE.ERR_NOT_FOUND);
  //   }

  //   routes.slice(index, 1);

  //   return SuccessResponse.create(`Route with uuid "${uuid}" deleted`);
  // }
}
