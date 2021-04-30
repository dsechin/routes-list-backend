import 'reflect-metadata';
import _ from 'lodash';
import {Service} from 'typedi';
import {v4 as uuidv4} from 'uuid';
import {RESPONSE_CODE, Route, TRoute, ResponseStatus} from '../types';
import {Ipv4Helper} from './ipv4-helper';

@Service()
export class RoutesStorage {
  private _routes: Route[] = [
    {
      uuid: uuidv4(),
      address: '192.168.0.0',
      mask: '255.255.0.0',
      gateway: '192.168.0.1',
      interface: 'VPN',
    },
    {
      uuid: uuidv4(),
      address: '0.0.0.0',
      mask: '0.0.0.0',
      gateway: '33.44.32.1',
      interface: 'ISP',
    },
    {
      uuid: uuidv4(),
      address: '1.1.1.0',
      mask: '255.255.255.192',
      gateway: '1.1.1.1',
      interface: 'VPN',
    },
    {
      uuid: uuidv4(),
      address: '192.168.20.16',
      mask: '255.255.255.240',
      gateway: '192.168.20.22',
      interface: 'VPN',
    },
    {
      uuid: uuidv4(),
      address: '10.1.30.0',
      mask: '255.255.255.0',
      gateway: '0.0.0.0',
      interface: 'Guest',
    },
    {
      uuid: uuidv4(),
      address: '193.10.149.0',
      mask: '255.255.255.192',
      gateway: '0.0.0.0',
      interface: 'ISP',
    },
    {
      uuid: uuidv4(),
      address: '192.168.1.0',
      mask: '255.255.255.0',
      gateway: '0.0.0.0',
      interface: 'Home',
    },
  ];

  private _validMasks: string[] = Ipv4Helper.getMasksArray();

  constructor() {}

  private findByProps(route: Omit<Route, 'uuid'>): string | null {
    const existing = _.find(this._routes, route);

    return _.get(existing, 'uuid', null);
  }

  private findByUuid(uuid: string): Route | null {
    return _.find(this._routes, item => item.uuid === uuid);
  }

  private findIndexByUuid(uuid: string): number {
    return _.findIndex(this._routes, item => item.uuid === uuid);
  }

  private validateRoute(route: Omit<Route, 'uuid'>): ResponseStatus<{uuid} | never> {
    const ipProps = ['address', 'gateway'];
    const invalidProp = _.find(ipProps, prop => !Ipv4Helper.isIpV4(route[prop]));

    if (invalidProp) {
      return ResponseStatus.createErrorStatus(
        `Invalid IPv4 passed as ${invalidProp}: ${route[invalidProp]}`,
        RESPONSE_CODE.ERR_INVALID_IPV4,
      );
    }

    if (!this._validMasks.includes(route.mask)) {
      return ResponseStatus.createErrorStatus(
        `Invalid subnet mask: ${route.mask}`,
        RESPONSE_CODE.ERR_INVALID_NETMASK,
      );
    }

    if (!Ipv4Helper.isNet(route.address, route.mask)) {
      return ResponseStatus.createErrorStatus(
        `Invalid subnet: ${route.address}/${route.mask}`,
        RESPONSE_CODE.ERR_INVALID_SUBNET,
      );
    }

    return ResponseStatus.createSuccessStatus(
      'Route is valid',
      RESPONSE_CODE.ROUTE_IS_VALID,
    );
  }

  public getByUuid(uuid: string): ResponseStatus<{route: Route} | never> {
    const existing = this.findByUuid(uuid);

    if (!existing) {
      return ResponseStatus.createErrorStatus(
        `Route with uuid "${uuid}" not found`,
        RESPONSE_CODE.ERR_NOT_FOUND,
      );
    }

    return ResponseStatus.createSuccessStatus(
      `Route with uuid "${uuid}" found`,
      RESPONSE_CODE.ROUTE_FOUND,
      {route: existing},
    );
  }

  public getAll(): Route[] {
    return _.cloneDeep(this._routes);
  }

  public addRoute(route: Omit<Route, 'uuid'>): ResponseStatus<{uuid} | never> {
    if (!TRoute.omit({uuid: true}).check(route)) {
      return ResponseStatus.createErrorStatus(
        'Route object expected',
        RESPONSE_CODE.ERR_ROUTE_OBJECT_EXPECTED,
      );
    }

    if (this.findByProps(route)) {
      return ResponseStatus.createErrorStatus(
        'Same route already exists',
        RESPONSE_CODE.ERR_DUPLICATE,
      );
    }

    const validatorResponse = this.validateRoute(route);

    if (!validatorResponse.successful) {
      return validatorResponse;
    }

    const uuid = uuidv4();

    this._routes.push({...route, uuid});

    return ResponseStatus.createSuccessStatus<{uuid: string}>(
      `Route created: "${uuid}"`,
      RESPONSE_CODE.ROUTE_CREATED,
      {uuid},
    );
  }

  public updateRoute(uuid: string, route: Partial<Route>): ResponseStatus<{uuid} | never> {
    const existing = this.findByUuid(uuid);

    if (!existing) {
      return ResponseStatus.createErrorStatus(
        `Route with uuid "${uuid}" not found`,
        RESPONSE_CODE.ERR_NOT_FOUND,
      );
    }

    if (_.isEmpty(route)) {
      return ResponseStatus.createErrorStatus(
        'Route update data is empty',
        RESPONSE_CODE.ERR_NO_DATA,
      );
    }

    if (_.has(route, 'uuid')) {
      return ResponseStatus.createErrorStatus(
        'Route UUID is already set',
        RESPONSE_CODE.ERR_UUID_ALREADY_SET,
      );
    }

    const updated = {
      ...existing,
      ...route,
    };

    // Works for 'flat' interfaces like Route
    if (!_.isEqual(_.keys(updated), _.keys(existing))) {
      return ResponseStatus.createErrorStatus(
        'Route update data is not a partial route configuration',
        RESPONSE_CODE.ERR_ROUTE_OBJECT_EXPECTED,
      );
    }

    const validatorResponse = this.validateRoute(updated);

    if (!validatorResponse.successful) {
      return validatorResponse;
    }

    const index = this.findIndexByUuid(uuid);

    if (index === -1) {
      return ResponseStatus.createErrorStatus(
        `Route with uuid "${uuid}" is missing`,
        RESPONSE_CODE.ERR_NOT_FOUND,
      );
    }

    this._routes[index] = updated;

    return ResponseStatus.createSuccessStatus(
      `Route with uuid "${uuid}" updated`,
      RESPONSE_CODE.ROUTE_CHANGED,
      {uuid},
    );
  }

  public removeRoute(uuid: string): ResponseStatus<{uuid} | never> {
    const index = this.findIndexByUuid(uuid);

    if (index === -1) {
      return ResponseStatus.createErrorStatus(
        `Route with uuid "${uuid}" not found`,
        RESPONSE_CODE.ERR_NOT_FOUND,
      );
    }

    this._routes.splice(index, 1);

    return ResponseStatus.createSuccessStatus(
      `Route with uuid "${uuid}" deleted`,
      RESPONSE_CODE.ROUTE_DELETED,
      {uuid},
    );
  }

  public getRouteForIp(ip: string, mostSpecific: boolean = false): ResponseStatus<{via: Route | null; routed: boolean} | never> {
    if (!Ipv4Helper.isIpV4(ip)) {
      return ResponseStatus.createErrorStatus(
        `Invalid IPv4 passed: ${ip}`,
        RESPONSE_CODE.ERR_INVALID_IPV4,
      );
    }

    const matchingRoutes = this._routes.filter(route => Ipv4Helper.isIpInNet(ip, route.address, route.mask));

    let viaRoute;

    if (mostSpecific) {
      const byPrefixLength = matchingRoutes.sort((a, b) => {
        const prefixA = Ipv4Helper.maskToCidr(a.mask);
        const prefixB = Ipv4Helper.maskToCidr(b.mask);

        return prefixB - prefixA;
      });

      viaRoute = _.get(byPrefixLength, [0]);
    } else {
      viaRoute = _.get(matchingRoutes, [0]);
    }

    if (!viaRoute) {
      return ResponseStatus.createSuccessStatus(
        `No route for ${ip}`,
        RESPONSE_CODE.IP_UNROUTED,
        {
          via: null,
          routed: false,
        },
      );
    }

    return ResponseStatus.createSuccessStatus(
      `Found route for ${ip}`,
      RESPONSE_CODE.IP_ROUTED,
      {
        via: viaRoute,
        routed: true,
      },
    );
  }
}
