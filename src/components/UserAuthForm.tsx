'use client';

import { signIn } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  return (
    <div className={cn('grid gap-2', className)} {...props}>
      <Button
        variant="outline"
        type="button"
        onClick={() => signIn('github').catch(console.error)}
      >
        Github
      </Button>
      <Button
        variant="outline"
        type="button"
        onClick={() => signIn('google').catch(console.error)}
      >
        Google
      </Button>
    </div>
  );
}
