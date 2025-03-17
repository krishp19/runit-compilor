import { useState, useEffect, useRef } from 'react';

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
    { 
      label: 'Follow Us', 
      href: '#',
      onClick: () => console.log('Social Media Links clicked'),
    },
  ];

  return (
    <nav className={`bg-gray-800 border-b border-gray-700 sticky top-0 z-50 transition-shadow duration-300 ${
      isScrolled ? 'shadow-lg' : ''
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              RunIt
            </h1>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Dropdown label="Add" items={addDropdownItems} />
            <Dropdown label="More" items={moreDropdownItems} />
            <Dropdown label="Templates" items={templatesDropdownItems} />
            <Dropdown label="Share" items={shareDropdownItems} />
            <Dropdown label="Policies" items={policiesDropdownItems} />
            <Dropdown label="Other" items={otherDropdownItems} />
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden" ref={mobileMenuRef}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-800">
            <Dropdown label="Add" items={addDropdownItems} isMobile={true} />
            <Dropdown label="More" items={moreDropdownItems} isMobile={true} />
            <Dropdown label="Templates" items={templatesDropdownItems} isMobile={true} />
            <Dropdown label="Share" items={shareDropdownItems} isMobile={true} />
            <Dropdown label="Policies" items={policiesDropdownItems} isMobile={true} />
            <Dropdown label="Other" items={otherDropdownItems} isMobile={true} />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 