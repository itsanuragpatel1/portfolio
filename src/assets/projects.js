import justPrompt from './justPrompt.jpg';
import krishiMitra from './krishiMitra.jpg';
import carRental from './carRental.jpg';
import automatedResultFetching from './automatedResultFetching.png';

export const projects = [
  {
    id: "just-prompt",
    title: "Just Prompt",
    category: "Generative AI / SaaS",
    description: "A production-ready AI image suite featuring Face Fix, AI Upscaling, and project history. Leveraging Gemini 2.5 Flash for multimodal processing.",
    longDescription: "Just Prompt is a comprehensive AI-powered image editing and manipulation SaaS. It enables designers, developers, and creators to seamlessly upscale images, perform facial restoration, and manage creation history in a single, high-contrast, professional workspace.",
    overview: {
      problemSolved: "High-quality image upscaling and facial detail restoration typically require complex localized models or expensive desktop software. Creative professionals need a fast, accessible cloud solution to optimize and restore generated images on the fly.",
      targetAudience: "Digital artists, UI/UX designers, and content creators looking to enhance AI-generated art or low-resolution photography directly inside a clean web portal.",
      whyBuild: "To study the integration of high-throughput multimodal LLMs with cloud-based image processing pipelines, proving that AI model scaling can be executed with zero frontend latency."
    },
    features: [
      "Face Fix: Restores clarity and detailed facial expressions to blurred portrait images.",
      "AI Upscaling: Intelligently increases resolution up to 4x while preserving edge details.",
      "Workspace History: Automatically stores past creations, prompts, and processed image coordinates.",
      "Seamless Cloud Storage: Integrates direct media storage with instant delivery optimization."
    ],
    tech: ["MERN Stack", "Gemini API", "OAuth 2.0", "Cloudinary", "Vite"],
    categorizedTech: [
      {
        category: "Frontend",
        items: ["React", "Vite", "Tailwind CSS", "Lucide Icons"]
      },
      {
        category: "Backend",
        items: ["Node.js", "Express.js", "RESTful API"]
      },
      {
        category: "Database & Storage",
        items: ["MongoDB Atlas", "Cloudinary Media API"]
      },
      {
        category: "AI & Auth",
        items: ["Gemini API", "OAuth 2.0 Session Handlers"]
      }
    ],
    github: "https://github.com/itsanuragpatel1/just-prompt/",
    live: "https://justprompt-sable.vercel.app/",
    video: "https://www.youtube.com/embed/MmOtgkTXWgo",
    image: justPrompt,
    gallery: []
  },
  {
    id: "car-rental",
    title: "Car Rental",
    category: "Full-Stack Management",
    description: "Enterprise-grade rental system with real-time availability management, secure booking workflows, and role-based dashboards.",
    longDescription: "A full-scale vehicle reservation portal built to optimize booking schedules, coordinate fleet allocations, and render secure dashboard interfaces for both clients and administrators.",
    overview: {
      problemSolved: "Traditional rental services struggle with real-time fleet synchronization, leading to double-bookings, booking collisions, and manual record inconsistencies.",
      targetAudience: "Automotive rental businesses looking to digitize reservations, and users searching for a clean vehicle booking flow.",
      whyBuild: "Designed to implement a high-concurrency reservation schema, validating database aggregation strategies and user role permissions in full-stack web applications."
    },
    features: [
      "Real-Time Booking Engines: Prevents double-booking collisions via atomic reserve validations.",
      "Admin Panel Dashboard: Complete fleet control to add, edit, or set vehicle availability parameters.",
      "Role-Based Security: Secured navigation routes and API access using JWT authorization.",
      "Billing Summaries: Displays receipt details and booking timelines for active rentals."
    ],
    tech: ["MERN Stack", "JWT", "RESTful API", "MongoDB Atlas", "Tailwind CSS"],
    categorizedTech: [
      {
        category: "Frontend",
        items: ["React", "HTML5", "CSS3", "Tailwind CSS"]
      },
      {
        category: "Backend",
        items: ["Node.js", "Express.js", "REST API Handlers"]
      },
      {
        category: "Database & Auth",
        items: ["MongoDB (Mongoose)", "JSON Web Tokens (JWT)"]
      }
    ],
    github: "https://github.com/itsanuragpatel1/car-rental/",
    live: "https://car-rental-client-beta.vercel.app/",
    video: "https://www.youtube.com/embed/Q7fxlH8envA",
    image: carRental,
    gallery: []
  },
  {
    id: "krishi-mitra",
    title: "Krishi Mitra",
    category: "Agri-Tech / Multimodal",
    description: "Multilingual farming assistant with voice interaction. Provides context-aware insights using SoilGrids and Open Weather data.",
    longDescription: "Krishi Mitra (Farmer's Friend) is a voice-enabled agricultural assistant designed for rural accessibility. It coordinates real-time weather stats, crop advice, and soil analytics in multiple regional languages.",
    overview: {
      problemSolved: "Rural farmers often lack instant access to complex scientific soil indices and localized micro-weather updates, causing crop selection failures and reduced harvest yields.",
      targetAudience: "Agricultural communities, small-scale farmers, and agronomy researchers seeking accessible, voice-enabled intelligence.",
      whyBuild: "To explore speech-to-text models combined with geographic and environmental API coordination to solve real-world accessibility issues in rural tech."
    },
    features: [
      "Voice Commands: Processes natural speech queries in regional languages.",
      "Environmental Analytics: Pulls localized weather forecasts and geological data points.",
      "SoilGrids Indexing: Queries regional soil quality properties directly from international databases.",
      "AI Agronomy Insights: Suggests crop rotations and watering schedules tailored to local parameters."
    ],
    tech: ["React", "Node.js", "Gemini LLM", "Speech-to-Text", "SoilGrids API"],
    categorizedTech: [
      {
        category: "Frontend",
        items: ["React", "Web Speech API (Speech-to-Text)", "Tailwind CSS"]
      },
      {
        category: "Backend",
        items: ["Node.js", "Express.js"]
      },
      {
        category: "APIs & LLM",
        items: ["Gemini LLM", "SoilGrids API", "OpenWeatherMap API"]
      }
    ],
    github: "https://github.com/itsanuragpatel1/krishi-mitra/",
    live: "https://krishi-mitra-coral.vercel.app/",
    video: "",
    image: krishiMitra,
    gallery: []
  },
  {
    id: "automated-fetching",
    title: "Automated Result Scraper",
    category: "Automation / Computer Vision",
    description: "A high-throughput browser automation script in Python that extracts and structures academic grades from university portals, solving image-based CAPTCHAs inline using OpenCV and Tesseract OCR.",
    longDescription: "An automated web-scraping pipeline designed to query and capture student results in bulk from legacy institutional portals. The system solves dynamically generated visual CAPTCHAs on the fly, handles stale page elements through robust session reinitialization, and exports structured results to analytical formats with zero human intervention.",
    overview: {
      problemSolved: "Legacy university result portals require manually entering individual student enrollment numbers and solving visual CAPTCHA verification codes, which prevents bulk analysis of student academic records.",
      targetAudience: "Academic coordinators, registrar offices, and student research bodies wanting to analyze macro performance indices or compile bulk grade rosters.",
      whyBuild: "To construct a resilient web scraper capable of automating bypass mechanisms for dynamic authentication barriers, proving that legacy form-handling and simple CAPTCHA verification can be completely automated with lightweight machine learning libraries."
    },
    features: [
      "Intelligent Selenium Automation: Scripted complex form submission pathways, handling dynamic content selections and browser drivers.",
      "Computer Vision CAPTCHA Solver: Preprocessed visual verification images with OpenCV and resolved text challenges using Tesseract OCR.",
      "Resilient 10x Retry Mechanism: Built a robust error-recovery loop that re-submits forms on CAPTCHA solver failures, ensuring high accuracy.",
      "Dynamic Grade Extraction: Parsed student names, enrollment IDs, SGPA, CGPA, and status indicators from runtime-generated HTML tables.",
      "Staged Session Handlers: Implemented session reinitialization and dynamic driver reloading to mitigate stale element exceptions and session timeout failures.",
      "Structured Data Storage: Organized parsed grade records into unified CSV outputs utilizing Python's low-latency streaming file systems."
    ],
    tech: ["Python", "Selenium", "Tesseract OCR", "OpenCV", "CSV Module"],
    categorizedTech: [
      {
        category: "Automation Frameworks",
        items: ["Python", "Selenium WebDriver"]
      },
      {
        category: "Computer Vision & OCR",
        items: ["Tesseract OCR (pytesseract)", "OpenCV"]
      },
      {
        category: "Data Processing & I/O",
        items: ["CSV Stream", "Requests", "Session Manager"]
      }
    ],
    github: "https://github.com/itsanuragpatel1/Automated-Result-Fetching",
    live: "https://github.com/itsanuragpatel1/Automated-Result-Fetching",
    video: "https://www.youtube.com/embed/kwZo2SwT-z8",
    image: automatedResultFetching,
    gallery: []
  }
];