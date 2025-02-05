"use client"

import type React from "react"
import { useState } from "react"
import { Bell, User, Menu } from "lucide-react"
import Link from "next/link"

const AthleteNavbar: React.FC = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="bg-white text-white py-4 px-6 ">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-2xl font-bold mr-6 text-indigo-600 transition-colors duration-200">
            ATHLETO
          </Link>
            <nav className="hidden md:flex items-center gap-6 text-gray-600">
            <Link href="/athlete-dashboard" className="hover:text-indigo-600">
            BRANDS
            </Link>
          <Link href="/athlete-opportunities" className="hover:text-indigo-600">
            OPPORTUNITIES
          </Link>
          <Link href="/athlete-applied" className="hover:text-indigo-600">
            APPLIED
          </Link>
          <Link href="#" className="hover:text-indigo-600">
            NEWS FEED
          </Link>
        </nav>
        </div>
        <div className="flex items-center gap-4">
          <button
            className="text-gray-900 p-2 rounded-full  transition-colors duration-200 relative"
            title="Notifications"
          >
            <Bell className="h-6 w-6 text-grey-900" />
            <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full border-2 border-gray-900"></span>
          </button>
          <div className="relative">
            <button
              className="text-gray-900 p-2 rounded-full  transition-colors duration-200 flex items-center gap-2"
              onClick={toggleUserMenu}
              title="User Menu"
            >
              <User className="h-7 w-7" />
              
            </button>
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-2 z-10 animate-fadeIn">
                {["Profile", "Settings", "Log out"].map((item) => (
                  <Link
                    key={item}
                    href="#"
                    className={`block px-4 py-2 hover:bg-gray-700 transition-colors duration-200 ${
                      item === "Log out" ? "text-red-500" : "text-white"
                    }`}
                  >
                    {item}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <button
            className="md:hidden text-white p-2 rounded-full hover:bg-gray-800 transition-colors duration-200"
            onClick={toggleMobileMenu}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <nav className="mt-4 md:hidden animate-fadeIn">
          {["Brands", "Opportunities", "Applied", "News Feed"].map((item) => (
            <Link
              key={item}
              href={item === "Brands" ? "/athlete-dashboard" : "#"}
              className="block py-2 px-4 hover:bg-gray-800 transition-colors duration-200"
            >
              {item}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}

export default AthleteNavbar

