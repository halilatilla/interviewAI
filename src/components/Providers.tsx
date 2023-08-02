'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

const queryClient = new QueryClient();

const Providers = ({ children }: ThemeProviderProps) => {
  return (
    <>
      <ProgressBar options={{ showSpinner: false }} color="#c7c7c7" />
      <QueryClientProvider client={queryClient}>
        <NextThemesProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <SessionProvider>{children}</SessionProvider>
        </NextThemesProvider>
      </QueryClientProvider>
    </>
  );
};

export default Providers;
