"use client";

import React, { useState } from 'react';
import { Bell, User, Search } from 'lucide-react';
import Link from 'next/link';

const AthleteNavbar: React.FC = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <header className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center shadow-md">
      <div className="flex items-center gap-4">
        <Link href="/" className="text-2xl font-bold">
          Athleto
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="#" className="hover:text-gray-400">
            Brands
          </Link>
          <Link href="/athlete-opportunities" className="hover:text-gray-400">
            Opportunities
          </Link>
          <Link href="#" className="hover:text-gray-400">
            Applied
          </Link>
          <Link href="#" className="hover:text-gray-400">
            News Feed
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <button
          className="text-white p-2 rounded-md hover:bg-gray-800"
          title="Notifications"
        >
          <Bell className="h-6 w-6" />
        </button>
        <div className="relative">
          <button
            className=" text-white p-2 rounded-md hover:bg-gray-800"
            onClick={toggleUserMenu}
            title="User Menu"
          >
            <User className="h-6 w-6" />
          </button>
          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-2 z-10">
              <Link
                href="#"
                className="block px-4 py-2 hover:bg-gray-700 text-white"
              >
                Profile
              </Link>
              <Link
                href="#"
                className="block px-4 py-2 hover:bg-gray-700 text-white"
              >
                Settings
              </Link>
              <Link
                href="#"
                className="block px-4 py-2 hover:bg-gray-700 text-red-500"
              >
                Log out
              </Link>
            </div>
          )}
        </div>
        <div className="relative flex-1">
          <div className="flex items-center gap-4 bg-gray-700 rounded-md px-4 py-2">
            <Search className="h-6 w-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search brands..."
              className="bg-transparent text-white flex-1 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AthleteNavbar;