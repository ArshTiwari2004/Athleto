"use client"

import React, { useState } from 'react'
import { Search, Sliders, Heart, MoreHorizontal, MapPin, Building2, Globe, Users, Badge, Clock } from 'lucide-react'
import AthleteNavbar from "@/components/AthleteNavbar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Badge as UIBadge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Instagram, Linkedin, Facebook } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useForceLightMode } from '@/hooks/useForcedLightTheme'
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useRouter } from 'next/navigation'
import Chatbot from '@/components/Chatbot'

interface Brand {
  id: string
  name: string
  logo: string
  coverImage: string
  industry: string
  location: string
  verified: boolean
  active: boolean
  website: string
  description: string
  sponsorshipTypes: string[]
  totalSponsored: number
  socialLinks: {
    instagram?: string
    linkedin?: string
    facebook?: string
  }
  businessEmail: string
  street: string
  city: string
  country: string
  postalCode: string
  vatNumber: string
}

const SAMPLE_BRANDS: Brand[] = [
  {
    id: "brand-001",
    name: "Yoddha Sportswear",
    logo: "https://yoddhasports.com/cdn/shop/files/Artboard_1_copy_7-min_900x.png?v=1703831108",
    coverImage: "https://yoddhasports.com/cdn/shop/files/3_1_2260x.png?v=1703849388",
    industry: "Sportswear & Equipment",
    location: "Bengaluru, India",
    verified: true,
    active: true,
    website: "https://yoddhasports.in",
    description: "Yoddha Sportswear is India's premier athletic apparel company with roots in traditional Indian sports like kabaddi and kho-kho. Founded in 2014, we've expanded to serve athletes across cricket, field hockey, and track sports. Our designs blend modern performance technology with elements inspired by India's rich sporting heritage.",
    sponsorshipTypes: ["Product Sponsorship", "Training Camp Support", "Performance Bonuses", "Tournament Entry Fees"],
    totalSponsored: 125,
    socialLinks: {
      instagram: "yoddhasportswear",
      linkedin: "yoddha-sportswear",
      facebook: "yoddhasportsofficial"
    },
    businessEmail: "partnerships@yoddhasports.in",
    street: "742 Outer Ring Road, Koramangala",
    city: "Bengaluru",
    country: "India",
    postalCode: "560034",
    vatNumber: "29AADCY4321P1ZB"
  },
  {
    id: "brand-002",
    name: "Shakti Nutrition",
    logo: "data:image/jpeg;base64,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",
    coverImage: "/api/placeholder/1200/400",
    industry: "Nutrition & Supplements",
    location: "Mumbai, India",
    verified: true,
    active: true,
    website: "https://shaktinutrition.in",
    description: "Shakti Nutrition is India's leading sports nutrition brand, combining Ayurvedic principles with modern sports science. Our supplements are formulated using locally-sourced ingredients that align with traditional Indian nutritional wisdom. We specialize in plant-based proteins, recovery formulations, and performance enhancers tailored for Indian athletes' needs.",
    sponsorshipTypes: ["Nutrition Supply", "Wellness Coaching", "Ambassador Program"],
    totalSponsored: 87,
    socialLinks: {
      instagram: "shaktinutrition",
      linkedin: "shakti-nutrition-india",
      facebook: "shaktinutritionofficial"
    },
    businessEmail: "athletes@shaktinutrition.in",
    street: "204 Linking Road, Bandra West",
    city: "Mumbai",
    country: "India",
    postalCode: "400050",
    vatNumber: "27AABCS8765R1ZY"
  },
  {
    id: "brand-003",
    name: "Himalyan Outdoors",
    logo: "data:image/png;base64,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",
    coverImage: "/api/placeholder/1200/400",
    industry: "Outdoor Equipment",
    location: "Dehradun, India",
    verified: true,
    active: true,
    website: "https://himalayanoutdoors.in",
    description: "Himalyan Outdoors creates expedition-grade equipment for mountaineering, trekking, and adventure sports across the Indian Himalayan region. Founded by former Indian mountaineering expedition members, our gear is tested in the most challenging terrains India has to offer. We commit 3% of our revenue to supporting Himalayan conservation efforts.",
    sponsorshipTypes: ["Equipment Provision", "Expedition Funding", "High-Altitude Training", "Media Support"],
    totalSponsored: 53,
    socialLinks: {
      instagram: "himalyanoutdoors",
      linkedin: "himalyan-outdoors",
      facebook: "himalyanoutdoorsofficial"
    },
    businessEmail: "expeditions@himalyanoutdoors.in",
    street: "78 Rajpur Road",
    city: "Dehradun",
    country: "India",
    postalCode: "248001",
    vatNumber: "05AADCH2345Q1ZX"
  },
  {
    id: "brand-004",
    name: "Cricket Champions",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrGYKwfU2bV6f3GsA3HI5tDSIEBB_6lZtpcQ&s",
    coverImage: "/api/placeholder/1200/400",
    industry: "Cricket Equipment",
    location: "Delhi, India",
    verified: true,
    active: true,
    website: "https://cricketchampions.in",
    description: "Cricket Champions is India's fastest-growing cricket equipment manufacturer. Our bats, pads, and protective gear are handcrafted using traditional techniques combined with modern performance analytics. We've supplied equipment to over 30 first-class cricketers and partner with cricket academies across all major Indian cities.",
    sponsorshipTypes: ["Equipment Sponsorship", "Academy Scholarships", "Tournament Sponsorship"],
    totalSponsored: 142,
    socialLinks: {
      instagram: "cricketchampions",
      linkedin: "cricket-champions-india",
      facebook: "cricketchampionsofficial"
    },
    businessEmail: "players@cricketchampions.in",
    street: "27 Feroz Shah Road",
    city: "New Delhi",
    country: "India",
    postalCode: "110001",
    vatNumber: "07AAFCC7890B1ZW"
  },
  {
    id: "brand-005",
    name: "FlexFit India",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY3dPRo3by5UjaT4ZBA8IMjSUc5SBl1ppBXQ&s",
    coverImage: "/api/placeholder/1200/400",
    industry: "Fitness Equipment",
    location: "Pune, India",
    verified: true,
    active: true,
    website: "https://flexfitindia.com",
    description: "FlexFit India manufactures premium strength and conditioning equipment designed specifically for Indian athletes and fitness enthusiasts. Our adjustable dumbbells, resistance bands, and home gym systems are engineered to suit the spatial constraints of urban Indian homes while delivering professional-grade training results.",
    sponsorshipTypes: ["Equipment Provision", "Training Facility Partnerships", "Fitness Challenge Sponsorship"],
    totalSponsored: 76,
    socialLinks: {
      instagram: "flexfitindia",
      linkedin: "flexfit-india",
      facebook: "flexfitindiaofficial"
    },
    businessEmail: "partnerships@flexfitindia.com",
    street: "204 Senapati Bapat Road, Shivajinagar",
    city: "Pune",
    country: "India",
    postalCode: "411016",
    vatNumber: "27AADFF5678Q1ZV"
  },
  {
    id: "brand-006",
    name: "Chakra Performance",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQr3TCBYtKTeXJkmHuG6Ohf85t3ZEremuw1Q&s",
    coverImage: "/api/placeholder/1200/400",
    industry: "Sports Technology",
    location: "Hyderabad, India",
    verified: true,
    active: true,
    website: "https://chakraperformance.tech",
    description: "Chakra Performance develops cutting-edge wearable technology for athletic performance monitoring. Our devices track traditional metrics along with biomarkers specific to Indian athletes' needs. Our flagship product, the Chakra Band, measures heart rate variability, sleep quality, and recovery parameters with algorithms calibrated specifically for South Asian physiology.",
    sponsorshipTypes: ["Technology Provision", "Data Analysis Support", "Research Partnerships"],
    totalSponsored: 64,
    socialLinks: {
      instagram: "chakraperformance",
      linkedin: "chakra-performance-tech",
      facebook: "chakraperformanceofficial"
    },
    businessEmail: "athletes@chakraperformance.tech",
    street: "512 HITEC City, Gachibowli",
    city: "Hyderabad",
    country: "India",
    postalCode: "500032",
    vatNumber: "36AAECC6789D1ZS"
  },
  {
    id: "brand-007",
    name: "Khel Mahaan",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgXSRYSx96sM0xLa8DgwvTBTBcWVdqra60Pg&s",
    coverImage: "/api/placeholder/1200/400",
    industry: "Sports Development",
    location: "Chennai, India",
    verified: true,
    active: true,
    website: "https://khelmahaan.org",
    description: "Khel Mahaan is India's premier sports development foundation focused on identifying and nurturing athletic talent from rural and underserved communities. Founded by former Indian Olympic athletes, we provide comprehensive support including equipment, coaching, nutrition, and educational guidance to promising young athletes across multiple disciplines.",
    sponsorshipTypes: ["Full Scholarships", "Competition Expenses", "Equipment Support", "International Exposure"],
    totalSponsored: 210,
    socialLinks: {
      instagram: "khelmahaan",
      linkedin: "khel-mahaan-foundation",
      facebook: "khelmahaanofficial"
    },
    businessEmail: "support@khelmahaan.org",
    street: "45 Mount Road, Anna Salai",
    city: "Chennai",
    country: "India",
    postalCode: "600002",
    vatNumber: "33AABCK4321R1ZT"
  }
]

export default function AthleteDashboard() {
  useForceLightMode()
  const router = useRouter();
  const [favorites, setFavorites] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("all")
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    country: "",
    city: "",
    industry: "",
    verificationStatus: "",
    sponsorshipType: ""
  })

  const filteredBrands = SAMPLE_BRANDS.filter(brand => {
    if (activeTab === "favorites" && !favorites.includes(brand.id)) return false

    const searchLower = searchQuery.toLowerCase()
    if (searchQuery && !brand.name.toLowerCase().includes(searchLower) &&
      !brand.industry.toLowerCase().includes(searchLower) &&
      !brand.location.toLowerCase().includes(searchLower)) return false

    if (filters.country && !brand.location.toLowerCase().includes(filters.country.toLowerCase())) return false
    if (filters.city && !brand.location.toLowerCase().includes(filters.city.toLowerCase())) return false
    if (filters.industry && brand.industry !== filters.industry) return false
    if (filters.verificationStatus && brand.verified !== (filters.verificationStatus === "Verified")) return false

    return true
  })

  const toggleFavorite = (brandId: string, event: React.MouseEvent) => {
    event.stopPropagation()
    setFavorites(prev =>
      prev.includes(brandId) ? prev.filter(id => id !== brandId) : [...prev, brandId]
    )
  }

  const handleBrandClick = (brand: Brand) => {
    setSelectedBrand(brand)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <AthleteNavbar />

      <div className="flex flex-1  gap-6 mt-8 px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters Panel */}
        <div className="w-80">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Refine Brands</h2>
              <Sliders className="text-gray-400" size={20} />
            </div>

            <div className="space-y-4">
              {Object.entries(filters).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <select
                    aria-label={key}
                    value={value}
                    onChange={(e) => setFilters(prev => ({ ...prev, [key]: e.target.value }))}
                    className="w-full p-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-700"
                  >
                    <option value="">All</option>
                    {/* Add relevant options based on filter type */}
                  </select>
                </div>
              ))}

              <div className="flex gap-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setFilters({
                    country: "",
                    city: "",
                    industry: "",
                    verificationStatus: "",
                    sponsorshipType: ""
                  })}
                  className="flex-1"
                >
                  Clear All
                </Button>
                <Button className="flex-1  bg-indigo-600 text-white hover:bg-indigo-800">Apply</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl"
              />
            </div>

            <div className="flex space-x-2 bg-gray-100 rounded-lg p-1 mt-5">
              <button
                className={`flex-1 py-2 rounded-md text-sm font-medium transition-all duration-300 ${activeTab === 'all'
                  ? 'bg-white shadow-sm text-indigo-700'
                  : 'text-gray-600 hover:bg-gray-200'
                  }`}
                onClick={() => setActiveTab('all')}
              >
                All Brands
              </button>
              <button
                className={`flex-1 py-2 rounded-md text-sm font-medium transition-all duration-300 ${activeTab === 'favorites'
                  ? 'bg-white shadow-sm text-indigo-700'
                  : 'text-gray-600 hover:bg-gray-200'
                  }`}
                onClick={() => setActiveTab('favorites')}
              >
                Favorite Brands
              </button>
            </div>
          </div>

          {/* Brand Cards */}
          <div className="grid grid-cols-1 gap-6">
            {filteredBrands.map(brand => (
              <div
                key={brand.id}
                onClick={() => handleBrandClick(brand)}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6 cursor-pointer"
              >
                <div className="flex items-start gap-6">
                  <img src={brand.logo} alt={brand.name} className="w-20 h-20 rounded-lg object-cover" />

                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-semibold">{brand.name}</h3>
                          {brand.verified && (
                            <UIBadge variant="secondary" className="bg-green-100 text-green-800">
                              Verified
                            </UIBadge>
                          )}
                          {brand.active && (
                            <UIBadge variant="secondary" className="bg-blue-100 text-blue-800">
                              Active
                            </UIBadge>
                          )}
                        </div>

                        <div className="flex items-center gap-4 mt-2 text-gray-600">
                          <div className="flex items-center gap-1">
                            <Building2 size={16} />
                            <span>{brand.industry}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin size={16} />
                            <span>{brand.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users size={16} />
                            <span>{brand.totalSponsored} sponsored athletes</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => toggleFavorite(brand.id, e)}
                          className={favorites.includes(brand.id) ? "text-red-500" : "text-gray-400"}
                        >
                          <Heart fill={favorites.includes(brand.id) ? "currentColor" : "none"} />
                        </Button>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => window.location.href = `/report/${brand.id}`}>
                              Report brand
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => window.location.href = `/share/${brand.id}`}>
                              Share brand
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600" onClick={() => window.location.href = `/block/${brand.id}`}>
                              Block brand
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {brand.sponsorshipTypes.map(type => (
                        <UIBadge key={type} variant="outline">
                          {type}
                        </UIBadge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Brand Details Modal */}
      <Dialog open={!!selectedBrand} onOpenChange={() => setSelectedBrand(null)}>
        <DialogContent className="max-w-5xl p-0">
          <DialogTitle asChild>
            <VisuallyHidden>{selectedBrand?.name || "Brand Details"}</VisuallyHidden>
          </DialogTitle>

          {selectedBrand && (
            <div className="h-[85vh] overflow-y-auto">
              {/* Cover Image */}
              <div className="relative h-64">
                <img
                  src={selectedBrand.coverImage}
                  alt={`${selectedBrand.name} cover`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(selectedBrand.id, e);
                    }}
                    className={`bg-white/80 hover:bg-white ${favorites.includes(selectedBrand.id) ? "text-red-500" : "text-gray-700"}`}
                  >
                    <Heart fill={favorites.includes(selectedBrand.id) ? "currentColor" : "none"} />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex items-start gap-6 -mt-20 relative">
                  <img
                    src={selectedBrand.logo}
                    alt={selectedBrand.name}
                    className="w-28 h-28 rounded-xl border-4 border-white shadow-lg bg-white"
                  />
                  <div className="flex-1 mt-20">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-2xl font-bold">{selectedBrand.name}</h2>
                          {selectedBrand.verified && (
                            <UIBadge variant="secondary" className="bg-green-100 text-green-800">
                              Verified
                            </UIBadge>
                          )}
                          {selectedBrand.active && (
                            <UIBadge variant="secondary" className="bg-blue-100 text-blue-800">
                              Active
                            </UIBadge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-gray-600">
                          <div className="flex items-center gap-1">
                            <Building2 size={16} />
                            <span>{selectedBrand.industry}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin size={16} />
                            <span>{selectedBrand.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Globe size={16} />
                            <a href={selectedBrand.website} target="_blank" className="text-indigo-600 hover:underline">
                              {selectedBrand.website.replace(/^https?:\/\//, '')}
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => window.open(`mailto:${selectedBrand.businessEmail}`, "_blank")}
                        >
                          Contact Brand
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6 mt-8">
                  {/* Left Column */}
                  <div className="col-span-2 space-y-8">
                    {/* About */}
                    <section className="bg-white p-6 rounded-xl shadow-sm">
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <Building2 className="mr-2 h-5 w-5 text-indigo-600" />
                        About {selectedBrand.name}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">{selectedBrand.description}</p>

                      <div className="mt-6 grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-5 w-5 text-gray-500" />
                          <div>
                            <p className="text-sm text-gray-500">Address</p>
                            <p className="font-medium">{selectedBrand.street}</p>
                            <p className="font-medium">{selectedBrand.city}, {selectedBrand.country} {selectedBrand.postalCode}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="h-5 w-5 text-gray-500" />
                          <div>
                            <p className="text-sm text-gray-500">VAT/ID Number</p>
                            <p className="font-medium">{selectedBrand.vatNumber || "Not provided"}</p>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Sponsorship Opportunities */}
                    <section className="bg-white p-6 rounded-xl shadow-sm">
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <Globe className="mr-2 h-5 w-5 text-indigo-600" />
                        Sponsorship Opportunities
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {selectedBrand.sponsorshipTypes.map((type) => (
                          <div key={type} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                            <h4 className="font-medium text-indigo-700 mb-2">{type}</h4>
                            <p className="text-sm text-gray-600">
                              This brand offers {type.toLowerCase()} sponsorship opportunities for athletes.
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6">
                        <h4 className="font-medium text-gray-800 mb-3">Eligibility Requirements</h4>
                        <ul className="space-y-2">
                          {SAMPLE_REQUIREMENTS.map((req, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="h-5 w-5 rounded-full bg-green-100 text-green-800 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">✓</div>
                              <div>
                                <span className="font-medium">{req.title}:</span> {req.description}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </section>

                    {/* Perks and Benefits */}
                    <section className="bg-white p-6 rounded-xl shadow-sm">
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <Badge className="mr-2 h-5 w-5 text-indigo-600" />
                        Sponsorship Perks & Benefits
                      </h3>
                      <div className="grid grid-cols-1 gap-4">
                        {SAMPLE_PERKS.map((perk, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-indigo-50 rounded-lg">
                            <div className="h-8 w-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-lg flex-shrink-0">
                              {index + 1}
                            </div>
                            <div>
                              <h4 className="font-medium text-indigo-800">{perk.title}</h4>
                              <p className="text-sm text-gray-700 mt-1">{perk.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* Funding Opportunities */}
                    <section className="bg-white p-6 rounded-xl shadow-sm">
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <Clock className="mr-2 h-5 w-5 text-indigo-600" />
                        Current Funding Opportunities
                      </h3>
                      {SAMPLE_FUNDING.map((fund, index) => (
                        <div key={index} className="p-5 border border-gray-200 rounded-lg">
                          <div className="flex justify-between items-start">
                            <h4 className="font-semibold text-gray-900">{fund.title}</h4>
                            <UIBadge className="bg-amber-100 text-amber-800 border-amber-200">
                              Due: {fund.deadline}
                            </UIBadge>
                          </div>
                          <p className="text-xl font-bold text-indigo-700 my-2">{fund.amount}</p>
                          <h5 className="text-sm font-medium text-gray-700 mt-4 mb-2">Eligibility Criteria:</h5>
                          <ul className="space-y-1">
                            {fund.criteria.map((criterion, idx) => (
                              <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                                {criterion}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </section>

                    {/* Testimonials */}
                    <section className="bg-white p-6 rounded-xl shadow-sm">
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <Users className="mr-2 h-5 w-5 text-indigo-600" />
                        Sponsored Athletes
                      </h3>
                      <div className="grid grid-cols-2 gap-6">
                        {SAMPLE_PAST_SPONSORS.map((athlete, index) => (
                          <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                            <img
                              src={athlete.image}
                              alt={athlete.name}
                              className="w-16 h-16 rounded-full object-cover"
                            />
                            <div>
                              <h4 className="font-medium text-gray-900">{athlete.name}</h4>
                              <p className="text-sm text-gray-500">{athlete.sport}</p>
                              {athlete.testimonial && (
                                <p className="text-sm text-gray-700 mt-2 italic">"{athlete.testimonial}"</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 text-center">
                        <Button variant="outline" className="text-indigo-600">
                          View All Sponsored Athletes
                        </Button>
                      </div>
                    </section>
                  </div>

                  {/* Right Column - Sidebar */}
                  <div className="space-y-6">
                    {/* Quick Info */}
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                      <h3 className="text-md font-semibold mb-4">Brand Information</h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-500">Industry</p>
                          <p className="font-medium">{selectedBrand.industry}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Location</p>
                          <p className="font-medium">{selectedBrand.location}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Total Sponsored Athletes</p>
                          <p className="font-medium">{selectedBrand.totalSponsored}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Available Sponsorships</p>
                          <p className="font-medium">{selectedBrand.sponsorshipTypes.length}</p>
                        </div>
                        {selectedBrand.verified && (
                          <div className="flex items-center gap-2 text-green-700 bg-green-50 p-2 rounded">
                            <Badge className="h-4 w-4" />
                            <span className="text-sm font-medium">Verified Brand</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Social Media */}
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                      <h3 className="text-md font-semibold mb-4">Connect & Follow</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {Object.entries(selectedBrand.socialLinks).map(([platform, handle]) => (
                          <Button
                            key={platform}
                            variant="outline"
                            className="justify-start"
                            onClick={() => window.open(`https://${platform}.com/${handle}`, "_blank")}
                          >
                            {platform === "instagram" && <Instagram className="w-4 h-4 mr-2 text-pink-500" />}
                            {platform === "linkedin" && <Linkedin className="w-4 h-4 mr-2 text-blue-500" />}
                            {platform === "facebook" && <Facebook className="w-4 h-4 mr-2 text-blue-700" />}
                            {platform.charAt(0).toUpperCase() + platform.slice(1)}
                          </Button>
                        ))}
                        <Button
                          variant="outline"
                          className="justify-start"
                          onClick={() => window.open(selectedBrand.website, "_blank")}
                        >
                          <Globe className="h-4 w-4 mr-2" />
                          Website
                        </Button>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                      <h3 className="text-md font-semibold mb-4">Actions</h3>
                      <div className="space-y-3">
                        <Button className="w-full bg-indigo-600 hover:bg-indigo-700" onClick={()=>router.push(`/athlete-sponsor/${selectedBrand.name}`)}>
                          Apply for Sponsorship
                        </Button>
                        <Button variant="outline" className="w-full">
                          Save to Favorites
                        </Button>
                        <Button variant="ghost" className="w-full text-gray-600">
                          Share Brand Profile
                        </Button>
                      </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                      <h3 className="text-md font-semibold mb-4">Engagement Metrics</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Response Rate</span>
                          <span className="font-medium">94%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '94%' }}></div>
                        </div>

                        <div className="flex justify-between items-center mt-4">
                          <span className="text-sm text-gray-600">Avg. Response Time</span>
                          <span className="font-medium">2 days</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                        </div>

                        <div className="flex justify-between items-center mt-4">
                          <span className="text-sm text-gray-600">Application Success</span>
                          <span className="font-medium">28%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '28%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      <Chatbot/>
    </div>
  )
}

// Add type definitions for props
interface SponsorshipRequirement {
  title: string
  description: string
}

interface SponsorshipPerk {
  title: string
  description: string
}

interface FundingOpportunity {
  title: string
  amount: string
  deadline: string
  criteria: string[]
}

interface PastSponsor {
  name: string
  sport: string
  image: string
  testimonial?: string
}

// These would typically come from your API/database
const SAMPLE_REQUIREMENTS: SponsorshipRequirement[] = [
  {
    title: "Age Requirement",
    description: "Athletes must be between 16-35 years old"
  },
  {
    title: "Skill Level",
    description: "Competing at national or international level"
  },
  {
    title: "Club Affiliation",
    description: "Must be affiliated with a recognized sports club"
  }
]

const SAMPLE_PERKS: SponsorshipPerk[] = [
  {
    title: "Equipment Support",
    description: "Full gear package including competition and training equipment"
  },
  {
    title: "Professional Coaching",
    description: "Access to certified professional coaches and training programs"
  },
  {
    title: "Competition Support",
    description: "Travel and accommodation support for major competitions"
  }
]

const SAMPLE_FUNDING: FundingOpportunity[] = [
  {
    title: "Elite Athlete Grant",
    amount: "$5,000 - $50,000",
    deadline: "December 31, 2024",
    criteria: [
      "Proven track record in national competitions",
      "Clear development plan",
      "Financial need assessment"
    ]
  }
]

const SAMPLE_PAST_SPONSORS: PastSponsor[] = [
  {
    name: "John Smith",
    sport: "Swimming",
    image: "/api/placeholder/100/100",
    testimonial: "The support I received was instrumental in achieving my goals."
  },
  {
    name: "Sarah Johnson",
    sport: "Athletics",
    image: "/api/placeholder/100/100",
    testimonial: "An amazing partnership that helped me reach new heights."
  }
]

// Export additional components if needed
export type { Brand, SponsorshipRequirement, SponsorshipPerk, FundingOpportunity, PastSponsor }