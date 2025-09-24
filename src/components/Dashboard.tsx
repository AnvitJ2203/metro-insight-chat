import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardHeader } from "./DashboardHeader";
import { ChatTab } from "./tabs/ChatTab";
import { FleetTab } from "./tabs/FleetTab";
import { DocumentsTab } from "./tabs/DocumentsTab";
import { SearchTab } from "./tabs/SearchTab";

export type TabType = "chat" | "fleet" | "documents" | "search";

interface DashboardProps {
  user: { username: string };
  onLogout: () => void;
}

export function Dashboard({ user, onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>("chat");
  const [uploadedDocuments, setUploadedDocuments] = useState<any[]>([]);

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
        <DashboardHeader user={user} onLogout={onLogout} />
        
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
}