import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark' || savedTheme === 'light') {
        return savedTheme;
      }
      // Auto-detect system/device theme
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
      }
      // Default fallback
      return 'dark';
    }
    return 'dark';
  });

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Listen for system/device theme changes if no manual preference is saved
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return; // respect manual selection

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e) => {
      setTheme(e.matches ? 'dark' : 'light');
    };

    // Modern browsers support addEventListener on MediaQueryList
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemThemeChange);
      return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
    }
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

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const navLinks = [
    { label: 'Projects',       anchor: 'work' },
    { label: 'Experience', anchor: 'experience' },
    { label: 'Blog',       path: '/blog' },
    { label: 'Contact',    anchor: 'contact' },
  ];

  const handleNavClick = (e, link) => {
    setIsMenuOpen(false);
    if (link.path) return;
    if (window.location.pathname === '/') {
      e.preventDefault();
      const el = document.getElementById(link.anchor);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogoClick = (e) => {
    setIsMenuOpen(false);
    if (window.location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isLinkActive = (link) => {
    if (link.path) return location.pathname === link.path;
    return false;
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 pt-4 px-5 md:px-10">
        <div className="max-w-7xl mx-auto">
          {/* Container pill — bg, border, shadow, px/py and max-width all interpolate */}
          <div
            className="flex items-center justify-between rounded-2xl w-full mx-auto"
            style={{
              borderStyle: 'solid',
              borderWidth: '1px',
              maxWidth: isScrolled ? '96%' : '100%',
              backgroundColor: isScrolled
                ? (theme === 'dark' ? 'rgba(9, 9, 11, 0.90)' : 'rgba(255, 255, 255, 0.85)')
                : (theme === 'dark' ? 'rgba(9, 9, 11, 0)' : 'rgba(255, 255, 255, 0)'),
              backdropFilter: isScrolled ? 'blur(20px)' : 'none',
              WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'none',
              borderColor: isScrolled
                ? (theme === 'dark' ? 'rgba(39, 39, 42, 0.7)' : 'rgba(228, 228, 231, 0.8)')
                : (theme === 'dark' ? 'rgba(39, 39, 42, 0)' : 'rgba(228, 228, 231, 0)'),
              paddingLeft: isScrolled ? '24px' : '16px',
              paddingRight: isScrolled ? '24px' : '16px',
              paddingTop: isScrolled ? '10px' : '18px',
              paddingBottom: isScrolled ? '10px' : '18px',
              boxShadow: isScrolled
                ? (theme === 'dark' ? '0 4px 20px rgba(0, 0, 0, 0.3)' : '0 2px 16px rgba(0, 0, 0, 0.06)')
                : '0 0 0 rgba(0, 0, 0, 0)',
              transition: [
                'background-color 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                'border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                'padding 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                'max-width 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                'box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                'backdrop-filter 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              ].join(', '),
            }}
          >

            {/* Brand */}
            <Link to="/" onClick={handleLogoClick} className="group select-none">
              <span className="text-sm font-bold tracking-tight text-neutral-900 dark:text-white uppercase group-hover:opacity-70 transition-opacity duration-200">
                Anurag Patel
              </span>
            </Link>

            {/* Desktop Nav — 4 links only */}
            <div className="hidden md:flex items-center gap-0.5">
              {navLinks.map((link) => {
                const active = isLinkActive(link);
                const to = link.path ?? `/#${link.anchor}`;
                return (
                  <Link
                    key={link.label}
                    to={to}
                    onClick={(e) => handleNavClick(e, link)}
                    className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all duration-200 ${
                      active
                        ? 'text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-800/60'
                        : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/60 dark:hover:bg-neutral-800/40'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Right: Resume CTA + theme toggle + hamburger */}
            <div className="flex items-center gap-1">
              {/* Resume — desktop only */}
              <Link
                to="/resume"
                className="hidden md:inline-flex items-center px-3.5 py-1.5 text-xs font-bold rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 hover:bg-neutral-700 dark:hover:bg-neutral-100 transition-colors duration-200 select-none mr-1"
              >
                Resume
              </Link>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-all duration-200 cursor-pointer"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={14} strokeWidth={2} /> : <Moon size={14} strokeWidth={2} />}
              </button>

              <button
                className="md:hidden p-2 rounded-lg text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-all duration-200 cursor-pointer"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={16} strokeWidth={2} /> : <Menu size={16} strokeWidth={2} />}
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={() => setIsMenuOpen(false)}>
          <div className="absolute inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm animate-fade-in" />
          <div
            className="absolute top-0 left-0 right-0 bg-white dark:bg-[#09090b] border-b border-neutral-200 dark:border-neutral-800 px-5 pt-24 pb-8 shadow-xl animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-1 mb-5">
              {navLinks.map((link) => {
                const active = isLinkActive(link);
                const to = link.path ?? `/#${link.anchor}`;
                return (
                  <Link
                    key={link.label}
                    to={to}
                    onClick={(e) => handleNavClick(e, link)}
                    className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150 ${
                      active
                        ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-950'
                        : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/50 hover:text-neutral-900 dark:hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Resume — mobile */}
            <div className="border-t border-neutral-100 dark:border-neutral-900 pt-4">
              <Link
                to="/resume"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center w-full py-3 rounded-xl text-sm font-bold bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 hover:bg-neutral-700 dark:hover:bg-neutral-100 transition-colors duration-200"
              >
                View Resume
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}