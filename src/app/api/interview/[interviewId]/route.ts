import { NextResponse } from 'next/server';

import { prisma } from '@/lib/db';
import { getAuthSession } from '@/lib/nextauth';

export async function DELETE(
  req: Request,
  { params }: { params: { interviewId: string } }
) {
  const { interviewId } = params;

  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json(
        { error: 'You must be logged in to create a interview.' },
        {
          status: 401
        }
      );
    }
    if (!interviewId) {
      return NextResponse.json(
        { error: 'You must provide a interview id.' },
        {
          status: 400
        }
      );
    }

    const interview = await prisma.interview.findUnique({
      where: {
        id: interviewId
      }
    });
    if (!interview) {
      return NextResponse.json(
        { error: 'interview not found.' },
        {
          status: 404
        }
      );
    }
    const deletedInterview = await prisma.interview.delete({
      where: {
        id: interviewId,
        userId: session.user.id
      }
    });

    return NextResponse.json(
      { message: 'interview deleted successfully.', deletedInterview },
      {
        status: 200
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      {
        status: 500
      }
    );
  }
}
