import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import useUIStore from '../store/useUIStore';

export default function Navbar() {
  const navigate = useNavigate();
  const { isMenuOpen, toggleMenu, closeMenu } = useUIStore();

  const navItems = [
    { label: 'Home', href: '/', type: 'link' },
    { label: 'About', href: 'about', type: 'anchor' },
    { label: 'Services', href: 'services', type: 'anchor' },
    { label: 'Industries', href: 'industries', type: 'anchor' },
    { label: 'Team', href: 'team', type: 'anchor' },
    { label: 'Contact', href: 'contact', type: 'anchor' },
  ];

  const handleAnchorClick = (e, hash) => {
    e.preventDefault();
    // Navigate to home with anchor
    navigate(`/#${hash}`);
    closeMenu();
  };

  return (
    <>
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
                Converge
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => {
                if (item.type === 'anchor') {
                  return (
                    <button
                      key={item.label}
                      onClick={(e) => handleAnchorClick(e, item.href)}
                      className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium cursor-pointer bg-transparent border-0"
                    >
                      {item.label}
                    </button>
                  );
                }
                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={() => closeMenu()}
                    className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium"
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Desktop CTA Button */}
            <div className="hidden md:block">
              <button
                onClick={() => {
                  navigate('/quote');
                  closeMenu();
                }}
                className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-semibold px-6 py-2 rounded-lg cursor-pointer flex items-center gap-2 transition-all duration-300"
              >
                <span>Get a Quote</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => {
                if (item.type === 'anchor') {
                  return (
                    <button
                      key={item.label}
                      onClick={(e) => handleAnchorClick(e, item.href)}
                      className="block w-full text-left px-3 py-2 rounded-md text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors bg-transparent border-0 cursor-pointer font-medium"
                    >
                      {item.label}
                    </button>
                  );
                }
                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={() => closeMenu()}
                    className="block px-3 py-2 rounded-md text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors font-medium"
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="px-3 py-2">
                <button
                  onClick={() => {
                    navigate('/quote');
                    closeMenu();
                  }}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-semibold px-4 py-2 rounded-lg cursor-pointer transition-all duration-300"
                >
                  Get a Quote
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
