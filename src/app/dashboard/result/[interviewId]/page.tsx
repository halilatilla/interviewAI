import { redirect } from 'next/navigation';
import React from 'react';

import AccuracyCard from '@/components/interviewDetail/AccuracyCard';
import QuestionsList from '@/components/interviewDetail/QuestionsList';
import ResultsCard from '@/components/interviewDetail/ResultsCard';
import TimeTakenCard from '@/components/interviewDetail/TimeTakenCard';
import { prisma } from '@/lib/db';

type Props = {
  params: {
    interviewId: string;
  };
};

const Statistics = async ({ params: { interviewId } }: Props) => {
  const interview = await prisma.interview.findUnique({
    where: { id: interviewId },
    include: { questions: true }
  });
  if (!interview) {
    return redirect('/dashboard');
  }

  let accuracy: number = 0;

  if (interview?.interviewType === 'SINGLE_SELECTION') {
    let totalCorrect = interview.questions.reduce((acc, question) => {
      if (question.isCorrect) {
        return acc + 1;
      }
      return acc;
    }, 0);
    accuracy = (totalCorrect / interview.questions.length) * 100;
  }
  accuracy = Math.round(accuracy * 100) / 100;

  return (
    <>
      <div className="p-8 mx-auto max-w-7xl">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            {interview.topic}
          </h2>
        </div>

        <div className="grid gap-4 mt-4 md:grid-cols-7">
          <ResultsCard accuracy={accuracy} />
          <AccuracyCard accuracy={accuracy} />
          <TimeTakenCard
            timeEnded={new Date(interview.timeEnded ?? 0)}
            timeStarted={new Date(interview.timeStarted ?? 0)}
          />
        </div>
        <QuestionsList questions={interview.questions} />
      </div>
    </>
  );
};

export default Statistics;
