import type React from "react"
import { Heart, Search, Sliders } from "lucide-react"
import AthleteNavbar from "@/components/AthleteNavbar"

const AthleteDashboard: React.FC = () => {
  const countries = [
    "All countries",
    "India",
    "United Kingdom",
    "Ireland",
    "United States",
    "Canada",
    "Australia",
    "Germany",
    "France",
    "Spain",
    "Italy",
    "Japan",
    "Singapore",
    "UAE",
    "South Africa",
  ]

  const cities = [
    "All cities",
    "Mumbai",
    "Delhi",
    "London",
    "Dublin",
    "Cork",
    "New York",
    "Toronto",
    "Sydney",
    "Berlin",
    "Paris",
    "Madrid",
    "Rome",
    "Tokyo",
    "Dubai",
  ]

  const industries = [
    "All industries",
    "Food & Beverage Retail",
    "Restaurants & Catering",
    "Consumer Goods & Apparel",
    "Technology",
    "Sports Equipment",
    "Entertainment",
    "Healthcare",
    "Education",
    "Financial Services",
    "Media",
    "Automotive",
    "Travel & Tourism",
    "Fitness & Wellness",
    "Retail",
  ]

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <AthleteNavbar />

      <div className="flex flex-1 p-6 gap-6">
        {/* Filters */}
        <div className="w-80">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Filters</h2>
              <Sliders className="text-blue-600" size={24} />
            </div>

            <div className="space-y-6">
              {["Country", "City", "Industry"].map((filter, index) => (
                <div key={filter} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">{filter}</span>
                    <button className="text-blue-600 text-sm hover:text-blue-800 transition-colors">Clear</button>
                  </div>
                  <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out">
                    {(index === 0 ? countries : index === 1 ? cities : industries).map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>
              ))}

              <div className="flex gap-3 mt-8">
                <button className="flex-1 py-3 px-4 border border-indigo-200 rounded-md text-gray-700 hover:bg-gray-50 transition-all duration-200 ease-in-out font-medium">
                  Clear All
                </button>
                <button className="flex-1 py-3 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-800 transition-all duration-200 ease-in-out font-medium">
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Search and Tabs */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search brands"
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out"
              />
            </div>
            <div className="flex gap-6 mt-6 border-b border-gray-200">
              <button className="px-4 py-3 text-blue-600 border-b-2 border-blue-600 font-semibold">All Brands</button>
              <button className="px-4 py-3 text-gray-600 hover:text-gray-800 transition-colors">Favorites</button>
            </div>
          </div>

          {/* Brands */}
          <div className="space-y-4">
            {/* Yummy Chumz */}
            <div className="bg-white border border-indigo-600 shadow-md rounded-lg p-6">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <img src="/photo1.jpeg" alt="Yummy Chumz" className="w-16 h-16 rounded-full" />
                  <div>
                  <div className="flex items-center gap-4">
                    <h3 className="text-xl font-bold text-black">Yummy Chumz</h3>
                  </div>
                  <p className="text-gray-600 mt-2">Food & Beverage Retail</p>
                  <p className="text-gray-600">United Kingdom, Online (UK)</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-blue-500">
                  <Heart size={24} />
                </button>
              </div>
            </div>

            {/* TGI Fridays */}
            <div className="bg-white border border-indigo-600 shadow-md rounded-lg p-6">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <img src="/download.png" alt="TGI Fridays" className="w-16 h-16 rounded-full" />
                  <div>
                    <h3 className="text-xl font-bold text-black">TGI Fridays</h3>
                    <p className="text-gray-600 mt-2">Restaurants & Catering</p>
                    <p className="text-gray-600">Ireland, Dublin</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-blue-500">
                  <Heart size={24} />
                </button>
              </div>
            </div>

            {/* Shuz Group */}
            <div className="bg-white border border-indigo-600 shadow-md rounded-lg p-6">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <img src="/shuz.png" alt="Shuz Group" className="w-16 h-16 rounded-full" />
                  <div>
                    <h3 className="text-xl font-bold text-black">Shuz Group</h3>
                    <p className="text-gray-600 mt-2">Consumer Goods & Apparel</p>
                    <p className="text-gray-600">Ireland, Cork</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-blue-500">
                  <Heart size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AthleteDashboard



