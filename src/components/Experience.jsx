import React from 'react';
import { Calendar, Building2, ChevronRight } from 'lucide-react';
import { experiences } from '../assets/experiences.js';

export default function Experience() {
  return (
    <section id="experience" className="py-20 md:py-24 px-6 md:px-12 bg-transparent border-b border-neutral-100 dark:border-neutral-900/60 transition-colors duration-300 scroll-mt-28">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <h2 className="text-xl md:text-2xl font-sans font-bold tracking-tight text-neutral-900 dark:text-white mb-8">
          Professional Experience
        </h2>

        {/* Timeline Stack Container */}
        <div className="relative">
          {/* Timeline Vertical Guide Line */}
          <div className="absolute left-0 sm:left-4 top-2 bottom-4 w-[1px] bg-neutral-200 dark:bg-neutral-800 hidden sm:block"></div>

          <div className="space-y-10 pl-0 sm:pl-12">
            {experiences.map((exp, index) => {
              return (
                <div key={index} className="relative">
                  
                  {/* Timeline Node Highlight on timeline path */}
                  <div className="absolute -left-[51px] top-6 w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700 hidden sm:flex items-center justify-center border border-white dark:border-neutral-950" />

                  {/* Interactive Role Card */}
                  <div className="p-6 border border-neutral-200 dark:border-neutral-800 rounded-xl bg-neutral-50/10 dark:bg-neutral-900/10 transition-colors duration-200 shadow-sm">
                    
                    {/* Header: Role, Company, Location & Period */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-5 pb-5 border-b border-neutral-200/60 dark:border-neutral-800/60">
                      <div>
                        <h3 className="text-base md:text-lg font-sans font-bold text-neutral-900 dark:text-white tracking-tight">
                          {exp.role}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 mt-1 text-sm font-medium text-neutral-600 dark:text-neutral-400">
                          <Building2 size={14} className="text-neutral-400 shrink-0" />
                          <span className="font-semibold text-neutral-800 dark:text-neutral-200">{exp.company}</span>
                          <span className="text-neutral-300 dark:text-neutral-700 select-none">•</span>
                          <span className="text-xs text-neutral-500 dark:text-neutral-400">{exp.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-500 dark:text-neutral-400 md:mt-1 select-none">
                        <Calendar size={13} className="text-neutral-400 shrink-0" />
                        {exp.period}
                      </div>
                    </div>

                    {/* Bullet Highlights */}
                    <ul className="space-y-3 mb-6">
                      {exp.highlights.map((bullet, bulletIdx) => (
                        <li key={bulletIdx} className="flex items-start gap-2.5 text-xs md:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                          <ChevronRight size={13} className="mt-1 flex-shrink-0 text-neutral-300 dark:text-neutral-700" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Technical Pills Track */}
                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-neutral-100 dark:border-neutral-900/40">
                      {exp.skills.map((skill, skillIdx) => (
                        <span 
                          key={skillIdx} 
                          className="text-[9px] font-bold uppercase px-2 py-0.5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 rounded select-none"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
