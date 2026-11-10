import { useEffect, useState } from 'react';
import { Background } from './components/Background';
import { CommandPalette, Nav, ScrollProgress, Toast } from './components/Chrome';
import { Hero } from './components/Hero';
import { About, Beyond, Contact, Experience, Footer, Marquee, Projects, Skills, Stats } from './components/Sections';
import { LangProvider } from './LangProvider';

export default function App() {
  const [palette, setPalette] = useState(false);

  useEffect(() => {
    console.log(
      '%c👋 Hi, fellow developer!%c\nThis site is a React + TypeScript SPA. Press Ctrl/⌘ + K to explore.\nbartoszkalinka@gmail.com',
      'font: 600 16px system-ui; color: #a78bfa',
      'font: 13px system-ui; color: #94a3b8',
    );
  }, []);

  return (
    <LangProvider>
      <Background />
      <ScrollProgress />
      <Nav onPalette={() => setPalette(true)} />
      <main>
        <Hero />
        <Marquee />
        <Stats />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Beyond />
        <Contact />
      </main>
      <Footer onPalette={() => setPalette(true)} />
      <CommandPalette open={palette} setOpen={setPalette} />
      <Toast />
    </LangProvider>
  );
}
