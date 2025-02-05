"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MapPin,
  Calendar,
  Info,
  Clock3,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { CampaignDialog } from "./CampaignDialog";
import { Badge } from "@/components/ui/badge";

interface CampaignCardProps {
  title: string;
  amount: number;
  location: string;
  dueDate: string;
  postedDate: string;
  company: {
    name: string;
    logo: string;
    description: string;
  };
  status: "open" | "confirmed" | "complete" | null;

  dateRange: string;
  timeRange: string;
}

const statusConfig = {
  open: {
    label: "Applied",
    color: "bg-blue-100 text-blue-800",
    icon: Clock3,
  },
  confirmed: {
    label: "Confirmed",
    color: "bg-green-100 text-green-800",
    icon: CheckCircle2,
  },
  complete: {
    label: "Completed",
    color: "bg-gray-100 text-gray-800",
    icon: XCircle,
  },
} as const;

export function CampaignCard({
  title,
  amount,
  location,
  dueDate,
  postedDate,
  company,
  status,
  dateRange,
  timeRange,
}: CampaignCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  let StatusIcon = null;
  if (status) {
    StatusIcon = statusConfig[status].icon;
  }

  return (
    <div className=" bg-gray-50 ">
      <Card
        className="hover:bg-muted/50 cursor-pointer"
        onClick={() => setIsDialogOpen(true)}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-1">
              <span className="text-xl font-bold">
                € {amount.toLocaleString()}
              </span>
              <Info className="h-4 w-4 text-muted-foreground" />
            </div>
            {status && StatusIcon && (
              <Badge variant="secondary" className={statusConfig[status].color}>
                <StatusIcon className="mr-1 h-3 w-3" />
                {statusConfig[status].label}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={company.logo} />
                  <AvatarFallback>{company.name[0]}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{company.name}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {location}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {dueDate}
              </div>
              <div className="text-sm text-muted-foreground">
                Posted {postedDate}
              </div>
            </div>
          </div>
          <div className="mt-2 text-sm text-muted-foreground">
            VAT / Sales Tax excluded
          </div>
        </CardContent>
      </Card>

      <CampaignDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        campaign={{
          title,
          amount,
          location,
          dateRange,
          timeRange,
          postedDate,
          company,
        }}
      />
    </div>
  );
}
