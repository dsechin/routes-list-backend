Это простой сервер, написанный на [Express](https://expressjs.com/), который реализует API для работы со "списком сетевых маршрутов".

<br/>

## Для запуска:

```
// склонируйте репозиторий
https://github.com/dsechin/routes-list-backend.git

// установите зависимости и запустите сервер
npm install
npm start
```

После этого он будет отвечать на 3333 порту (изменить порт можно, задав переменную окружения `PORT`).

## API:

```typescript
interface Response {
  'message': string;
  'code': number; // в конце документа описаны возможные коды
  'successful': boolean;
  'payload': any; // зависит от запроса; для ответов с 'successful: false' -> 'payload: null'
}
```

### Методы

#### Получить полный список маршрутов

> **GET /api/routes**
```json
{
  "message": "Routes list",
  "code": 105,
  "successful": true,
  "payload": {
    "routes": [
      {
        "uuid": "b06f49e0-c9a6-45a5-8ba7-d0039301ed15",
        "address": "192.168.0.0",
        "mask": "255.255.0.0",
        "gateway": "192.168.0.1",
        "interface": "VPN"
      },
      {
        "uuid": "f2587332-5038-47ff-bda8-494a548486de",
        "address": "0.0.0.0",
        "mask": "0.0.0.0",
        "gateway": "33.44.32.1",
        "interface": "ISP"
      }
    ]
  }
}
```

<br/>

#### Получить маршрут по UUID

> **GET /api/routes/{uuid}**

```json
{
  "message": "Route with uuid \"c20378cc-c971-43a3-bd3f-a24a58058ea3\" found",
  "code": 103,
  "successful": true,
  "payload": {
    "route": {
      "uuid": "c20378cc-c971-43a3-bd3f-a24a58058ea3",
      "address": "192.168.0.0",
      "mask": "255.255.0.0",
      "gateway": "192.168.0.1",
      "interface": "VPN"
    }
  }
}
```

<br/>

#### Создать маршрут (сервер вернет присвоенный UUID)

> **POST /api/routes**

Данные запроса:

```json
{
	"address": "1.1.2.0",
	"mask": "255.255.255.0",
	"gateway": "1.1.2.1",
	"interface": "foo"
}
```

Успешный ответ:

```json
{
  "message": "Route created: \"190f090c-69f5-41ea-8036-acef07b0a476\"",
  "code": 100,
  "successful": true,
  "payload": {
    "uuid": "190f090c-69f5-41ea-8036-acef07b0a476"
  }
}
```

<br/>

#### Изменить маршрут

> **PUT /api/routes/{uuid}**

Данные запроса (любой набор полей из `Route`, кроме `uuid`):

```json
{
  "address": "1.1.3.0",
}
```

Успешный ответ:

```json
{
  "message": "Route with uuid \"b06f49e0-c9a6-45a5-8ba7-d0039301ed15\" updated",
  "code": 101,
  "successful": true,
  "payload": {
    "uuid": "b06f49e0-c9a6-45a5-8ba7-d0039301ed15"
  }
}
```

<br/>

#### Удалить маршрут

> **DELETE /api/routes/{uuid}**

Успешный ответ:

```json
{
  "message": "Route with uuid \"b06f49e0-c9a6-45a5-8ba7-d0039301ed15\" deleted",
  "code": 102,
  "successful": true,
  "payload": {
    "uuid": "b06f49e0-c9a6-45a5-8ba7-d0039301ed15"
  }
}
```


#### Найти маршрут для переданного IP

> **GET /api/route/for-ip/{ip}**


Параметры запроса:

most-specific: boolean – опиционально; если передано значение true,вернется маршрут с [наибольшим совпадающим префиксом](https://en.wikipedia.org/wiki/Longest_prefix_match).

```
/api/route/for-ip/1.1.1.1?most-specific=true
```

Успешный ответ:

```json
{
  "message": "Found route for 2.2.223.2",
  "code": 200,
  "successful": true,
  "payload": {
    "via": {
      "uuid": "89ca5d55-6090-46e3-8a21-af603a7adde5",
      "address": "0.0.0.0",
      "mask": "0.0.0.0",
      "gateway": "33.44.32.1",
      "interface": "ISP"
    },
    "routed": true
  }
}
```
<br/>
<br/>

### Коды ответа

Возможные значения поля code в `Response`

```typescript
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
```
