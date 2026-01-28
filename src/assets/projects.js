import justPrompt from './justPrompt.jpg';
import krishiMitra from './krishiMitra.jpg';
import carRental from './carRental.jpg';



export const projects = [
  {
    title: "Just Prompt",
    category: "Generative AI / SaaS",
    description: "A production-ready AI image suite featuring Face Fix, AI Upscaling, and project history. Leveraging Gemini 2.5 Flash for multimodal processing.",
    tech: ["MERN Stack", "Gemini API", "OAuth 2.0", "Cloudinary"],
    github: "https://github.com/itsanuragpatel1/just-prompt/",
    live: "https://justprompt-sable.vercel.app/",
    image: justPrompt
  } ,
  {
    title: "Car Rental",
    category: "Full-Stack Management",
    description: "Enterprise-grade rental system with real-time availability management, secure booking workflows, and role-based dashboards.",
    tech: ["MERN", "JWT", "RESTful API", "MongoDB Atlas"],
    github: "https://github.com/itsanuragpatel1/car-rental/",
    live: "https://car-rental-client-beta.vercel.app/",
    image: carRental
  },
  {
    title: "Krishi Mitra",
    category: "Agri-Tech / Multimodal",
    description: "Multilingual farming assistant with voice interaction. Provides context-aware insights using SoilGrids and Open Weather data.",
    tech: ["React", "Node.js", "Gemini LLM", "Speech-to-Text"],
    github: "https://github.com/itsanuragpatel1/krishi-mitra/",
    live: "https://krishi-mitra-coral.vercel.app/",
    image: krishiMitra
  },

];