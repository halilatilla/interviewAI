import { redirect } from 'next/navigation';

import LandingContent from '@/components/landing/LandingContent';
import LandingHero from '@/components/landing/LandingHero';
import { getAuthSession } from '@/lib/nextauth';

const LandingPage = async () => {
  const session = await getAuthSession();
  if (session) {
    return redirect('/dashboard');
  }
  return (
    <div className="container">
      <LandingHero />
      <LandingContent />
    </div>
  );
};

export default LandingPage;
