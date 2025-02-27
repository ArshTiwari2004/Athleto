
// pages/athlete/create-campaign.tsx
"use client"
import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import AthleteNavbar from '@/components/AthleteNavbar';
import { supabase } from '@/lib/supabase';
import Chatbot from '@/components/Chatbot';

// Define TypeScript interfaces for our data
interface CampaignFormData {
  title: string;
  description: string;
  funding_goal: number;
  application_deadline: string;
  post_image: string;
  category: string;
  social_links: string;
  bank_account_number: string;
  ifsc_code?: string;
}

export default function CreateCampaign() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<CampaignFormData>({
    title: '',
    description: '',
    funding_goal: 0,
    application_deadline: '',
    post_image: '',
    category: '',
    social_links: '',
    bank_account_number: '',
    ifsc_code: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'funding_goal' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Get current authenticated user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        alert('You must be logged in to create a campaign');
        setIsLoading(false);
        return;
      }

      // Create the opportunity (campaign)
      const { data: opportunityData, error: opportunityError } = await supabase
        .from('opportunity')
        .insert([
          {
            title: formData.title,
            description: formData.description,
            number_of_entries: 0,
            status: 'active',
            application_deadline: formData.application_deadline,
            brand_id: user.id, // Using user ID as brand_id (we'll need to update this based on your data model)
            post_image: formData.post_image,
            funding_amount: formData.funding_goal,
            selection_process: 'crowdfunding',
            spots_available: 1,
            deadline: formData.application_deadline,
            skills_required: formData.category,
          }
        ])
        .select();

      if (opportunityError) throw opportunityError;

      if (opportunityData && opportunityData.length > 0) {
        const opportunityId = opportunityData[0].id;
        
        // You may need to add bank details to a separate table
        // This is assuming you have a bank_details table
        const { error: bankError } = await supabase
          .from('brands')
          .update({
            bank_account_number: formData.bank_account_number,
            iban: formData.ifsc_code
          })
          .eq('id', user.id);
          
        if (bankError) throw bankError;
        
        // Success - redirect to campaign view
        router.push(`/athlete/campaigns/${opportunityId}`);
      }
    } catch (error) {
      console.error('Error creating campaign:', error);
      alert('Failed to create campaign. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const sportCategories = [
    'Athletics', 'Swimming', 'Boxing', 'Wrestling', 'Weightlifting', 
    'Gymnastics', 'Tennis', 'Badminton', 'Cricket', 'Football', 
    'Hockey', 'Archery', 'Shooting', 'Cycling', 'Other'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <AthleteNavbar />
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Create Your Crowdfunding Campaign</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Campaign Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Help Me Train for the Olympics"
                onChange={handleChange}
                value={formData.title}
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Campaign Description
              </label>
              <textarea
                name="description"
                id="description"
                rows={4}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Explain why you need funding and how it will help your athletic career..."
                onChange={handleChange}
                value={formData.description}
              />
            </div>

            <div>
              <label htmlFor="funding_goal" className="block text-sm font-medium text-gray-700">
                Funding Goal (₹)
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">₹</span>
                </div>
                <input
                  type="number"
                  name="funding_goal"
                  id="funding_goal"
                  required
                  min="1000"
                  className="block w-full pl-8 pr-12 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="500000"
                  onChange={handleChange}
                  value={formData.funding_goal || ''}
                />
              </div>
            </div>

            <div>
              <label htmlFor="application_deadline" className="block text-sm font-medium text-gray-700">
                Campaign Deadline
              </label>
              <input
                type="date"
                name="application_deadline"
                id="application_deadline"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                onChange={handleChange}
                value={formData.application_deadline}
              />
            </div>

            <div>
              <label htmlFor="post_image" className="block text-sm font-medium text-gray-700">
                Campaign Image URL
              </label>
              <input
                type="url"
                name="post_image"
                id="post_image"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="https://example.com/your-image.jpg"
                onChange={handleChange}
                value={formData.post_image}
              />
              <p className="mt-2 text-sm text-gray-500">
                Provide a URL to an image that showcases your journey
              </p>
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Sport Category
              </label>
              <select
                name="category"
                id="category"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                onChange={handleChange}
                value={formData.category}
              >
                <option value="">Select a sport</option>
                {sportCategories.map((sport) => (
                  <option key={sport} value={sport}>{sport}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="social_links" className="block text-sm font-medium text-gray-700">
                Social Media Links (Optional)
              </label>
              <input
                type="text"
                name="social_links"
                id="social_links"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Instagram: @yourhandle, Twitter: @yourhandle"
                onChange={handleChange}
                value={formData.social_links}
              />
            </div>

            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Bank Account Details</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="bank_account_number" className="block text-sm font-medium text-gray-700">
                    Bank Account Number
                  </label>
                  <input
                    type="text"
                    name="bank_account_number"
                    id="bank_account_number"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Your bank account number"
                    onChange={handleChange}
                    value={formData.bank_account_number}
                  />
                </div>

                <div>
                  <label htmlFor="ifsc_code" className="block text-sm font-medium text-gray-700">
                    IFSC Code
                  </label>
                  <input
                    type="text"
                    name="ifsc_code"
                    id="ifsc_code"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="SBIN0123456"
                    onChange={handleChange}
                    value={formData.ifsc_code}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isLoading ? 'Creating...' : 'Create Campaign'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Chatbot/>
    </div>
  );
}