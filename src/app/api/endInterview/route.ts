import { NextResponse } from 'next/server';

import { prisma } from '@/lib/db';
import { endInterviewSchema } from '@/schemas/questions';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { interviewId } = endInterviewSchema.parse(body);

    const interview = await prisma.interview.findUnique({
      where: {
        id: interviewId
      }
    });
    if (!interview) {
      return NextResponse.json(
        {
          message: 'interview not found'
        },
        {
          status: 404
        }
      );
    }
    await prisma.interview.update({
      where: {
        id: interviewId
      },
      data: {
        timeEnded: new Date()
      }
    });
    return NextResponse.json({
      message: 'interview ended'
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Something went wrong'
      },
      { status: 500 }
    );
  }
}
