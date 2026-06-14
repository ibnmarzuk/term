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
    { name: 'Documentation', path: '/docs' },
    { name: 'Contact', path: '/contact' },
    { name: 'About', path: '/about' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans selection:bg-[#00DCC4] selection:text-black">
      {/* Dynamic scanline overlay for the 'control room' feel */}
      <div className="fixed inset-0 pointer-events-none z-50 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)]" />
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 4px, 6px 100%' }} />

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#050505]/85 backdrop-blur-md border-b border-[#1b1b1b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded bg-[#00DCC4] flex items-center justify-center group-hover:scale-105 transition-transform duration-200 shadow-[0_0_15px_rgba(0,220,196,0.25)]">
              <Zap className="w-4 h-4 text-black fill-black" />
            </div>
            <span className="font-mono text-sm tracking-widest text-white font-bold flex items-center gap-1.5">
              APEX <span className="text-[#00DCC4] text-[10px] bg-[#00DCC4]/10 px-1.5 py-0.5 rounded border border-[#00DCC4]/20">OS</span>
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
                    isActive ? 'text-[#00DCC4]' : 'text-[#8B8680] hover:text-white'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span 
                      layoutId="nav-underline" 
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#00DCC4]" 
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
                  className="px-4 py-1.5 bg-[#00DCC4] hover:bg-[#00DCC4]/90 text-black text-xs font-mono font-bold rounded-sm transition-all duration-200 flex items-center gap-1.5 hover:shadow-[0_0_20px_rgba(0,220,196,0.3)] shadow-[0_0_10px_rgba(0,220,196,0.15)]"
                >
                  Command Center <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
                <button
                  onClick={logout}
                  className="text-xs text-[#8B8680] hover:text-white font-mono transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-xs hover:text-[#00DCC4] text-white font-mono transition-colors"
                >
                  Sign In
                </Link>
                <Link 
                  to="/signup" 
                  className="px-4 py-1.5 bg-[#00DCC4] hover:bg-[#00DCC4]/90 text-black text-xs font-mono font-bold rounded-sm transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,220,196,0.3)]"
                >
                  Start Executing
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden p-2 text-[#8B8680] hover:text-white"
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
            className="md:hidden bg-[#050505] border-b border-[#1b1b1b] overflow-hidden sticky top-16 z-30"
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
                      isActive ? 'text-[#00DCC4]' : 'text-[#8B8680] hover:text-white'
                    }`}
                  >
                    // {link.name}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-[#1b1b1b] flex flex-col gap-3">
                {user ? (
                  <>
                    <Link
                      to="/command-center"
                      onClick={handleLinkClick}
                      className="w-full text-center py-2 bg-[#00DCC4] text-black font-mono font-bold text-xs rounded-sm"
                    >
                      Command Center
                    </Link>
                    <button
                      onClick={() => { logout(); handleLinkClick(); }}
                      className="w-full text-center py-2 border border-[#1b1b1b] text-[#8B8680] font-mono text-xs rounded-sm"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={handleLinkClick}
                      className="w-full text-center py-2 border border-[#1b1b1b] text-[#8B8680] font-mono text-xs rounded-sm"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      onClick={handleLinkClick}
                      className="w-full text-center py-2 bg-[#00DCC4] text-black font-mono font-bold text-xs rounded-sm"
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

      {/* Structured SaaS Footer */}
      <footer className="bg-[#050505] border-t border-[#1b1b1b] relative z-10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            
            {/* Brand block */}
            <div className="col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded bg-[#00DCC4] flex items-center justify-center shadow-[0_0_10px_rgba(0,220,196,0.15)]">
                  <Zap className="w-3.5 h-3.5 text-black fill-black" />
                </div>
                <span className="font-mono text-xs tracking-widest text-white font-bold">
                  APEX <span className="text-[#00DCC4] text-[9px] bg-[#00DCC4]/10 px-1 py-0.5 rounded border border-[#00DCC4]/20">OS</span>
                </span>
              </div>
              <p className="text-[#8B8680] text-xs max-w-sm leading-relaxed">
                Autonomous agent pipeline delivering production-ready, fully verified intelligence packages on demand. Not another conversational chatbot.
              </p>
              <div className="flex items-center gap-3 pt-2 text-[#8B8680]">
                <a href="https://github.com/apex-os" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-150">
                  <Github className="w-4 h-4" />
                </a>
                <a href="https://twitter.com/apex_os" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-150">
                  <Twitter className="w-4 h-4" />
                </a>
                <span className="text-[10px] font-mono bg-[#1b1b1b] text-[#00DCC4] px-2 py-0.5 rounded flex items-center gap-1">
                  <Layers className="w-3 h-3" /> Core OS 1.2
                </span>
              </div>
            </div>

            {/* Links Block 1: Product */}
            <div>
              <h3 className="font-mono text-xs text-white uppercase tracking-wider mb-4 font-semibold">Product</h3>
              <ul className="space-y-2">
                <li><Link to="/features" className="text-xs text-[#8B8680] hover:text-[#00DCC4] transition-colors font-mono">Five Engines</Link></li>
                <li><Link to="/pricing" className="text-xs text-[#8B8680] hover:text-[#00DCC4] transition-colors font-mono">Pricing Tiers</Link></li>
                <li><Link to="/docs" className="text-xs text-[#8B8680] hover:text-[#00DCC4] transition-colors font-mono">Core Protocol</Link></li>
                <li><a href="#how-it-works" className="text-xs text-[#8B8680] hover:text-[#00DCC4] transition-colors font-mono">Pipeline Flow</a></li>
              </ul>
            </div>

            {/* Links Block 2: Resources */}
            <div>
              <h3 className="font-mono text-xs text-white uppercase tracking-wider mb-4 font-semibold">Platform</h3>
              <ul className="space-y-2">
                <li><Link to="/docs" className="text-xs text-[#8B8680] hover:text-[#00DCC4] transition-colors font-mono">Documentation</Link></li>
                <li><Link to="/about" className="text-xs text-[#8B8680] hover:text-[#00DCC4] transition-colors font-mono">Architecture</Link></li>
                <li><Link to="/contact" className="text-xs text-[#8B8680] hover:text-[#00DCC4] transition-colors font-mono">OS Registry</Link></li>
                <li><span className="text-xs text-[#8B8680]/50 font-mono flex items-center gap-1.5 cursor-not-allowed">
                  <TermIcon className="w-3.5 h-3.5" /> SDK Terminal
                </span></li>
              </ul>
            </div>

            {/* Links Block 3: Legal */}
            <div>
              <h3 className="font-mono text-xs text-white uppercase tracking-wider mb-4 font-semibold">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/terms" className="text-xs text-[#8B8680] hover:text-[#00DCC4] transition-colors font-mono">Terms of Service</Link></li>
                <li><Link to="/privacy" className="text-xs text-[#8B8680] hover:text-[#00DCC4] transition-colors font-mono">Privacy Policy</Link></li>
                <li><span className="text-xs text-[#8B8680] hover:text-white transition-colors font-mono flex items-center gap-1.5 cursor-pointer">
                  <ShieldAlert className="w-3.5 h-3.5 text-yellow-500/80" /> Subscriptions
                </span></li>
              </ul>
            </div>
          </div>

          {/* Footer bottom */}
          <div className="pt-8 border-t border-[#1b1b1b] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#8B8680] font-mono">
              &copy; {new Date().getFullYear()} APEX Labs Corporation. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-[10px] text-[#8B8680] font-mono">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00DCC4] animate-pulse" /> All Systems Nominal
              </span>
              <span>•</span>
              <span>UTC-4 Core</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
