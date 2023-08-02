'use client';

import Link from 'next/link';

import TypewriterComponent from 'typewriter-effect';

import { Button } from '@/components/ui/button';

const LandingHero = () => {
  return (
    <div className="font-bold py-36 text-center space-y-5">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
        <h1>Interview AI for</h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-400 h-[72px] ">
          <TypewriterComponent
            options={{
              strings: ['Frontend', 'Backend', 'Fullstack', 'DevOps'],
              autoStart: true,
              loop: true
            }}
          />
        </div>
      </div>
      <div className="text-sm md:text-xl font-light text-zinc-400">
        InterviewAI is the best tool for generating interview questions for
        developers.
      </div>
      <div>
        <Link href={'/api/auth/signin'}>
          <Button className="md:text-lg p-4 md:p-6 rounded-full font-semibold">
            Start Interview For Free
          </Button>
        </Link>
      </div>
      <div className="text-zinc-400 text-xs md:text-sm font-normal">
        No credit card required.
      </div>
    </div>
  );
};

export default LandingHero;
