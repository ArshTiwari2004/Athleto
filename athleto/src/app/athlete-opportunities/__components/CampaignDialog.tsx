"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, MapPin, Building2 } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

type CampaignDialogProps = {
  isOpen: boolean
  onClose: () => void
  campaign: {
    title: string
    company: {
      name: string
      logo: string
      description: string
    }
    location: string
    dateRange: string
    timeRange: string
    amount: number
    postedDate: string
  }
}

export function CampaignDialog({ isOpen, onClose, campaign }: CampaignDialogProps) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-screen overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">{campaign.title}</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="details" className="mt-4">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="details">DETAILS</TabsTrigger>
              <TabsTrigger value="deal">DEAL</TabsTrigger>
            </TabsList>
            <TabsContent value="details">
              <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={campaign.company.logo} />
                      <AvatarFallback>{campaign.company.name[0]}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-semibold">{campaign.company.name}</h3>
                    <Button variant="outline" className="w-full">
                      VIEW PROFILE
                    </Button>
                  </div>
  
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-muted-foreground" />
                      <span>One-off product / company endorsement</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <span>{campaign.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <span>{campaign.dateRange}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <span>{campaign.timeRange}</span>
                    </div>
                  </div>
  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">€ {campaign.amount.toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">VAT / Sales Tax excluded</p>
                    <p className="text-sm text-muted-foreground">Posted: {campaign.postedDate}</p>
                  </div>
  
                  <Button className="w-full">APPLY</Button>
                </div>
  
                <ScrollArea className="max-h-[70vh] pr-4">
                  <div className="space-y-6">
                    <section>
                      <h4 className="font-semibold mb-2">DESCRIPTION</h4>
                      <div className="space-y-4">
                        <h5 className="font-semibold">BACKGROUND:</h5>
                        <p>
                          The Wellington Eye Clinic was established in 1980 and is recognised as one of Europe's leading
                          eye care specialists with a particular interest in vision correction procedures.
                        </p>
                        <p>
                          We are situated in the Beacon Complex, Sandyford, Dublin, Ireland. Headed up by Mr Arthur
                          Cummings, one of the founders who is a world-renowned eye surgeon, the clinic has treated over
                          73,000 patients.
                        </p>
                        <p>
                          Just some of the well-known sports people who have had surgery at the WEC include Padraig
                          Harrington (golfer), Grace Doyle (surfer), Amy Broadhurst (boxer), Aidan O'Shea (GAA) and Paul
                          McGinley (golfer).
                        </p>
                        <p>
                          If you have ever thought that laser eye surgery might be something you are interested in,
                          through Sports Endorse, the WEC is offering you the opportunity to apply for its ambassador
                          programme. This is open to applications during the course of January. To apply please send your
                          name, email and a short summary (not more than 100 words) as to why you would like to be
                          considered to manager@wellingtoneyeclinic.com.
                        </p>
                      </div>
                    </section>
  
                    <section>
                      <h4 className="font-semibold mb-2">PRODUCT(S):</h4>
                      <p>Vision Correction Procedure. (Value Approx. €5,400 - Depending on Surgery Variables)</p>
                      <p>
                        The value will depend on the vision correction procedure required see
                        https://wellingtoneyeclinic.ie/pricing
                      </p>
                    </section>
  
                    <section>
                      <h4 className="font-semibold mb-2">TIMINGS</h4>
                      <p>Campaign details and timing information would go here...</p>
                    </section>
                  </div>
                </ScrollArea>
              </div>
            </TabsContent>
            <TabsContent value="deal">
              <div className="max-h-[70vh] flex items-center justify-center text-muted-foreground overflow-y-auto">
                Deal information would go here...
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    );
  }
  


