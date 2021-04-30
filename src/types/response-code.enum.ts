export enum RESPONSE_CODE {
  // Error
  ERR_UNKNOWN = -1,               // unclassified error
  ERR_INVALID_JSON = -2,          // invalid JSON passed
  ERR_INVALID_METHOD = -3,        // unsupported HTTP method

  ERR_ROUTE_OBJECT_EXPECTED = 0,  // 'create/update route' methods expect Omit<Route, 'uuid'> payload
  ERR_INVALID_IPV4 = 1,           // invalid IPv4 passed as 'address', 'mask' or 'gateway'
  ERR_INVALID_NETMASK = 2,        // invalid netmask passed
  ERR_INVALID_SUBNET = 3,         // 'address' & 'mask' are not a subnet
  ERR_NOT_FOUND = 4,              // route not found
  ERR_DUPLICATE = 5,              // route already exists
  ERR_NO_DATA = 6,                // empty object passed to the 'update route' method
  ERR_UUID_ALREADY_SET = 7,       // 'uuid' passed to the'update route' method

  // Success
  ROUTE_CREATED = 100,            // route successfully created
  ROUTE_CHANGED = 101,            // route successfully updated
  ROUTE_DELETED = 102,            // route successfully deleted
  ROUTE_FOUND = 103,              // route with given UUID successfully found
  ROUTE_IS_VALID = 104,           // internal code
  ROUTE_LIST_EXISTS = 105,        // return code for 'get all routes' method

  IP_ROUTED = 200,                // some route for passed IP found
  IP_UNROUTED = 201,              // no route for passed IP found
}
