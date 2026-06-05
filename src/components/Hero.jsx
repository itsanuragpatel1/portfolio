import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Terminal, CornerDownLeft, Github, Linkedin, Mail } from 'lucide-react';
import resume from '../assets/resume.pdf';

// Add custom styles for terminal
const terminalStyles = `
  @keyframes smooth-blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
  
  .terminal-cursor {
    animation: smooth-blink 1s ease-in-out infinite;
  }
`;

// Helper component for colorful syntax highlighting of CLI outputs
function HighlightTerminalText({ text, line }) {
  if (!text) return null;

  // Render headers cleanly
  if (
    text.includes('Available commands') ||
    text.includes('Technical Skills') ||
    text.includes('Professional Experience') ||
    text.includes('Featured Projects') ||
    text.includes('Academic Qualifications') ||
    text.includes('Reach out to')
  ) {
    return (
      <span className="flex items-center gap-2 border-b border-neutral-800 pb-1 mb-1 mt-3 first:mt-0 w-full text-amber-400 font-bold select-none">
        <span className="text-[10px] bg-amber-950/40 text-amber-500 border border-amber-800/30 px-1 py-0.5 rounded font-mono">➜</span>
        <span>{text}</span>
      </span>
    );
  }

  // Handle error messages
  if (text.startsWith('bash: command not found:')) {
    return (
      <span className="text-rose-500 dark:text-rose-450 font-bold flex items-center gap-1.5">
        <span className="text-[10px] bg-rose-950/40 text-rose-500 border border-rose-800/30 px-1.5 py-0.5 rounded font-mono select-none">!</span>
        <span>{text}</span>
      </span>
    );
  }

  // Handle success messages
  if (text.startsWith('✓') || text.startsWith('Opening')) {
    return (
      <span className="text-emerald-400 dark:text-emerald-350 font-semibold flex items-center gap-1.5">
        <span className="text-[10px] bg-emerald-950/40 text-emerald-500 border border-emerald-800/30 px-1 py-0.5 rounded font-mono select-none">✓</span>
        <span>{text}</span>
      </span>
    );
  }

  // 1. Help Commands: "  whoami         - identify active profile name"
  if (text.startsWith("  ") && text.includes(" - ")) {
    const parts = text.split(" - ");
    const cmd = parts[0];
    const desc = parts.slice(1).join(" - ");
    return (
      <span className="block pl-2 font-mono text-xs md:text-sm">
        <span className="text-cyan-400 font-bold">{cmd}</span>
        <span className="text-neutral-600"> - </span>
        <span className="text-neutral-450 font-sans">{desc}</span>
      </span>
    );
  }

  // 2. Contact details with clickable links: "  • Email: Anuragpateloriginal@gmail.com"
  if (text.includes("•") && (text.includes("Email:") || text.includes("LinkedIn:") || text.includes("GitHub:") || text.includes("LeetCode:"))) {
    const match = text.match(/(^\s*•\s*)([^:]+:\s*)(.*)/);
    if (match) {
      const bullet = match[1];
      const label = match[2];
      const val = match[3].trim();
      let href = val;
      if (text.includes("Email:")) href = `mailto:${val}`;
      else if (!val.startsWith("http")) href = `https://${val}`;

      return (
        <span className="flex items-center flex-wrap gap-1.5 pl-2 font-mono">
          <span className="text-fuchsia-500 font-bold select-none">•</span>
          <span className="text-neutral-200 font-bold">{label.replace('•', '').trim()}</span>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 hover:underline cursor-pointer transition-colors font-bold"
          >
            {val}
          </a>
        </span>
      );
    }
  }

  // 3. Project bullet: "  • Just Prompt  [Generative AI / SaaS]"
  if (text.includes("•") && text.includes("[") && text.includes("]")) {
    const match = text.match(/(^\s*•\s*)([^\[]+)(\[[^\]]+\])(.*)/);
    if (match) {
      const bullet = match[1];
      const name = match[2];
      const tag = match[3];
      const rest = match[4];
      return (
        <span className="flex items-center flex-wrap gap-2 pl-2 font-mono">
          <span className="text-fuchsia-500 font-bold select-none">•</span>
          <span className="text-cyan-400 font-bold">{name.trim()}</span>
          <span className="text-[10px] bg-purple-950/40 text-purple-400 border border-purple-800/30 px-1.5 py-0.5 rounded font-mono select-none font-semibold">
            {tag.slice(1, -1)}
          </span>
          {rest && <span className="text-neutral-300">{rest}</span>}
        </span>
      );
    }
  }

  // 4. Highlight labels: Highlights:, Stack:, Batch:
  if (text.includes("Highlights:") || text.includes("Stack:") || text.includes("Batch:")) {
    const match = text.match(/(^\s*)(Highlights:|Stack:|Batch:)(.*)/);
    if (match) {
      const indent = match[1];
      const label = match[2];
      const content = match[3];
      return (
        <span className="font-mono">
          <span className="whitespace-pre">{indent}</span>
          <span className="text-amber-500 font-bold">{label}</span>
          <span className="text-neutral-300">{content}</span>
        </span>
      );
    }
  }

  // 5. Experience row: "  • Full Stack Developer @ RENESON (Feb 2026 — Present)"
  if (text.includes("•") && text.includes(" @ ") && text.includes(" (") && text.includes(")")) {
    const match = text.match(/(^\s*•\s*)([^@]+)(@\s+\w+)(.*)/);
    if (match) {
      const bullet = match[1];
      const role = match[2].trim();
      const company = match[3].trim();
      const dates = match[4].trim();
      return (
        <span className="pl-2 font-mono">
          <span className="text-fuchsia-500 font-bold select-none">• </span>
          <span className="text-neutral-200 font-bold">{role} </span>
          <span className="text-amber-400 font-bold">{company} </span>
          <span className="text-neutral-500 font-mono text-xs">{dates}</span>
        </span>
      );
    }
  }

  // 6. Bullet lists general: "  • Languages: C++, JavaScript" or "  • Frontend: React..."
  if (text.includes("•")) {
    const match = text.match(/(^\s*•\s*)([^:]+:\s*)?(.*)/);
    if (match) {
      const bullet = match[1];
      const category = match[2];
      const content = match[3];
      return (
        <span className="pl-2 font-mono">
          <span className="text-fuchsia-500 font-bold select-none">• </span>
          {category && <span className="text-neutral-200 font-bold">{category}</span>}
          <span className="text-neutral-300">{content}</span>
        </span>
      );
    }
  }

  // 7. General indents like company info under bullets
  if (text.startsWith("    ")) {
    return <span className="text-neutral-400 whitespace-pre font-mono">{text}</span>;
  }

  return <span>{text}</span>;
}


export default function Hero() {
  const [terminalLines, setTerminalLines] = useState([]);
  const [showButtons, setShowButtons] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const terminalBodyRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-focus input when buttons show (after initial sequence)
  useEffect(() => {
    if (showButtons && inputRef.current && !isTyping) {
      setTimeout(() => {
        // Only focus if the user hasn't scrolled down significantly (i.e. is still looking at the terminal/Hero)
        if (window.scrollY < 150) {
          inputRef.current?.focus({ preventScroll: true });
        }
      }, 100);
    }
  }, [showButtons, isTyping]);

  // Scroll terminal to bottom when lines update
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [terminalLines]);

  // Click handler to focus input when terminal body is clicked
  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus({ preventScroll: true });
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
        setTerminalLines(prev => [...prev, { type: 'input', text: '', isTyping: true }]);

        const typeChar = () => {
          if (!active) return;
          if (charIdx < cmd.length) {
            typed += cmd[charIdx];
            setTerminalLines(prev => {
              const next = [...prev];
              next[next.length - 1] = { type: 'input', text: typed, isTyping: charIdx < cmd.length - 1 };
              return next;
            });
            charIdx++;
            setTimeout(typeChar, 40); // clean human typing speed
          } else {
            setTerminalLines(prev => {
              const next = [...prev];
              next[next.length - 1].isTyping = false;
              return next;
            });
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
        typeCommand("whoami", async () => {
          if (!active) return;
          await delay(100);

          // Type first output line
          const output1 = 'Anurag Patel';
          setTerminalLines(prev => [...prev, { type: 'output', text: '', isTyping: true }]);
          let typed = '';
          for (let i = 0; i < output1.length; i++) {
            typed += output1[i];
            setTerminalLines(prev => {
              const next = [...prev];
              next[next.length - 1] = { type: 'output', text: typed, isTyping: i < output1.length - 1 };
              return next;
            });
            await delay(15);
          }
          setTerminalLines(prev => {
            const next = [...prev];
            next[next.length - 1].isTyping = false;
            return next;
          });

          await delay(100);

          // Type second output line
          const output2 = 'Full-Stack Developer & CS Engineering Student';
          setTerminalLines(prev => [...prev, { type: 'output-sub', text: '', isTyping: true }]);
          typed = '';
          for (let i = 0; i < output2.length; i++) {
            typed += output2[i];
            setTerminalLines(prev => {
              const next = [...prev];
              next[next.length - 1] = { type: 'output-sub', text: typed, isTyping: i < output2.length - 1 };
              return next;
            });
            await delay(15);
          }
          setTerminalLines(prev => {
            const next = [...prev];
            next[next.length - 1].isTyping = false;
            return next;
          });
          resolve();
        });
      });

      await delay(600);

      // Line 2: about
      await new Promise(resolve => {
        typeCommand("about", async () => {
          if (!active) return;
          await delay(100);
          const lines = [
            'I build scalable web applications with the MERN stack',
            'and integrate AI-powered features to create smarter,',
            'real-world products.',
            '',
            'I enjoy turning ideas into practical software that',
            'people actually use.'
          ];
          for (let i = 0; i < lines.length; i++) {
            if (!active) return;
            const line = lines[i];
            setTerminalLines(prev => [...prev, { type: 'output', text: '', isTyping: true }]);
            let typed = '';
            for (let charIdx = 0; charIdx < line.length; charIdx++) {
              typed += line[charIdx];
              setTerminalLines(prev => {
                const next = [...prev];
                next[next.length - 1] = { type: 'output', text: typed, isTyping: charIdx < line.length - 1 };
                return next;
              });
              await delay(15);
            }
            setTerminalLines(prev => {
              const next = [...prev];
              next[next.length - 1].isTyping = false;
              return next;
            });
            await delay(40);
          }
          resolve();
        });
      });

      await delay(500);
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

  const handleQuickTagClick = (cmd) => {
    if (isTyping) return;
    setIsTyping(true);
    setInputVal('');

    let typed = "";
    let charIdx = 0;

    const typeChar = () => {
      if (charIdx < cmd.length) {
        typed += cmd[charIdx];
        setInputVal(typed);
        charIdx++;
        setTimeout(typeChar, 40); // fast character typing speed
      } else {
        setTimeout(() => {
          executeCommand(cmd);
        }, 150);
      }
    };
    typeChar();
  };

  const executeCommand = async (cmd) => {
    setIsTyping(true);
    setInputVal('');

    const trimmed = cmd.trim().toLowerCase();

    // Add the input prompt log line immediately
    setTerminalLines(prev => [...prev, { type: 'input', text: cmd }]);

    let rawOutputs = [];

    if (trimmed === 'help') {
      rawOutputs = [
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
      rawOutputs = [
        "Anurag Patel",
        "Full-Stack Developer & CS Engineering Student"
      ];
    } else if (trimmed === 'about') {
      rawOutputs = [
        "I build scalable web applications with the MERN stack",
        "and integrate AI-powered features to create smarter,",
        "real-world products.",
        "",
        "I enjoy turning ideas into practical software that",
        "people actually use."
      ];
    } else if (trimmed === 'skills') {
      rawOutputs = [
        "Technical Skills & Stack:",
        "  • Languages: C++, JavaScript",
        "  • Frontend: React, HTML, CSS, Tailwind",
        "  • Backend: Node.js, Express.js",
        "  • Database: MongoDB, MySQL",
        "  • Tools: Git, GitHub"
      ];
    } else if (trimmed === 'experience') {
      rawOutputs = [
        "Professional Experience:",
        "  • Full Stack Developer @ RENESON (Feb 2026 — Present)",
        "    Highlights: Modernizing website redevelopment, platform building, secure admin dashboard.",
        "  • DevOps Engineer @ AIElysium (Mar 2026 — Apr 2026)",
        "    Highlights: AWS CI/CD pipeline, S3/CloudFront CDN deployment, EC2 PM2 reliability."
      ];
    } else if (trimmed === 'projects') {
      rawOutputs = [
        "Featured Projects:",
        "  • Just Prompt  [Generative AI / SaaS]",
        "    Stack: MERN Stack, Gemini API, OAuth 2.0, Cloudinary, Vite",
        "  • Car Rental   [Full-Stack Management]",
        "    Stack: MERN Stack, JWT, RESTful API, MongoDB, Tailwind",
        "  • Krishi Mitra [Agri-Tech / Multimodal]",
        "    Stack: React, Node.js, Gemini LLM, Speech-to-Text, SoilGrids API",
        "  • Result Scraper [Automation / Computer Vision]",
        "    Stack: Python, Selenium, Tesseract OCR, OpenCV, CSV Stream"
      ];
    } else if (trimmed === 'education') {
      rawOutputs = [
        "Academic Qualifications:",
        "  • B.Tech in Computer Science & Engineering",
        "    Government Engineering College, Rewa (REC Rewa)",
        "    Batch: 2023 - 2027",
        "  • DSA Solving Index: 200+ solved problems on LeetCode & GFG."
      ];
    } else if (trimmed === 'resume') {
      rawOutputs = [
        "Opening Anurag_Patel_Resume.pdf in new tab...",
        "Press the '[ Download Resume ]' button below to download the latest PDF."
      ];
      setTimeout(() => {
        window.open(resume, '_blank');
      }, 750);
    } else if (trimmed === 'contact') {
      rawOutputs = [
        "Reach out to Anurag Patel:",
        "  • Email: Anuragpateloriginal@gmail.com",
        "  • LinkedIn: linkedin.com/in/itsanuragpatel",
        "  • GitHub: github.com/itsanuragpatel1",
        "  • LeetCode: leetcode.com/u/itsanuragpatel"
      ];
    } else if (trimmed === 'clear') {
      setTerminalLines([]);
      setIsTyping(false);
      return;
    } else {
      rawOutputs = [
        `bash: command not found: ${trimmed}`,
        "Type 'help' to see list of available commands."
      ];
    }

    // Print outputs line-by-line with smooth character-by-character typing
    for (let i = 0; i < rawOutputs.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 40)); // stagger between lines
      const out = rawOutputs[i];
      const isSuccess = out.startsWith('✓') || out.startsWith('Opening');
      const isSub = out.startsWith('  ') || out.startsWith('•');
      let type = 'output';
      if (isSuccess) type = 'output-success';
      else if (isSub) type = 'output-sub';

      // Add empty line object for current typing
      setTerminalLines(prev => [...prev, { type, text: '', isTyping: true }]);

      // Type each character smoothly
      let typed = '';
      for (let charIdx = 0; charIdx < out.length; charIdx++) {
        typed += out[charIdx];
        setTerminalLines(prev => {
          const next = [...prev];
          next[next.length - 1] = { type, text: typed, isTyping: charIdx < out.length - 1 };
          return next;
        });
        await new Promise(resolve => setTimeout(resolve, 15)); // smooth character speed
      }

      // Mark as finished typing
      setTerminalLines(prev => {
        const next = [...prev];
        next[next.length - 1] = { type, text: out, isTyping: false };
        return next;
      });
    }

    setIsTyping(false);

    // Auto-focus input after command completes
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus({ preventScroll: true });
      }
    }, 100);
  };

  return (
    <>
      <style>{terminalStyles}</style>
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-28 pb-16 overflow-hidden bg-transparent transition-colors duration-300">

        <div className="max-w-4xl mx-auto w-full relative z-10 flex flex-col items-center">
          {/* Ambient Radial Gradient Glow */}
          <div className="absolute -inset-4 sm:-inset-10 bg-radial from-cyan-500/10 via-purple-500/5 to-transparent blur-3xl opacity-75 pointer-events-none select-none dark:from-cyan-500/15 dark:via-purple-500/10" />

          {/* Terminal Chrome Frame Container */}
          <div className="w-full bg-[#09090b]/95 text-[#e4e4e7] rounded-xl border border-neutral-800/80 shadow-lg hover:border-neutral-700/80 overflow-hidden transition-all duration-300 relative z-10">

            {/* Terminal Title Bar */}
            <div className="bg-[#101013] border-b border-neutral-900 px-5 py-3 flex items-center justify-between select-none">
              <div className="flex gap-2 group/dots">
                <span className="w-3 h-3 rounded-full bg-rose-500 border border-rose-600/30 flex items-center justify-center text-[7px] text-rose-950 font-bold transition-all duration-150 cursor-pointer select-none">
                  <span className="opacity-0 group-hover/dots:opacity-100 transition-opacity">&times;</span>
                </span>
                <span className="w-3 h-3 rounded-full bg-amber-500 border border-amber-600/30 flex items-center justify-center text-[7px] text-amber-950 font-bold transition-all duration-150 cursor-pointer select-none">
                  <span className="opacity-0 group-hover/dots:opacity-100 transition-opacity">&minus;</span>
                </span>
                <span className="w-3 h-3 rounded-full bg-emerald-500 border border-emerald-600/30 flex items-center justify-center text-[5px] text-emerald-950 font-bold transition-all duration-150 cursor-pointer select-none">
                  <span className="opacity-0 group-hover/dots:opacity-100 transition-opacity">&#43;</span>
                </span>
              </div>

              <div className="text-[10px] sm:text-xs font-mono text-neutral-400 flex items-center gap-2">
                <Terminal className="w-3 h-3 text-cyan-400 animate-pulse" />
                <span>anurag@portfolio</span>
                <span className="text-neutral-600">:</span>
                <span className="text-sky-400 font-bold">~</span>
              </div>

              <div className="w-[52px]" /> {/* Spacer to center path title */}
            </div>

            {/* Interactive Shell Body */}
            <div
              ref={terminalBodyRef}
              onClick={handleTerminalClick}
              className="p-6 md:p-8 h-[280px] sm:h-[320px] md:h-[380px] overflow-y-auto font-mono text-left text-xs md:text-sm leading-relaxed text-neutral-300 cursor-text select-text scroll-smooth"
            >

              {/* Sequential command output stream logs */}
              <div className="space-y-1.5">
                {terminalLines.map((line, index) => {
                  if (line.type === 'input') {
                    const isCurrentTypingLine = isTyping && index === terminalLines.length - 1;
                    return (
                      <div key={index} className="flex items-center gap-1.5 select-none mt-5 first:mt-0">
                        <span className="font-mono text-xs md:text-sm">
                          <span className="text-emerald-500 font-bold">anurag@portfolio</span>
                          <span className="text-neutral-500">:</span>
                          <span className="text-sky-400 font-bold">~</span>
                          <span className="text-neutral-400 font-bold">$</span>
                        </span>
                        <span className="break-all whitespace-pre-wrap text-cyan-400 dark:text-cyan-300 font-bold flex items-center">
                          {line.text}
                          {(isCurrentTypingLine || line.isTyping) && (
                            <span className="terminal-cursor w-1.5 h-3.5 bg-cyan-400 dark:bg-cyan-300 inline-block ml-1 align-middle" />
                          )}
                        </span>
                      </div>
                    );
                  }

                  const text = line.text;
                  let textColor = "text-neutral-300 dark:text-neutral-250 font-medium"; // default output

                  if (line.type === 'output-success' || text.startsWith('✓') || text.startsWith('Opening') || text.includes('[Generative AI') || text.includes('[Full-Stack') || text.includes('[Agri-Tech') || text.includes('[Automation')) {
                    textColor = "text-emerald-400 dark:text-emerald-350 font-semibold";
                  } else if (text.startsWith('bash: command not found:')) {
                    textColor = "text-rose-500 dark:text-rose-450 font-bold";
                  } else if (
                    text.includes('Available commands') ||
                    text.includes('Technical Skills') ||
                    text.includes('Professional Experience') ||
                    text.includes('Featured Projects') ||
                    text.includes('Academic Qualifications') ||
                    text.includes('Reach out to')
                  ) {
                    textColor = "text-amber-400 dark:text-amber-350 font-bold mt-3 first:mt-0";
                  } else if (line.type === 'output-sub' || text.startsWith('    ')) {
                    textColor = "text-neutral-400 dark:text-neutral-500 text-[11px] md:text-xs";
                  }

                  return (
                    <div key={index} className={`${textColor} break-all whitespace-pre-wrap pl-1`}>
                      <HighlightTerminalText text={text} line={line} />
                      {line.isTyping && (
                        <span className="terminal-cursor w-1.5 h-3.5 bg-cyan-400 dark:bg-cyan-300 inline-block ml-1 align-middle" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* User Input Prompt (active when sequence finishes) */}
              {showButtons && !isTyping && (
                <form onSubmit={handleCommandSubmit} className="flex items-center gap-1.5 mt-5 select-none">
                  <span className="font-mono text-xs md:text-sm">
                    <span className="text-emerald-500 font-bold">anurag@portfolio</span>
                    <span className="text-neutral-500">:</span>
                    <span className="text-sky-400 font-bold">~</span>
                    <span className="text-neutral-400 font-bold">$</span>
                  </span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="type 'help'..."
                    disabled={isTyping}
                    className="flex-1 bg-transparent border-none outline-none font-mono text-xs md:text-sm text-cyan-400 caret-cyan-400 pl-1 placeholder-neutral-800 font-bold"
                    autoComplete="off"
                  />
                  <button type="submit" aria-label="Submit command" className="text-neutral-600 hover:text-white transition-colors cursor-pointer pr-1">
                    <CornerDownLeft size={12} />
                  </button>
                </form>
              )}

            </div>

            {/* Quick CLI command pills */}
            <div className="bg-[#09090b] border-t border-neutral-900 px-5 py-3 flex items-center gap-2 flex-wrap text-left select-none min-h-[45px]">
              <span className="text-[8px] font-mono text-neutral-400 uppercase tracking-widest mr-2 shrink-0 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" /> CLI Quick tags:
              </span>
              {['help', 'whoami', 'about', 'skills', 'experience', 'projects', 'education', 'resume', 'contact', 'clear'].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => !isTyping && handleQuickTagClick(cmd)}
                  disabled={isTyping}
                  className={`px-2.5 py-1 rounded-md border text-[10px] font-mono transition-all ${isTyping
                      ? 'bg-neutral-900 border-neutral-850 text-neutral-600 cursor-not-allowed select-none'
                      : 'bg-[#141418] hover:bg-neutral-800 border-neutral-800 text-neutral-400 hover:text-white cursor-pointer hover:border-neutral-700'
                    }`}
                >
                  {cmd}
                </button>
              ))}
            </div>

          </div>

          {/* Clean, Vercel-Style Professional CTA Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3.5 items-center justify-center w-full mt-10 animate-fade-in select-none relative z-10 max-w-2xl">
            <a
              href="#work"
              className="w-full sm:w-auto text-center font-sans text-xs font-bold text-white bg-neutral-950 hover:bg-neutral-900 dark:text-neutral-950 dark:bg-white dark:hover:bg-neutral-100 border border-neutral-950 dark:border-white px-6 py-2.5 rounded-lg transition-all cursor-pointer shadow-sm hover:scale-[1.01] active:scale-[0.99]"
            >
              View Projects
            </a>

            <Link
              to="/resume"
              className="w-full sm:w-auto text-center font-sans text-xs font-bold text-neutral-800 dark:text-neutral-200 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 px-6 py-2.5 rounded-lg transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
            >
              Resume
            </Link>

            <a
              href="#contact"
              className="w-full sm:w-auto text-center font-sans text-xs font-bold text-neutral-800 dark:text-neutral-200 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 px-6 py-2.5 rounded-lg transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
            >
              Connect
            </a>

            <div className="flex gap-2.5 mt-1 sm:mt-0 select-none shrink-0">
              <a
                href="https://github.com/itsanuragpatel1"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all cursor-pointer flex items-center justify-center hover:scale-[1.03] active:scale-[0.97]"
                title="GitHub Profile"
                aria-label="GitHub Profile"
              >
                <Github size={15} />
              </a>
              <a
                href="https://linkedin.com/in/itsanuragpatel"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all cursor-pointer flex items-center justify-center hover:scale-[1.03] active:scale-[0.97]"
                title="LinkedIn Profile"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={15} />
              </a>
              <a
                href="https://leetcode.com/u/itsanuragpatel/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all cursor-pointer flex items-center justify-center hover:scale-[1.03] active:scale-[0.97]"
                title="LeetCode Profile"
                aria-label="LeetCode Profile"
              >
                <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" className="shrink-0">
                  <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
                </svg>
              </a>
              <a
                href="mailto:Anuragpateloriginal@gmail.com"
                className="p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all cursor-pointer flex items-center justify-center hover:scale-[1.03] active:scale-[0.97]"
                title="Send Email"
                aria-label="Send Email"
              >
                <Mail size={15} />
              </a>
            </div>
          </div>

        </div>

      </section>
    </>
  );
}