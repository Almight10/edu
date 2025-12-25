'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useUser } from '@/firebase';

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Jangan lakukan redirect jika masih loading
    if (isUserLoading) return;

    const isAuthPage = pathname === '/';

    // Jika pengguna sudah login dan berada di halaman login, arahkan ke dashboard
    if (user && isAuthPage) {
      router.push('/dashboard');
    } 
    // Jika pengguna belum login dan mencoba akses halaman selain login, arahkan ke halaman login
    else if (!user && !isAuthPage) {
      router.push('/');
    }
  }, [user, isUserLoading, router, pathname]);

  const isAuthPage = pathname === '/';
  
  // Tampilkan layar loading jika:
  // 1. Firebase sedang memeriksa status auth.
  // 2. Pengguna sudah login tapi masih di halaman login (menunggu redirect).
  // 3. Pengguna belum login tapi mencoba akses halaman terproteksi (menunggu redirect).
  if (isUserLoading || (user && isAuthPage) || (!user && !isAuthPage)) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  // Jika semua kondisi stabil dan pengguna berada di halaman yang tepat, tampilkan halaman.
  return <>{children}</>;
}
