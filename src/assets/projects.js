import justPrompt from './justPrompt.jpg';
import krishiMitra from './krishiMitra.jpg';
import carRental from './carRental.jpg';
import automatedResultFetching from './automatedResultFetching.png';

export const projects = [
  {
    id: "just-prompt",
    title: "Just Prompt",
    category: "Generative AI / SaaS",
    description:
      "An AI-powered image editing and generation platform that transforms ideas into visuals using simple text prompts, presets, face restoration, and image upscaling.",
    longDescription:
      "Just Prompt is a full-stack AI image editing and generation platform built to make advanced image manipulation accessible through a simple interface. Users can upload images, generate new visuals from prompts, apply one-click preset transformations, restore facial details, upscale image quality, and manage all creations through a project-based workflow with version history.",
    overview: {
      problemSolved:
        "Most AI image tools focus on a single task and require users to switch between multiple platforms for generation, enhancement, restoration, and organization. Just Prompt brings these capabilities together into a single workspace.",
      targetAudience: "Content creators, designers, developers, marketers, and anyone looking to generate, edit, enhance, and organize AI-powered visuals without a complex workflow.",
      whyBuild: "Built to explore modern AI integrations while solving a real workflow problem: combining image generation, editing, face restoration, upscaling, and project management into one seamless platform."
    },

    features: [
      "Text-to-Image Generation: Create visuals from simple natural language prompts.",
      "Image Editing with AI: Upload an image and transform it using custom prompts.",
      "Trending Presets: Apply popular AI transformations with a single click.",
      "Face Fix: Restore distorted facial features while preserving identity.",
      "AI Upscaling: Enhance image resolution for sharper, higher-quality outputs.",
      "Auto Mode: Generate AI-powered edits without writing prompts.",
      "Re-Run Variations: Create multiple outputs from the same prompt.",
      "Version History: Track, revisit, and restore previous generations.",
      "Project-Based Organization: Keep creations structured and easy to manage.",
      "Watermark-Free Downloads: Export generated images without branding."
    ],

    tech: [
      "MERN Stack",
      "Gemini 2.5 Flash",
      "Cloudinary",
      "Google OAuth",
      "JWT Authentication"
    ],

    categorizedTech: [
      {
        category: "Frontend",
        items: [
          "React",
          "Vite",
          "Tailwind CSS",
          "Context API",
          "React Hot Toast"
        ]
      },
      {
        category: "Backend",
        items: [
          "Node.js",
          "Express.js",
          "REST API"
        ]
      },
      {
        category: "Database & Storage",
        items: [
          "MongoDB",
          "Mongoose",
          "Cloudinary"
        ]
      },
      {
        category: "AI & Authentication",
      items: [
        "Gemini 2.5 Flash Image",
        "FlyMyAI",
        "Photocraft Face Fix",
        "Claid Upscaling",
        "Google OAuth 2.0",
        "Email OTP",
        "JWT Authentication"
      ]
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

category: "Full-Stack Web Application",

description:
"A full-stack car rental platform that enables users to browse and book vehicles while providing owners with tools to manage listings, bookings, and revenue.",

longDescription:
"Car Rental is a MERN-based web application designed to simplify vehicle rental management for both customers and car owners. Users can search available cars by location and date, while owners can manage listings, track bookings, and monitor business performance through a dedicated dashboard.",

    overview: {
      problemSolved:
        "Managing vehicle rentals manually can be time-consuming for both customers and owners. This platform streamlines the entire process by centralizing car discovery, booking management, and owner operations in a single application.",
      targetAudience:
        "Car rental businesses, vehicle owners, and users looking for a simple and convenient online vehicle booking experience.",
      whyBuild:
        "Built to strengthen full-stack development skills by implementing authentication, media management, role-based dashboards, and real-world booking workflows using the MERN stack."
    },

features: [
"Car Search & Discovery: Browse available vehicles based on location and rental dates.",
"Online Booking System: Request and manage vehicle bookings through a streamlined workflow.",
"Owner Dashboard: Add, update, and manage vehicle listings.",
"Booking Management: Track rental requests and booking activity in one place.",
"Revenue & Analytics Overview: View key business metrics including bookings and revenue.",
"JWT Authentication: Secure login and protected routes for users and owners.",
"Cloud-Based Image Management: Upload and manage vehicle images using Cloudinary."
],

tech: [
"MERN Stack",
"JWT Authentication",
"MongoDB",
"Cloudinary",
"REST API"
],

categorizedTech: [
{
category: "Frontend",
items: [
"React",
"Vite",
"React Router DOM",
"Axios",
"Tailwind CSS"
]
},
{
category: "Backend",
items: [
"Node.js",
"Express.js",
"REST API"
]
},
{
category: "Database & Storage",
items: [
"MongoDB",
"Mongoose",
"Cloudinary",
"Multer"
]
},
{
category: "Authentication",
items: [
"JWT",
"Protected Routes"
]
}
],

github: "https://github.com/itsanuragpatel1/car-rental/",
live: "https://car-rental-client-beta.vercel.app/",
video: "https://www.youtube.com/embed/Q7fxlH8envA",
image: carRental,
gallery: []
}
,
{
id: "krishi-mitra",

title: "Krishi Mitra",

category: "Agri-Tech / AI Assistant",

description:
"A multilingual AI-powered farming assistant that helps farmers access weather information, soil insights, and crop-related guidance through natural voice interactions.",

longDescription:
"Krishi Mitra is an AI-powered agricultural assistant designed to make farming information more accessible. Through voice-based interaction and multilingual support, farmers can ask questions about weather conditions, soil properties, and agricultural practices in a simple and natural way. The platform combines AI with real-time environmental data to provide practical guidance tailored to local conditions.",

overview: {
problemSolved:
"Many farmers face challenges accessing technical agricultural information due to language barriers and the complexity of available tools. Krishi Mitra bridges this gap by delivering farming insights through a simple voice-enabled interface.",
targetAudience:
"Farmers, agricultural communities, and rural users looking for accessible, localized, and easy-to-understand farming assistance.",
whyBuild:
"Built to explore how AI, voice technology, and environmental data can be combined to improve accessibility and support better decision-making in agriculture."
},

features: [
"Multilingual Voice Interaction: Communicate naturally using voice in regional languages.",
"Weather Insights: Access real-time weather information relevant to local farming conditions.",
"Soil Analysis: Retrieve soil-related data and insights using SoilGrids integration.",
"AI-Powered Assistance: Get agricultural guidance and answers to farming-related questions.",
"Speech-to-Text Processing: Converts spoken queries into actionable requests.",
"Farmer-Friendly Interface: Designed with simplicity and accessibility as primary goals."
],

tech: [
"React",
"Node.js",
"Gemini",
"Speech-to-Text",
"SoilGrids API",
"OpenWeatherMap API"
],

categorizedTech: [
{
category: "Frontend",
items: [
"React",
"Tailwind CSS",
"Web Speech API",
"Responsive UI"
]
},
{
category: "Backend",
items: [
"Node.js",
"Express.js",
"REST API"
]
},
{
category: "AI & Voice",
items: [
"Gemini",
"Speech-to-Text",
"Natural Language Processing"
]
},
{
category: "Data Sources & APIs",
items: [
"SoilGrids API",
"OpenWeatherMap API"
]
}
],

github: "https://github.com/itsanuragpatel1/krishi-mitra/",
live: "https://krishi-mitra-coral.vercel.app/",
video: "",
image: krishiMitra,
gallery: []
}
,
{
id: "automated-fetching",

title: "Automated Result Scraper",

category: "Automation / Computer Vision",

description:
"A one-click automation tool that fetches, processes, and exports results for multiple students, eliminating the need to manually check each enrollment number.",

longDescription:
"What started as a curiosity-driven automation project became a practical solution for a repetitive task. The system automates the entire process of retrieving student results from a university portal by navigating the website, solving CAPTCHA challenges using OCR, extracting academic records, and exporting structured data into CSV files. Designed to run without manual intervention, it significantly reduces the time required to collect results for large groups of students.",

overview: {
problemSolved:
"University result portals typically require users to manually enter enrollment numbers and solve CAPTCHA challenges for every individual result. This makes retrieving results for multiple students a slow and repetitive process.",
targetAudience:
"Students, academic coordinators, educators, and anyone who needs to retrieve and organize results for multiple students efficiently.",
whyBuild:
"Built out of curiosity to explore browser automation, OCR, and computer vision while solving the repetitive task of manually checking results for multiple students."
},

features: [
"Browser Automation: Automated the complete result-fetching workflow using Selenium WebDriver.",
"CAPTCHA Recognition: Solved image-based CAPTCHA challenges using Tesseract OCR and OpenCV preprocessing.",
"Smart Retry Logic: Implemented a retry mechanism that attempts CAPTCHA resolution up to 10 times for improved reliability.",
"Bulk Result Retrieval: Automatically processes multiple enrollment numbers without manual intervention.",
"Academic Data Extraction: Extracts student names, enrollment numbers, SGPA, CGPA, and result status from dynamically generated pages.",
"Session Management: Handles page reloads and session reinitialization to prevent stale element and timeout issues.",
"CSV Export: Organizes extracted records into structured CSV files for easy analysis and storage."
],

tech: [
"Python",
"Selenium",
"Tesseract OCR",
"OpenCV",
"Requests",
"CSV"
],

categorizedTech: [
{
category: "Automation Frameworks",
items: [
"Python",
"Selenium WebDriver"
]
},
{
category: "Computer Vision & OCR",
items: [
"Tesseract OCR (pytesseract)",
"OpenCV"
]
},
{
category: "Data Processing & Storage",
items: [
"CSV Module",
"Python Data Processing"
]
},
{
category: "Networking & Session Handling",
items: [
"Requests",
"Session Management",
"Retry Logic"
]
}
],

github: "https://github.com/itsanuragpatel1/Automated-Result-Fetching",
live: "https://github.com/itsanuragpatel1/Automated-Result-Fetching",
video: "https://www.youtube.com/embed/kwZo2SwT-z8",
image: automatedResultFetching,
gallery: []
}

];