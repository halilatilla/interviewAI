import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

import { useToast } from '@/components/ui/use-toast';

export const useDeleteInterview = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate: deleteInterviewMutation } = useMutation(
    async (id: string) => {
      const response = await axios.delete(`/api/interview/${id}`);
      return response.data;
    },
    {
      onSuccess: () => {
        toast({
          title: 'Interview deleted',
          description: 'Your interview has been deleted.',
          variant: 'success'
        });
        queryClient.invalidateQueries({ queryKey: ['getAllInterviews'] });
      },
      onError: error => {
        if (error instanceof AxiosError) {
          if (error.response?.status === 500) {
            toast({
              title: 'Error',
              description: 'Something went wrong. Please try again later.',
              variant: 'destructive'
            });
          }
        }
      }
    }
  );

  return deleteInterviewMutation;
};
