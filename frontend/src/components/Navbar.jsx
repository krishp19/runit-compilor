'use client';

import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/redux/slices/authSlice'; // Import your logout action
import Link from 'next/link';

const Dropdown = ({ label, items, isMobile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`${isMobile ? 'w-full' : 'relative'}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${
          isMobile
            ? 'w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700'
            : 'px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md'
        } text-sm font-medium flex items-center justify-between`}
      >
        {label}
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div
          className={`${
            isMobile
              ? 'w-full bg-gray-800'
              : 'absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5'
          } z-50`}
        >
          <div className={`py-1 ${isMobile ? 'pl-4' : ''}`}>
            {items.map((item, index) => (
              <a
                key={index}
                href={item.href || '#'}
                onClick={(e) => {
                  e.preventDefault();
                  item.onClick?.();
                  setIsOpen(false);
                }}
                className={`block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white ${
                  isMobile ? 'pl-8' : ''
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.accessToken);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
  };

  const addDropdownItems = [
    { label: 'Source Editor', onClick: () => console.log('Source Editor clicked') },
    { label: 'Diff View', onClick: () => console.log('Diff View clicked') },
    { label: 'Tree (IDE MODE)', onClick: () => console.log('Tree Mode clicked') },
  ];
  
  const moreDropdownItems = [
    { label: 'Reset Code', onClick: () => console.log('Reset Code clicked') },
    { label: 'Open New Tab', onClick: () => console.log('Open New Tab clicked') },
    { label: 'History', onClick: () => console.log('History clicked') },
  ];
  
  const templatesDropdownItems = [
    { label: 'JavaScript Templates', onClick: () => console.log('JavaScript Templates clicked') },
    { label: 'Python Templates', onClick: () => console.log('Python Templates clicked') },
    { label: 'Java Templates', onClick: () => console.log('Java Templates clicked') },
  ];
  
  const shareDropdownItems = [
    { label: 'Copy Link', onClick: () => console.log('Copy Link clicked') },
    { label: 'Share on Twitter', onClick: () => console.log('Share on Twitter clicked') },
    { label: 'Share on LinkedIn', onClick: () => console.log('Share on LinkedIn clicked') },
  ];
  
  const policiesDropdownItems = [
    { label: 'Terms of Service', onClick: () => console.log('Terms of Service clicked') },
    { label: 'Privacy Policy', onClick: () => console.log('Privacy Policy clicked') },
    { label: 'Cookie Policy', onClick: () => console.log('Cookie Policy clicked') },
  ];
  
  const otherDropdownItems = [
    { label: 'Contact', onClick: () => console.log('Contact clicked') },
    { label: 'Become a Member', onClick: () => console.log('Become a Member clicked') },
    { label: 'Source on GitHub', href: 'https://github.com', target: '_blank' },
    { label: 'Installation Wiki', onClick: () => console.log('Installation Wiki clicked') },
    { label: 'Documentation', onClick: () => console.log('Documentation clicked') },
    { label: 'API Reference', onClick: () => console.log('API Reference clicked') },
    { label: 'Report a Bug', onClick: () => console.log('Report a Bug clicked') },
    { label: 'Feature Request', onClick: () => console.log('Feature Request clicked') },
    { label: 'Community Forum', onClick: () => console.log('Community Forum clicked') },
    { label: 'Discord Server', onClick: () => console.log('Discord Server clicked') },
    { label: 'Blog', onClick: () => console.log('Blog clicked') },
    { label: 'Support', onClick: () => console.log('Support clicked') },
    { label: 'Keyboard Shortcuts', onClick: () => console.log('Keyboard Shortcuts clicked') },
    { label: 'Settings', onClick: () => console.log('Settings clicked') },
    { label: 'Dark/Light Mode', onClick: () => console.log('Theme Toggle clicked') },
    { label: 'Follow Us', href: '#', onClick: () => console.log('Social Media Links clicked') },
  ];
  

  return (
    <nav
      className={`backdrop-blur-md bg-gray-900/70 border-b border-gray-800 sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'shadow-lg shadow-gray-900/20' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent hover:from-blue-400 hover:to-purple-400 transition-all">
              RunIt
            </h1>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Dropdown label="Add" items={addDropdownItems} />
            <Dropdown label="More" items={moreDropdownItems} />
            <Dropdown label="Templates" items={templatesDropdownItems} />
            <Dropdown label="Share" items={shareDropdownItems} />
            <Dropdown label="Policies" items={policiesDropdownItems} />
            <Dropdown label="Other" items={otherDropdownItems} />

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-700">
              {authToken ? (
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link href="/login" className="px-3 py-1.5 text-sm text-gray-300 hover:text-white">
                    Log in
                  </Link>
                  <Link
                    href="/signup"
                    className="px-4 py-2 text-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-900/90 border-t border-gray-800 p-2" ref={mobileMenuRef}>
          <Dropdown label="Add" items={addDropdownItems} isMobile />
          <Dropdown label="More" items={moreDropdownItems} isMobile />
          <Dropdown label="Templates" items={templatesDropdownItems} isMobile />
          <Dropdown label="Share" items={shareDropdownItems} isMobile />
          <Dropdown label="Policies" items={policiesDropdownItems} isMobile />
          <Dropdown label="Other" items={otherDropdownItems} isMobile />
          <Link href="/signup" className="block w-full px-4 py-2 text-center text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg">
            Sign up
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
