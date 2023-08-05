'use client';

import HistoryComponent from '@/components/history/HistoryComponent';
import { useGetAllInterviews } from '@/hooks/queries';

const History = () => {
  const { interviews, isLoading } = useGetAllInterviews();

  if (isLoading) return <p>Loading...</p>;
  if (!interviews) return <p>No interviews</p>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {interviews?.map(interview => (
        <HistoryComponent key={interview.id} interview={interview} />
      ))}
    </div>
  );
};

export default History;
