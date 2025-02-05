"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Calendar, Info } from "lucide-react"
import { CampaignDialog } from "./CampaignDialog"

interface CampaignCardProps {
  title: string
  amount: number
  location: string
  dueDate: string
  postedDate: string
  company: {
    name: string
    logo: string
    description: string
  }
  dateRange: string
  timeRange: string
}

export function CampaignCard({
  title,
  amount,
  location,
  dueDate,
  postedDate,
  company,
  dateRange,
  timeRange,
}: CampaignCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <>
      <Card className="hover:bg-muted/50 cursor-pointer" onClick={() => setIsDialogOpen(true)}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          <div className="flex items-center gap-1">
            <span className="text-xl font-bold">€ {amount.toLocaleString()}</span>
            <Info className="h-4 w-4 text-muted-foreground" />
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
              <div className="text-sm text-muted-foreground">Posted {postedDate}</div>
            </div>
          </div>
          <div className="mt-2 text-sm text-muted-foreground">VAT / Sales Tax excluded</div>
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
    </>
  )
}

