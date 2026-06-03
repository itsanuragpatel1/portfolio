import React from 'react';
import { 
  GraduationCap, 
  CheckCircle2, 
  Code, 
  Award
} from 'lucide-react';

export default function Journey() {
  return (
    <section id="about" className="py-28 md:py-36 px-6 md:px-12 bg-transparent overflow-hidden border-b border-neutral-100 dark:border-neutral-900/60 transition-colors duration-300 scroll-mt-28">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 font-mono text-[10px] text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-2 font-bold">
            <span>04 //</span>
            <span>Academic Journey</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-black tracking-tight text-neutral-850 dark:text-neutral-50">
            Education & Milestones<span className="text-blue-600">.</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
          {/* Left Column: Education Timeline */}
          <div className="lg:col-span-5">
            <div className="mb-10">
              <h3 className="text-xl font-heading font-bold text-neutral-850 dark:text-neutral-50 flex items-center gap-2">
                Education Details
              </h3>
            </div>

            <div className="relative pl-8 space-y-16">
              {/* Vertical Line */}
              <div className="absolute left-0 top-0 w-[1px] bg-neutral-250 dark:bg-neutral-800 h-full"></div>
              
              <div className="relative">
                {/* Timeline Icon */}
                <div className="absolute left-[-48px] top-0 w-8 h-8 rounded-full bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center shadow-sm">
                  <GraduationCap size={16} className="text-blue-600 dark:text-blue-400" />
                </div>
                
                <p className="text-blue-600 dark:text-blue-400 font-mono text-[10px] font-semibold tracking-wider mb-2">
                  2023 — 2027
                </p>
                <h4 className="text-lg font-heading font-bold tracking-tight mb-2 text-neutral-850 dark:text-neutral-50">
                  B.Tech Computer Science
                </h4>
                <p className="text-neutral-500 dark:text-neutral-400 font-semibold text-xs uppercase mb-6 tracking-wider">
                  Government Engineering College, Rewa
                </p>
                
                {/* Core Curriculum Highlights */}
                <div className="space-y-3">
                  {[
                    "Data Structures & Algorithms",
                    "Database Management Systems",
                    "Object Oriented Programming (OOP)",
                    "Operating Systems"
                  ].map((subject, index) => (
                    <div key={index} className="flex items-center gap-3 text-sm text-neutral-550 dark:text-neutral-450">
                      <CheckCircle2 size={14} className="text-blue-600 dark:text-blue-400 shrink-0" /> 
                      <span>{subject}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Achievements & Stats */}
          <div className="lg:col-span-7">
            <div className="mb-10">
              <h3 className="text-xl font-heading font-bold text-neutral-850 dark:text-neutral-50">
                Key Milestones
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* DSA Achievement */}
              <div className="p-6 md:p-8 border border-neutral-200 dark:border-neutral-850 bg-white/40 dark:bg-neutral-900/10 rounded-2xl group hover:border-blue-600/30 dark:hover:border-blue-500/20 hover:bg-neutral-50/40 dark:hover:bg-neutral-900/20 transition-all duration-300">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-white dark:bg-neutral-950 rounded-xl border border-neutral-100 dark:border-neutral-850">
                    <Code size={18} className="text-neutral-900 dark:text-neutral-300 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                  </div>
                </div>
                <h5 className="text-3xl font-heading font-black mb-2 text-neutral-850 dark:text-neutral-50">200+</h5>
                <p className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider leading-relaxed">
                  DSA Problems solved across LeetCode & GFG.
                </p>
              </div>

              {/* TechFest Award */}
              <div className="p-6 md:p-8 border border-neutral-200 dark:border-neutral-850 bg-white/40 dark:bg-neutral-900/10 rounded-2xl group hover:border-blue-600/30 dark:hover:border-blue-500/20 hover:bg-neutral-50/40 dark:hover:bg-neutral-900/20 transition-all duration-300">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-white dark:bg-neutral-950 rounded-xl border border-neutral-100 dark:border-neutral-850">
                    <Award size={18} className="text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <h5 className="text-base font-heading font-bold mb-2 text-neutral-850 dark:text-neutral-50">TCS CodeVita S13</h5>
                <p className="text-xs font-bold text-neutral-550 dark:text-neutral-450 uppercase tracking-wider leading-relaxed">
                  Cleared Round 1 with algorithmic accuracy.
                </p>
              </div>

              {/* T&P Department Role */}
              <div className="p-6 md:p-8 border border-neutral-200 dark:border-neutral-850 bg-white/40 dark:bg-neutral-900/10 rounded-2xl group hover:border-blue-600/30 dark:hover:border-blue-500/20 hover:bg-neutral-50/40 dark:hover:bg-neutral-900/20 transition-all duration-300 md:col-span-2">
                <div className="flex items-center gap-6">
                  <div className="p-3.5 bg-white dark:bg-neutral-950 rounded-xl border border-neutral-100 dark:border-neutral-850 shrink-0">
                    <Award size={20} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h5 className="text-base font-heading font-bold text-neutral-850 dark:text-neutral-50">Code War Fest X3.0</h5>
                    <p className="text-xs font-bold text-neutral-550 dark:text-neutral-450 uppercase tracking-wider mt-1 leading-relaxed">
                     Recognized as Top Performer for Algorithmic Excellence across CS engineering cohorts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}