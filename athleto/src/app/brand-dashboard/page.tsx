"use client"
import React from 'react';
import { Plus } from 'lucide-react';
import BrandNavbar from '@/components/BrandNavbar';
import { useState } from 'react';
import { Dialog } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { DialogContent } from '@/components/ui/dialog';
import CreateOpportunityModal from '@/components/OpportunityModal';
import Chatbot from '@/components/Chatbot';




interface OpportunityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OpportunityModal: React.FC<OpportunityModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();

  
  const handleProvide = () => {
    router.push('/brand-profile');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white">
        <div className="relative">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            title="Close"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Modal content */}
          <div className="p-6">
            {/* Warning icon */}
            <div className="flex justify-center mb-6">
              <div className="bg-red-100 rounded-full p-3">
                <AlertTriangle className="h-8 w-8 text-red-400" />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-xl font-semibold text-center text-gray-900 mb-6">
              To create an opportunity
            </h2>

            {/* Requirements list */}
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-gray-700">
                <span className="h-1.5 w-1.5 bg-gray-700 rounded-full mr-3"></span>
                Provide profile info
              </li>
              <li className="flex items-center text-gray-700">
                <span className="h-1.5 w-1.5 bg-gray-700 rounded-full mr-3"></span>
                Brand Info
              </li>
              <li className="flex items-center text-gray-700">
                <span className="h-1.5 w-1.5 bg-gray-700 rounded-full mr-3"></span>
                Verify your account
              </li>
            </ul>

            {/* Action buttons */}
            <div className="flex space-x-3">
              <Button
                variant="outline"
                className="flex-1 py-2 text-gray-700 bg-white border-gray-300 hover:bg-gray-50"
                onClick={onClose}
              >
                CANCEL
              </Button>
              <Button
                className="flex-1 py-2 bg-blue-500 text-white hover:bg-blue-600"
                onClick={handleProvide}
              >
                PROVIDE
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const BrandDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

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
          </div>
       
            <div className="flex justify-end">
  <button 
       onClick={() => setIsModalOpen(true)}
  className="flex items-center px-4 py-2 text-indigo-600 rounded-md transition-colors whitespace-nowrap mb-4 hover:bg-gray-100 ml-auto">
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
            <button 
                 onClick={() => setShowCreateModal(true)}
            className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
              CREATE AN OPPORTUNITY
            </button>
          </div>

          
        )}

<CreateOpportunityModal 
  isOpen={showCreateModal}
  onClose={() => setShowCreateModal(false)}
/>
      </main>
      <Chatbot/>
    </div>
  );
};

export default BrandDashboard;