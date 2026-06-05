import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink, Play, CheckCircle2, Pause } from 'lucide-react';
import { projects } from '../assets/projects.js';

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const playerRef = useRef(null);
  const [youtubePlayer, setYoutubePlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const found = projects.find(p => p.id === id);
    if (found) {
      setProject(found);
      setIsPlaying(false);
      setCurrentTime(0);
      window.scrollTo(0, 0);
    } else {
      navigate('/');
    }
  }, [id, navigate]);

  // Initialize YouTube IFrame API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = initializePlayer;
    } else {
      initializePlayer();
    }
  }, [project?.video]);

  const initializePlayer = () => {
    if (!project?.video || !playerRef.current) return;

    const videoId = project.video.split('/embed/')[1]?.split('?')[0];
    if (!videoId) return;

    const player = new window.YT.Player(playerRef.current, {
      height: '100%',
      width: '100%',
      videoId: videoId,
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
      playerVars: {
        controls: 0,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        iv_load_policy: 3,
        disablekb: 0,
        fs: 1,
        playsinline: 1,
      },
    });
    setYoutubePlayer(player);
  };

  const onPlayerReady = (event) => {
    setDuration(event.target.getDuration());
  };

  const onPlayerStateChange = (event) => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      setIsPlaying(true);
      const interval = setInterval(() => {
        if (youtubePlayer) {
          setCurrentTime(youtubePlayer.getCurrentTime());
        }
      }, 100);
      return () => clearInterval(interval);
    } else {
      setIsPlaying(false);
    }
  };

  const togglePlayPause = () => {
    if (!youtubePlayer) return;
    if (isPlaying) {
      youtubePlayer.pauseVideo();
      setIsPlaying(false);
    } else {
      youtubePlayer.playVideo();
      setIsPlaying(true);
    }
  };

  const handleSeek = (e) => {
    if (!youtubePlayer) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * duration;
    youtubePlayer.seekTo(newTime);
    setCurrentTime(newTime);
  };

  const formatTime = (time) => {
    if (!time) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!project) return null;

  return (
    <section className="py-28 md:py-36 px-6 md:px-12 bg-transparent transition-colors duration-300 min-h-screen">
      <div className="max-w-4xl mx-auto">

        {/* Back Link Navigators */}
        <div className="flex items-center justify-between mb-10 select-none pb-4 border-b border-neutral-100 dark:border-neutral-900/60">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs font-bold text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} /> Back to Projects
          </Link>
          <span className="text-[10px] font-mono text-neutral-450 dark:text-neutral-550 uppercase tracking-widest">
            Case Study // {project.title}
          </span>
        </div>

        {/* 1. Project Hero (Project Name, Short Summary & Buttons) */}
        <div className="mb-12">
          <p className="text-neutral-450 dark:text-neutral-550 font-mono text-[9px] tracking-wider uppercase mb-2 font-bold select-none">
            {project.category}
          </p>
          <h1 className="text-3xl md:text-4xl font-sans font-bold text-neutral-850 dark:text-neutral-50 tracking-tight mb-4">
            {project.title}
          </h1>
          <p className="text-neutral-550 dark:text-neutral-400 text-sm md:text-base leading-relaxed max-w-3xl mb-6">
            {project.description}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap gap-3.5 select-none">
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-white bg-neutral-900 hover:bg-neutral-800 dark:text-neutral-950 dark:bg-white dark:hover:bg-neutral-100 border border-neutral-900 dark:border-white px-5 py-2.5 rounded-lg transition-all cursor-pointer shadow-sm"
            >
              Live <ExternalLink size={12} />
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white bg-transparent border border-neutral-200 dark:border-neutral-800 px-5 py-2.5 rounded-lg transition-all hover:bg-neutral-50 dark:hover:bg-neutral-900 cursor-pointer"
            >
              GitHub Source <Github size={12} />
            </a>
          </div>
        </div>

        {/* 2. Professional Project Media Showcase */}
        <div className="mb-12 border-t border-neutral-100 dark:border-neutral-900/60 pt-10">
          <h3 className="text-[10px] font-bold font-mono text-neutral-450 dark:text-neutral-555 uppercase tracking-widest mb-4 select-none">
            {project.video && project.video.trim() !== "" ? "Video Demonstration" : "Project Preview"}
          </h3>
          <div className="relative aspect-[16/9] w-full bg-neutral-100 dark:bg-neutral-950 rounded-xl overflow-hidden border border-neutral-200/80 dark:border-neutral-800 shadow-sm group">
            {project.video && project.video.trim() !== "" ? (
              isPlaying ? (
                <iframe
                  src={`${project.video}?autoplay=1&modestbranding=1&rel=0&iv_load_policy=3&controls=1&fs=1&disablekb=1`}
                  title={`${project.title} Demonstration Video`}
                  className="w-full h-full border-none"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <button
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 w-full h-full cursor-pointer overflow-hidden flex items-center justify-center bg-black/5 hover:bg-black/25 transition-all duration-300 outline-none border-none p-0"
                >
                  {/* Thumbnail image (fully clear by default) */}
                  <img
                    src={project.image}
                    alt={`${project.title} video thumbnail`}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-[1.01]"
                  />

                  {/* Visual Glassmorphic play button container */}
                  <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-neutral-900/80 dark:bg-white/90 backdrop-blur-md text-white dark:text-neutral-950 flex items-center justify-center shadow-2xl transition-all duration-300 scale-95 group-hover:scale-100">
                    <Play size={24} className="fill-current ml-1" />
                  </div>

                  {/* Clear instruction label */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md px-4 py-2 rounded-lg text-xs font-semibold text-white border border-neutral-800/85 shadow-md">
                    Click to play video demonstration
                  </div>
                </button>
              )
            ) : (
              <img
                src={project.image}
                alt={`${project.title} preview`}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
          </div>
        </div>

        {/* 3. Gallery (Rendered conditionally if images are present) */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="mb-12 border-t border-neutral-100 dark:border-neutral-900/60 pt-10">
            <h3 className="text-[10px] font-bold font-mono text-neutral-450 dark:text-neutral-555 uppercase tracking-widest mb-4 select-none">
              Media Gallery
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.gallery.map((imgUrl, index) => (
                <div
                  key={index}
                  className="overflow-hidden bg-neutral-100 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 aspect-[16/9]"
                >
                  <img
                    src={imgUrl}
                    alt={`${project.title} gallery asset ${index + 1}`}
                    className="object-cover w-full h-full hover:scale-[1.02] transition-transform duration-500 ease-in-out"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. Project Overview / About */}
        <div className="mb-12 border-t border-neutral-100 dark:border-neutral-900/60 pt-10 space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-850 dark:text-neutral-50 select-none">
            Project Overview
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <span className="text-[9px] font-bold font-mono text-neutral-450 dark:text-neutral-500 uppercase tracking-wider select-none">
                What problem it solves
              </span>
              <p className="text-xs md:text-sm text-neutral-555 dark:text-neutral-400 leading-relaxed">
                {project.overview?.problemSolved}
              </p>
            </div>
            <div className="space-y-2">
              <span className="text-[9px] font-bold font-mono text-neutral-450 dark:text-neutral-500 uppercase tracking-wider select-none">
                Who is it for
              </span>
              <p className="text-xs md:text-sm text-neutral-555 dark:text-neutral-400 leading-relaxed">
                {project.overview?.targetAudience}
              </p>
            </div>
            <div className="space-y-2">
              <span className="text-[9px] font-bold font-mono text-neutral-450 dark:text-neutral-500 uppercase tracking-wider select-none">
                Why I built it
              </span>
              <p className="text-xs md:text-sm text-neutral-555 dark:text-neutral-400 leading-relaxed">
                {project.overview?.whyBuild}
              </p>
            </div>
          </div>
        </div>

        {/* 5. Key Features */}
        <div className="mb-12 border-t border-neutral-100 dark:border-neutral-900/60 pt-10">
          <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-850 dark:text-neutral-50 mb-5 select-none">
            Key Features
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-2.5 text-xs md:text-sm text-neutral-555 dark:text-neutral-400 leading-relaxed"
              >
                <CheckCircle2 size={13} className="text-neutral-400 dark:text-neutral-600 shrink-0 mt-0.5" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Tech Stack with Proper Categories */}
        <div className="mb-12 border-t border-neutral-100 dark:border-neutral-900/60 pt-10">
          <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-850 dark:text-neutral-50 mb-6 select-none">
            Tech Stack Breakdown
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {project.categorizedTech.map((techGroup, index) => (
              <div
                key={index}
                className="bg-neutral-50/20 dark:bg-neutral-900/10 border border-neutral-250/60 dark:border-neutral-800/80 p-4 rounded-xl flex flex-col"
              >
                <span className="text-[9px] font-bold font-mono uppercase tracking-wider text-neutral-450 dark:text-neutral-500 mb-3 border-b border-neutral-100 dark:border-neutral-850/60 pb-2 select-none">
                  {techGroup.category}
                </span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {techGroup.items.map((techItem, techIndex) => (
                    <span
                      key={techIndex}
                      className="text-[9px] font-semibold px-2 py-0.5 bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-850/60 text-neutral-600 dark:text-neutral-400 rounded select-none"
                    >
                      {techItem}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 7. Footer Project Links (Centered Premium Buttons) */}
        <div className="border-t border-neutral-100 dark:border-neutral-900/60 pt-12 flex flex-col items-center select-none">
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-center inline-flex items-center justify-center gap-2 text-xs font-bold text-white bg-neutral-900 hover:bg-neutral-800 dark:text-neutral-950 dark:bg-white dark:hover:bg-neutral-100 border border-neutral-900 dark:border-white px-6 py-2.5 rounded-lg transition-colors cursor-pointer shadow-sm"
            >
              Live Project <ExternalLink size={12} />
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-center inline-flex items-center justify-center gap-2 text-xs font-bold text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 px-6 py-2.5 rounded-lg transition-colors cursor-pointer"
            >
              GitHub Source <Github size={12} />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
