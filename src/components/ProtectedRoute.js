'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    if (loading || !user) {
        return (
          <div className="flex min-h-screen w-full items-center justify-center">
            <p>Loading...</p>
          </div>
        );
    }

    return <>{children}</>;
};

export default ProtectedRoute;
