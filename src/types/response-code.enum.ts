export enum RESPONSE_CODE {
  ERR_UNKNOWN = -1,

  ERR_ROUTE_OBJECT_EXPECTED = 0,
  ERR_INVALID_IPV4 = 1,
  ERR_INVALID_NETMASK = 2,
  ERR_INVALID_SUBNET = 3,
  ERR_NOT_FOUND = 4,
  ERR_DUPLICATE = 5,
  ERR_NO_DATA = 6,
  ERR_UUID_ALREADY_SET = 7,


  ROUTE_CREATED = 100,
  ROUTE_CHANGED = 101,
  ROUTE_DELETED = 102,
  ROUTE_FOUND = 103,
  ROUTE_IS_VALID = 104,

  IP_ROUTED = 200,
  IP_UNROUTED = 201,
}
