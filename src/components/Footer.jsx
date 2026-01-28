import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import resume from '../assets/resume.pdf';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="py-40 px-6 bg-neutral-900 text-white border-t border-neutral-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-16 mb-24">
          <div>
            <p className="text-blue-500 font-mono text-sm tracking-widest mb-8 uppercase font-bold">Contact Anurag</p>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85]">
              Let's Build <br />The Future.
            </h2>
          </div>
          <div className="flex flex-col gap-6">
            <a href="mailto:Anuragpateloriginal@gmail.com" className="text-2xl md:text-4xl font-light border-b border-neutral-800 pb-4 hover:text-blue-400 transition-all">
              Anuragpateloriginal@gmail.com
            </a>
            <div className="flex gap-10">
              <a href="https://github.com/itsanuragpatel1" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-white transition-colors uppercase text-[10px] font-black tracking-[0.2em]">GitHub</a>
              <a href="https://linkedin.com/in/itsanuragpatel" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-white transition-colors uppercase text-[10px] font-black tracking-[0.2em]">LinkedIn</a>
              <a href={resume} target="_blank" className="text-neutral-500 hover:text-white transition-colors uppercase text-[10px] font-black tracking-[0.2em]">Resume</a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-16 border-t border-neutral-800 gap-8">
          <p className="text-neutral-600 text-[10px] font-mono tracking-[0.3em] uppercase">
            &copy; {new Date().getFullYear()} AP. DESIGNED WITH PRECISION.
          </p>
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-white transition-colors"
          >
            Back To Top <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}