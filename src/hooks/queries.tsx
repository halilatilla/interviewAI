import { Interview } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getAllInterviews = async () => {
  const { data } = await axios.get('/api/interviews');

  return data?.interviews;
};

export const useGetAllInterviews = () => {
  const { data, isLoading, error } = useQuery<Interview[]>({
    queryKey: ['getAllInterviews'],
    queryFn: getAllInterviews
  });

  return {
    interviews: data,
    isLoading,
    error
  };
};
