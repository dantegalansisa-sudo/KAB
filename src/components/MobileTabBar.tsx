import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Icon from './Icon';
import type { IconName } from '../data';
import { useLang } from '../i18n';

const TABS: { id: string; icon: IconName }[] = [
  { id: 'top', icon: 'home' },
  { id: 'soluciones', icon: 'layers' },
  { id: 'proyectos', icon: 'spark' },
  { id: 'cotizar', icon: 'calc' },
  { id: 'more', icon: 'menu' },
];
const SPY = ['top', 'soluciones', 'proyectos', 'cotizar'];

/** Barra de navegación inferior (solo móvil); resalta la sección visible */
export default function MobileTabBar() {
  const { t } = useLang();
  const [active, setActive] = useState('top');

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.4;
      let current = 'top';
      for (const id of SPY) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  const go = (id: string) => {
    if (id === 'more') {
      window.dispatchEvent(new Event('kab:menu'));
      return;
    }
    if (id === 'top') window.scrollTo({ top: 0, behavior: 'smooth' });
    else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      className="tabbar"
      aria-label="Navegación"
      initial={{ y: 120 }}
      animate={{ y: 0 }}
      transition={{ delay: 1.4, type: 'spring', stiffness: 220, damping: 26 }}
    >
      {TABS.map((tab, i) => {
        const on = tab.id === active;
        return (
          <button key={tab.id} type="button" className={`tabbar__item ${on ? 'is-on' : ''}`} onClick={() => go(tab.id)} aria-current={on ? 'page' : undefined}>
            {on && <motion.span layoutId="tab-active" className="tabbar__pill" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
            <span className="tabbar__icon"><Icon name={tab.icon} size={21} stroke={on ? 2 : 1.7} /></span>
            <span className="tabbar__label">{t.app.tabs[i]}</span>
          </button>
        );
      })}
    </motion.nav>
  );
}
