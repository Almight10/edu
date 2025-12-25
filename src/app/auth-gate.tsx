
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

    const isAuthPage = pathname === '/login';

    // If user is logged in
    if (user) {
      // If they are on the login page or root, redirect to dashboard
      if (isAuthPage || pathname === '/') {
        router.push('/dashboard');
      }
    } 
    // If user is not logged in
    else {
      // And they are not on the login page, redirect them there
      if (!isAuthPage) {
        router.push('/login');
      }
    }
  }, [user, isUserLoading, router, pathname]);

  // While loading, or if a redirect is imminent, show a loading screen.
  if (isUserLoading || (!user && pathname !== '/login') || (user && (pathname === '/login' || pathname === '/'))) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
}
