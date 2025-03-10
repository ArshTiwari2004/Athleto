"use client"

import React, { useState } from 'react';
import { Bell, User, HelpCircle, MessageSquare, X, ChevronDown, Star, Menu } from 'lucide-react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Montserrat } from "next/font/google";
import { supabase } from "@/lib/supabase";

const montserrat = Montserrat({ subsets: ["latin"] });

const BrandNavbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  
  // State for menu toggles
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isFundingOpen, setIsFundingOpen] = useState(false);
  
  // State for feedback form
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [userName, setUserName] = useState('');
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navLinks = [
    { name: 'OPPORTUNITIES', href: '/brand-dashboard' },
    { name: 'TALENT', href: '/brand-talent' },
    { 
      name: 'FUNDING', 
      href: "#", // Prevent navigation
      isDropdown: true,
      dropdownItems: [
        { name: 'Crowdfunding Programs', href: '/brand-funding/crowdfunding' },
        { name: 'Train Now Pay Later Models', href: '/brand-funding/tnpl' },
        { name: 'Micro Investments', href: '/brand-funding/micro-investment' },
        { name: 'Marketing Campaigns', href: '/brand-funding/marketplace' },
        { name: 'Scholarships and Grants', href: '/brand-funding/scholarships' },
      ],
    onClick: (e: React.MouseEvent<HTMLAnchorElement>, setDropdown: React.Dispatch<React.SetStateAction<boolean>>) => {
           e.preventDefault(); // Prevent navigation
           setDropdown((prev) => !prev); // Toggle dropdown
         }
       },
    { name: 'NEWS FEED', href: '/brand-dashboard/newsfeed' },
    { name: 'LEADERBOARD', href: '/brand-combined-leaderboard' },
  ];

  const handleProfileClick = () => {
    router.push('/brand-profile');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleFeedbackSubmit = async () => {
    if (!feedbackText.trim() || !userName.trim()) {
      alert("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      // This would be the actual implementation with Supabase
      const { data, error } = await supabase
        .from('feedback')
        .insert([
          { 
            user_id: 'current-user-id', // This would be the actual user ID
            author: userName,
            quote: feedbackText,
            role: 'BRAND', // Or could be dynamic based on user role
            image: '/placeholder.svg', // Could be the user's profile image
            rating: rating,
            created_at: new Date()
          }
        ]);
      
      if (error) throw error;

      setFeedbackSubmitted(true);
      setIsSubmitting(false);
      
      // Reset form after 2 seconds
      setTimeout(() => {
        setIsFeedbackOpen(false);
        setFeedbackText("");
        setUserName("");
        setRating(5);
        setFeedbackSubmitted(false);
      }, 2000);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setIsSubmitting(false);
    }
  };

  // Render star rating input
  const renderStarInput = () => {
    return (
      <div className="flex space-x-2 justify-center my-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className="focus:outline-none"
            title={`Rate ${star} star${star > 1 ? 's' : ''}`}
          >
            <Star
              className={`h-6 w-6 transition-colors ${
                star <= rating 
                  ? 'text-yellow-500 fill-yellow-500' 
                  : 'text-gray-400'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center gap-4">
            <Link 
              href="/brand-dashboard" 
              className={`text-3xl font-extrabold mr-6 text-indigo-600 ${montserrat.className} tracking-wider transition-colors duration-300 hover:text-indigo-800`}
            >
              Athleto
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-6 text-gray-600">
              {navLinks.map((link) => (
                <div key={link.name} className="relative group">
                  <Link
                    href={link.href}
                    className={`relative group transition-colors duration-300 text-sm font-medium ${montserrat.className} flex items-center
                      ${pathname === link.href ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
                    onMouseEnter={() => link.isDropdown && setIsFundingOpen(true)}
                  >
                    {link.name}
                    {link.isDropdown && <ChevronDown className="ml-1 h-4 w-4" />}
                    <span className={`absolute bottom-0 left-0 h-0.5 bg-indigo-600 transition-all duration-300
                      ${pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'}`}>
                    </span>
                  </Link>
                  
                  {link.isDropdown && isFundingOpen && (
                    <div 
                      className="absolute left-0 mt-2 w-64 bg-white shadow-lg rounded-md overflow-hidden z-50 border border-gray-200"
                      onMouseEnter={() => setIsFundingOpen(true)}
                      onMouseLeave={() => setIsFundingOpen(false)}
                    >
                      {link.dropdownItems?.map((item, index) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={`block px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200
                            ${index !== link.dropdownItems.length - 1 ? 'border-b border-gray-100' : ''}`}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center gap-4">
            {/* Notification Icon */}
            <div className="relative">
              <button
                className="text-gray-900 p-2 rounded-full transition-colors duration-200 relative"
                title="Notifications"
                onClick={() => {
                  setIsNotificationOpen(!isNotificationOpen);
                  setIsUserMenuOpen(false);
                  setIsFeedbackOpen(false);
                  setIsHelpOpen(false);
                }}
              >
                <Bell className="h-6 w-6 text-grey-900" />
                <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              {isNotificationOpen && (
                <Card className="absolute right-0 top-full mt-2 w-80 shadow-lg bg-gray-100 border-none">
                  <CardHeader>
                    <CardTitle className="text-center text-black p-4 border-b border-gray-400 bg-gray-100">
                      Notifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center text-black bg-gray-100 p-4">
                    No notifications yet
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Feedback Icon */}
            <div className="relative">
              <button
                className="text-gray-900 p-2 rounded-full transition-colors duration-200"
                title="Provide Feedback"
                onClick={() => {
                  setIsFeedbackOpen(!isFeedbackOpen);
                  setIsNotificationOpen(false);
                  setIsUserMenuOpen(false);
                  setIsHelpOpen(false);
                }}
              >
                <MessageSquare className="h-6 w-6" />
              </button>
              {isFeedbackOpen && (
                <Card className="absolute right-0 top-full mt-2 w-96 shadow-lg p-4 bg-gray-100 border-none">
                  <CardHeader className="flex flex-row justify-between items-center text-black">
                    <CardTitle>Share Your Experience</CardTitle>
                    <Button variant="ghost" size="icon" onClick={() => setIsFeedbackOpen(false)}>
                      <X className="h-5 w-5" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {!feedbackSubmitted ? (
                      <>
                        <h3 className="text-md font-medium text-gray-700 mb-2">Rate Your Experience</h3>
                        {renderStarInput()}
                        
                        <input
                          type="text"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          placeholder="Your Name"
                          className="w-full p-2 mb-3 border border-gray-300 rounded-md text-black"
                        />
                        
                        <Textarea
                          placeholder="Share your thoughts..."
                          value={feedbackText}
                          onChange={(e) => setFeedbackText(e.target.value)}
                          className="mb-4 text-black"
                        />
                        <Button
                          className="w-full bg-indigo-600 text-white hover:bg-indigo-800"
                          onClick={handleFeedbackSubmit}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Submitting..." : "Submit Feedback"}
                        </Button>
                      </>
                    ) : (
                      <div className="text-green-600 text-center py-4">
                        <p className="text-lg font-semibold">Thank you for your feedback!</p>
                        <p className="text-sm mt-1">Your feedback has been successfully submitted.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Help Icon */}
            <div className="relative">
              <button
                className="text-gray-900 p-2 rounded-full transition-colors duration-200"
                title="Help"
                onClick={() => {
                  setIsHelpOpen(!isHelpOpen);
                  setIsNotificationOpen(false);
                  setIsUserMenuOpen(false);
                  setIsFeedbackOpen(false);
                }}
              >
                <HelpCircle className="h-6 w-6" />
              </button>
              {isHelpOpen && (
                <Card className="absolute right-0 top-full mt-2 w-80 shadow-lg bg-gray-100 border-none text-black">
                  <CardHeader>
                    <CardTitle>Help Center</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Link href="/brand-dashboard/brand-faq" className="block hover:text-indigo-600">
                        Frequently Asked Questions
                      </Link>
                      <Link href="/brand-dashboard/brand-team" className="block hover:text-indigo-600">
                        Our team
                      </Link>
                      <Link href="/brand-dashboard/brand-guide" className="block hover:text-indigo-600">
                        User Guide
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Profile Icon */}
            <button
              onClick={handleProfileClick}
              className="text-gray-600 hover:text-indigo-600 transition-colors duration-300"
              title="User Profile"
            >
              <User className="h-6 w-6" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-gray-900 p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
              onClick={toggleMobileMenu}
              title="Mobile Menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav className="mt-4 md:hidden animate-fadeIn bg-white shadow-md">
          {navLinks.map((item) => (
            <div key={item.name}>
              <Link
                href={item.href}
                onClick={() => {
                  if (!item.isDropdown) setIsMobileMenuOpen(false);
                }}
                className={`block py-2 px-4 transition-colors duration-200 
                  ${pathname === item.href 
                    ? 'text-indigo-600 bg-gray-50' 
                    : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <div className="flex justify-between items-center">
                  {item.name}
                  {item.isDropdown && <ChevronDown className="h-4 w-4" />}
                </div>
              </Link>
              
              {item.isDropdown && (
                <div className="bg-gray-50 pl-6">
                  {item.dropdownItems?.map((dropdownItem) => (
                    <Link
                      key={dropdownItem.name}
                      href={dropdownItem.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-2 px-4 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 text-sm border-l border-gray-200"
                    >
                      {dropdownItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      )}
    </header>
  );
};

export default BrandNavbar;