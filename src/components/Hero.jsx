import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center px-6 pt-24 overflow-hidden border-b border-neutral-200 bg-white">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        <div className="lg:col-span-8">
          <div className="flex items-center gap-4 mb-8 animate-fade-in">
            <span className="h-[2px] w-12 bg-blue-600"></span>
            <p className="text-blue-600 font-mono text-xs uppercase font-black tracking-widest">Available for Hire</p>
          </div>
          <h1 className="text-[14vw] lg:text-[10rem] font-black leading-[0.8] tracking-tighter uppercase mb-12">
            Full-Stack <br />
            <span className="text-transparent" style={{ WebkitTextStroke: '2px #1a1a1a' }}>Developer</span>
          </h1>
          <div className="flex flex-col md:flex-row gap-12 items-start md:items-center">
            <p className="max-w-md text-neutral-400 text-xl font-medium leading-relaxed italic">
              Crafting intelligent digital experiences at the intersection of MERN Stack and Generative AI.
            </p>
            <div className="flex gap-4">
              <a href="#work" className="bg-neutral-900 text-white px-10 py-5 rounded-full text-xs font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-neutral-900/20">
                Explore Projects
              </a>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-4 hidden lg:flex flex-col gap-8 justify-end h-full py-12">
          <div className="border-l-4 border-blue-600 pl-6">
            <h4 className="text-xs font-black uppercase tracking-widest mb-2">Education</h4>
            <p className="text-sm font-bold text-neutral-900">B.Tech in CS</p>
            <p className="text-xs text-neutral-400 font-mono uppercase">REC Rewa '23-27</p>
          </div>
          <div className="border-l-4 border-neutral-200 pl-6">
            <h4 className="text-xs font-black uppercase tracking-widest mb-2">Social</h4>
            <div className="flex gap-4">
              <a href="https://github.com/itsanuragpatel1" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors"><Github size={18} /></a>
              <a href="https://linkedin.com/in/itsanuragpatel" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors"><Linkedin size={18} /></a>
              <a href="#" className="hover:text-blue-600 transition-colors"><Twitter size={18} /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Bauhaus Decorative Circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] border border-neutral-100 rounded-full pointer-events-none -z-0"></div>
    </section>
  );
}