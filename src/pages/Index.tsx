import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { ChatTab } from "@/components/tabs/ChatTab";
import { FleetTab } from "@/components/tabs/FleetTab";
import { DocumentsTab } from "@/components/tabs/DocumentsTab";
import { SearchTab } from "@/components/tabs/SearchTab";
import { Button } from "@/components/ui/button";
import { Train, LogOut, User } from "lucide-react";

export type TabType = "chat" | "fleet" | "documents" | "search";

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabType>("chat");
  const [uploadedDocuments, setUploadedDocuments] = useState<any[]>([]);
  const [user] = useState({ username: "Engineer" }); // Mock user for demo

  const handleDocumentUpload = (documents: any[]) => {
    setUploadedDocuments(prev => [...prev, ...documents]);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case "chat":
        return <ChatTab />;
      case "fleet":
        return <FleetTab />;
      case "documents":
        return <DocumentsTab documents={uploadedDocuments} onUpload={handleDocumentUpload} />;
      case "search":
        return <SearchTab />;
      default:
        return <ChatTab />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-background">
        {/* Header */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="h-8 w-8" />
            
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-lg">
                <Train className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-foreground">
                  🚇 Metro Rail Document Intelligence
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
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </header>
        
        {/* Main Layout with Sidebar */}
        <div className="flex w-full">
          <DashboardSidebar 
            activeTab={activeTab} 
            onTabChange={setActiveTab}
            onDocumentUpload={handleDocumentUpload}
          />
          
          <main className="flex-1 p-6">
            {renderActiveTab()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
