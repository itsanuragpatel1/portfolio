import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { SectionLabel } from './ui/SectionLabel';
import { projects } from '../assets/projects.js';

const ProjectCard = ({ title, category, description, tech, github, live, image }) => (
  <div className="group border-b border-neutral-200 py-20 first:pt-0 last:border-0 hover:bg-neutral-50/50 transition-colors duration-500 px-4 -mx-4">
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      <div className="lg:col-span-5 order-2 lg:order-1">
        <p className="text-blue-600 font-mono text-[10px] tracking-[0.3em] uppercase mb-4 font-bold">{category}</p>
        <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-neutral-900 mb-8 tracking-tighter uppercase leading-none">{title}</h3>
        <p className="text-neutral-500 text-lg leading-relaxed mb-10 max-w-lg">{description}</p>
        <div className="flex flex-wrap gap-2 mb-10">
          {tech.map((t, i) => (
            <span key={i} className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-white border border-neutral-200 text-neutral-600">
              {t}
            </span>
          ))}
        </div>
        <div className="flex gap-8">
          <a href={github} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:text-blue-600 transition-all border-b-2 border-transparent hover:border-blue-600 pb-1">
            Source <Github size={14} />
          </a>
          <a href={live} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:text-blue-600 transition-all border-b-2 border-transparent hover:border-blue-600 pb-1">
            Live <ExternalLink size={14} />
          </a>
        </div>
      </div>
      <div className="lg:col-span-7 order-1 lg:order-2 overflow-hidden bg-neutral-100 aspect-[16/9] relative border border-neutral-200 shadow-2xl">
        <img src={image} alt={title} className="object-cover w-full h-full grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-in-out" />
      </div>
    </div>
  </div>
);

export default function Projects() {
  return (
    <section id="work" className="py-40 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionLabel number="02" text="Curated Work" />
        {/* <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-24">
          Selected <br /> <span className="text-blue-600">Cases.</span>
        </h2> */}
        <div className="space-y-0">
          {projects.map((project, idx) => (
            <ProjectCard key={idx} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}