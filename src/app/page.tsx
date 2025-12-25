'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { useAuth, useUser } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GoogleIcon } from '@/components/icons';
import { Logo } from '@/components/logo';

export default function LoginPage() {
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    // If the user is already authenticated, redirect them to the dashboard.
    if (!isUserLoading && user) {
      router.push('/dashboard');
    }
  }, [user, isUserLoading, router]);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    // The redirect will be handled by Firebase's onAuthStateChanged listener
    // which is managed by the useUser hook.
    await signInWithRedirect(auth, provider);
  };

  // While checking auth state or if user is logged in, show loading.
  // This prevents a flash of the login page before redirecting.
  if (isUserLoading || user) {
    return (
      <main className="flex min-h-screen w-full items-center justify-center bg-background p-4">
        <p>Loading...</p>
      </main>
    );
  }

  // If not loading and no user, show the login page.
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
