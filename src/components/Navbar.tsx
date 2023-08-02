import Link from 'next/link';

import { getServerSession } from 'next-auth';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { ThemeToggle } from './ThemeToggle';
import UserAccountNav from './UserAccountNav';

const Navbar = async () => {
  const session = await getServerSession();

  return (
    <nav className="p-4 bg-transparent flex items-center justify-between container">
      <Link href="/" className="flex items-center">
        <h1 className={cn('text-2xl font-bold')}>InterviewAI</h1>
      </Link>
      <div className="flex items-center gap-x-2">
        {session?.user ? (
          <UserAccountNav user={session.user} />
        ) : (
          <Link href={'/api/auth/signin'}>
            <Button variant="outline" className="rounded-full">
              Login
            </Button>
          </Link>
        )}

        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
