import { NextResponse } from 'next/server';

import { prisma } from '@/lib/db';
import { getAuthSession } from '@/lib/nextauth';

export async function GET() {
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

    const interviews = await prisma.interview.findMany({
      take: 100,
      where: {
        userId: session?.user?.id
      },
      include: {
        questions: true
      }
    });

    if (!interviews) {
      return NextResponse.json(
        { error: 'interview not found.' },
        {
          status: 404
        }
      );
    }

    return NextResponse.json(
      { interviews },
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
