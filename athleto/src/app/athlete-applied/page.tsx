"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type React from "react";
import AthleteNavbar from "@/components/AthleteNavbar";
import { CampaignCard } from "../../components/CampaignCard";

// Sample data for demonstration
const appliedCampaigns = [
  {
    id: 1,
    title: "Wellington Clinic - Athlete Eye Surgery Campaign",
    amount: 5400,
    location: "Ireland, Dublin",
    dueDate: "13.02.25",
    postedDate: "20.01.25",
    company: {
      name: "Wellington Eye Clinic",
      description : "Wellington Eye Clinic is a leading eye surgery clinic that provides a range of treatments for athletes.",
      logo: "/placeholder.svg",
    },
    status: "open" as const,
    dateRange: "20.01.25 - 13.02.25",
    timeRange: "05:30 PM - 05:30 PM",
  },
  {
    id: 2,
    title: "WHOOP January Jumpstart Campaign",
    amount: 165,
    location: "Ireland, Dublin",
    dueDate: "13.02.25",
    postedDate: "20.01.25",
    company: {
      name: "Whoop",
      description : " WHOOP is a fitness wearable that provides personalized insights to help you make smarter training decisions.",
      logo: "/placeholder.svg",
    },
    status: "confirmed" as const,
    dateRange: "26.12.24 - 31.01.25",
    timeRange: "09:00 AM - 06:00 PM",
  },
  {
    id: 3,
    title: "Sports Nutrition Campaign",
    amount: 300,
    location: "Ireland, Dublin",
    dueDate: "13.02.25",
    postedDate: "20.01.25",
    company: {
      name: "NutriSport",
      description : "NutriSport is a leading sports nutrition brand that provides high-quality supplements for athletes.",
      logo: "/placeholder.svg",
    },
    status: "complete" as const,
    dateRange: "01.12.24 - 31.12.24",
    timeRange: "10:00 AM - 05:00 PM",
  },
];

export default function AppliedPage() {
  const openCampaigns = appliedCampaigns.filter(
    (campaign) => campaign.status === "open"
  );
  const confirmedCampaigns = appliedCampaigns.filter(
    (campaign) => campaign.status === "confirmed"
  );
  const completeCampaigns = appliedCampaigns.filter(
    (campaign) => campaign.status === "complete"
  );

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-6">
      <div className="w-full max-w-[400px]">
        <svg
          viewBox="0 0 400 100"
          className="w-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 80 C100 80 100 60 200 60 C300 60 300 80 400 80 L400 100 L0 100 Z"
            fill="#E2E8F0"
          />
          <path d="M180 60 L220 60 L200 40 Z" fill="#64748B" />
          <circle cx="150" cy="65" r="8" fill="#64748B" />
          <circle cx="250" cy="65" r="8" fill="#64748B" />
          <path
            d="M140 40 C140 20 160 20 160 40"
            stroke="#64748B"
            strokeWidth="4"
          />
          <path
            d="M240 40 C240 20 260 20 260 40"
            stroke="#64748B"
            strokeWidth="4"
          />
        </svg>
      </div>
      <h2 className="text-2xl font-semibold text-center">
        You haven't applied to any opportunities yet
      </h2>
      <Link href="/athlete-opportunities">
        <Button size="lg" className="bg-blue-500 hover:bg-blue-600">
          SEARCH FOR OPPORTUNITIES
        </Button>
      </Link>
    </div>
  );

  return (
    <>
      <AthleteNavbar />
      <div className="container mx-auto p-6">
        <Tabs defaultValue="open" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
            <TabsTrigger
              value="open"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
              OPEN / {openCampaigns.length}
            </TabsTrigger>
            <TabsTrigger
              value="confirmed"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
              CONFIRMED / {confirmedCampaigns.length}
            </TabsTrigger>
            <TabsTrigger
              value="complete"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
              COMPLETE / {completeCampaigns.length}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="open" className="mt-6">
            {openCampaigns.length > 0 ? (
              <div className="space-y-4">
                {openCampaigns.map((campaign) => (
                  <CampaignCard key={campaign.id} {...campaign} />
                ))}
              </div>
            ) : (
              <EmptyState />
            )}
          </TabsContent>

          <TabsContent value="confirmed" className="mt-6">
            {confirmedCampaigns.length > 0 ? (
              <div className="space-y-4">
                {confirmedCampaigns.map((campaign) => (
                  <CampaignCard key={campaign.id} {...campaign} />
                ))}
              </div>
            ) : (
              <EmptyState />
            )}
          </TabsContent>

          <TabsContent value="complete" className="mt-6">
            {completeCampaigns.length > 0 ? (
              <div className="space-y-4">
                {completeCampaigns.map((campaign) => (
                  <CampaignCard key={campaign.id} {...campaign} />
                ))}
              </div>
            ) : (
              <EmptyState />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
