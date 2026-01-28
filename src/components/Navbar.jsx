import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl transition-all duration-500 ${isScrolled ? 'top-4' : 'top-8'}`}>
      <GlassCard className="rounded-2xl px-8 py-4 flex items-center justify-between shadow-xl shadow-neutral-900/5">
        <a href="#" className="text-xl font-black tracking-tighter uppercase">
          Anurag Patel
        </a>
        <div className="hidden md:flex gap-10">
          {['Work', 'Skills', 'About', 'Contact'].map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-[10px] font-black uppercase tracking-[0.2em] hover:text-blue-600 transition-colors">
              {link}
            </a>
          ))}
        </div>
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </GlassCard>
    </nav>
  );
}