import { z } from 'zod';

export const createTelecomSchema = z.object({
  file: z.custom<File | null>(
    (data) => data === null || data instanceof File,
    'Data is not an instance of a File'
  ),
});

export type CreateTelecomSchema = z.infer<typeof createTelecomSchema>;
