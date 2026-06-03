import React, { useState, useEffect, useRef } from 'react';
import { Terminal, CornerDownLeft } from 'lucide-react';
import resume from '../assets/resume.pdf';

export default function Hero() {
  const [terminalLines, setTerminalLines] = useState([]);
  const [showButtons, setShowButtons] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const terminalBodyRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll only the terminal container to the bottom when lines update
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [terminalLines]);

  // Click handler to focus input when terminal body is clicked
  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Sequential automatic character-by-character typing timeline
  useEffect(() => {
    let active = true;
    
    const runSequence = async () => {
      const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
      
      const typeCommand = (cmd, callback) => {
        let typed = "";
        let charIdx = 0;
        
        // Add an empty line representing the current active command typing line
        setTerminalLines(prev => [...prev, { type: 'input', text: '' }]);
        
        const typeChar = () => {
          if (!active) return;
          if (charIdx < cmd.length) {
            typed += cmd[charIdx];
            setTerminalLines(prev => {
              const next = [...prev];
              next[next.length - 1] = { type: 'input', text: typed };
              return next;
            });
            charIdx++;
            setTimeout(typeChar, 40); // clean human typing speed
          } else {
            setTimeout(callback, 150);
          }
        };
        typeChar();
      };

      if (!active) return;
      setIsTyping(true);
      setTerminalLines([]);
      setShowButtons(false);

      // Line 1: whoami
      await new Promise(resolve => {
        typeCommand("whoami", () => {
          setTerminalLines(prev => [
            ...prev,
            { type: 'output', text: 'Anurag Patel' },
            { type: 'output-sub', text: 'Full-Stack Developer & CS Engineering Student' }
          ]);
          resolve();
        });
      });

      await delay(400);

      // Line 2: about
      await new Promise(resolve => {
        typeCommand("about", () => {
          setTerminalLines(prev => [
            ...prev,
            { 
              type: 'output', 
              text: 'I build scalable web applications with the MERN stack\nand integrate AI-powered features to create smarter,\nreal-world products.\n\nI enjoy turning ideas into practical software that\npeople actually use.' 
            }
          ]);
          resolve();
        });
      });

      await delay(400);
      if (active) {
        setShowButtons(true);
        setIsTyping(false);
      }
    };

    runSequence();
    
    return () => {
      active = false;
    };
  }, []);

  // Handle active user input submissions
  const handleCommandSubmit = (e) => {
    e.preventDefault();
    if (!inputVal.trim() || isTyping) return;
    executeCommand(inputVal);
  };

  const executeCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    let outputs = [];

    if (trimmed === 'help') {
      outputs = [
        "Available commands in this shell:",
        "  whoami         - identify active profile name",
        "  about          - read professional intro & profile details",
        "  skills         - print core technical skill categories",
        "  experience     - view professional internship & roles history",
        "  projects       - list featured SaaS & Web applications",
        "  education      - read academic qualifications & batch details",
        "  resume         - download/open software engineering CV",
        "  contact        - print email & social coordinates",
        "  clear          - clear console logs and history"
      ];
    } else if (trimmed === 'whoami') {
      outputs = [
        "Anurag Patel",
        "Full-Stack Developer & CS Engineering Student"
      ];
    } else if (trimmed === 'about') {
      outputs = [
        "I build scalable web applications with the MERN stack",
        "and integrate AI-powered features to create smarter,",
        "real-world products.",
        "",
        "I enjoy turning ideas into practical software that",
        "people actually use."
      ];
    } else if (trimmed === 'skills') {
      outputs = [
        "Technical Skills & Stack:",
        "  • Languages: C++, JavaScript",
        "  • Frontend: React, HTML, CSS, Tailwind",
        "  • Backend: Node.js, Express.js",
        "  • Database: MongoDB, MySQL",
        "  • Tools: Git, GitHub"
      ];
    } else if (trimmed === 'experience') {
      outputs = [
        "Professional Experience:",
        "  • Full Stack Developer @ RENESON (Feb 2026 — Present)",
        "    Highlights: Modernizing website redevelopment, platform building, secure admin dashboard.",
        "  • DevOps Engineer @ AIElysium (Mar 2026 — Apr 2026)",
        "    Highlights: AWS CI/CD pipeline, S3/CloudFront CDN deployment, EC2 PM2 reliability."
      ];
    } else if (trimmed === 'projects') {
      outputs = [
        "Featured Projects:",
        "  • Just Prompt  [Generative AI / SaaS]",
        "    Stack: MERN Stack, Gemini API, OAuth 2.0, Cloudinary, Vite",
        "  • Car Rental   [Full-Stack Management]",
        "    Stack: MERN Stack, JWT, RESTful API, MongoDB, Tailwind",
        "  • Krishi Mitra [Agri-Tech / Multimodal]",
        "    Stack: React, Node.js, Gemini LLM, Speech-to-Text, SoilGrids API",
        "  • Result Scraper [Automation / Computer Vision]",
        "    Stack: Python, Selenium, Tesseract OCR, OpenCV, CSV Stream",
        "Type or click button to view detailed project sections!"
      ];
    } else if (trimmed === 'education') {
      outputs = [
        "Academic Qualifications:",
        "  • B.Tech in Computer Science & Engineering",
        "    Government Engineering College, Rewa (REC Rewa)",
        "    Batch: 2023 - 2027",
        "  • DSA Solving Index: 200+ solved problems on LeetCode & GFG."
      ];
    } else if (trimmed === 'resume') {
      outputs = [
        "Opening Anurag_Patel_Resume.pdf in new tab...",
        "Press the '[ Download Resume ]' button below to download the latest PDF."
      ];
      setTimeout(() => {
        window.open(resume, '_blank');
      }, 750);
    } else if (trimmed === 'contact') {
      outputs = [
        "Reach out to Anurag Patel:",
        "  • Email: Anuragpateloriginal@gmail.com",
        "  • LinkedIn: linkedin.com/in/itsanuragpatel",
        "  • GitHub: github.com/itsanuragpatel1"
      ];
    } else if (trimmed === 'clear') {
      setTerminalLines([]);
      setInputVal('');
      return;
    } else {
      outputs = [
        `bash: command not found: ${trimmed}`,
        "Type 'help' to see list of available commands."
      ];
    }

    setTerminalLines(prev => [
      ...prev,
      { type: 'input', text: cmd },
      ...outputs.map(out => {
        const isSuccess = out.startsWith('✓') || out.startsWith('Opening');
        const isSub = out.startsWith('  ') || out.startsWith('•');
        if (isSuccess) {
          return { type: 'output-success', text: out };
        }
        if (isSub) {
          return { type: 'output-sub', text: out };
        }
        return { type: 'output', text: out };
      })
    ]);
    setInputVal('');
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-28 pb-16 overflow-hidden bg-transparent transition-colors duration-300">
      
      <div className="max-w-4xl mx-auto w-full relative z-10 flex flex-col items-center">
        
        {/* Terminal Chrome Frame Container */}
        <div className="w-full bg-[#0c0c0e] text-[#e4e4e7] rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-xl overflow-hidden transition-all duration-300">
          
          {/* Terminal Title Bar */}
          <div className="bg-[#141417] border-b border-neutral-800 px-5 py-3 flex items-center justify-between">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-700 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-700 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-700 inline-block" />
            </div>
            <div className="text-[10px] font-mono text-neutral-500 flex items-center gap-1.5 select-none">
              <Terminal className="w-3 h-3 text-neutral-500" /> anurag@portfolio:~
            </div>
            <div className="w-10" /> {/* Spacer */}
          </div>

          {/* Interactive Shell Body */}
          <div 
            ref={terminalBodyRef}
            onClick={handleTerminalClick}
            className="p-6 md:p-8 h-[320px] md:h-[360px] overflow-y-auto font-mono text-left text-xs md:text-sm leading-relaxed text-neutral-300 cursor-text select-text"
          >
            
            {/* Sequential command output stream logs */}
            <div className="space-y-2">
              {terminalLines.map((line, index) => {
                if (line.type === 'input') {
                  const isCurrentTypingLine = isTyping && index === terminalLines.length - 1;
                  return (
                    <div key={index} className="flex items-center gap-1.5 text-white font-bold select-none mt-4 first:mt-0">
                      <span className="text-neutral-400 font-mono">anurag@portfolio:~$</span>
                      <span className="break-all whitespace-pre-wrap flex items-center">
                        {line.text}
                        {isCurrentTypingLine && (
                          <span className="w-1.5 h-3.5 bg-neutral-400 animate-pulse inline-block ml-1" />
                        )}
                      </span>
                    </div>
                  );
                }
                
                const isSub = line.type === 'output-sub';
                const isSuccess = line.type === 'output-success' || line.text.startsWith('✓');
                
                let textColor = "text-neutral-200 dark:text-neutral-300 font-medium"; // default output
                if (isSub) textColor = "text-neutral-400 dark:text-neutral-500 text-[11px] md:text-xs";
                if (isSuccess) textColor = "text-emerald-500 dark:text-emerald-400 font-semibold";

                return (
                  <div key={index} className={`${textColor} break-all whitespace-pre-wrap pl-1`}>
                    {line.text}
                  </div>
                );
              })}
            </div>

            {/* User Input Prompt (active when sequence finishes) */}
            {showButtons && (
              <form onSubmit={handleCommandSubmit} className="flex items-center gap-1.5 text-white font-bold mt-4 select-none">
                <span className="text-neutral-400 font-mono">anurag@portfolio:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="type 'help'..."
                  disabled={isTyping}
                  className="flex-1 bg-transparent border-none outline-none font-mono text-xs md:text-sm text-white caret-neutral-400 pl-1 placeholder-neutral-700 font-bold"
                  autoFocus
                  autoComplete="off"
                />
                <button type="submit" aria-label="Submit command" className="text-neutral-600 hover:text-white transition-colors cursor-pointer pr-1">
                  <CornerDownLeft size={12} />
                </button>
              </form>
            )}

          </div>

          {/* Quick CLI command pills */}
          <div className="bg-[#101013] border-t border-neutral-900 px-5 py-3 flex items-center gap-2 flex-wrap text-left select-none min-h-[45px]">
            <span className="text-[8px] font-mono text-neutral-400 uppercase tracking-widest mr-2 shrink-0">
              CLI Quick tags:
            </span>
            {['help', 'whoami', 'about', 'skills', 'experience', 'projects', 'education', 'resume', 'contact', 'clear'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => !isTyping && executeCommand(cmd)}
                disabled={isTyping}
                className={`px-2 py-1 rounded border text-[9px] font-mono transition-all ${
                  isTyping 
                    ? 'bg-[#141418] border-neutral-900 text-neutral-600 cursor-not-allowed select-none' 
                    : 'bg-[#1c1c22] hover:bg-neutral-800 border-neutral-800 text-neutral-400 hover:text-white cursor-pointer'
                }`}
              >
                {cmd}
              </button>
            ))}
          </div>

        </div>

        {/* Clean, Vercel-Style Professional CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full mt-10 animate-fade-in select-none">
          <a
            href="#work"
            className="w-full sm:w-auto text-center font-sans text-xs font-bold text-white bg-neutral-900 hover:bg-neutral-800 dark:text-neutral-950 dark:bg-white dark:hover:bg-neutral-100 border border-neutral-900 dark:border-white px-6 py-2.5 rounded-lg transition-all cursor-pointer shadow-sm"
          >
            View Projects
          </a>
          
          <a
            href={resume}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto text-center font-sans text-xs font-bold text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white bg-transparent border border-neutral-200 dark:border-neutral-850 px-6 py-2.5 rounded-lg transition-all hover:bg-neutral-50 dark:hover:bg-neutral-900 cursor-pointer"
          >
            Download Resume
          </a>

          <a
            href="#contact"
            className="w-full sm:w-auto text-center font-sans text-xs font-bold text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white bg-transparent border border-neutral-200 dark:border-neutral-850 px-6 py-2.5 rounded-lg transition-all hover:bg-neutral-50 dark:hover:bg-neutral-900 cursor-pointer"
          >
            Let's Connect
          </a>
        </div>

      </div>

    </section>
  );
}