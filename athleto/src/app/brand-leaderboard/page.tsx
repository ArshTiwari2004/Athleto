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
import { useForceLightMode } from "@/hooks/useForcedLightTheme";
import BrandNavbar from "@/components/BrandNavbar";
import { MultipliersInfo } from "./__components/MultiplierInfo";
import Chatbot from "@/components/Chatbot";
interface Brand {
  id: number;
  name: string;
  logo: string;
  marketPresence: number;
  athletesChosen: number;
  campaignSuccess: number;
  totalScore: number;
}

// Multipliers for each criterion
const MULTIPLIERS = {
  marketPresence: 0.35,
  athletesChosen: 0.3,
  campaignSuccess: 0.35,
};

// Generate dummy data for 30 brands
const generateDummyData = (): Brand[] => {
  const dummyData: Brand[] = [];
  const brandNames = [
    "SportsPro",
    "AthleteFuel",
    "VictoryGear",
    "ChampionWear",
    "ElitePerform",
    "PeakAthletics",
    "PowerPlay",
    "EnduranceEdge",
    "AgilityPro",
    "StrengthCore",
    "SwiftSports",
    "DynamicFit",
    "PrecisionAthletic",
    "UltraEndure",
    "FlexFitness",
    "TurboTrain",
    "AeroAthlete",
    "MuscleMax",
    "SpeedSphere",
    "StaminaStrike",
    "FitFusion",
    "VelocityVibe",
    "EnduroElite",
    "PowerPulse",
    "AgilityAce",
    "FlexForce",
    "RapidRush",
    "ToughTech",
    "PrimePower",
    "ZenithZone",
  ];

  for (let i = 1; i <= 30; i++) {
    const marketPresence = Math.random() * 100;
    const athletesChosen = Math.floor(Math.random() * 50) + 1; // 1 to 50 athletes
    const campaignSuccess = Math.random() * 100;

    // Calculate total score using the defined multipliers
    const totalScore = (
      marketPresence * MULTIPLIERS.marketPresence +
      athletesChosen * MULTIPLIERS.athletesChosen +
      campaignSuccess * MULTIPLIERS.campaignSuccess
    ).toFixed(2);

    dummyData.push({
      id: i,
      name: brandNames[i - 1],
      logo: `/placeholder.svg?text=${brandNames[i - 1][0]}`,
      marketPresence: Number(marketPresence.toFixed(2)),
      athletesChosen: athletesChosen,
      campaignSuccess: Number(campaignSuccess.toFixed(2)),
      totalScore: Number(totalScore),
    });
  }
  return dummyData.sort((a, b) => b.totalScore - a.totalScore);
};

const brands = generateDummyData();

export default function BrandLeaderboardPage() {
  useForceLightMode();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBrands.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBrands = filteredBrands.slice(startIndex, endIndex);

  return (
    <>
      <div className="container mx-auto p-8 max-w-7xl">
        <div className="space-y-6">
          <div className="flex flex-col space-y-2">
            <p className="text-muted-foreground">
              Track market presence, athlete selection, and campaign success
              metrics.
            </p>
          </div>
          <MultipliersInfo/>
          <Card className="overflow-hidden border-0 shadow-lg">
            <CardHeader className="border-b bg-card px-6 py-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold">
                  Brand Rankings
                </CardTitle>
                <div className="relative w-72">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search brands..."
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
                    <TableHead>Brand</TableHead>
                    <TableHead className="text-right">
                      Market Presence
                    </TableHead>
                    <TableHead className="text-right">
                      Athletes Chosen
                    </TableHead>
                    <TableHead className="text-right">
                      Campaign Success
                    </TableHead>
                    <TableHead className="text-right pr-6">
                      Total Score
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentBrands.map((brand, index) => (
                    <TableRow
                      key={brand.id}
                      className="hover:bg-accent/50 transition-colors">
                      <TableCell className="font-medium pl-6">
                        {startIndex + index + 1}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 border">
                            <AvatarImage src={brand.logo} alt={brand.name} />
                            <AvatarFallback className="bg-primary/10">
                              {brand.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="font-medium">{brand.name}</span>
                            <span className="text-xs text-muted-foreground">
                              ID: {brand.id}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant={
                            brand.campaignSuccess > 70
                              ? "outline"
                              : "destructive"
                          }
                          className="font-medium">
                          {brand.marketPresence.toFixed(2)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant={
                            brand.campaignSuccess > 70
                              ? "outline"
                              : "destructive"
                          }
                          className="font-medium">
                          {brand.athletesChosen}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant={
                            brand.campaignSuccess > 70
                              ? "outline"
                              : "destructive"
                          }
                          className="font-medium">
                          {brand.campaignSuccess.toFixed(2)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-bold pr-6">
                        {brand.totalScore.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex items-center justify-between border-t p-4">
                <div className="text-sm text-muted-foreground">
                  Showing {startIndex + 1} to{" "}
                  {Math.min(endIndex, filteredBrands.length)} of{" "}
                  {filteredBrands.length} brands
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
