import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Train, CheckCircle, Wrench, AlertTriangle, RefreshCw } from "lucide-react";

interface TrainStatus {
  id: string;
  name: string;
  status: 'ready' | 'maintenance' | 'safety';
  location: string;
  lastInspection: string;
  nextMaintenance: string;
  issues?: string[];
}

export function FleetTab() {
  const [trains, setTrains] = useState<TrainStatus[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchFleetData();
  }, []);

  const fetchFleetData = async () => {
    setIsLoading(true);
    
    try {
      // Mock API call - replace with actual FastAPI endpoint
      // const response = await fetch('/fleet');
      // const data = await response.json();
      
      // Mock data
      setTimeout(() => {
        const mockTrains: TrainStatus[] = [
          {
            id: 'MR-101',
            name: 'Metro Rail 101',
            status: 'ready',
            location: 'Aluva Station',
            lastInspection: '2024-01-15',
            nextMaintenance: '2024-02-15',
          },
          {
            id: 'MR-102',
            name: 'Metro Rail 102',
            status: 'ready',
            location: 'Kochi Airport',
            lastInspection: '2024-01-14',
            nextMaintenance: '2024-02-14',
          },
          {
            id: 'MR-119',
            name: 'Metro Rail 119',
            status: 'maintenance',
            location: 'Muttom Depot',
            lastInspection: '2024-01-10',
            nextMaintenance: '2024-01-25',
            issues: ['Brake system check', 'Door mechanism servicing'],
          },
          {
            id: 'MR-123',
            name: 'Metro Rail 123',
            status: 'safety',
            location: 'Edapally Station',
            lastInspection: '2024-01-12',
            nextMaintenance: '2024-01-20',
            issues: ['Emergency brake alert', 'Safety system calibration'],
          },
        ];
        
        setTrains(mockTrains);
        setIsLoading(false);
      }, 1500);
      
    } catch (error) {
      setIsLoading(false);
      console.error('Failed to fetch fleet data:', error);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ready':
        return <CheckCircle className="h-5 w-5 text-status-ready" />;
      case 'maintenance':
        return <Wrench className="h-5 w-5 text-status-maintenance" />;
      case 'safety':
        return <AlertTriangle className="h-5 w-5 text-status-alert" />;
      default:
        return <Train className="h-5 w-5" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      ready: 'bg-status-ready text-white',
      maintenance: 'bg-status-maintenance text-white',
      safety: 'bg-status-alert text-white',
    };
    
    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const statusCounts = {
    ready: trains.filter(t => t.status === 'ready').length,
    maintenance: trains.filter(t => t.status === 'maintenance').length,
    safety: trains.filter(t => t.status === 'safety').length,
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading fleet status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">🚂 Fleet Status</h2>
        <Button variant="outline" onClick={fetchFleetData}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="metro-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-status-ready" />
              <div>
                <p className="text-2xl font-bold">{statusCounts.ready}</p>
                <p className="text-sm text-muted-foreground">Ready for Service</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="metro-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Wrench className="h-8 w-8 text-status-maintenance" />
              <div>
                <p className="text-2xl font-bold">{statusCounts.maintenance}</p>
                <p className="text-sm text-muted-foreground">Under Maintenance</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="metro-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-status-alert" />
              <div>
                <p className="text-2xl font-bold">{statusCounts.safety}</p>
                <p className="text-sm text-muted-foreground">Safety Alerts</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Train List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {trains.map((train) => (
          <Card key={train.id} className="metro-card">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  {getStatusIcon(train.status)}
                  {train.name}
                </CardTitle>
                {getStatusBadge(train.status)}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-foreground">Location</p>
                  <p className="text-muted-foreground">{train.location}</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Last Inspection</p>
                  <p className="text-muted-foreground">{train.lastInspection}</p>
                </div>
              </div>
              
              <div className="text-sm">
                <p className="font-medium text-foreground">Next Maintenance</p>
                <p className="text-muted-foreground">{train.nextMaintenance}</p>
              </div>
              
              {train.issues && train.issues.length > 0 && (
                <div className="text-sm">
                  <p className="font-medium text-foreground mb-1">Issues</p>
                  <ul className="text-muted-foreground space-y-1">
                    {train.issues.map((issue, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <AlertTriangle className="h-3 w-3 text-status-alert" />
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}