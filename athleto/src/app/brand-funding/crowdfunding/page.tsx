// pages/brand/campaigns.tsx
"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import BrandNavbar from '@/components/BrandNavbar';
import Image from 'next/image';

// Define TypeScript interfaces
interface Campaign {
  id: string;
  title: string;
  description: string;
  funding_amount: number;
  application_deadline: string;
  post_image: string;
  skills_required: string; // Used as category
  status: string;
  created_at: string;
  // Additional calculated fields
  current_funding: number;
  progress_percentage: number;
  athlete_name: string;
  athlete_image: string;
}

export default function BrandCampaignsView() {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      // Get all active campaigns
      const { data, error } = await supabase
        .from('opportunity')
        .select(`
          id, 
          title, 
          description, 
          funding_amount, 
          application_deadline, 
          post_image, 
          skills_required,
          status,
          created_at,
          brand_id
        `)
        .eq('selection_process', 'crowdfunding')
        .eq('status', 'active');

      if (error) throw error;

      // If we have campaigns, get additional data
      if (data) {
        // Get athlete information for each campaign
        const campaignsWithAthleteInfo = await Promise.all(
          data.map(async (campaign) => {
            // Get brand info (using as athlete info in this context)
            const { data: brandData } = await supabase
              .from('brands')
              .select('first_name, last_name, brand_logo')
              .eq('id', campaign.brand_id)
              .single();

            // Get current funding for this campaign
            const { data: paymentsData } = await supabase
              .from('payments')
              .select('amount')
              .eq('transaction_id', campaign.id); // Assuming transaction_id links to campaign id

            const totalFunding = paymentsData ? 
              paymentsData.reduce((sum, payment) => sum + payment.amount, 0) : 0;
            
            const progressPercentage = campaign.funding_amount > 0 ? 
              Math.min(100, (totalFunding / campaign.funding_amount) * 100) : 0;

            return {
              ...campaign,
              current_funding: totalFunding,
              progress_percentage: progressPercentage,
              athlete_name: brandData ? `${brandData.first_name} ${brandData.last_name}` : 'Unknown Athlete',
              athlete_image: brandData?.brand_logo || '/placeholder-athlete.jpg'
            };
          })
        );

        setCampaigns(campaignsWithAthleteInfo);
      }
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          campaign.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          campaign.athlete_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') {
      return matchesSearch;
    } else {
      return campaign.skills_required === filter && matchesSearch;
    }
  });

  const sportCategories = [
    'Athletics', 'Swimming', 'Boxing', 'Wrestling', 'Weightlifting', 
    'Gymnastics', 'Tennis', 'Badminton', 'Cricket', 'Football', 
    'Hockey', 'Archery', 'Shooting', 'Cycling', 'Other'
  ];

  // Function to format date 
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <BrandNavbar />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Athlete Campaigns</h1>
            <p className="mt-2 text-gray-600">Support talented athletes in their journey to success</p>
          </div>
          <div className="mt-4 sm:mt-0 space-y-4 sm:space-y-0 sm:flex sm:space-x-4 w-full sm:w-auto">
            <div className="w-full sm:w-64">
              <input
                type="text"
                placeholder="Search campaigns..."
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full sm:w-48">
              <select
                aria-label="Filter by category"
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Sports</option>
                {sportCategories.map((sport) => (
                  <option key={sport} value={sport}>{sport}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : filteredCampaigns.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-lg font-medium text-gray-900">No campaigns found</h3>
            <p className="mt-2 text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCampaigns.map((campaign) => (
              <div key={campaign.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 relative">
                  {campaign.post_image ? (
                    <img 
                      src={campaign.post_image} 
                      alt={campaign.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">No image available</span>
                    </div>
                  )}
                </div>
                
                <div className="p-5">
                  <div className="flex items-center mb-3">
                    <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden mr-3">
                      {campaign.athlete_image ? (
                        <img 
                          src={campaign.athlete_image} 
                          alt={campaign.athlete_name}
                          className="w-full h-full object-cover" 
                        />
                      ) : (
                        <div className="w-full h-full bg-indigo-100 flex items-center justify-center">
                          <span className="text-indigo-500 font-bold">
                            {campaign.athlete_name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <span className="font-medium text-gray-900">{campaign.athlete_name}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{campaign.title}</h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">{campaign.description}</p>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">₹{campaign.current_funding.toLocaleString()} raised</span>
                      <span className="text-gray-500">of ₹{campaign.funding_amount.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-indigo-600 h-2 rounded-full" 
                        style={{ width: `${campaign.progress_percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm text-gray-500 mb-4">
                    <span>Category: {campaign.skills_required}</span>
                    <span>Ends: {formatDate(campaign.application_deadline)}</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => router.push(`/brand/campaigns/${campaign.id}`)}
                      className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      View Details
                    </button>
                    <button 
                      onClick={() => router.push(`/brand/campaigns/${campaign.id}/support`)}
                      className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      Support Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
    </div>
  );
}