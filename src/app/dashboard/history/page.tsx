import HistoryComponent from '@/components/history/HistoryComponent';
import { prisma } from '@/lib/db';
import { getAuthSession } from '@/lib/nextauth';

const History = async () => {
  const session = await getAuthSession();

  if (!session?.user) return null;

  const interviews = await prisma.interview.findMany({
    take: 100,
    where: {
      userId: session?.user?.id
    },
    orderBy: {
      timeStarted: 'desc'
    }
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {interviews.map(interview => (
        <HistoryComponent key={interview.id} interview={interview} />
      ))}
    </div>
  );
};

export default History;
