'use client';

import { useState, useEffect } from 'react';
import { Auth, User, onAuthStateChanged } from 'firebase/auth';

export function useAuthListener(auth: Auth) {
  const [user, setUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [userError, setUserError] = useState<Error | null>(null);

  useEffect(() => {
    // Set loading to true whenever the auth instance changes
    setIsUserLoading(true);

    const listener = onAuthStateChanged(
      auth,
      (authUser) => {
        setUser(authUser);
        setIsUserLoading(false);
      },
      (error) => {
        setUserError(error);
        setIsUserLoading(false);
      }
    );

    return () => listener();
  }, [auth]);

  return { user, isUserLoading, userError };
}
