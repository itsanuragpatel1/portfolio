import React from 'react';
import { SpotlightCard } from './ui/SpotLightCard';
import { SectionLabel } from './ui/SectionLabel';

// Updated TechItem with Grayscale-to-Color logic
const TechItem = ({ image, name, category }) => (
  <div className="flex items-center gap-6 group cursor-default">
    <div className="w-14 h-14 flex items-center justify-center p-2 border border-neutral-100 group-hover:border-blue-600 group-hover:bg-blue-50/50 transition-all duration-500 rounded-xl overflow-hidden bg-white">
      <img 
        src={image} 
        alt={`${name} logo`}
        className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 ease-in-out scale-90 group-hover:scale-100"
      />
    </div>
    <div className="flex flex-col">
      <span className="text-sm font-black uppercase tracking-widest text-neutral-900 group-hover:text-blue-600 transition-colors duration-300">
        {name}
      </span>
      <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-tighter">
        {category}
      </span>
    </div>
  </div>
);

export default function Skills() {
  // Define your tech assets here for easy updates
  const techStack = {
    foundation: [
      { name: "C++", category: "Algorithms & DSA", image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg" },
      { name: "JavaScript", category: "ES12+ / Node Core", image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" },
      { name: "Python", category: "AI Scripting", image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" },
    ],
    mern: [
      { name: "MongoDB", category: "NoSQL Database", image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg" },
      { name: "Express", category: "Backend Framework", image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg" },
      { name: "React", category: "Frontend Library", image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" },
      { name: "Node.js", category: "Runtime Environment", image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" },
      { name: "Tailwind", category: "Design Systems", image: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" },
      { name: "Postman", category: "API Testing", image: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" },
    ],
    specialized: [
      { name: "Gen Ai", category: "Multimodal LLM", image: "https://www.svgrepo.com/show/486520/ai.svg" },
      { name: "GitHub", category: "Version Control", image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original.svg" },
      { name: "Vercel", category: "Deployement", image: "https://www.vectorlogo.zone/logos/vercel/vercel-icon.svg" },
      { name: "Git", category: "Version Control", image: "https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" },
    
    ]
  };

  return (
    <section id="skills" className="py-40 px-6 bg-white border-y border-neutral-100">
      <div className="max-w-7xl mx-auto">
        <SectionLabel number="01" text="Tech Architecture" />
        {/* <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-24">
          Technical <br /> <span className="text-blue-600">Stack.</span>
        </h2> */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-neutral-200">
          
          {/* Section 01: Foundation */}
          <SpotlightCard className="lg:col-span-1 border-r border-b">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-400 mb-10">01 / Foundation</h4>
            <div className="space-y-12">
              {techStack.foundation.map((tech) => (
                <TechItem key={tech.name} {...tech} />
              ))}
            </div>
          </SpotlightCard>

          {/* Section 02: MERN Stack */}
          <SpotlightCard className="md:col-span-2 lg:col-span-2 border-r border-b bg-neutral-50/30">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-400 mb-10">02 / MERN Development</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
              {techStack.mern.map((tech) => (
                <TechItem key={tech.name} {...tech} />
              ))}
            </div>
          </SpotlightCard>

          {/* Section 03: Specialized Tools */}
          <SpotlightCard className="lg:col-span-3 border-r border-b flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-xs w-full">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-400 mb-4">03 / AI & Infrastructure</h4>
              {/* <p className="text-neutral-500 text-sm italic">Integrating Gen-AI for projects like Just Prompt and Krishi Mitra.</p> */}
            </div>
            <div className="flex flex-wrap gap-12 flex-1 justify-start md:justify-end">
              {techStack.specialized.map((tech) => (
                <TechItem key={tech.name} {...tech} />
              ))}
            </div>
          </SpotlightCard>

        </div>
      </div>
    </section>
  );
}