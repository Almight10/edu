'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useUser } from '@/firebase';

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If loading is finished, then we can check for routing
    if (!isUserLoading) {
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
    }
  }, [user, isUserLoading, router, pathname]);

  // This is the crucial part:
  // 1. While the user status is loading, always show a loading indicator.
  // 2. If the user IS logged in but currently on the login page, show loading while we redirect.
  // 3. If the user is NOT logged in but on a protected page, show loading while we redirect.
  const isAuthPage = pathname === '/';
  if (isUserLoading || (user && isAuthPage) || (!user && !isAuthPage)) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  // If none of the above conditions are met, the user is in the correct state/location.
  return <>{children}</>;
}
