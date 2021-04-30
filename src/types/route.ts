import * as z from 'zod';

export const TRoute = z.object({
  uuid: z.string(),
  address: z.string(),
  mask: z.string(),
  gateway: z.string(),
  interface: z.string(),
});

export type Route  = z.infer<typeof TRoute>;
