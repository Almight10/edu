'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useUser } from '@/firebase';

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Jangan lakukan apapun jika status user masih loading
    if (isUserLoading) return;

    const isAuthPage = pathname === '/';

    // Jika sudah login dan ada di halaman login, arahkan ke dashboard
    if (user && isAuthPage) {
      router.push('/dashboard');
    } 
    // Jika belum login dan mencoba akses halaman selain login, arahkan ke login
    else if (!user && !isAuthPage) {
      router.push('/');
    }
  }, [user, isUserLoading, router, pathname]);

  // --- LOGIKA UTAMA ---
  // Selalu tampilkan loading jika Firebase masih memeriksa atau jika redirect sedang terjadi.
  const isAuthPage = pathname === '/';
  if (isUserLoading || (user && isAuthPage) || (!user && !isAuthPage)) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  // Jika semua kondisi stabil, tampilkan halaman.
  return <>{children}</>;
}
