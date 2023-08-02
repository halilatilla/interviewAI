import { z } from 'zod';

export const getQuestionsSchema = z.object({
  topic: z.string(),
  amount: z.number().int().positive().min(1).max(10),
  type: z.enum([
    'SINGLE_SELECTION',
    'FILL_IN',
    'TRUE_FALSE',
    'MULTI_SELECTION',
    'SINGLE_SELECTION_DROPDOWN'
  ])
});

export const checkAnswerSchema = z.object({
  userInput: z.string(),
  questionId: z.string()
});

export const endInterviewSchema = z.object({
  interviewId: z.string()
});
