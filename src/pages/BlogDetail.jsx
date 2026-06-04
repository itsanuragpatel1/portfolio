import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Shield, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { blogs } from '../assets/blogs.js';

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  useEffect(() => {
    const found = blogs.find((b) => b.id === id);
    if (found) {
      setBlog(found);
      window.scrollTo(0, 0);
    } else {
      navigate('/blog');
    }
  }, [id, navigate]);

  // Handle keyboard navigation in lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImageIndex === null) return;
      
      if (e.key === 'Escape') {
        setSelectedImageIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setSelectedImageIndex((prev) => 
          prev === 0 ? blog.images.length - 1 : prev - 1
        );
      } else if (e.key === 'ArrowRight') {
        setSelectedImageIndex((prev) => 
          prev === blog.images.length - 1 ? 0 : prev + 1
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, blog]);

  if (!blog) return null;

  return (
    <section className="py-28 md:py-36 px-6 md:px-12 bg-transparent transition-colors duration-300 min-h-screen">
      <div className="max-w-4xl mx-auto">
        
        {/* Back Link Navigators */}
        <div className="flex items-center justify-between mb-10 select-none pb-4 border-b border-neutral-100 dark:border-neutral-900/60">
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-xs font-bold text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} /> Back to Blog
          </Link>
          <span className="text-[10px] font-mono text-neutral-450 dark:text-neutral-550 uppercase tracking-widest">
            Blog Post // {blog.title}
          </span>
        </div>

        {/* 1. Blog Hero (Title, Short Summary, and Meta) */}
        <div className="mb-12">
          <p className="text-neutral-450 dark:text-neutral-555 font-mono text-[9px] tracking-wider uppercase mb-2 font-bold select-none">
            {blog.category}
          </p>
          <h1 className="text-3xl md:text-4xl font-sans font-bold text-neutral-850 dark:text-neutral-50 tracking-tight mb-4">
            {blog.title}
          </h1>
          <p className="text-neutral-550 dark:text-neutral-400 text-sm md:text-base leading-relaxed max-w-3xl mb-6">
            {blog.summary}
          </p>
          
          {/* Date & Read Time */}
          <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono text-neutral-450 dark:text-neutral-550 uppercase select-none">
            <span className="flex items-center gap-1">
              <Calendar size={11} />
              {blog.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {blog.readTime}
            </span>
          </div>
        </div>

        {/* 2. Feature IFrame Video Player Compilation */}
        {blog.video && (
          <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-950 shadow-md mb-12 select-none">
            <iframe
              src={blog.video}
              title="IIT Bombay e-Yantra Project Showcase Compilation Video"
              className="w-full h-full border-none"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {/* 3. Story Body (Centered Single Column) */}
        <div className="space-y-12 max-w-3xl mx-auto">
          
          {/* Overview / Introduction Callout */}
          {blog.overview && (
            <div className="p-6 md:p-8 border-l-4 border-fuchsia-500 bg-neutral-50/25 dark:bg-neutral-900/10 rounded-r-2xl">
              <p className="text-sm md:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium italic">
                {blog.overview}
              </p>
            </div>
          )}

          {/* Render dynamically defined sections */}
          <div className="space-y-12">
            {blog.sections?.map((section, index) => (
              <div key={index} className="space-y-4">
                <h2 className="text-xl md:text-2xl font-sans font-bold text-neutral-900 dark:text-white tracking-tight border-b border-neutral-100 dark:border-neutral-900/50 pb-2">
                  {section.title}
                </h2>
                <p className="text-neutral-600 dark:text-neutral-350 text-sm md:text-base leading-relaxed md:leading-8 whitespace-pre-line">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* 4. Image Gallery Showcase */}
        {blog.images && blog.images.length > 0 && (
          <div className="mt-16 border-t border-neutral-200 dark:border-neutral-800/80 pt-12 w-full">
            <h3 className="text-xs font-bold font-sans uppercase tracking-wider text-neutral-900 dark:text-white mb-6 select-none flex items-center gap-2">
      
              <span>Process Gallery</span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 select-none">
              {blog.images.map((img, i) => (
                <div 
                  key={i} 
                  className="relative rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-950 shadow-sm group cursor-pointer overflow-hidden"
                  onClick={() => setSelectedImageIndex(i)}
                >
                  <img 
                    src={img} 
                    alt={`Process slide ${i + 1}`} 
                    className="w-full h-auto object-contain hover:scale-[1.05] transition-transform duration-300 ease-in-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="text-white text-sm font-medium">Click to Enlarge</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. Image Lightbox Modal */}
        {selectedImageIndex !== null && blog.images && (
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in overflow-auto"
            onClick={() => setSelectedImageIndex(null)}
          >
            {/* Modal Container */}
            <div 
              className="relative bg-neutral-950/95 rounded-2xl border border-neutral-800 shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '95vw',
                maxHeight: '95vh',
                width: 'fit-content',
                height: 'fit-content'
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImageIndex(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-neutral-800/60 hover:bg-neutral-700 text-white transition-colors"
                aria-label="Close lightbox"
              >
                <X size={24} />
              </button>

              {/* Image Counter */}
              <div className="absolute top-4 left-4 px-3 py-1.5 bg-neutral-800/60 rounded-full text-white text-xs font-mono z-10">
                {selectedImageIndex + 1} / {blog.images.length}
              </div>

              {/* Main Image */}
              <div className="flex items-center justify-center p-8 overflow-auto">
                <img 
                  src={blog.images[selectedImageIndex]} 
                  alt={`Enlarged slide ${selectedImageIndex + 1}`}
                  className="max-w-[calc(95vw-4rem)] max-h-[calc(95vh-10rem)] w-auto h-auto object-contain rounded-lg"
                />
              </div>

              {/* Navigation & Info Footer */}
              <div className="flex items-center justify-between gap-4 p-6 border-t border-neutral-800 bg-neutral-950/50">
                {/* Previous Button */}
                <button
                  onClick={() => setSelectedImageIndex((prev) => 
                    prev === 0 ? blog.images.length - 1 : prev - 1
                  )}
                  className="p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white transition-colors disabled:opacity-50"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} />
                </button>

                {/* Info */}
                <div className="text-center flex-1 min-w-0">
                  <p className="text-xs font-mono text-neutral-400">
                    Use arrow keys to navigate • ESC to close
                  </p>
                </div>

                {/* Next Button */}
                <button
                  onClick={() => setSelectedImageIndex((prev) => 
                    prev === blog.images.length - 1 ? 0 : prev + 1
                  )}
                  className="p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white transition-colors disabled:opacity-50"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
