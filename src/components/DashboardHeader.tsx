import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Train, LogOut, User } from "lucide-react";

interface DashboardHeaderProps {
  user: { username: string };
  onLogout: () => void;
}

export function DashboardHeader({ user, onLogout }: DashboardHeaderProps) {
  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="h-8 w-8" />
        
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary rounded-lg">
            <Train className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">
              Metro Rail Document Intelligence
            </h1>
            <p className="text-sm text-muted-foreground">KMRL Engineering Portal</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="h-4 w-4" />
          <span>Welcome, {user.username}</span>
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onLogout}
          className="flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </header>
  );
}