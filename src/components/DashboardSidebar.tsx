import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { MessageCircle, Train, FileText, Search, Upload, BarChart3 } from "lucide-react";
import { TabType } from "./Dashboard";
import { FileUpload } from "./FileUpload";
import { SystemStats } from "./SystemStats";

interface DashboardSidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onDocumentUpload: (documents: any[]) => void;
}

const menuItems = [
  { id: "chat" as TabType, label: "💬 Chat Assistant", icon: MessageCircle },
  { id: "fleet" as TabType, label: "🚂 Fleet Status", icon: Train },
  { id: "documents" as TabType, label: "📑 Documents", icon: FileText },
  { id: "search" as TabType, label: "🔍 Search", icon: Search },
];

export function DashboardSidebar({ activeTab, onTabChange, onDocumentUpload }: DashboardSidebarProps) {
  return (
    <Sidebar className="w-80 border-r border-sidebar-border">
      <SidebarContent className="bg-sidebar">
        {/* Upload Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Upload Documents
          </SidebarGroupLabel>
          <SidebarGroupContent className="p-4">
            <FileUpload onUpload={onDocumentUpload} />
          </SidebarGroupContent>
        </SidebarGroup>

        {/* System Stats */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            System Overview
          </SidebarGroupLabel>
          <SidebarGroupContent className="p-4">
            <SystemStats />
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Navigation Menu */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    asChild
                    isActive={activeTab === item.id}
                    className="w-full justify-start"
                  >
                    <button 
                      onClick={() => onTabChange(item.id)}
                      className="flex items-center gap-3 w-full"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}