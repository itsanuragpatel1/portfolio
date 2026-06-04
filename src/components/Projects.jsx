import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects } from '../assets/projects.js';

const ProjectCard = ({ id, title, category, description, tech, github, live, image }) => (
  <div className="group border border-neutral-200 dark:border-neutral-800 bg-neutral-50/10 dark:bg-neutral-900/10 p-5 md:p-6 rounded-xl flex flex-col justify-between hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300 shadow-sm hover:shadow-md">
    <div>
      {/* Visual Image Showcase Link */}
      <Link to={`/projects/${id}`} className="block overflow-hidden bg-neutral-100 dark:bg-neutral-900 aspect-[16/9] relative rounded-lg border border-neutral-200/60 dark:border-neutral-800/60 mb-5 cursor-pointer">
        <img 
          src={image} 
          alt={title} 
          className="object-cover w-full h-full group-hover:scale-[1.01] transition-transform duration-500 ease-in-out" 
        />
      </Link>
      
      {/* Category & Title Link */}
      <p className="text-neutral-500 dark:text-neutral-400 font-mono text-[9px] tracking-wider uppercase mb-1.5 font-bold select-none">
        {category}
      </p>
      <Link to={`/projects/${id}`} className="block cursor-pointer">
        <h3 className="text-lg font-sans font-bold text-neutral-900 dark:text-white mb-2 tracking-tight hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          {title}
        </h3>
      </Link>
      <p className="text-neutral-600 dark:text-neutral-400 text-xs md:text-sm leading-relaxed mb-5">
        {description}
      </p>
    </div>

    <div>
      {/* Tech stack badges */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {tech.map((t, i) => (
          <span 
            key={i} 
            className="text-[9px] font-bold px-2 py-0.5 bg-neutral-100 dark:bg-neutral-950 border border-neutral-200/50 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 rounded select-none"
          >
            {t}
          </span>
        ))}
      </div>
      
      {/* Action coordinates */}
      <div className="flex gap-6 border-t border-neutral-100 dark:border-neutral-900/50 pt-4 mt-auto">
        <a 
          href={github} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center gap-1.5 text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
        >
          Source <Github size={12} />
        </a>
        <a 
          href={live} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center gap-1.5 text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
        >
          Live <ExternalLink size={12} />
        </a>
      </div>
    </div>
  </div>
);

export default function Projects() {
  return (
    <section id="work" className="py-20 md:py-24 px-6 md:px-12 bg-transparent border-b border-neutral-100 dark:border-neutral-900/60 transition-colors duration-300 scroll-mt-28">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <h2 className="text-xl md:text-2xl font-sans font-bold tracking-tight text-neutral-900 dark:text-white mb-8">
          Featured Projects
        </h2>

        {/* 2-Column Professional Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <ProjectCard key={idx} {...project} />
          ))}
        </div>

        {/* Dynamic button to go to all projects section */}
        <div className="flex justify-center mt-10 select-none">
          <Link 
            to="/projects"
            className="inline-flex items-center gap-1.5 font-sans text-xs font-bold text-neutral-700 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white bg-neutral-50/50 dark:bg-neutral-900/10 border border-neutral-200 dark:border-neutral-800 px-6 py-3 rounded-lg transition-all hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer shadow-sm"
          >
            View All Projects
            <span>&rarr;</span>
          </Link>
        </div>

      </div>
    </section>
  );
}