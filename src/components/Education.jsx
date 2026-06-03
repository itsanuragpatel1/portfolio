import React from 'react';
import { Calendar, Building2, CheckCircle2 } from 'lucide-react';

export default function Education() {
  const subjects = [
    "Data Structures & Algorithms",
    "Database Management Systems (DBMS)",
    "Object Oriented Programming (OOP)",
    "Operating Systems"
  ];

  return (
    <section id="education" className="py-20 md:py-24 px-6 md:px-12 bg-transparent border-b border-neutral-100 dark:border-neutral-900/60 transition-colors duration-300 scroll-mt-28">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <h2 className="text-xl md:text-2xl font-sans font-bold tracking-tight text-neutral-900 dark:text-white mb-8">
          Education Details
        </h2>

        {/* Education Timeline Card */}
        <div className="relative">
          {/* Timeline Vertical Guide Line (unified layout position) */}
          <div className="absolute left-0 sm:left-4 top-2 bottom-4 w-[1px] bg-neutral-200 dark:bg-neutral-800 hidden sm:block"></div>
          
          <div className="space-y-10 pl-0 sm:pl-12">
            <div className="relative">
              {/* Timeline Node Highlight on timeline path */}
              <div className="absolute -left-[51px] top-6 w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700 hidden sm:flex items-center justify-center border border-white dark:border-neutral-950" />
              
              <div className="p-6 border border-neutral-200 dark:border-neutral-800 rounded-xl bg-neutral-50/10 dark:bg-neutral-900/10 transition-colors duration-250 shadow-sm">
                
                {/* Header: Degree, Institution, Course & Period */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-5 pb-5 border-b border-neutral-200/60 dark:border-neutral-800/60">
                  <div>
                    <h3 className="text-base md:text-lg font-sans font-bold text-neutral-900 dark:text-white tracking-tight">
                      Bachelor of Technology (B.Tech)
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-sm font-medium text-neutral-600 dark:text-neutral-400">
                      <Building2 size={14} className="text-neutral-400 shrink-0" />
                      <span className="font-semibold text-neutral-800 dark:text-neutral-200">Government Engineering College, Rewa</span>
                      <span className="text-neutral-300 dark:text-neutral-700 select-none">•</span>
                      <span className="text-xs text-neutral-500 dark:text-neutral-400">Computer Science & Engineering</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-500 dark:text-neutral-400 md:mt-1 select-none">
                    <Calendar size={13} className="text-neutral-400 shrink-0" />
                    2023 — 2027
                  </div>
                </div>

                <div className="mb-5">
                  <p className="text-neutral-500 dark:text-neutral-400 text-xs md:text-sm leading-relaxed">
                    Studying foundations of software systems, core algorithms, and software development practices. Maintaining consistent scores and active participation in institutional coding competitions.
                  </p>
                </div>

                {/* Core Subjects Track */}
                <div className="pt-5 border-t border-neutral-100 dark:border-neutral-900/60">
                  <h5 className="text-[9px] font-bold font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mb-3">
                    Core Curriculum
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {subjects.map((subject, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                        <CheckCircle2 size={12} className="text-neutral-300 dark:text-neutral-700 shrink-0" /> 
                        <span className="font-semibold">{subject}</span>
                      </div>
                    ))}
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
