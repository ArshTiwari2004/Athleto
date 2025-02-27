"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
// import { toast } from "sonner";
import toast from "react-hot-toast";
import { Calendar, Medal, Trophy, Coins, Users, TrendingUp, CreditCard, Handshake, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useForceLightMode } from "@/hooks/useForcedLightTheme";
import AthleteNavbar from "@/components/AthleteNavbar";
import FundingPreview from "../../components/FundingPreview";
import Chatbot from "@/components/Chatbot";

// Enhanced sample data
const SAMPLE_SCHOLARSHIPS = [
  {
    id: 1,
    name: "Champions Development Program",
    provider: "SportsTech Bank",
    amount: 500000,
    deadline: "2024-05-15",
    eligibility: "National level athletes under 21",
    type: "Performance",
    status: "Open",
  },
  {
    id: 2,
    name: "Elite Athlete Grant",
    provider: "Ministry of Sports",
    amount: 1000000,
    deadline: "2024-06-30",
    eligibility: "International medal winners",
    type: "Merit",
    status: "Open",
  },
  {
    id: 3,
    name: "Future Champions Fund",
    provider: "Sports Foundation",
    amount: 750000,
    deadline: "2024-07-15",
    eligibility: "State level athletes",
    type: "Development",
    status: "Open",
  },
];

const SAMPLE_COLLABORATION_REQUESTS = [
  {
    id: 1,
    type: "Workshop",
    brand: "FitLife Nutrition",
    compensation: 25000,
    date: "2024-03-25",
    status: "Pending",
    description: "Nutrition workshop for young athletes",
  },
  {
    id: 2,
    type: "Product Demo",
    brand: "SportsFit Gear",
    compensation: 15000,
    date: "2024-04-01",
    status: "Accepted",
    description: "New product line demonstration",
  },
  {
    id: 3,
    type: "Social Media",
    brand: "Active Wear Pro",
    compensation: 35000,
    date: "2024-04-15",
    status: "Pending",
    description: "Instagram campaign for new collection",
  },
];

const TABS = [
  {
    value: "crowdfunding",
    label: "Crowdfunding",
    icon: Coins,
  },
  {
    value: "micro-investment",
    label: "Micro-Investment",
    icon: TrendingUp,
  },
  {
    value: "train-now-pay-later",
    label: "Train Now, Pay Later",
    icon: CreditCard,
  },
  {
    value: "marketplace",
    label: "Marketplace",
    icon: Handshake,
  },
  {
    value: "scholarships",
    label: "Scholarships",
    icon: GraduationCap,
  },
];

export default function AthleteFunding() {
  const [activeTab, setActiveTab] = useState("crowdfunding");
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  
  // Form data states
  const [crowdfundingData, setCrowdfundingData] = useState({
    title: "",
    amount: "",
    description: "",
  });
  
  const [microInvestmentData, setMicroInvestmentData] = useState({
    amount: "",
    percentage: "",
    duration: "",
  });
  
  const [loanData, setLoanData] = useState({
    amount: "",
    purpose: "",
    repaymentPlan: "",
  });

  useForceLightMode();

  const handleAction = async (message: string) => {
    setIsLoading(true);
    const toastPromise = new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast.promise(
      toastPromise,
      {
        loading: 'Processing...',
        success: message,
        error: 'An error occurred. Please try again.',
      },
      {
        duration: 3000,
      }
    );

    try {
      await toastPromise;
      // Clear form data after successful submission
      if (activeTab === "crowdfunding") {
        setCrowdfundingData({ title: "", amount: "", description: "" });
      } else if (activeTab === "micro-investment") {
        setMicroInvestmentData({ amount: "", percentage: "", duration: "" });
      } else if (activeTab === "train-now-pay-later") {
        setLoanData({ amount: "", purpose: "", repaymentPlan: "" });
      }
      setShowPreview(false);
    } finally {
      setIsLoading(false);
    }
  };

  const renderCrowdfundingContent = () => {
    if (showPreview) {
      return (
        <FundingPreview
          data={crowdfundingData}
          type="crowdfunding"
          onSubmit={() => handleAction("Campaign created successfully!")}
          onBack={() => setShowPreview(false)}
          isLoading={isLoading}
        />
      );
    }

    return (
      <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coins className="h-5 w-5" />
            Create a Crowdfunding Campaign
          </CardTitle>
          <CardDescription>Set up a campaign to fund your specific needs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="campaign-title">Campaign Title</Label>
            <Input
              id="campaign-title"
              placeholder="Enter campaign title"
              value={crowdfundingData.title}
              onChange={(e) => setCrowdfundingData({ ...crowdfundingData, title: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="funding-goal">Funding Goal (₹)</Label>
            <Input
              id="funding-goal"
              type="number"
              placeholder="Enter amount"
              value={crowdfundingData.amount}
              onChange={(e) => setCrowdfundingData({ ...crowdfundingData, amount: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="campaign-description">Campaign Description</Label>
            <Textarea
              id="campaign-description"
              placeholder="Describe your funding needs"
              value={crowdfundingData.description}
              onChange={(e) => setCrowdfundingData({ ...crowdfundingData, description: e.target.value })}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white shadow-md transition-all duration-200"
            onClick={() => setShowPreview(true)}
            disabled={isLoading || !crowdfundingData.title || !crowdfundingData.amount || !crowdfundingData.description}
          >
            Preview Campaign
          </Button>
        </CardFooter>
      </Card>
    );
  };

  const renderMicroInvestmentContent = () => {
    if (showPreview) {
      return (
        <FundingPreview
          data={microInvestmentData}
          type="micro-investment"
          onSubmit={() => handleAction("Investment proposal submitted!")}
          onBack={() => setShowPreview(false)}
          isLoading={isLoading}
        />
      );
    }

    return (
      <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Performance-Based Micro-Investment
          </CardTitle>
          <CardDescription>Get funding in exchange for a percentage of future earnings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="funding-amount">Funding Amount (₹)</Label>
            <Input
              id="funding-amount"
              type="number"
              placeholder="Enter amount"
              value={microInvestmentData.amount}
              onChange={(e) => setMicroInvestmentData({ ...microInvestmentData, amount: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="earnings-percentage">Earnings Percentage (%)</Label>
            <Input
              id="earnings-percentage"
              type="number"
              placeholder="Enter percentage"
              value={microInvestmentData.percentage}
              onChange={(e) => setMicroInvestmentData({ ...microInvestmentData, percentage: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="investment-duration">Investment Duration (years)</Label>
            <Input
              id="investment-duration"
              type="number"
              placeholder="Enter duration"
              value={microInvestmentData.duration}
              onChange={(e) => setMicroInvestmentData({ ...microInvestmentData, duration: e.target.value })}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white shadow-md transition-all duration-200"
            onClick={() => setShowPreview(true)}
            disabled={isLoading || !microInvestmentData.amount || !microInvestmentData.percentage || !microInvestmentData.duration}
          >
            Preview Proposal
          </Button>
        </CardFooter>
      </Card>
    );
  };

  const renderLoanContent = () => {
    if (showPreview) {
      return (
        <FundingPreview
          data={{ ...loanData, amount: loanData.amount }}
          type="loan"
          onSubmit={() => handleAction("Loan application submitted!")}
          onBack={() => setShowPreview(false)}
          isLoading={isLoading}
        />
      );
    }

    return (
      <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Train Now, Pay Later
          </CardTitle>
          <CardDescription>Apply for a zero-interest loan for your training needs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="loan-amount">Loan Amount (₹)</Label>
            <Input
              id="loan-amount"
              type="number"
              placeholder="Enter amount"
              value={loanData.amount}
              onChange={(e) => setLoanData({ ...loanData, amount: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="loan-purpose">Loan Purpose</Label>
            <Textarea
              id="loan-purpose"
              placeholder="Describe how you'll use the loan"
              value={loanData.purpose}
              onChange={(e) => setLoanData({ ...loanData, purpose: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="repayment-plan">Repayment Plan</Label>
            <Textarea
              id="repayment-plan"
              placeholder="Describe your repayment plan"
              value={loanData.repaymentPlan}
              onChange={(e) => setLoanData({ ...loanData, repaymentPlan: e.target.value })}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white shadow-md transition-all duration-200"
            onClick={() => setShowPreview(true)}
            disabled={isLoading || !loanData.amount || !loanData.purpose || !loanData.repaymentPlan}
          >
            Preview Application
          </Button>
        </CardFooter>
      </Card>
    );
  };

  return (
    <>
      <AthleteNavbar/>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="space-y-2 mb-8">
            <h1 className="text-4xl font-bold tracking-tight">Funding Options</h1>
            <p className="text-gray-500">Explore various funding opportunities for your athletic journey</p>
          </div>

          <Tabs 
            value={activeTab} 
            onValueChange={(value) => {
              setActiveTab(value);
              setShowPreview(false);
            }} 
            className="w-full space-y-6"
          >
            <TabsList className="grid w-full grid-cols-5 gap-2 bg-gray-100/80 p-1">
              {TABS.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className={cn(
                    "flex items-center gap-2 transition-all",
                    "data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  )}
                >
                  <tab.icon className="h-4 w-4" />
                  <span className="hidden md:inline">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="crowdfunding" className="space-y-4">
              {renderCrowdfundingContent()}
            </TabsContent>

            <TabsContent value="micro-investment" className="space-y-4">
              {renderMicroInvestmentContent()}
            </TabsContent>

            <TabsContent value="train-now-pay-later" className="space-y-4">
              {renderLoanContent()}
            </TabsContent>

            <TabsContent value="marketplace" className="space-y-4">
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Handshake className="h-5 w-5" />
                  Collaboration Opportunities
                </CardTitle>
                <CardDescription>Manage your brand collaboration requests and opportunities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  {SAMPLE_COLLABORATION_REQUESTS.map((request) => (
                    <Card key={request.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-lg">{request.type}</h3>
                              <Badge
                                variant={request.status === "Accepted" ? "default" : "secondary"}
                                className="animate-fade-in"
                              >
                                {request.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-500">{request.brand}</p>
                            <p className="text-sm mt-1">₹{request.compensation.toLocaleString()} • {request.date}</p>
                            <p className="text-sm text-gray-500 mt-2">{request.description}</p>
                          </div>
                          <div className="space-x-2">
                            {request.status === "Pending" && (
                              <>
                                <Button
                                  variant="outline"
                                  onClick={() => handleAction("Collaboration request declined")}
                                  disabled={isLoading}
                                >
                                  Decline
                                </Button>
                                <Button
                                  className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white shadow-md transition-all duration-200"
                                  onClick={() => handleAction("Collaboration request accepted!")}
                                  disabled={isLoading}
                                >
                                  Accept
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white shadow-md transition-all duration-200"
                  onClick={() => handleAction("Your availability has been updated!")}
                  disabled={isLoading}
                >
                  Update Collaboration Availability
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

            <TabsContent value="scholarships" className="space-y-4">
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Available Scholarships
                </CardTitle>
                <CardDescription>Browse and apply for sports scholarships and grants</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  {SAMPLE_SCHOLARSHIPS.map((scholarship) => (
                    <Card key={scholarship.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-lg">{scholarship.name}</h3>
                              <Badge variant="secondary">{scholarship.type}</Badge>
                            </div>
                            <p className="text-sm text-gray-500">{scholarship.provider}</p>
                            <p className="text-lg font-semibold mt-2">₹{scholarship.amount.toLocaleString()}</p>
                            <div className="mt-2 space-y-1">
                              <p className="text-sm flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                Deadline: {scholarship.deadline}
                              </p>
                              <p className="text-sm flex items-center gap-2">
                                <Medal className="h-4 w-4" />
                                {scholarship.eligibility}
                              </p>
                            </div>
                          </div>
                          <Button
                            className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white shadow-md transition-all duration-200"
                            onClick={() => handleAction("Scholarship application submitted successfully!")}
                            disabled={isLoading}
                          >
                            {isLoading ? "Applying..." : "Apply Now"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          </Tabs>
        </div>
        <Chatbot/>
      </div>
    </>
  );
}