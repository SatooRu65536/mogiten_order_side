import { z } from 'zod';

const zResWaiting = z.object({
  status: z.literal('connected'),
  key: z.string(),
});

const zResPayed = z.object({
  status: z.literal('payed'),
  id: z.number(),
});

export const zWSResponse = z.union([zResWaiting, zResPayed]);
