import React from 'react';

const SkillPill = ({ name, image }) => (
  <div className="group flex items-center gap-2.5 py-2 px-3.5 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/80 transition-all duration-300 hover:scale-[1.02] hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-[0_4px_12px_rgba(0,0,0,0.03)] cursor-default select-none">
    <div className="w-6 h-6 flex items-center justify-center p-0.5 rounded overflow-hidden shrink-0 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200/60 dark:border-neutral-800/60">
      <img 
        src={image} 
        alt={`${name} icon`} 
        className="w-full h-full object-contain transition-all duration-300 group-hover:scale-110" 
      />
    </div>
    <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 transition-colors duration-300 group-hover:text-neutral-950 dark:group-hover:text-white">
      {name}
    </span>
  </div>
);

const SkillCategory = ({ title, skills, colorClass }) => (
  <div className="bg-neutral-50 dark:bg-[#121214]/40 border border-neutral-200 dark:border-neutral-800/80 p-5 rounded-xl flex flex-col hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-[0_8px_30px_rgba(0,0,0,0.02)] transition-all duration-300">
    <h3 className="text-[10px] font-bold font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-4 border-b border-neutral-200/60 dark:border-neutral-800/60 pb-2.5 flex items-center gap-2 select-none">
      <span className={`w-1.5 h-1.5 rounded-full ${colorClass}`} />
      <span>{title}</span>
    </h3>
    <div className="flex flex-col gap-2">
      {skills.map((skill) => (
        <SkillPill key={skill.name} {...skill} />
      ))}
    </div>
  </div>
);

export default function Skills() {
  const categories = [
    {
      title: "Languages",
      colorClass: "bg-cyan-500",
      skills: [
        { name: "C++", image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg" },
        { name: "JavaScript", image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" }
      ]
    },
    {
      title: "Frontend",
      colorClass: "bg-emerald-500",
      skills: [
        { name: "React", image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" },
        { name: "HTML", image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" },
        { name: "CSS", image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" },
        { name: "Tailwind", image: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" }
      ]
    },
    {
      title: "Backend",
      colorClass: "bg-amber-500",
      skills: [
        { name: "Node.js", image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" },
        { name: "Express.js", image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg" }
      ]
    },
    {
      title: "Database",
      colorClass: "bg-purple-500",
      skills: [
        { name: "MongoDB", image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg" },
        { name: "MySQL", image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg" }
      ]
    },
    {
      title: "Tools",
      colorClass: "bg-orange-500",
      skills: [
        { name: "Git", image: "https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" },
        { name: "GitHub", image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original.svg" }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 md:py-24 px-6 md:px-12 bg-transparent border-b border-neutral-100 dark:border-neutral-900/60 transition-colors duration-300 scroll-mt-28">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <h2 className="text-xl md:text-2xl font-sans font-bold tracking-tight text-neutral-900 dark:text-white mb-8">
          Skills and Technologies
        </h2>

        {/* Categorized Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {categories.map((category) => (
            <SkillCategory key={category.title} {...category} />
          ))}
        </div>

      </div>
    </section>
  );
}