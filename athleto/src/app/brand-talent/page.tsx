"use client"

import React, { useState } from 'react';
import TalentFilters from '@/components/talent/TalentFilters';
import TalentSearch from '@/components/talent/TalentSearch';
import TalentGrid from '@/components/talent/TalentGrid';
import BrandNavbar from '@/components/BrandNavbar';
import Chatbot from '@/components/Chatbot';

export default function TalentPage() {
  const [filters, setFilters] = useState({
    sportType: '',
    location: {
      country: '',
      city: ''
    },
    performanceLevel: '',
    verificationStatus: '',
    sponsorshipAvailability: '',
    gender: '',
    tags: []
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [sortOption, setSortOption] = useState('popular');

  return (
    <div className="min-h-screen bg-gray-50 ">
        <BrandNavbar />
      <div className="max-w-7xl mx-auto flex space-x-6 mt-8 px-4 sm:px-6 lg:px-8 py-8">
        {/* Left Filters Section */}
        <div className="w-80 shrink-0">
          <TalentFilters 
            filters={filters} 
            onFilterChange={setFilters}
            sortOption={sortOption}
            onSortChange={setSortOption}
          />
        </div>

        {/* Right Content Section */}
        <div className="flex-1 min-w-0">
          <TalentSearch 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          
          <TalentGrid 
            filters={filters}
            searchTerm={searchTerm}
            activeTab={activeTab}
            sortOption={sortOption}
          />
        </div>
      </div>
      <Chatbot/>
    </div>
  );
}
