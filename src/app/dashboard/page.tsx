import Image from 'next/image';

import InterviewMeCard from '@/components/interview/InterviewMeCard';

export const metadata = {
  title: 'Dashboard | InterviewAI',
  description: 'Interview with AI'
};

const Dashboard = async () => {
  return (
    <>
      <InterviewMeCard />
      <Image
        src={'/curiosity.gif'}
        width={500}
        height={500}
        alt="loading"
        className="mx-auto mt-10"
      />
    </>
  );
};

export default Dashboard;
