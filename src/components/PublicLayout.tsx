import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Menu, X, ArrowUpRight, Github, Twitter, Layers, Terminal as TermIcon, ShieldAlert } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Contact', path: '/contact' },
    { name: 'About', path: '/about' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#020B0A] text-[#F2F5F4] flex flex-col font-sans selection:bg-[#00E5C3] selection:text-[#020B0A]">
      {/* Dynamic scanline overlay for the 'control room' feel */}
      <div className="fixed inset-0 pointer-events-none z-50 bg-[radial-gradient(ellipse_at_center,rgba(2,11,10,0)_0%,rgba(2,11,10,0.95)_100%)]" />
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 4px, 6px 100%' }} />

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#020B0A]/85 backdrop-blur-md border-b border-[#12302A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded bg-[#00E5C3] flex items-center justify-center group-hover:scale-105 transition-transform duration-200 shadow-[0_0_15px_rgba(0,229,195,0.25)]">
              <Zap className="w-4 h-4 text-[#02110E] fill-[#02110E]" />
            </div>
            <span className="font-mono text-sm tracking-widest text-[#F2F5F4] font-bold flex items-center gap-1.5">
              APEX <span className="text-[#00E5C3] text-[10px] bg-[#00E5C3]/10 px-1.5 py-0.5 rounded border border-[#12302A]">OS</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-xs font-mono tracking-wider transition-colors relative py-1 ${
                    isActive ? 'text-[#00E5C3]' : 'text-[#93A8A1] hover:text-[#F2F5F4]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span 
                      layoutId="nav-underline" 
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#00E5C3]" 
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Button */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <Link 
                  to="/command-center" 
                  className="px-4 py-1.5 bg-[#00E5C3] hover:bg-[#00CFAE] text-[#02110E] text-xs font-mono font-bold rounded-sm transition-all duration-200 flex items-center gap-1.5 hover:shadow-[0_0_20px_rgba(0,229,195,0.3)] shadow-[0_0_10px_rgba(0,229,195,0.15)]"
                >
                  Command Center <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
                <button
                  onClick={logout}
                  className="text-xs text-[#93A8A1] hover:text-[#F2F5F4] font-mono transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-xs hover:text-[#00E5C3] text-[#F2F5F4] font-mono transition-colors"
                >
                  Sign In
                </Link>
                <Link 
                  to="/signup" 
                  className="px-4 py-1.5 bg-[#00E5C3] hover:bg-[#00CFAE] text-[#02110E] text-xs font-mono font-bold rounded-sm transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,229,195,0.3)]"
                >
                  Start Executing
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden p-2 text-[#93A8A1] hover:text-[#F2F5F4]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#020B0A] border-b border-[#12302A] overflow-hidden sticky top-16 z-30"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={handleLinkClick}
                    className={`block font-mono text-sm ${
                      isActive ? 'text-[#00E5C3]' : 'text-[#93A8A1] hover:text-[#F2F5F4]'
                    }`}
                  >
                    // {link.name}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-[#12302A] flex flex-col gap-3">
                {user ? (
                  <>
                    <Link
                      to="/command-center"
                      onClick={handleLinkClick}
                      className="w-full text-center py-2 bg-[#00E5C3] text-[#02110E] hover:bg-[#00CFAE] font-mono font-bold text-xs rounded-sm"
                    >
                      Command Center
                    </Link>
                    <button
                      onClick={() => { logout(); handleLinkClick(); }}
                      className="w-full text-center py-2 border border-[#12302A] text-[#93A8A1] font-mono text-xs rounded-sm"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={handleLinkClick}
                      className="w-full text-center py-2 border border-[#12302A] text-[#93A8A1] font-mono text-xs rounded-sm"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      onClick={handleLinkClick}
                      className="w-full text-center py-2 bg-[#00E5C3] text-[#02110E] hover:bg-[#00CFAE] font-mono font-bold text-xs rounded-sm"
                    >
                      Start Executing
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Stage */}
      <main className="flex-1 relative">
        {children}
      </main>


    </div>
  );
}
