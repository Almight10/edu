'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useUser } from '@/firebase';

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isUserLoading) return; // Jangan lakukan apa-apa jika masih loading.

    const isAuthPage = pathname === '/';

    if (user && isAuthPage) {
      // Jika sudah login dan ada di halaman login, arahkan ke dashboard.
      router.push('/dashboard');
    } else if (!user && !isAuthPage) {
      // Jika belum login dan mencoba akses halaman selain login, arahkan ke login.
      router.push('/');
    }
  }, [user, isUserLoading, router, pathname]);

  // Tampilkan layar loading jika:
  // 1. Status user masih diperiksa (isUserLoading).
  // 2. ATAU jika redirect sedang akan terjadi (misalnya, user sudah login tapi masih di halaman auth, atau sebaliknya).
  const isAuthPage = pathname === '/';
  if (isUserLoading || (user && isAuthPage) || (!user && !isAuthPage)) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  // Jika semua kondisi sudah stabil dan pengguna berada di halaman yang tepat, tampilkan halaman.
  return <>{children}</>;
}
