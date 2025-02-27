"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { MultipliersInfo } from "./__components/MultipliersInfo";
import { useForceLightMode } from "@/hooks/useForcedLightTheme";
import AthleteNavbar from "@/components/AthleteNavbar";
import Chatbot from "@/components/Chatbot";

// Define the structure of an athlete's data
interface Athlete {
  id: number;
  name: string;
  avatar: string;
  pastPerformance: number;
  sponsorshipInterest: number;
  athleteEngagement: number;
  totalScore: number;
}
// Multipliers for each criterion
const MULTIPLIERS = {
  pastPerformance: 0.4,
  sponsorshipInterest: 0.35,
  athleteEngagement: 0.25,
};
// Generate dummy data for 30 athletes
const generateDummyData = (): Athlete[] => {
  const dummyData: Athlete[] = [];
  for (let i = 1; i <= 30; i++) {
    const pastPerformance = Math.random() * 100;
    const sponsorshipInterest = Math.random() * 100;
    const athleteEngagement = Math.random() * 100;
    // Calculate total score using the defined multipliers
    const totalScore = (
      pastPerformance * MULTIPLIERS.pastPerformance +
      sponsorshipInterest * MULTIPLIERS.sponsorshipInterest +
      athleteEngagement * MULTIPLIERS.athleteEngagement
    ).toFixed(2);
    const indianSportsPlayers = [
      "Rohan Deshmukh",
      "Virat Nambiar",
      "Siddharth Rajput",
      "Aniket Choudhary",
      "Kunal Joshi",

      "Aditya Fernandes",
      "Manish D'Souza",
      "Sahil Kapoor",
      "Rahul Bhandari",
      "Nikhil Mehta",

      "Aarav Iyer",
      "Karthik Reddy",
      "Vishal Bhatt",
      "Pranav Sharma",
      "Neelesh Pillai",

      "Arjun Malhotra",
      "Kabir Saxena",
      "Rajat Kaur",
      "Devansh Oberoi",
      "Ishaan Khurana",

      "Yuvraj Sen",
      "Tanmay Verma",
      "Sameer Bakshi",
      "Harshad Menon",
      "Rishi Gokhale",

      "Vikram Patil",
      "Raghav Sethi",
      "Sandeep Rathore",
      "Jatin Solanki",
      "Deepak Chauhan",
    ];
    dummyData.push({
      id: i,
      name: `${indianSportsPlayers[i - 1]}`,
      avatar: `/placeholder.svg?text=${i}`,
      pastPerformance: Number(pastPerformance.toFixed(2)),
      sponsorshipInterest: Number(sponsorshipInterest.toFixed(2)),
      athleteEngagement: Number(athleteEngagement.toFixed(2)),
      totalScore: Number(totalScore),
    });
  }
  return dummyData.sort((a, b) => b.totalScore - a.totalScore);
};

const athletes = generateDummyData();
export default function LeaderboardPage() {
  useForceLightMode();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;
  const filteredAthletes = athletes.filter((athlete) =>
    athlete.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredAthletes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAthletes = filteredAthletes.slice(startIndex, endIndex);
  return (
    <>
      <div className="container mx-auto p-8 max-w-7xl">
        <div className="space-y-6">
          <div className="flex flex-col space-y-2">
            {/* <h1 className="text-4xl font-bold tracking-tight">Athlete Leaderboard</h1> */}
            <p className="text-muted-foreground">
              Track performance, sponsorship interest, and engagement metrics.
            </p>
          </div>
          <MultipliersInfo />
          <Card className="overflow-hidden border-0 shadow-lg">
            <CardHeader className="border-b bg-card px-6 py-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold">
                  Rankings
                </CardTitle>
                <div className="relative w-72">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search athletes..."
                    className="pl-9 border-0 bg-background/50 backdrop-blur-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-0 hover:bg-transparent">
                    <TableHead className="w-[100px] pl-6">Rank</TableHead>
                    <TableHead>Athlete</TableHead>
                    <TableHead className="text-right">
                      Past Performance
                    </TableHead>
                    <TableHead className="text-right">
                      Sponsorship Interest
                    </TableHead>
                    <TableHead className="text-right">
                      Athlete Engagement
                    </TableHead>
                    <TableHead className="text-right pr-6">
                      Total Score
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentAthletes.map((athlete, index) => (
                    <TableRow
                      key={athlete.id}
                      className="hover:bg-accent/50 transition-colors">
                      <TableCell className="font-medium pl-6">
                        {startIndex + index + 1}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 border">
                            <AvatarImage
                              src={athlete.avatar}
                              alt={athlete.name}
                            />
                            <AvatarFallback className="bg-primary/10">
                              {athlete.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="font-medium">{athlete.name}</span>
                            <span className="text-xs text-muted-foreground">
                              ID: {athlete.id}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant={
                            athlete.athleteEngagement > 70
                              ? "outline"
                              : "destructive"
                          }
                          className="font-medium">
                          {athlete.pastPerformance.toFixed(2)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant={
                            athlete.athleteEngagement > 70
                              ? "outline"
                              : "destructive"
                          }
                          className="font-medium">
                          {athlete.sponsorshipInterest.toFixed(2)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant={
                            athlete.athleteEngagement > 70
                              ? "outline"
                              : "destructive"
                          }
                          className="font-medium">
                          {athlete.athleteEngagement.toFixed(2)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-bold pr-6">
                        {athlete.totalScore.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex items-center justify-between border-t p-4">
                <div className="text-sm text-muted-foreground">
                  Showing {startIndex + 1} to{" "}
                  {Math.min(endIndex, filteredAthletes.length)} of{" "}
                  {filteredAthletes.length} athletes
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="h-8 w-8 p-0">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="text-sm font-medium">
                    Page {currentPage} of {totalPages}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="h-8 w-8 p-0">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <Chatbot/>
      </div>
    </>
  );
}
