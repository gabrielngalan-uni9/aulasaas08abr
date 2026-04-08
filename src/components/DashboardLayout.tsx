import { Link, Outlet } from "react-router-dom";
import { LogOut } from "lucide-react";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { professionalProfile } from "@/lib/mock-data";

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center justify-between border-b px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <span className="text-sm font-medium text-foreground hidden sm:inline">
                {professionalProfile.name}
              </span>
            </div>
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sair</span>
              </Button>
            </Link>
          </header>

          <main className="flex-1 p-4 sm:p-6 max-w-4xl">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
