import React, { useEffect } from 'react';
import { Github, ExternalLink, ArrowLeft } from 'lucide-react';
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
      <p className="text-neutral-450 dark:text-neutral-450 font-mono text-[9px] tracking-wider uppercase mb-1.5 font-bold select-none">
        {category}
      </p>
      <Link to={`/projects/${id}`} className="block cursor-pointer">
        <h3 className="text-lg font-sans font-bold text-neutral-850 dark:text-neutral-50 mb-2 tracking-tight hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          {title}
        </h3>
      </Link>
      <p className="text-neutral-550 dark:text-neutral-450 text-xs md:text-sm leading-relaxed mb-5">
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

export default function ProjectsShowcase() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="py-32 px-6 md:px-12 bg-transparent transition-colors duration-300 min-h-screen">
      <div className="max-w-7xl mx-auto">

        {/* Back Link */}
        <div className="mb-8 select-none">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} /> Back to Home
          </Link>
        </div>

        {/* Section Header */}
        <div className="mb-12 border-b border-neutral-100 dark:border-neutral-900/60 pb-8">
          <h2 className="text-2xl md:text-3xl font-sans font-bold tracking-tight text-neutral-850 dark:text-neutral-50 mb-2">
            Project Showcase
          </h2>
          <p className="text-neutral-550 dark:text-neutral-450 text-xs md:text-sm max-w-xl">
          Building scalable web applications, AI-powered solutions, and impactful digital experiences that solve real-world problems. 
          </p>
        </div>

        {/* 2-Column Projects Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>

      </div>
    </section>
  );
}
