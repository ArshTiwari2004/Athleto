"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { FilterSidebar } from "./__components/Filtersidebar";
import { Search } from "lucide-react";
import AthleteNavbar from "@/components/AthleteNavbar";
import { useForceLightMode } from "@/hooks/useForcedLightTheme";
import { OpportunityCard } from "@/components/OpportunityCard";
import { useOpportunity } from "@/context/OpportunityContext";
import { useUser } from "@/context/UserContext";
import Chatbot from "@/components/Chatbot";

export default function OpportunitiesPage() {
  useForceLightMode();
  const { opportunities, loading, getOpenOpportunities } = useOpportunity();
  console.log(opportunities);
  const { athlete } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOpportunities, setFilteredOpportunities] = useState(opportunities);
  useEffect(() => {
    const fetchOpportunities = async () => {
      const openOpportunities = await getOpenOpportunities();
      setFilteredOpportunities(openOpportunities);
    };
    fetchOpportunities();
  }, [getOpenOpportunities]);

  useEffect(() => {
    if (opportunities.length > 0) {
      const filtered = opportunities.filter(opp => 
        opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (opp.brand_name?.toLowerCase() ?? "").includes(searchTerm.toLowerCase()) ||
        opp.location.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOpportunities(filtered);
    }
  }, [searchTerm, opportunities]);
  
  

  const handleApply = async (opportunityId: string) => {
    // This would be implemented in your application logic
    try {
      // Add application logic here
      // Example: await applyToOpportunity(opportunityId, athlete.id);
      console.log(`Applied to opportunity ${opportunityId}`);
    } catch (error) {
      console.error('Failed to apply:', error);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <AthleteNavbar />
      <div className="container mx-auto flex gap-6 p-6">
        <FilterSidebar />
        <div className="flex-1 space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              className="pl-9" 
              placeholder="Search opportunities..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-8">Loading opportunities...</div>
            ) : filteredOpportunities.length === 0 ? (
              <div className="text-center py-8">
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  No opportunities found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your filters or search terms
                </p>
              </div>
            ) : (
              filteredOpportunities.map((opportunity) => (
                <OpportunityCard
                  key={opportunity.id}
                  opportunity={opportunity}
                  onApply={handleApply}
                />
              ))
            )}
          </div>
        </div>
      </div>
      <Chatbot/>
    </div>
  );
}