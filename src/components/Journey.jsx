import React from 'react';
import { 
  GraduationCap, 
  CheckCircle2, 
  Code, 
  Trophy, 
  Award,
  BookOpen 
} from 'lucide-react';
import { SectionLabel } from './ui/SectionLabel';

export default function Journey() {
  return (
    <section id="about" className="py-40 px-6 bg-white overflow-hidden border-t border-neutral-100">
      <div className="max-w-7xl mx-auto">
        <SectionLabel number="03" text="The Journey" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Left Column: Education Timeline */}
          <div className="lg:col-span-5">
            <div className="mb-16">
              <h2 className="text-5xl font-black uppercase tracking-tighter mb-6">
                Education<span className="text-blue-600">.</span>
              </h2>
              {/* <p className="text-neutral-500 text-lg leading-relaxed max-w-sm">
                Academic foundation in Computer Science and Engineering at REC Rewa.
              </p> */}
            </div>

            <div className="relative pl-8 space-y-16">
              {/* Vertical Line */}
              <div className="absolute left-0 top-0 w-[1px] h-full bg-neutral-200"></div>
              
              <div className="relative">
                {/* Timeline Icon */}
                <div className="absolute left-[-36px] top-0 w-8 h-8 rounded-full bg-white border border-neutral-200 flex items-center justify-center shadow-sm">
                  <GraduationCap size={16} className="text-blue-600" />
                </div>
                
                <p className="text-blue-600 font-mono text-xs font-black tracking-widest mb-2">
                  2023 — 2027
                </p>
                <h4 className="text-2xl font-black uppercase tracking-tighter mb-2">
                  B.Tech Computer Science
                </h4>
                <p className="text-neutral-400 font-bold text-xs uppercase mb-6 tracking-widest">
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
                    <div key={index} className="flex items-center gap-3 text-sm text-neutral-500">
                      <CheckCircle2 size={14} className="text-blue-600" /> 
                      <span>{subject}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Achievements & Stats */}
          <div className="lg:col-span-7">
            <div className="mb-16">
              <h2 className="text-5xl font-black uppercase tracking-tighter mb-6">
                Milestones<span className="text-blue-600">.</span>
              </h2>
              {/* <p className="text-neutral-500 text-lg leading-relaxed max-w-sm">
                Recognition for technical excellence and leadership roles.
              </p> */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* DSA Achievement */}
              <div className="p-8 border border-neutral-200 bg-neutral-50/50 rounded-sm group hover:border-blue-600 transition-colors">
                <div className="flex justify-between items-start mb-8">
                  <div className="p-3 bg-white rounded-lg shadow-sm">
                    <Code size={20} className="text-neutral-900 group-hover:text-blue-600" />
                  </div>
                </div>
                <h5 className="text-4xl font-black mb-2 uppercase">200+</h5>
                <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest leading-loose">
                  DSA Problems solved across LeetCode & GFG.
                </p>
              </div>

              {/* TechFest Award */}
              <div className="p-8 border border-neutral-200 bg-neutral-50/50 text-white rounded-sm group">
                <div className="flex justify-between items-start mb-8">
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <Award size={24} className="text-blue-600" />
                  </div>
                </div>
                <h5 className="text-xl font-black mb-2 uppercase text-black">CodeVita S13</h5>
                <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest leading-loose">
                  Cleared Round 1.
                </p>
              </div>

              {/* T&P Department Role */}
              <div className="p-8 border border-neutral-200 bg-neutral-50/50 rounded-sm group hover:border-blue-600 transition-colors md:col-span-2">
                <div className="flex items-center gap-6">
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <Award size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <h5 className="text-xl font-black uppercase">Code War Fest X3.0</h5>
                    <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest mt-1">
                     Recognized as Top Performer for Algorithmic Excellence.
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