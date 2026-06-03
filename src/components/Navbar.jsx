import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const navLinks = ['Skills', 'Work', 'Experience', 'Achievements', 'Education', 'Contact', 'Resume'];

  const handleNavLinkClick = (e, link) => {
    const isResume = link.toLowerCase() === 'resume';
    setIsMenuOpen(false);
    
    if (isResume) return;
    
    // Smooth scroll if already on homepage
    if (window.location.pathname === '/') {
      e.preventDefault();
      const element = document.getElementById(link.toLowerCase());
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogoClick = (e) => {
    setIsMenuOpen(false);
    if (window.location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/80 dark:bg-neutral-950/85 backdrop-blur-md border-neutral-200/80 dark:border-neutral-900 py-3.5' 
        : 'bg-transparent border-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between w-full">
        
        {/* Brand Logo */}
        <Link 
          to="/" 
          onClick={handleLogoClick}
          className="text-sm font-sans font-bold tracking-tight text-neutral-900 dark:text-white uppercase cursor-pointer"
        >
          Anurag Patel
        </Link>
        
        {/* Desktop Navigation Links */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => {
            const isResume = link.toLowerCase() === 'resume';
            const targetPath = isResume ? '/resume' : `/#${link.toLowerCase()}`;
            return (
              <Link 
                key={link} 
                to={targetPath} 
                onClick={(e) => handleNavLinkClick(e, link)}
                className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                {link}
              </Link>
            );
          })}
        </div>

        {/* Theme and Menu Controls */}
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={13} /> : <Moon size={13} />}
          </button>

          <button 
            className="md:hidden text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-b border-neutral-200/80 dark:border-neutral-900 bg-white dark:bg-neutral-950 px-6 py-4 flex flex-col gap-3 animate-fade-in">
          {navLinks.map((link) => {
            const isResume = link.toLowerCase() === 'resume';
            const targetPath = isResume ? '/resume' : `/#${link.toLowerCase()}`;
            return (
              <Link
                key={link}
                to={targetPath}
                onClick={(e) => handleNavLinkClick(e, link)}
                className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors py-1.5"
              >
                {link}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}