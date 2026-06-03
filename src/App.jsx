import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProjectsShowcase from './pages/ProjectsShowcase';
import ProjectDetail from './pages/ProjectDetail';
import ResumePage from './pages/ResumePage';

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
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;