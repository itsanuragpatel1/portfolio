import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Download, ExternalLink, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import resume from '../assets/resume.pdf';

// Component for rendering individual PDF pages at a static scale
function PDFPage({ pdf, pageNum }) {
  const canvasRef = useRef(null);
  const [renderStatus, setRenderStatus] = useState('idle'); // 'idle' | 'rendering' | 'success' | 'error'

  useEffect(() => {
    let isMounted = true;
    let renderTask = null;

    const render = async () => {
      setRenderStatus('rendering');
      try {
        const page = await pdf.getPage(pageNum);
        if (!isMounted) return;

        // Render at a fixed 1.8x scale for crispness
        const viewport = page.getViewport({ scale: 1.8 });
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        renderTask = page.render(renderContext);
        await renderTask.promise;
        
        if (isMounted) {
          setRenderStatus('success');
        }
      } catch (err) {
        console.error(`Error rendering page ${pageNum}:`, err);
        if (isMounted && err.name !== 'RenderingCancelledException') {
          setRenderStatus('error');
        }
      }
    };

    render();

    return () => {
      isMounted = false;
      if (renderTask) {
        renderTask.cancel();
      }
    };
  }, [pdf, pageNum]);

  return (
    <div className="w-full relative bg-white rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.06),0_0_1px_rgba(0,0,0,0.1)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.5),0_0_1px_rgba(255,255,255,0.08)] overflow-hidden border border-neutral-200/50 dark:border-neutral-800/30 animate-fade-in">
      {renderStatus === 'rendering' && (
        <div className="absolute inset-0 bg-white dark:bg-[#121214] flex flex-col items-center justify-center min-h-[500px] gap-3">
          <Loader2 className="animate-spin text-neutral-400" size={24} />
          <span className="text-xs font-medium text-neutral-400 dark:text-neutral-500">Rendering page {pageNum}...</span>
        </div>
      )}
      {renderStatus === 'error' && (
        <div className="absolute inset-0 bg-neutral-50 dark:bg-neutral-900 flex flex-col items-center justify-center min-h-[300px] p-6 text-center">
          <span className="text-red-500 text-sm font-semibold mb-1">Failed to render page</span>
          <span className="text-xs text-neutral-400 dark:text-neutral-500">Please try opening the PDF in a new tab.</span>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className={`w-full h-auto block select-none pointer-events-none transition-opacity duration-300 ${
          renderStatus === 'success' ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}

export default function ResumePage() {
  const [pdfjsLoaded, setPdfjsLoaded] = useState(false);
  const [pdf, setPdf] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Dynamically load PDF.js from jsDelivr CDN
  useEffect(() => {
    let isMounted = true;
    
    if (window.pdfjsLib) {
      setPdfjsLoaded(true);
      return;
    }
    
    const scriptUrl = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.4.120/build/pdf.min.js';
    let script = document.querySelector(`script[src="${scriptUrl}"]`);
    
    const handleLoad = () => {
      if (isMounted) {
        try {
          window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.4.120/build/pdf.worker.min.js';
          setPdfjsLoaded(true);
        } catch (err) {
          console.error('Error setting worker source:', err);
          setError('Failed to initialize PDF previewer. Please download the file directly.');
          setLoading(false);
        }
      }
    };

    const handleError = () => {
      if (isMounted) {
        setError('Failed to load the PDF viewer engine. Please download the file directly.');
        setLoading(false);
      }
    };

    if (script) {
      script.addEventListener('load', handleLoad);
      script.addEventListener('error', handleError);
    } else {
      script = document.createElement('script');
      script.src = scriptUrl;
      script.async = true;
      script.addEventListener('load', handleLoad);
      script.addEventListener('error', handleError);
      document.head.appendChild(script);
    }

    return () => {
      isMounted = false;
      if (script) {
        script.removeEventListener('load', handleLoad);
        script.removeEventListener('error', handleError);
      }
    };
  }, []);

  // Fetch the PDF document once PDF.js is loaded
  useEffect(() => {
    if (!pdfjsLoaded) return;
    
    let isMounted = true;
    setLoading(true);
    setError(null);
    
    const loadPdf = async () => {
      try {
        const loadingTask = window.pdfjsLib.getDocument(resume);
        const pdfDoc = await loadingTask.promise;
        if (isMounted) {
          setPdf(pdfDoc);
          setLoading(false);
        }
      } catch (err) {
        console.error('Error loading PDF document:', err);
        if (isMounted) {
          setError('Failed to load PDF document preview. Please open or download it using the buttons above.');
          setLoading(false);
        }
      }
    };
    
    loadPdf();
    
    return () => {
      isMounted = false;
    };
  }, [pdfjsLoaded]);

  const numPages = pdf ? pdf.numPages : 0;
  const pageNumbers = Array.from({ length: numPages }, (_, i) => i + 1);

  return (
    <section className="py-24 md:py-28 px-4 md:px-12 bg-neutral-50 dark:bg-[#09090b] transition-colors duration-200 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-2xl flex flex-col gap-8">
        
        {/* Professional Header Section (Left-aligned details, Right-aligned actions, bottom border separator) */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 pb-6 border-b border-neutral-200 dark:border-neutral-800 select-none">
          <div className="space-y-1.5 text-left">
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">
              Resume
            </h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              View the professional resume below or download PDF.
            </p>
          </div>
          
          {/* Two Clean Centered Action Buttons */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <a
              href={resume}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none text-center inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-neutral-600 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 px-4 py-2 rounded-lg transition-all cursor-pointer shadow-sm active:scale-98"
            >
              <ExternalLink size={13} /> Open Resume
            </a>
            <a
              href={resume}
              download="Anurag_Patel_Resume.pdf"
              className="flex-1 sm:flex-none text-center inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 dark:text-neutral-900 border border-neutral-900 dark:border-white px-4 py-2 rounded-lg transition-all cursor-pointer shadow-sm active:scale-98"
            >
              <Download size={13} /> Download PDF
            </a>
          </div>
        </div>

        {/* Floating Sheet Canvas Wrapper */}
        <div className="w-full flex flex-col gap-6">
          {loading && (
            <div className="w-full bg-white dark:bg-[#121214] border border-neutral-200 dark:border-neutral-800/60 shadow-sm rounded-xl p-24 flex flex-col items-center justify-center text-center gap-4">
              <Loader2 className="animate-spin text-neutral-400 dark:text-neutral-500" size={32} />
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-neutral-850 dark:text-neutral-200">Initializing Preview</span>
                <span className="text-xs text-neutral-400 dark:text-neutral-500 font-mono">Loading document engine...</span>
              </div>
            </div>
          )}

          {error && !loading && (
            <div className="w-full bg-white dark:bg-[#121214] border border-neutral-200 dark:border-neutral-800 shadow-sm rounded-xl p-12 flex flex-col items-center justify-center text-center gap-5">
              <div className="w-12 h-12 rounded-full bg-amber-50 dark:bg-amber-950/20 flex items-center justify-center text-amber-500 dark:text-amber-400 font-mono text-xl">
                ⚠️
              </div>
              <div className="flex flex-col gap-1 max-w-sm">
                <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">Preview Unavailable</span>
                <span className="text-xs text-neutral-400 dark:text-neutral-500">{error}</span>
              </div>
              <div className="flex gap-3">
                <a
                  href={resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-xs font-semibold rounded-lg text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800 transition-colors"
                >
                  Open in New Tab
                </a>
                <a
                  href={resume}
                  download="Anurag_Patel_Resume.pdf"
                  className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-xs font-semibold rounded-lg text-white dark:text-neutral-900 transition-colors"
                >
                  Download PDF
                </a>
              </div>
            </div>
          )}

          {!loading && !error && pdf && (
            <div className="w-full flex flex-col gap-6">
              {pageNumbers.map((pageNum) => (
                <PDFPage key={pageNum} pdf={pdf} pageNum={pageNum} />
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
