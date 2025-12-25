'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useUser } from '@/firebase';

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isUserLoading) return; // Do nothing while loading

    const isLoginPage = pathname === '/login';

    // If logged in, redirect from /login or / to the dashboard
    if (user && (isLoginPage || pathname === '/')) {
      router.push('/dashboard');
    } 
    // If not logged in and not on the login page, redirect to login
    else if (!user && !isLoginPage) {
      router.push('/login');
    }
  }, [user, isUserLoading, router, pathname]);

  // Show a loading screen while we determine auth state or during redirects.
  // 1. Firebase is checking auth state.
  // 2. User is logged in but on a public page (waiting for redirect).
  // 3. User is not logged in but on a protected page (waiting for redirect).
  if (isUserLoading || (user && (pathname === '/login' || pathname === '/')) || (!user && pathname !== '/login')) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  // If all conditions are stable, render the page.
  return <>{children}</>;
}
