import { NextResponse } from 'next/server';

import { ZodError } from 'zod';

import { prisma } from '@/lib/db';
import { checkAnswerSchema } from '@/schemas/questions';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { questionId, userInput } = checkAnswerSchema.parse(body);
    const question = await prisma.question.findUnique({
      where: { id: questionId }
    });
    if (!question) {
      return NextResponse.json(
        {
          message: 'Question not found'
        },
        {
          status: 404
        }
      );
    }
    await prisma.question.update({
      where: { id: questionId },
      data: { userAnswer: userInput }
    });
    if (question.questionType === 'SINGLE_SELECTION') {
      const isCorrect =
        question.answer.toLowerCase().trim() === userInput.toLowerCase().trim();
      await prisma.question.update({
        where: { id: questionId },
        data: { isCorrect }
      });
      return NextResponse.json({
        isCorrect
      });
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          message: error.issues
        },
        {
          status: 400
        }
      );
    }
  }
}
