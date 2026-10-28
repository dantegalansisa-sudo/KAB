import { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion';
import RevealText from '../components/RevealText';
import Icon from '../components/Icon';
import { LINES, ctaLink } from '../data';
import { useLang } from '../i18n';
import { EASINGS, fadeUp } from '../utils/easings';
import { MOBILE, useMediaQuery } from '../hooks/useMediaQuery';

// Color del panel por línea (paleta tierra, tonos profundos para texto claro)
const PANEL = ['#5b4636', '#8a5236', '#59604a', '#8c6d4c', '#6e4a4e', '#5f574e', '#8f6b2c', '#4f625d'];
const N = LINES.length;

/**
 * Líneas de soluciones: índice editorial fijo durante el scroll.
 * PC/tablet: lista a la izquierda y panel a la derecha. Móvil: nombre activo con
 * segmentos de progreso arriba y el panel debajo. El ícono se dibuja y el color
 * del panel cambia en cada paso.
 */
export default function Services() {
  const { t } = useLang();
  const sv = t.services;
  const short = t.app.short;
  const mobile = useMediaQuery(MOBILE);
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: track, offset: ['start start', 'end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.5 });
  const p = useTransform(smooth, [0.04, 0.92], [0, N - 1], { clamp: true });
  const bar = useTransform(smooth, [0.04, 0.92], [0, 1], { clamp: true });
  useMotionValueEvent(p, 'change', (v) => setActive(Math.min(N - 1, Math.max(0, Math.round(v)))));

  const goTo = (i: number) => {
    const el = track.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const range = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + range * (0.04 + 0.88 * (i / (N - 1))) + 2, behavior: 'smooth' });
  };

  const c = sv.items[active];
  const line = LINES[active];

  return (
    <section className="sol" id="soluciones">
      <div className="sol__track" ref={track}>
        <div className="sol__sticky">
          <div className="sol__inner">
            <div className="sol__left">
              <motion.span className="eyebrow" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                {sv.eyebrow}
              </motion.span>
              <RevealText tag="h2" className="sol__title" accent={sv.accent}>
                {sv.title}
              </RevealText>

              {mobile ? (
                <div className="sol__mnav">
                  <div className="sol__mrow">
                    <span className="sol__mcount"><strong>0{active + 1}</strong> / 0{N}</span>
                    <motion.span
                      key={active}
                      className="sol__mname"
                      initial={{ y: 18, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.4, ease: EASINGS.smooth }}
                    >
                      {short[active]}
                    </motion.span>
                  </div>
                  <div className="sol__segs">
                    {LINES.map((l, i) => (
                      <button
                        key={l.id}
                        type="button"
                        aria-label={short[i]}
                        aria-current={i === active}
                        className={i < active ? 'is-past' : i === active ? 'is-on' : ''}
                        onClick={() => goTo(i)}
                      />
                    ))}
                  </div>
                </div>
              ) : (
              <ol className="sol__list">
                {LINES.map((l, i) => (
                  <motion.li
                    key={l.id}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, delay: 0.15 + i * 0.05, ease: EASINGS.smooth }}
                  >
                    <button
                      type="button"
                      className={`sol__item ${i === active ? 'is-on' : ''} ${i < active ? 'is-past' : ''}`}
                      onClick={() => goTo(i)}
                      aria-current={i === active}
                    >
                      <span className="sol__num">0{i + 1}</span>
                      <span className="sol__name">{short[i]}</span>
                      {i === active && <motion.span layoutId="sol-dot" className="sol__dot" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                    </button>
                  </motion.li>
                ))}
              </ol>
              )}

              <div className="sol__progress"><motion.span style={{ scaleX: bar }} /></div>
            </div>

            <motion.div
              className="sol__panel"
              animate={{ backgroundColor: PANEL[active] }}
              transition={{ duration: 0.7, ease: EASINGS.smooth }}
              initial={{ clipPath: 'inset(12% 12% 12% 12% round 40px)', opacity: 0 }}
              whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 40px)', opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <span className="sol__ring" aria-hidden="true" />
              <motion.span
                key={`n${active}`}
                  className="sol__bignum"
                  aria-hidden="true"
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.55, ease: EASINGS.premium }}
                >
                  0{active + 1}
                </motion.span>

                <motion.div
                  key={`i${active}`}
                  className="sol__art draw"
                  aria-hidden="true"
                  initial={{ scale: 0.8, rotate: -8, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: EASINGS.premium }}
                >
                  <Icon name={line.icon} size={220} stroke={0.7} />
                </motion.div>

                <motion.div
                  key={`t${active}`}
                  className="sol__copy"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
                  }}
                >
                  {[
                    <span key="k" className="sol__kicker">{c.kicker}</span>,
                    <h3 key="h">{c.title}</h3>,
                    <p key="p">{c.desc}</p>,
                    <ul key="u">{c.tags.slice(0, 3).map((tag) => <li key={tag}>{tag}</li>)}</ul>,
                    <a key="a" className="sol__cta" {...ctaLink(t.wa.line(c.title))}>
                      {sv.cta} <Icon name="arrow" size={17} stroke={2.2} />
                    </a>,
                  ].map((el, i) => (
                    <motion.div
                      key={i}
                      variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASINGS.smooth } } }}
                    >
                      {el}
                    </motion.div>
                  ))}
                </motion.div>

              <span className="sol__counter">0{active + 1} / 0{N}</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
