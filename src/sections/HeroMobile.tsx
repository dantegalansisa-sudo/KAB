import { useState } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import RevealText from '../components/RevealText';
import Icon from '../components/Icon';
import { LINES } from '../data';
import { useLang } from '../i18n';
import { EASINGS } from '../utils/easings';

/**
 * Portada móvil tipo app: saludo, buscador, tarjeta "hero" con el contenedor
 * (se arrastra en 360°) y accesos rápidos por línea que abren la hoja de detalle.
 */
export default function HeroMobile({ onSearch, onPick }: { onSearch: (need: string) => void; onPick: (i: number) => void }) {
  const { t } = useLang();
  const h = t.hero;
  const a = t.app;
  const [q, setQ] = useState('');
  const { scrollY } = useScroll();

  // Al hacer scroll: el texto se desvanece y la tarjeta se recoge como una hoja
  const headY = useTransform(scrollY, [0, 300], [0, -40]);
  const headOp = useTransform(scrollY, [0, 260], [1, 0]);
  const cardScale = useSpring(useTransform(scrollY, [80, 520], [1, 0.9]), { stiffness: 140, damping: 24 });
  const cardRadius = useTransform(scrollY, [80, 520], [30, 44]);
  const boxRot = useSpring(useTransform(scrollY, [0, 520], [0, 14]), { stiffness: 120, damping: 20 });
  const boxY = useSpring(useTransform(scrollY, [0, 520], [0, 40]), { stiffness: 120, damping: 20 });

  const dragX = useMotionValue(0);
  const rotateY = useTransform(dragX, [-140, 140], [-30, 30]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(q.trim());
  };

  return (
    <section className="mhero" id="top">
      <motion.div className="mhero__head" style={{ y: headY, opacity: headOp }}>
        <motion.span className="mhero__hello" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <span className="live-dot" /> {a.hello} · San Juan, PR
        </motion.span>
        <RevealText tag="h1" className="mhero__title" accent={h.accent} breaks={[1]} delay={0.2} immediate>
          {h.title}
        </RevealText>
      </motion.div>

      <motion.form
        className="mhero__search"
        onSubmit={submit}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <Icon name="search" size={19} />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={h.placeholder} aria-label={h.trackLabel} />
        <button type="submit" aria-label={h.trackBtn}><Icon name="arrow" size={19} stroke={2.2} /></button>
      </motion.form>

      <motion.div
        className="mhero__card"
        style={{ scale: cardScale, borderRadius: cardRadius }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.9, ease: EASINGS.premium }}
      >
        <div className="mhero__glow" aria-hidden="true" />
        <p className="mhero__sub">
          {h.sub[0]}<strong>{h.sub[1]}</strong>{h.sub[2]}<em>{h.sub[3]}</em>
        </p>

        <motion.div className="mhero__box" style={{ rotate: boxRot, y: boxY }}>
          <motion.div
            drag="x"
            dragSnapToOrigin
            dragElastic={0.35}
            dragTransition={{ bounceStiffness: 180, bounceDamping: 14 }}
            style={{ x: dragX, rotateY }}
            className="mhero__drag"
            initial={{ y: -120, rotate: -14, opacity: 0 }}
            animate={{ y: 0, rotate: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 1.3, ease: EASINGS.bounce }}
          >
            <div className="float">
              <img src="/img/container-kab.webp" alt={h.containerAlt} draggable={false} />
            </div>
          </motion.div>
          <span className="mhero__shadow" aria-hidden="true" />
        </motion.div>

        <span className="mhero__swipe" aria-hidden="true">
          <svg viewBox="0 0 24 10" width="18"><path d="M2 3c3 5 17 5 20 0M18 1l4 2-3 3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
          360° · {h.swipe}
        </span>

        <div className="mhero__stats">
          {a.stats.map((s, i) => (
            <motion.div
              key={i}
              className="mhero__stat"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + i * 0.1 }}
            >
              <strong>{s.v}</strong>
              <span>{s.l}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="mhero__cats">
        <div className="mhero__cats-head">
          <span>{a.categories}</span>
          <a href="#soluciones">{a.seeAll} <Icon name="arrow" size={14} stroke={2.2} /></a>
        </div>
        <div className="mhero__chips">
          {LINES.map((l, i) => (
            <motion.button
              key={l.id}
              type="button"
              className={`mhero__chip ${l.tone}`}
              onClick={() => onPick(i)}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 + i * 0.06 }}
              whileTap={{ scale: 0.94 }}
            >
              <span className="mhero__chip-icon"><Icon name={l.icon} size={20} /></span>
              <span>{a.short[i]}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
