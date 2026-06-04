import React, { useState } from 'react';
import { ArrowUpRight, Copy, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import resume from '../assets/resume.pdf';

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('anuragpateloriginal@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-6 md:px-12 bg-neutral-50 dark:bg-[#08080a] text-neutral-500 dark:text-neutral-450 border-t border-neutral-200 dark:border-neutral-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-6">
        
        {/* Left Side: Brand Signature & Copyright */}
        <div className="flex flex-col md:flex-row md:items-center gap-2.5 text-center md:text-left select-none">
          <span className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-tight">
            Anurag Patel
          </span>
          <span className="hidden md:inline text-neutral-300 dark:text-neutral-800">|</span>
          <p className="text-[11px] font-mono tracking-wide uppercase text-neutral-400 dark:text-neutral-500">
            &copy; {currentYear} All rights reserved.
          </p>
        </div>

        {/* Right Side: Horizontal Navigation & Social Links */}
        <div className="flex flex-col md:flex-row items-center gap-6 lg:gap-8">
          <div className="flex items-center gap-6">
            <a 
              href="https://github.com/itsanuragpatel1" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a 
              href="https://linkedin.com/in/itsanuragpatel" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a 
              href="https://leetcode.com/u/itsanuragpatel/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors"
            >
              LeetCode
            </a>
            <Link 
              to="/resume" 
              className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors"
            >
              Resume
            </Link>
          </div>
          
          <span className="hidden md:inline text-neutral-300 dark:text-neutral-800">|</span>
          
          {/* Email fully written out with inline copy trigger */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-850 rounded-lg text-xs font-mono text-neutral-600 dark:text-neutral-350 shadow-sm select-none">
            <a 
              href="mailto:anuragpateloriginal@gmail.com" 
              className="hover:underline hover:text-neutral-950 dark:hover:text-white transition-colors"
            >
              anuragpateloriginal@gmail.com
            </a>
            <button 
              onClick={handleCopyEmail}
              className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded transition-colors cursor-pointer text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
              title="Copy email to clipboard"
            >
              {copied ? <Check size={11} className="text-emerald-500" /> : <Copy size={11} />}
            </button>
          </div>

          <span className="hidden md:inline text-neutral-300 dark:text-neutral-800">|</span>
          
          {/* Scroll to Top Trigger */}
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 hover:text-neutral-950 dark:hover:text-white transition-all cursor-pointer"
          >
            Top <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}