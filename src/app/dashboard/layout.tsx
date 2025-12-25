'use client';

import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarFooter } from "@/components/ui/sidebar";
import { DashboardNav } from './components/dashboard-nav';
import { UserProfile } from './components/user-profile';
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <div className="flex min-h-screen">
          <Sidebar collapsible="icon" className="border-r">
            <SidebarHeader className="p-4">
               <div className="flex items-center gap-2">
                  <Logo className="w-8 h-8 text-sidebar-foreground" />
                  <h1 className="text-xl font-semibold text-sidebar-foreground">EduConnect</h1>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <DashboardNav />
            </SidebarContent>
            <SidebarFooter className="p-4">
              <UserProfile />
            </SidebarFooter>
          </Sidebar>
          <div className="flex flex-col flex-1">
             <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 py-4">
              <div className="relative ml-auto flex-1 md:grow-0">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full rounded-lg bg-card pl-8 md:w-[200px] lg:w-[320px]"
                />
              </div>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Toggle notifications</span>
              </Button>
            </header>
            <main className="flex-1 overflow-auto p-4 sm:p-6">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
