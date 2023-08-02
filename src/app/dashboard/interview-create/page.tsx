import InterviewCreation from '@/components/forms/InterviewCreation';

export const metadata = {
  title: 'Interview | InterviewAI',
  description: 'Interview with AI'
};

interface Props {
  searchParams: {
    topic?: string;
  };
}

const InterviewCreationPage = async ({ searchParams }: Props) => {
  return <InterviewCreation topic={searchParams.topic ?? ''} />;
};

export default InterviewCreationPage;
