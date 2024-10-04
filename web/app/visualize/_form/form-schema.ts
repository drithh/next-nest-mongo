import { telecomsControllerGetAvailabilitiesQueryParams } from '@/generated/zod/api.zod';
import { z } from 'zod';

export const getGraphTelecomSchema =
  telecomsControllerGetAvailabilitiesQueryParams;

export type GetGraphTelecomSchema = z.infer<typeof getGraphTelecomSchema>;
