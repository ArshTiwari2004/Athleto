"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Calendar, Clock, MapPin, Trophy, CheckCircle, Award, User } from "lucide-react";
import AthleteNavbar from "@/components/AthleteNavbar";
import { useForceLightMode } from "@/hooks/useForcedLightTheme";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import Chatbot from "@/components/Chatbot";

// TypeScript Types
type SportCategory = 'Cricket' | 'Athletics' | 'Kabaddi' | 'Badminton' | 'Wrestling' | 'Basketball' | 'Football' | 'Hockey';
type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Elite';
type FundingType = 'Full Scholarship' | 'Equipment + Coaching' | 'Travel + Accommodation' | 'Equipment + Training' | 'Monthly Stipend';
type CampaignStatus = 'open' | 'confirmed' | 'complete';

interface Company {
  name: string;
  description: string;
  logo: string;
}

interface Campaign {
  id: number;
  title: string;
  amount: number;
  location: string;
  dueDate: string;
  postedDate: string;
  sport: SportCategory;
  skillLevel: SkillLevel;
  company: Company;
  status: CampaignStatus;
  dateRange: string;
  timeRange: string;
  fundingType: FundingType;
  applicationProgress: number;
  feedback?: string;
}

interface CampaignCardProps extends Campaign {}

interface EmptyStateProps {
  message: string;
  action: string;
}

interface FilterOption {
  value: string;
  label: string;
}

// Campaign Card Component with enhanced UI
const CampaignCard: React.FC<CampaignCardProps> = ({ 
  id, 
  title, 
  amount, 
  location, 
  dateRange, 
  timeRange, 
  company, 
  status, 
  sport, 
  skillLevel,
  fundingType,
  applicationProgress,
  feedback
}) => {
  const statusColors: Record<CampaignStatus, string> = {
    open: "bg-amber-100 text-amber-800 border-amber-200",
    confirmed: "bg-green-100 text-green-800 border-green-200",
    complete: "bg-blue-100 text-blue-800 border-blue-200"
  };

  const statusText: Record<CampaignStatus, string> = {
    open: "Application Under Review",
    confirmed: "Application Accepted",
    complete: "Program Completed"
  };

  const statusIcons: Record<CampaignStatus, React.ReactNode> = {
    open: <Clock className="h-4 w-4 mr-1" />,
    confirmed: <CheckCircle className="h-4 w-4 mr-1" />,
    complete: <Award className="h-4 w-4 mr-1" />
  };

  return (
    <Card className="overflow-hidden border border-gray-200 hover:shadow-md transition-all duration-300">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          {/* Left column - Logo and basic info */}
          <div className="w-full md:w-1/4 p-6 flex flex-col items-center justify-center bg-gray-50 border-r border-gray-200">
            <Avatar className="h-16 w-16 rounded-md mb-3">
              <AvatarImage src={company.logo} alt={company.name} />
              <AvatarFallback className="rounded-md bg-blue-100 text-blue-800 font-bold text-lg">
                {company.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <h3 className="text-sm font-medium text-center">{company.name}</h3>
            <Badge className={`mt-3 ${statusColors[status]} flex items-center px-3 py-1`}>
              {statusIcons[status]} {statusText[status]}
            </Badge>
          </div>

          {/* Middle column - Campaign details */}
          <div className="w-full md:w-2/4 p-6">
            <h2 className="text-xl font-bold mb-2">{title}</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center text-gray-600">
                <Trophy className="h-4 w-4 mr-2 text-blue-600" />
                <span className="text-sm">{sport}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <User className="h-4 w-4 mr-2 text-blue-600" />
                <span className="text-sm">{skillLevel}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-2 text-blue-600" />
                <span className="text-sm">{location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                <span className="text-sm">{dateRange}</span>
              </div>
            </div>

            {status === "complete" && feedback && (
              <div className="mt-3 mb-1 bg-blue-50 p-3 rounded-md">
                <p className="text-sm font-medium text-blue-800">Feedback:</p>
                <p className="text-sm text-gray-800">{feedback}</p>
              </div>
            )}

            {status === "open" && (
              <div className="mt-3">
                <div className="flex justify-between mb-1 text-sm">
                  <span className="font-medium">Application Progress</span>
                  <span>{applicationProgress}%</span>
                </div>
                <Progress value={applicationProgress} className="h-2" />
              </div>
            )}
          </div>

          {/* Right column - Funding and actions */}
          <div className="w-full md:w-1/4 p-6 bg-gray-50 flex flex-col justify-between border-l border-gray-200">
            <div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-700">₹{amount.toLocaleString('en-IN')}</p>
                <p className="text-sm text-gray-600">{fundingType}</p>
              </div>
              
              <div className="mt-4 text-sm text-gray-600">
                <p className="mb-1"><Clock className="h-4 w-4 inline mr-1" /> {timeRange}</p>
              </div>
            </div>

            <div className="mt-4">
              <Link href={`/athlete-opportunity/${id}`}>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  {status === "open" ? "VIEW APPLICATION" : 
                   status === "confirmed" ? "VIEW DETAILS" : "VIEW CERTIFICATE"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Empty State Component
const EmptyState: React.FC<EmptyStateProps> = ({ message, action }) => (
  <div className="flex flex-col items-center justify-center min-h-[400px] gap-6 bg-gray-50 rounded-lg border border-gray-200 p-8">
    <div className="w-full max-w-[300px]">
      <svg
        viewBox="0 0 300 200"
        className="w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="200" fill="#F8FAFC" rx="8" />
        <path
          d="M100 140 C150 100, 250 100, 300 140 L300 200 L0 200 Z"
          fill="#E2E8F0"
        />
        <circle cx="150" cy="80" r="40" fill="#E2E8F0" />
        <circle cx="150" cy="70" r="15" fill="#94A3B8" />
        <rect x="120" y="90" width="60" height="40" rx="8" fill="#94A3B8" />
        <path
          d="M120 110 C120 90, 180 90, 180 110"
          stroke="#64748B"
          strokeWidth="4"
          fill="none"
        />
        <path
          d="M95 60 L115 80 M205 60 L185 80"
          stroke="#64748B"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    </div>
    <h2 className="text-2xl font-semibold text-center text-gray-800">{message}</h2>
    <Link href="/athlete-opportunities">
      <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
        {action}
      </Button>
    </Link>
  </div>
);

// Sample data for demonstration - Focused on Indian athletes and sports
const appliedCampaigns: Campaign[] = [
  {
    id: 1,
    title: "National Sports Development Fund - Cricket Training Camp",
    amount: 25000,
    location: "Mumbai, Maharashtra",
    dueDate: "15.03.25",
    postedDate: "20.01.25",
    sport: "Cricket",
    skillLevel: "Intermediate",
    company: {
      name: "Ministry of Youth Affairs & Sports",
      description: "Government initiative to support promising athletes from economically disadvantaged backgrounds across India.",
      logo: "/logos/msyas-logo.svg",
    },
    status: "open",
    dateRange: "20.03.25 - 15.04.25",
    timeRange: "06:00 AM - 11:00 AM",
    fundingType: "Full Scholarship",
    applicationProgress: 80,
  },
  {
    id: 2,
    title: "Olympic Dreams Initiative - Athletics Program",
    amount: 42000,
    location: "Delhi, India",
    dueDate: "28.02.25",
    postedDate: "05.01.25",
    sport: "Athletics",
    skillLevel: "Advanced",
    company: {
      name: "Sports Authority of India",
      description: "National sports governing body providing training and support to athletes preparing for international competitions.",
      logo: "/logos/sai-logo.svg",
    },
    status: "confirmed",
    dateRange: "01.03.25 - 30.06.25",
    timeRange: "05:30 AM - 09:30 AM",
    fundingType: "Equipment + Coaching",
    applicationProgress: 100,
  },
  {
    id: 3,
    title: "Khelo India Youth Games - Kabaddi Selection",
    amount: 15000,
    location: "Bengaluru, Karnataka",
    dueDate: "10.02.25",
    postedDate: "15.12.24",
    sport: "Kabaddi",
    skillLevel: "Intermediate",
    company: {
      name: "Khelo India",
      description: "Government program aimed at reviving sports culture at the grassroots level throughout India.",
      logo: "/logos/khelo-india-logo.svg",
    },
    status: "confirmed",
    dateRange: "25.02.25 - 15.03.25",
    timeRange: "04:00 PM - 07:00 PM",
    fundingType: "Travel + Accommodation",
    applicationProgress: 100,
  },
  {
    id: 4,
    title: "Youth Badminton Championship - Training Program",
    amount: 18500,
    location: "Hyderabad, Telangana",
    dueDate: "05.01.25",
    postedDate: "10.11.24",
    sport: "Badminton",
    skillLevel: "Beginner",
    company: {
      name: "Pullela Gopichand Academy",
      description: "Premier badminton training center established by former All England champion to nurture young talent.",
      logo: "/logos/pga-logo.svg",
    },
    status: "complete",
    dateRange: "15.01.25 - 15.02.25",
    timeRange: "07:00 AM - 10:00 AM",
    fundingType: "Equipment + Training",
    applicationProgress: 100,
    feedback: "Exceptional performance. Recommended for advanced training.",
  },
  {
    id: 5,
    title: "Wrestling Foundation Scholarship Program",
    amount: 30000,
    location: "Sonipat, Haryana",
    dueDate: "20.12.24",
    postedDate: "01.11.24",
    sport: "Wrestling",
    skillLevel: "Advanced",
    company: {
      name: "JSW Sports Excellence Program",
      description: "Corporate initiative supporting Olympic sports and athletes with world-class training facilities.",
      logo: "/logos/jsw-logo.svg",
    },
    status: "complete",
    dateRange: "01.01.25 - 01.02.25",
    timeRange: "06:00 AM - 11:00 AM",
    fundingType: "Full Scholarship",
    applicationProgress: 100,
    feedback: "Selected for national camp. Continue with strength training program provided.",
  },
];

// Main Page Component
const AppliedPage: React.FC = () => {
  const [filter, setFilter] = useState<string>("all");
  
  const openCampaigns = appliedCampaigns.filter(
    (campaign) => campaign.status === "open"
  );
  
  const confirmedCampaigns = appliedCampaigns.filter(
    (campaign) => campaign.status === "confirmed"
  );
  
  const completeCampaigns = appliedCampaigns.filter(
    (campaign) => campaign.status === "complete"
  );

  const filterOptions: FilterOption[] = [
    { value: "all", label: "ALL SPORTS" },
    { value: "cricket", label: "CRICKET" },
    { value: "athletics", label: "ATHLETICS" },
    { value: "kabaddi", label: "KABADDI" },
    { value: "badminton", label: "BADMINTON" },
    { value: "wrestling", label: "WRESTLING" },
  ];

  useForceLightMode();
  
  return (
    <>
      <AthleteNavbar />
      <div className="bg-gray-50 min-h-screen pb-12">
        <div className="bg-white border-b border-gray-200 mb-6">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My Opportunities</h1>
                <p className="text-gray-600 mt-1">Track your applications and program progress</p>
              </div>
              
              <div className="flex space-x-3">
                <Link href="/athlete-profile">
                  <Button variant="outline" className="border-gray-300">
                    MY PROFILE
                  </Button>
                </Link>
                <Link href="/athlete-opportunities">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    FIND OPPORTUNITIES
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="w-full">
                  <Tabs defaultValue="open" className="w-full">
                    <TabsList className="justify-start h-auto p-0 bg-transparent border-b-0 mb-0">
                      <TabsTrigger
                        value="open"
                        className="rounded-md data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 text-gray-700">
                        UNDER REVIEW <Badge className="ml-1 bg-blue-200 text-blue-800">{openCampaigns.length}</Badge>
                      </TabsTrigger>
                      <TabsTrigger
                        value="confirmed"
                        className="rounded-md data-[state=active]:bg-green-100 data-[state=active]:text-green-700 text-gray-700">
                        ACCEPTED <Badge className="ml-1 bg-green-200 text-green-800">{confirmedCampaigns.length}</Badge>
                      </TabsTrigger>
                      <TabsTrigger
                        value="complete"
                        className="rounded-md data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 text-gray-700">
                        COMPLETED <Badge className="ml-1 bg-purple-200 text-purple-800">{completeCampaigns.length}</Badge>
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="open" className="mt-4">
                      {openCampaigns.length > 0 ? (
                        <div className="space-y-4">
                          {openCampaigns.map((campaign) => (
                            <CampaignCard key={campaign.id} {...campaign} />
                          ))}
                        </div>
                      ) : (
                        <EmptyState 
                          message="You haven't applied to any opportunities yet" 
                          action="SEARCH FOR OPPORTUNITIES" 
                        />
                      )}
                    </TabsContent>

                    <TabsContent value="confirmed" className="mt-4">
                      {confirmedCampaigns.length > 0 ? (
                        <div className="space-y-4">
                          {confirmedCampaigns.map((campaign) => (
                            <CampaignCard key={campaign.id} {...campaign} />
                          ))}
                        </div>
                      ) : (
                        <EmptyState 
                          message="You don't have any accepted opportunities yet" 
                          action="CHECK PENDING APPLICATIONS" 
                        />
                      )}
                    </TabsContent>

                    <TabsContent value="complete" className="mt-4">
                      {completeCampaigns.length > 0 ? (
                        <div className="space-y-4">
                          {completeCampaigns.map((campaign) => (
                            <CampaignCard key={campaign.id} {...campaign} />
                          ))}
                        </div>
                      ) : (
                        <EmptyState 
                          message="You haven't completed any programs yet" 
                          action="VIEW CURRENT PROGRAMS" 
                        />
                      )}
                    </TabsContent>
                  </Tabs>
                </div>
                
                <div className="flex gap-2 md:flex-none">
                  <select 
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="rounded-md border border-gray-300 text-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {filterOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>

                
              </div>
            </div>
          </div>
        </div>
        <Chatbot/>
      </div>
    </>
  );
};

export default AppliedPage;