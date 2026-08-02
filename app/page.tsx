import Layout from './components/Layout';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';

export default function Home() {
  return (
    <Layout>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience /> {/* <-- 2. MOUNT IT IN BETWEEN PROJECTS AND CONTACT */}
      <Contact />
    </Layout>
  );
}
