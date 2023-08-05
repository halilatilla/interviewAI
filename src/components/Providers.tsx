'use client';

import { useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

const Providers = ({ children }: ThemeProviderProps) => {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false
        }
      }
    })
  );
  return (
    <>
      <ProgressBar options={{ showSpinner: false }} color="#c7c7c7" />
      <QueryClientProvider client={client}>
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
