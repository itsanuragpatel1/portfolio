import React, { useEffect } from 'react';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogs } from '../assets/blogs.js';

export default function BlogList() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="py-32 px-6 md:px-12 bg-transparent transition-colors duration-300 min-h-screen">
      <div className="max-w-4xl mx-auto">
        
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
            Insights & Journeys
          </h2>
          <p className="text-neutral-550 dark:text-neutral-450 text-xs md:text-sm max-w-xl">
            Case studies, technical chronicles, and reflections on robotics, web development, systems engineering, and academic achievements.
          </p>
        </div>

        {/* Blog Posts List */}
        <div className="space-y-8">
          {blogs.map((blog) => (
            <Link 
              key={blog.id}
              to={`/blog/${blog.id}`}
              className="group block border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/20 dark:bg-[#121214]/40 p-6 md:p-8 rounded-2xl transition-all duration-300 hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-[0_8px_30px_rgba(0,0,0,0.02)]"
            >
              <div className="flex flex-col gap-4">
                
                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono text-neutral-450 dark:text-neutral-500 uppercase select-none">
                  <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 font-sans font-semibold normal-case">
                    {blog.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={11} />
                    {blog.date}
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span className="flex items-center gap-1">
                    <Clock size={11} />
                    {blog.readTime}
                  </span>
                </div>

                {/* Title and Summary */}
                <div>
                  <h2 className="text-xl md:text-2xl font-sans font-bold text-neutral-900 dark:text-white mb-3 tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 leading-tight">
                    {blog.title}
                  </h2>
                  <p className="text-neutral-600 dark:text-neutral-400 text-xs md:text-sm leading-relaxed max-w-4xl">
                    {blog.summary}
                  </p>
                </div>

                {/* Read More link */}
                <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-800 dark:text-neutral-200 pt-2 border-t border-neutral-150 dark:border-neutral-900/30 w-fit">
                  Read Full Case Study
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
                </div>

              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
