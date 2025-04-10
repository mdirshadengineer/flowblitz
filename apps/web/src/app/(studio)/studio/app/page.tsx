'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from 'global/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'global/ui/tabs';
import { Alert, AlertDescription } from 'global/ui/alert';
import { Badge } from 'global/ui/badge';
import { Progress } from 'global/ui/progress';
import { Separator } from 'global/ui/separator';
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  GitPullRequest,
  Settings,
  Shield
} from 'lucide-react';

// Mock data - replace with real data from your API
const applications = [
  {
    id: 1,
    name: 'E-commerce Platform',
    status: 'pending_approval',
    environment: 'production',
    deploymentProgress: 0,
    lastUpdated: '2024-03-20T10:00:00',
    configuration: {
      runtime: 'Node.js 20',
      region: 'us-east-1',
      memory: '1GB'
    },
    approvers: ['John Doe', 'Jane Smith']
  },
  {
    id: 2,
    name: 'Customer Portal',
    status: 'in_progress',
    environment: 'staging',
    deploymentProgress: 65,
    lastUpdated: '2024-03-20T09:30:00',
    configuration: {
      runtime: 'Node.js 18',
      region: 'eu-west-1',
      memory: '2GB'
    },
    approvers: ['Mike Johnson']
  },
  {
    id: 3,
    name: 'Admin Dashboard',
    status: 'blocked',
    environment: 'development',
    deploymentProgress: 30,
    lastUpdated: '2024-03-20T08:45:00',
    configuration: {
      runtime: 'Node.js 20',
      region: 'ap-south-1',
      memory: '1.5GB'
    },
    approvers: ['Sarah Wilson', 'Tom Brown']
  }
];

// Shows Application related information there running transactions and lot of things
export default function ApplicationsDashboard() {
  const [currentTime, setCurrentTime] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString());
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Deployment Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">
              Monitor and manage your application deployments
            </p>
          </div>
          <div className="flex gap-4">
            <Badge variant="outline" className="px-4 py-2">
              <Clock className="w-4 h-4 mr-2" />
              Last updated: {currentTime}
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="bg-black">
            <TabsTrigger value="all">All Applications</TabsTrigger>
            <TabsTrigger value="pending">Pending Approval</TabsTrigger>
            <TabsTrigger value="blocked">Blocked</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {applications.map(app => (
              <ApplicationCard
                key={app.id}
                app={app}
                onSelect={() => router.push(`/studio/app/${app.id}`)}
              />
            ))}
          </TabsContent>

          <TabsContent value="pending">
            {applications
              .filter(app => app.status === 'pending_approval')
              .map(app => (
                <ApplicationCard
                  key={app.id}
                  app={app}
                  onSelect={() => router.push(`/studio/app/${app.id}`)}
                />
              ))}
          </TabsContent>

          <TabsContent value="blocked">
            {applications
              .filter(app => app.status === 'blocked')
              .map(app => (
                <ApplicationCard
                  key={app.id}
                  app={app}
                  onSelect={() => router.push(`/studio/app/${app.id}`)}
                />
              ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function ApplicationCard({
  app,
  onSelect
}: {
  app: {
    id: number;
    name: string;
    status: string;
    environment: string;
    deploymentProgress: number;
    lastUpdated: string;
    configuration: {
      runtime: string;
      region: string;
      memory: string;
    };
    approvers: string[];
  };
  onSelect: () => void;
}) {
  const [formattedDate, setFormattedDate] = useState<string>('');

  useEffect(() => {
    setFormattedDate(new Date(app.lastUpdated).toLocaleString());
  }, [app.lastUpdated]);

  return (
    <Card
      className="cursor-pointer bg-black hover:bg-accent/40 transition-colors"
      onClick={onSelect}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-xl font-bold">{app.name}</CardTitle>
          <CardDescription>Environment: {app.environment}</CardDescription>
        </div>
        <StatusBadge status={app.status} />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Deployment Progress</h4>
              <Progress value={app.deploymentProgress} className="h-2" />
              <p className="text-sm text-muted-foreground mt-1">
                {app.deploymentProgress}% Complete
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Approvers</h4>
              <div className="flex gap-2">
                {app.approvers.map((approver: string) => (
                  <Badge key={approver} variant="secondary">
                    <Shield className="w-3 h-3 mr-1" />
                    {approver}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-2">Configuration</h4>
            <div className="space-y-2">
              {Object.entries(app.configuration).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-muted-foreground capitalize">
                    {key}
                  </span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <GitPullRequest className="w-4 h-4 mr-1" />
            Last updated {formattedDate}
          </div>
          <div className="flex items-center">
            <Settings className="w-4 h-4 mr-1" />
            <span className="hover:underline">View Details</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case 'pending_approval':
      return (
        <Badge className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20">
          <Clock className="w-3 h-3 mr-1" />
          Pending Approval
        </Badge>
      );
    case 'in_progress':
      return (
        <Badge className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">
          <CheckCircle2 className="w-3 h-3 mr-1" />
          In Progress
        </Badge>
      );
    case 'blocked':
      return (
        <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20">
          <AlertCircle className="w-3 h-3 mr-1" />
          Blocked
        </Badge>
      );
    default:
      return null;
  }
}
