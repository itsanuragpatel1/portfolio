import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Journey from './components/Journey';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-[#1a1a1a] selection:bg-blue-600 selection:text-white font-sans antialiased">
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <Projects />
        <Journey />
      </main>
      <Footer />
    </div>
  );
}

export default App;