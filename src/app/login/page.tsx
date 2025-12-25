'use client';

import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { auth } from '@/firebase/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GoogleIcon } from '@/components/icons';
import { Logo } from '@/components/logo';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      // Use signInWithRedirect for better mobile compatibility
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  // The loading state will be true after redirecting back from Google
  // until the user state is confirmed by onAuthStateChanged.
  if (loading) {
     return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }
  
  // If user is already logged in (e.g. presses back button), redirect to dashboard
  if (user) {
     return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <p>Redirecting...</p>
      </div>
    );
  }


  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <Logo className="h-12 w-12" />
          </div>
          <CardTitle className="text-2xl font-bold">Welcome to EduConnect</CardTitle>
          <CardDescription>Your all-in-one academic portal.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <Button onClick={handleGoogleSignIn}>
              <GoogleIcon className="mr-2 h-5 w-5" />
              Sign in with Google
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              By signing in, you agree to our Terms of Service.
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
