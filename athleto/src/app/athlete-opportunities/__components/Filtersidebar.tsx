"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function FilterSidebar() {
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  const [state, setState] = React.useState("all")
  const [city, setCity] = React.useState("all")
  const [budgetFrom, setBudgetFrom] = React.useState("")
  const [budgetTo, setBudgetTo] = React.useState("")
  const [currency, setCurrency] = React.useState("")
  const [opportunityType, setOpportunityType] = React.useState("")

  const clearFilters = () => {
    setDate(undefined)
    setState("all")
    setCity("all")
    setBudgetFrom("")
    setBudgetTo("")
    setCurrency("")
    setOpportunityType("")
  }

  return (
    <Card className="w-[300px]  flex flex-col h-[550px]">
        {/*Options within each filter components */}
      <CardHeader className="border-b py-3">
        <CardTitle>FILTERS</CardTitle>
      </CardHeader>
      <div className="overflow-y-auto flex-1">
        <CardContent className="space-y-4 py-3">
          <div className="space-y-2">
            <Label>Location</Label>
            <Select value={state} onValueChange={setState}>
              <SelectTrigger>
                <SelectValue placeholder="All states" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All states</SelectItem>
                <SelectItem value="delhi">Delhi</SelectItem>
                <SelectItem value="uttarpradesh">Uttar Pradesh</SelectItem>
              </SelectContent>
            </Select>
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger>
                <SelectValue placeholder="All cities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All cities</SelectItem>
                <SelectItem value="dublin">Dublin</SelectItem>
                <SelectItem value="london">London</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              variant="link" 
              className="px-0 text-sm text-muted-foreground" 
              onClick={() => { 
                setState("all")
                setCity("all")
              }}
            >
              Clear
            </Button>
          </div>
          <div className="space-y-2">
            <Label>Date</Label>
            <Calendar 
              mode="single" 
              selected={date} 
              onSelect={setDate} 
              className="rounded-md border w-full" 
            />
            <Button 
              variant="link" 
              className="px-0 text-sm text-muted-foreground" 
              onClick={() => setDate(undefined)}
            >
              Clear
            </Button>
          </div>
          <div className="space-y-2">
            <Label>Budget</Label>
            <div className="flex gap-2">
              <Input 
                placeholder="From" 
                type="number" 
                value={budgetFrom} 
                onChange={(e) => setBudgetFrom(e.target.value)} 
              />
              <Input 
                placeholder="To" 
                type="number" 
                value={budgetTo} 
                onChange={(e) => setBudgetTo(e.target.value)} 
              />
            </div>
            <Button 
              variant="link" 
              className="px-0 text-sm text-muted-foreground" 
              onClick={() => {
                setBudgetFrom("")
                setBudgetTo("")
              }}
            >
              Clear
            </Button>
          </div>
          <div className="space-y-2">
            <Label>Currency</Label>
            <RadioGroup value={currency} onValueChange={setCurrency}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="eur" id="eur" />
                <Label htmlFor="eur">€ EUR</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="usd" id="usd" />
                <Label htmlFor="usd">$ USD</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="gbp" id="gbp" />
                <Label htmlFor="gbp">£ GBP</Label>
              </div>
            </RadioGroup>
            <Button 
              variant="link" 
              className="px-0 text-sm text-muted-foreground" 
              onClick={() => setCurrency("")}
            >
              Clear
            </Button>
          </div>
          <div className="space-y-2">
            <Label>Opportunity Type</Label>
            <RadioGroup value={opportunityType} onValueChange={setOpportunityType}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ambassador" id="ambassador" />
                <Label htmlFor="ambassador">Strategic brand ambassador</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="endorsement" id="endorsement" />
                <Label htmlFor="endorsement">One-off product / company endorsement</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="event" id="event" />
                <Label htmlFor="event">One-off events / appearances</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="keynote" id="keynote" />
                <Label htmlFor="keynote">Leadership keynote / motivational speaker</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">Other</Label>
              </div>
            </RadioGroup>
            <Button 
              variant="link" 
              className="px-0 text-sm text-muted-foreground" 
              onClick={() => setOpportunityType("")}
            >
              Clear
            </Button>
          </div>
        </CardContent>
      </div>
      <div className="border-t p-3 bg-white">
        <div className="flex gap-2">
          <Button variant="outline" className="w-full" onClick={clearFilters}>
            CLEAR
          </Button>
          <Button className="w-full bg-indigo-600">APPLY</Button>
        </div>
      </div>
    </Card>
  )
}

export default FilterSidebar