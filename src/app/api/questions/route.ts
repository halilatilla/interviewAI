import { NextResponse } from 'next/server';

import { ZodError } from 'zod';

import { strict_output } from '@/lib/gpt';
import { getQuestionsSchema } from '@/schemas/questions';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, topic, type } = getQuestionsSchema.parse(body);
    let questions: any;
    if (type === 'SINGLE_SELECTION') {
      questions = await strict_output(
        'You are a helpful AI that is able to generate single selection questions and answers, the length of each answer should not be more than 15 words, store all answers and questions and options in a JSON array',
        new Array(amount).fill(
          `You are to generate a random hard single selection question about ${topic}`
        ),
        {
          question: 'question',
          answer: 'answer with max length of 15 words',
          option1: 'option1 with max length of 15 words',
          option2: 'option2 with max length of 15 words',
          option3: 'option3 with max length of 15 words'
        }
      );
    }
    console.log('into questions api', questions);

    return NextResponse.json(
      {
        questions: questions
      },
      {
        status: 200
      }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.issues },
        {
          status: 400
        }
      );
    } else {
      console.error('elle gpt error', error);
      return NextResponse.json(
        { error: 'An unexpected error occurred.' },
        {
          status: 500
        }
      );
    }
  }
}
