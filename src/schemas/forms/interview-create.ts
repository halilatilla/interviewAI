import { z } from 'zod';

export const interviewCreationSchema = z.object({
  topic: z
    .string()
    .min(4, {
      message: 'Topic must be at least 4 characters long'
    })
    .max(50, {
      message: 'Topic must be at most 50 characters long'
    }),
  type: z.enum([
    'SINGLE_SELECTION',
    'FILL_IN',
    'TRUE_FALSE',
    'MULTI_SELECTION',
    'SINGLE_SELECTION_DROPDOWN'
  ]),
  amount: z.number().min(1).max(10)
});
