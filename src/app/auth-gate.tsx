'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useUser } from '@/firebase';

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Wait until the auth state is determined.
    if (isUserLoading) {
      return;
    }

    const isAuthPage = pathname === '/';

    // If user is logged in...
    if (user) {
      // and they are on the login page, redirect to dashboard.
      if (isAuthPage) {
        router.push('/dashboard');
      }
    } 
    // If user is not logged in...
    else {
      // and they are on a protected page, redirect to login.
      if (!isAuthPage) {
        router.push('/');
      }
    }
  }, [user, isUserLoading, router, pathname]);

  // While loading, or if a redirect is imminent, show a loading screen.
  if (isUserLoading || (user && pathname === '/') || (!user && pathname !== '/')) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
}
