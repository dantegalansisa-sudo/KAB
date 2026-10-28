import { useState } from 'react';
import Header from './components/Header';
import FloatingCTA from './components/FloatingCTA';
import MobileTabBar from './components/MobileTabBar';
import LineSheet from './components/LineSheet';
import ScrollSheet from './components/ScrollSheet';
import Hero from './sections/Hero';
import HeroMobile from './sections/HeroMobile';
import Story from './sections/Story';
import Services from './sections/Services';
import SolutionsMobile from './sections/SolutionsMobile';
import Operation from './sections/Operation';
import Process from './sections/Process';
import Imports from './sections/Imports';
import Tools, { type QuotePrefill } from './sections/Tools';
import Coverage from './sections/Coverage';
import About from './sections/About';
import Contact from './sections/Contact';
import Final from './sections/Final';
import { MOBILE, useMediaQuery } from './hooks/useMediaQuery';

const scrollToId = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

export default function App() {
  // En móvil la web se comporta como una app: portada, cuadrícula y hoja inferior propias
  const mobile = useMediaQuery(MOBILE);
  // Lo que el visitante escribe en el buscador del hero pasa al cotizador
  const [need, setNeed] = useState({ text: '', nonce: 0 });
  // Sin WhatsApp configurado, el cotizador continúa en el formulario de contacto
  const [prefill, setPrefill] = useState<QuotePrefill | null>(null);
  // Línea abierta en la hoja inferior (móvil)
  const [sheet, setSheet] = useState<number | null>(null);

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
        {mobile ? <HeroMobile onSearch={onSearch} onPick={setSheet} /> : <Hero onTrack={onSearch} />}
        <Story />
        {mobile ? (
          <ScrollSheet enabled><SolutionsMobile onPick={setSheet} /></ScrollSheet>
        ) : (
          <Services />
        )}
        <Operation />
        <ScrollSheet enabled={mobile}><Process /></ScrollSheet>
        <ScrollSheet enabled={mobile}><Imports /></ScrollSheet>
        <ScrollSheet enabled={mobile}><Tools need={need.text} nonce={need.nonce} onContinue={onContinue} /></ScrollSheet>
        <ScrollSheet enabled={mobile}><Coverage /></ScrollSheet>
        <ScrollSheet enabled={mobile}><About /></ScrollSheet>
        <ScrollSheet enabled={mobile}><Contact prefill={prefill} /></ScrollSheet>
        <Final />
      </main>
      <FloatingCTA />
      {mobile && <MobileTabBar />}
      {mobile && <LineSheet index={sheet} onClose={() => setSheet(null)} onChange={setSheet} />}
    </>
  );
}
