
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { LogOut, Settings } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuth, useUser } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export function UserProfile() {
  const auth = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut(auth);
    router.push('/login');
  };
  
  if (!user) {
    return null;
  }

  const { displayName, email, photoURL } = user;
  const fallback = displayName ? displayName.charAt(0) : email?.charAt(0) || 'U';

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
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
