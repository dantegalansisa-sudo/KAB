import { useState } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import RevealText from '../components/RevealText';
import Icon from '../components/Icon';
import { EASINGS } from '../utils/easings';
import { useLang } from '../i18n';
import { DESKTOP, useMediaQuery } from '../hooks/useMediaQuery';

export default function Hero({ onTrack }: { onTrack: (need: string) => void }) {
  const { t } = useLang();
  const h = t.hero;
  const [code, setCode] = useState('');
  const { scrollY } = useScroll();

  // Coreografía del contenedor: al hacer scroll baja, gira y "aterriza" sobre la sección oscura
  const desk = useMediaQuery(DESKTOP);
  const rawY = useTransform(scrollY, [0, desk ? 640 : 520], [0, desk ? 170 : 95]);
  const rawRot = useTransform(scrollY, [0, desk ? 640 : 520], [0, desk ? 6 : 9]);
  const rawScale = useTransform(scrollY, [0, desk ? 640 : 520], [1, desk ? 0.86 : 0.9]);
  const y = useSpring(rawY, { stiffness: 120, damping: 22 });
  const rotate = useSpring(rawRot, { stiffness: 120, damping: 22 });
  const scale = useSpring(rawScale, { stiffness: 120, damping: 22 });
  const copyY = useTransform(scrollY, [0, 400], [0, -60]);
  const copyOpacity = useTransform(scrollY, [0, 380], [1, 0.25]);
  const shadowScale = useTransform(scrollY, [0, 520], [1, 0.75]);

  // Arrastre horizontal: el contenedor gira en 3D y regresa con resorte
  const dragX = useMotionValue(0);
  const rotateY = useTransform(dragX, [-160, 160], [-28, 28]);
  const rotateZ = useTransform(dragX, [-160, 160], [4, -4]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onTrack(code.trim());
  };

  return (
    <section className="hero" id="top">
      <div className="hero__glow" aria-hidden="true" />
      <div className="hero__dots" aria-hidden="true" />

      <motion.div className="hero__copy" style={{ y: copyY, opacity: copyOpacity }}>
        <motion.div
          className="eyebrow-pill"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          <span className="live-dot" /> {h.pill}
        </motion.div>

        <RevealText tag="h1" className="hero__title" accent={h.accent} breaks={h.breaks} deskBreaks={h.deskBreaks} delay={0.25} immediate>
          {h.title}
        </RevealText>

        <motion.p
          className="hero__sub"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.7 }}
        >
          {h.sub[0]}<strong>{h.sub[1]}</strong>{h.sub[2]}<em>{h.sub[3]}</em>
        </motion.p>

        <motion.form
          className="track-bar"
          onSubmit={submit}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
        >
          <Icon name="search" size={19} className="track-bar__icon" />
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={h.placeholder}
            aria-label={h.trackLabel}
          />
          <button type="submit" aria-label={h.trackBtn}><Icon name="arrow" size={20} stroke={2.2} /></button>
        </motion.form>
      </motion.div>

      <div className="hero__stage">
        {/* Órbita de ruta con avión viajando */}
        <svg className="hero__orbit" viewBox="0 0 400 300" aria-hidden="true">
          <motion.path
            id="orbit-path"
            d="M10 250 C 60 300, 120 150, 210 120 S 360 30, 392 60"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.6"
            strokeDasharray="5 6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 1.1, duration: 1.6, ease: EASINGS.smooth }}
          />
          <motion.circle cx="10" cy="250" r="6" className="orbit-node" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.1 }} />
          <motion.circle cx="392" cy="60" r="6" className="orbit-node" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2.5 }} />
          <g className="orbit-plane">
            <path d="M-7 0 L7 0 M0 -5 L3 0 L0 5 M-6 -2.5 L-4 0 L-6 2.5" stroke="var(--accent)" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <animateMotion dur="7s" repeatCount="indefinite" rotate="auto" begin="2.6s" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
              <mpath href="#orbit-path" />
            </animateMotion>
          </g>
        </svg>

        <motion.div className="hero__container-wrap" style={{ y, rotate, scale }}>
          <motion.div
            initial={{ y: -160, opacity: 0, rotate: -16 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            transition={{ delay: 0.45, duration: 1.4, ease: EASINGS.bounce }}
          >
            <motion.div
              className="hero__container"
              drag="x"
              dragSnapToOrigin
              dragElastic={0.35}
              dragTransition={{ bounceStiffness: 180, bounceDamping: 14 }}
              style={{ x: dragX, rotateY, rotateZ }}
              data-cursor
            >
              <div className="float">
                <img src="/img/container.webp" alt={h.containerAlt} draggable={false} width={1100} height={693} />
              </div>
            </motion.div>
          </motion.div>
          <motion.div className="hero__shadow" style={{ scaleX: shadowScale }} aria-hidden="true" />
        </motion.div>

        <motion.div
          className="badge-360"
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 1.5, type: 'spring', stiffness: 220, damping: 14 }}
        >
          <span>360°</span>
          <svg viewBox="0 0 24 10" width="22" aria-hidden="true"><path d="M2 3c3 5 17 5 20 0M18 1l4 2-3 3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
          <em>{h.swipe}</em>
        </motion.div>

        <motion.div
          className="chip chip--tr"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.7, duration: 0.6 }}
        >
          <span className="chip__icon"><Icon name="globe" size={16} /></span>
          <span>{h.chip[0]}<br />{h.chip[1]}</span>
        </motion.div>

        {/* Solo escritorio */}
        <motion.div
          className="chip chip--bl"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.9, duration: 0.6 }}
        >
          <span className="chip__icon chip__icon--live"><span className="live-dot" /></span>
          <span>{h.chip2[0]}<br />{h.chip2[1]}</span>
        </motion.div>
      </div>
    </section>
  );
}
