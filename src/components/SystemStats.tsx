import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Train, Shield, Wrench } from "lucide-react";

interface Stats {
  documents: number;
  trains: {
    total: number;
    ready: number;
    maintenance: number;
    safety: number;
  };
}

export function SystemStats() {
  const [stats, setStats] = useState<Stats>({
    documents: 0,
    trains: {
      total: 24,
      ready: 18,
      maintenance: 4,
      safety: 2,
    },
  });

  useEffect(() => {
    // Mock API call to fetch stats - replace with actual FastAPI endpoint
    // fetch('/fleet')
    //   .then(res => res.json())
    //   .then(data => setStats(data));
    
    // Simulate data loading
    setTimeout(() => {
      setStats(prev => ({
        ...prev,
        documents: 156,
      }));
    }, 1000);
  }, []);

  const statItems = [
    {
      label: "Documents",
      value: stats.documents,
      icon: FileText,
      color: "text-blue-600",
    },
    {
      label: "Total Trains",
      value: stats.trains.total,
      icon: Train,
      color: "text-gray-600",
    },
    {
      label: "Ready",
      value: stats.trains.ready,
      icon: Shield,
      color: "text-green-600",
    },
    {
      label: "Maintenance",
      value: stats.trains.maintenance,
      icon: Wrench,
      color: "text-yellow-600",
    },
  ];

  return (
    <div className="space-y-3">
      {statItems.map((item) => (
        <Card key={item.label} className="bg-sidebar-accent border-sidebar-border">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-sidebar-foreground/70">{item.label}</p>
                <p className="text-lg font-semibold text-sidebar-foreground">
                  {item.value}
                </p>
              </div>
              <item.icon className={`h-5 w-5 ${item.color}`} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}