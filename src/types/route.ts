import { Static, String, Record } from 'runtypes';

export const TRoute = Record({
  uuid: String,
  address: String,
  mask: String,
  gateway: String,
  interface: String,
});

export type Route  = Static<typeof TRoute>;
