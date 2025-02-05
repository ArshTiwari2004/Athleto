import React from 'react';
import { Plus } from 'lucide-react';
import BrandNavbar from '@/components/BrandNavbar';

const BrandDashboard = () => {
  // Dummy opportunities data
  const opportunities = [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Import Navbar */}
      <BrandNavbar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex space-x-8 border-b border-gray-200 w-full">
            <button className="border-b-2 border-indigo-600 pb-4 px-1 text-indigo-600 font-medium">
              OPEN / 0
            </button>
            <button className="text-gray-500 pb-4 px-1 font-medium hover:text-gray-700">
              CONFIRMED / 0
            </button>
            <button className="text-gray-500 pb-4 px-1 font-medium hover:text-gray-700">
              COMPLETE / 0
            </button>
       
          <button className="flex items-center px-4 py-2  text-indigo-600 rounded-md  transition-colors whitespace-nowrap  mb-4 hover:bg-gray-100 mr-4">
            <Plus className="h-5 w-5 mr-2" />
            NEW OPPORTUNITY
          </button>
          </div>
        </div>

        {/* Empty State */}
        {opportunities.length === 0 && (
          <div className="text-center py-16">
            <div className="mx-auto h-48 w-48 text-gray-400 mb-8">
              {/* Desert scene SVG */}
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path
                  d="M10,80 Q25,70 40,80 T70,80 T100,80"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M30,60 L50,30 L70,60"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <circle cx="50" cy="20" r="5" fill="currentColor" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              You have not posted any opportunities yet
            </h3>
            <button className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
              CREATE AN OPPORTUNITY
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default BrandDashboard;