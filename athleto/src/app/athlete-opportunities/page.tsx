import { Input } from "@/components/ui/input";
import { CampaignCard } from "../../components/CampaignCard";
import { FilterSidebar } from "./__components/Filtersidebar";
import { Search } from "lucide-react";
import AthleteNavbar from "@/components/AthleteNavbar";
import LightModeWrapper from "../../components/LightModeWrapper";

export default function Page() {
  return (
    <LightModeWrapper>
      <div className="bg-gray-50">
        <AthleteNavbar />
        <div className="container mx-auto flex gap-6 p-6">
          <FilterSidebar />
          {/*Filter options will changed accordingly, we can also make a global fillter component if it is used in multiple pages*/}
          <div className="flex-1 space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input className="pl-9" placeholder="Search" />
            </div>
            <div className="space-y-4">
              <CampaignCard
                title="Wellington Clinic - Athlete Eye Surgery Campaign"
                amount={5400}
                location="Ireland, Dublin"
                dueDate="20.01.2025"
                postedDate="09.01.2025"
                company={{
                  name: "Wellington Eye Clinic",
                  logo: "/placeholder.svg",
                  description: "",
                }}
                status = {null}
                dateRange=""
                timeRange=""
              />
              <CampaignCard
                title="WHOOP January Jumpstart Campaign"
                amount={165}
                location="Ireland, Dublin"
                dueDate="26.12.2024"
                postedDate="09.12.2024"
                company={{
                  name: "Whoop",
                  logo: "/placeholder.svg",
                  description: "",
                }}
                status = {null}
                dateRange=""
                timeRange=""
              />

              {/*Array will be mapped to show all the opporunities card wih props as:
              title, amount, location, dueDate, postedDate, company :{name,logo,description}, dateRange, timeRange*/}
            </div>
          </div>
        </div>
      </div>
    </LightModeWrapper>
  );
}
