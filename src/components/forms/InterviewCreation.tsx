'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { interviewCreationSchema } from '@/schemas/forms/interview-create';

import LoadingQuestions from '../LoadingQuestions';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useToast } from '../ui/use-toast';

type Props = {
  topic: string;
};

type Input = z.infer<typeof interviewCreationSchema>;

const InterviewCreation = ({ topic: topicParam }: Props) => {
  const router = useRouter();
  const [showLoader, setShowLoader] = React.useState(false);
  const [finishedLoading, setFinishedLoading] = React.useState(false);
  const { toast } = useToast();
  const { mutate: getQuestions, isLoading } = useMutation({
    mutationFn: async ({ amount, topic, type }: Input) => {
      const response = await axios.post('/api/interview', {
        amount,
        topic,
        type
      });
      return response.data;
    }
  });

  const form = useForm<Input>({
    resolver: zodResolver(interviewCreationSchema),
    defaultValues: {
      topic: topicParam,
      type: 'SINGLE_SELECTION',
      amount: 3
    }
  });

  const onSubmit = async (data: Input) => {
    setShowLoader(true);
    getQuestions(data, {
      onError: error => {
        setShowLoader(false);
        if (error instanceof AxiosError) {
          if (error.response?.status === 500) {
            toast({
              title: 'Error',
              description: 'Something went wrong. Please try again later.',
              variant: 'destructive'
            });
          }
        }
      },
      onSuccess: ({ interviewId }: { interviewId: string }) => {
        setFinishedLoading(true);
        setTimeout(() => {
          router.push(`/dashboard/play/single-selection/${interviewId}`);
        }, 2000);
      }
    });
  };

  if (showLoader) {
    return <LoadingQuestions finished={finishedLoading} />;
  }

  return (
    <div className="max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Interview Creation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Topic</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter a topic" {...field} />
                    </FormControl>
                    <FormDescription>
                      Please provide any topic you would like to be interview on
                      here.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Questions</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="How many questions?"
                        type="number"
                        {...field}
                        onChange={e => {
                          form.setValue('amount', parseInt(e.target.value));
                        }}
                        min={1}
                        max={10}
                      />
                    </FormControl>
                    <FormDescription>
                      You can choose how many questions you would like to be
                      interview on here.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button disabled={isLoading} className="w-full" type="submit">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default InterviewCreation;
