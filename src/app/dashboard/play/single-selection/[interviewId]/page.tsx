import { redirect } from 'next/navigation';
import React from 'react';

import SingleSelection from '@/components/SingleSelection';
import { prisma } from '@/lib/db';

type Props = {
  params: {
    interviewId: string;
  };
};

const SingleSelectionPage = async ({ params: { interviewId } }: Props) => {
  const interview = await prisma.interview.findUnique({
    where: {
      id: interviewId
    },
    include: {
      questions: {
        select: {
          id: true,
          question: true,
          options: true
        }
      }
    }
  });

  if (!interview || interview.interviewType !== 'SINGLE_SELECTION') {
    return redirect('/dashboard/interview-create');
  }

  return <SingleSelection interview={interview} />;
};

export default SingleSelectionPage;
