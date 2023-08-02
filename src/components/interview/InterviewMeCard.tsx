'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

import { Swords } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const InterviewMeCard = () => {
  const router = useRouter();
  return (
    <Card
      className="hover:cursor-pointer hover:opacity-75"
      onClick={() => {
        router.push('/dashboard/interview-create');
      }}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-2xl font-bold">Interview me!</CardTitle>
        <Swords size={28} strokeWidth={2.5} />
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Challenge yourself to a interview with a topic of your choice.
        </p>
      </CardContent>
    </Card>
  );
};

export default InterviewMeCard;
