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
    const isAuthPage = pathname === '/';
    if (user && isAuthPage) {
      router.push('/dashboard');
    } else if (!user && !isAuthPage) {
      router.push('/');
    }
  }, [user, isUserLoading, router, pathname]);

  const isAuthPage = pathname === '/';

  // While loading, or if a redirect is imminent, show a loading screen.
  if (isUserLoading || (user && isAuthPage) || (!user && !isAuthPage)) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
}
