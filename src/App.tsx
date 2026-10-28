import { useState } from 'react';
import Header from './components/Header';
import FloatingCTA from './components/FloatingCTA';
import Hero from './sections/Hero';
import Story from './sections/Story';
import Services from './sections/Services';
import Operation from './sections/Operation';
import Process from './sections/Process';
import Imports from './sections/Imports';
import Tools, { type QuotePrefill } from './sections/Tools';
import Coverage from './sections/Coverage';
import About from './sections/About';
import Contact from './sections/Contact';
import Final from './sections/Final';

const scrollToId = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

export default function App() {
  // Lo que el visitante escribe en el buscador del hero pasa al cotizador
  const [need, setNeed] = useState({ text: '', nonce: 0 });
  // Sin WhatsApp configurado, el cotizador continúa en el formulario de contacto
  const [prefill, setPrefill] = useState<QuotePrefill | null>(null);

  const onSearch = (text: string) => {
    setNeed((n) => ({ text, nonce: n.nonce + 1 }));
    scrollToId('cotizar');
  };

  const onContinue = (p: Omit<QuotePrefill, 'nonce'>) => {
    setPrefill((prev) => ({ ...p, nonce: (prev?.nonce ?? 0) + 1 }));
    scrollToId('contacto');
  };

  return (
    <>
      <Header />
      <main>
        <Hero onTrack={onSearch} />
        <Story />
        <Services />
        <Operation />
        <Process />
        <Imports />
        <Tools need={need.text} nonce={need.nonce} onContinue={onContinue} />
        <Coverage />
        <About />
        <Contact prefill={prefill} />
        <Final />
      </main>
      <FloatingCTA />
    </>
  );
}
