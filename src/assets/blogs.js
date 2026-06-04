import eyantra1 from './eyantra/eyantra1.jpeg';
import eyantra2 from './eyantra/eyantra2.jpeg';
import eyantra3 from './eyantra/eyantra3.jpeg';
import eyantra4 from './eyantra/eyantra4.jpg';

export const blogs = [
 
  {
id: "e-yantra-robotics-2026",
title: "e-Yantra Robotics Competition 2025–26: Building CropDrop Bot",
date: "Feb 2026",
category: "Robotics & Hardware",
readTime: "4 min read",
summary:
"Documenting our six-month journey in IIT Bombay's e-Yantra Robotics Competition, where our team progressed from simulation-based tasks to building CropDrop Bot and successfully reached the final phase (Task 6).",

video: "https://www.youtube.com/embed/G2L4UPSC0mA",
images: [
eyantra1,
eyantra2,
eyantra3,
eyantra4
],
overview:
"From August 2025 to February 2026, our team participated in the e-Yantra Robotics Competition organized by IIT Bombay. Over six months, we progressed through multiple stages of the competition, moving from simulation-based tasks to hardware implementation and successfully reaching the final phase (Task 6). The journey provided valuable hands-on experience in robotics, control systems, simulation, hardware integration, and teamwork.",

sections: [
{
title: "The Team",
content:
"Team ID: eYRC#2010. Our team consisted of Arpit Mathur (Team Leader), Priyanshu Tiwari, Sakshi Mishra, and Anurag Patel. Throughout the competition, we worked together to solve challenging robotics tasks while continuously learning and improving our technical skills."
},
{
title: "Stage 1: Task 0–2 | Simulator Phase",
content:
"The competition began with a simulation-based phase where we focused on software setup and understanding key robotics concepts. During this stage, we learned and implemented PID control, explored Reinforcement Learning fundamentals, and developed line-following algorithms. We also worked on object detection and pick-and-place operations within the simulation environment. Successfully clearing this phase was a significant milestone and qualified us for the hardware stage of the competition."
},
{
title: "Transition to Hardware",
content:
"After successfully completing Stage 1, we received the official hardware kit from e-Yantra. This marked the transition from simulation to real-world implementation, where we had the opportunity to apply our learning on a physical robotic system."
},
{
title: "Stage 2: Task 3–6 | Hardware Phase",
content:
"In the hardware phase, we built CropDrop Bot, a line-following delivery robot capable of detecting colors, picking crates using an electromagnet, and accurately dropping them at designated zones. This phase involved integrating hardware components, refining robot behavior, and ensuring reliable task execution under real-world conditions."
},
{
title: "Final Milestones & Learnings",
content:
"Our team performed consistently throughout Stage 2 and was placed around the Top 10 teams by Task 5. Although we were unable to make it to the final 7 teams, reaching the final phase (Task 6) was a major achievement and an invaluable learning experience. The competition strengthened our understanding of robotics, problem-solving, teamwork, debugging, and the process of transforming ideas from simulation into working hardware."
}
]
}

];
