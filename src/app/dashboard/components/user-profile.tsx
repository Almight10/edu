'use client';

import { LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { auth } from '@/firebase/firebase.js';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext.js';

export function UserProfile() {
  const { user } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error("Error signing out", error);
    }
  };
  
  if (!user) {
    return (
      <Button variant="ghost" className="relative h-auto justify-start gap-3 w-full px-2">
          <Avatar className="h-9 w-9">
            <AvatarFallback>?</AvatarFallback>
          </Avatar>
      </Button>
    );
  }

  const { displayName, email, photoURL } = user;
  const fallback = displayName ? displayName.charAt(0).toUpperCase() : email?.charAt(0).toUpperCase() || 'U';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-auto justify-start gap-3 w-full px-2">
            <Avatar className="h-9 w-9">
              {photoURL && <AvatarImage src={photoURL} alt={displayName || 'User Avatar'} />}
              <AvatarFallback>{fallback}</AvatarFallback>
            </Avatar>
            <div className="text-left group-data-[collapsible=icon]:hidden">
                <p className="text-sm font-medium text-sidebar-foreground">{displayName || 'User'}</p>
                <p className="text-xs text-sidebar-foreground/70">{email}</p>
            </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{displayName || 'User'}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
