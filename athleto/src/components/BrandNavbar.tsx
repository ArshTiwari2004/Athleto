import React from 'react';
import { Bell, UserCircle } from 'lucide-react';
import Link from 'next/link';

const BrandNavbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-indigo-600 text-xl font-bold">
            ATHLETO
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-8">
                <Link href="/opportunities" className="text-indigo-600 font-medium">
                  OPPORTUNITIES
                </Link>
                <Link href="/talent" className="text-gray-600 hover:text-gray-900 font-medium">
                  TALENT
                </Link>
                <Link href="/news-feed" className="text-gray-600 hover:text-gray-900 font-medium">
                  NEWS FEED
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-9">
            <button className="text-gray-600 hover:text-gray-900" title="Notifications">
              <Bell className="h-6 w-6" />
            </button>
            <button className="text-gray-600 hover:text-gray-900" title="User Profile">
              <UserCircle className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default BrandNavbar;
