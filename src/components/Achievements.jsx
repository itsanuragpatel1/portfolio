import React from 'react';
import { Code, Award, Trophy } from 'lucide-react';

export default function Achievements() {
  const milestones = [
    {
      title: "200+ Solved",
      subtitle: "DSA Problem Solving",
      desc: "Solved 200+ algorithmic problems across LeetCode & GeeksforGeeks platforms, focusing on trees, graphs, and dynamic programming.",
      icon: <Code className="text-neutral-500 dark:text-neutral-400" size={16} />
    },
    {
      title: "TCS CodeVita S13",
      subtitle: "Cleared Round 1",
      desc: "Ranked among top achievers in Round 1 of the international CodeVita season 13 coding arena.",
      icon: <Trophy className="text-neutral-500 dark:text-neutral-400" size={16} />
    },
    {
      title: "Code War Fest X3.0",
      subtitle: "Top Performer",
      desc: "Recognized as a Top Performer for algorithmic speed and accuracy across engineering groups.",
      icon: <Award className="text-neutral-500 dark:text-neutral-400" size={16} />
    }
  ];

  return (
    <section id="achievements" className="py-20 md:py-24 px-6 md:px-12 bg-transparent border-b border-neutral-100 dark:border-neutral-900/60 transition-colors duration-300 scroll-mt-28">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <h2 className="text-xl md:text-2xl font-sans font-bold tracking-tight text-neutral-850 dark:text-neutral-50 mb-8">
          Achievements and Milestones
        </h2>

        {/* Milestones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {milestones.map((item, idx) => (
            <div 
              key={idx}
              className="p-6 border border-neutral-200 dark:border-neutral-800 rounded-xl bg-neutral-50/10 dark:bg-neutral-900/10 transition-colors duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-5">
                  <div className="p-2.5 bg-white dark:bg-neutral-950 rounded-lg border border-neutral-200 dark:border-neutral-800 shrink-0">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-xl font-sans font-bold text-neutral-850 dark:text-neutral-50 mb-1">
                  {item.title}
                </h3>
                <h4 className="text-[10px] font-mono text-neutral-550 dark:text-neutral-450 font-bold uppercase tracking-wider mb-3">
                  {item.subtitle}
                </h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
