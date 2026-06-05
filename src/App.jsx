import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProjectsShowcase from './pages/ProjectsShowcase';
import ProjectDetail from './pages/ProjectDetail';
import ResumePage from './pages/ResumePage';
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetail';
import { Analytics } from '@vercel/analytics/react';

// Component that monitors route location changes and handles smooth scrolling to hash anchors
function ScrollToHash() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // Small delay to ensure React elements are fully rendered and mounted
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return () => clearTimeout(timer);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash, pathname]);

  return null;
}

function App() {
  useEffect(() => {
    // 1. Initialize Cal.com JS Embed API
    (function (C, A, L) {
      let p = function (a, ar) { a.q.push(ar); };
      let d = C.document;
      C.Cal = C.Cal || function () {
        let cal = C.Cal;
        let ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement("script")).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api = function () { p(api, arguments); };
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ["initNamespace", namespace]);
          } else p(cal, ar);
          return;
        }
        p(cal, ar);
      };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    window.Cal("init", { origin: "https://cal.com" });

    // 2. Sync theme dynamically on load and toggles
    const updateCalTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      window.Cal("ui", {
        theme: isDark ? "dark" : "light",
        styles: {
          branding: {
            brandColor: isDark ? "#ffffff" : "#09090b"
          }
        },
        hideEventTypeDetails: false,
        layout: "month_view"
      });
    };

    updateCalTheme();

    const observer = new MutationObserver(() => {
      updateCalTheme();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  return (
    <BrowserRouter>
      <ScrollToHash />
      <div className="min-h-screen bg-[#ffffff] text-[#111111] dark:bg-[#09090b] dark:text-[#f4f4f5] selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-neutral-950 font-sans antialiased transition-colors duration-200">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<ProjectsShowcase />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/resume" element={<ResumePage />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
          </Routes>
        </main>
        <Footer />
        <Analytics />
      </div>
    </BrowserRouter>
  );
}

export default App;