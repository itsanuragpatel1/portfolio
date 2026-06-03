import React from 'react';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Achievements from '../components/Achievements';
import Education from '../components/Education';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <Skills />
      <Projects />
      <Experience />
      <Achievements />
      <Education />
      <Contact />
    </>
  );
}