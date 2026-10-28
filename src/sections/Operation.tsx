import { useRef, useState } from 'react';
import {
  AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform, type MotionValue,
} from 'framer-motion';
import RevealText from '../components/RevealText';
import MagneticButton from '../components/MagneticButton';
import Icon from '../components/Icon';
import { HAS_WHATSAPP, wa } from '../data';
import { useLang } from '../i18n';
import { EASINGS, fadeUp } from '../utils/easings';

// Fotos de K.A.B.: visión (planificación), coordinación (puerto) y realidad (aire y mar)
const IMAGES = ['/img/kab-proyecto-1.webp', '/img/kab-proyecto-2.webp', '/img/kab-proyecto-3.webp'];
const N = IMAGES.length;

/**
 * Tarjeta apilada. `p` va de 0 a N-1 según el scroll: la tarjeta i entra desde abajo
 * mientras p va de i-1 a i, y luego retrocede cuando la siguiente la cubre.
 */
function StackCard({ i, p, active, caption }: { i: number; p: MotionValue<number>; active: boolean; caption: string }) {
  const enter = [i - 1, i];
  const y = useTransform(p, [enter[0], enter[1], i + 1], i === 0 ? ['0%', '0%', '-5%'] : ['70%', '0%', '-5%']);
  const opacity = useTransform(p, [i - 1, i - 0.55], i === 0 ? [1, 1] : [0, 1]);
  const rotate = useTransform(p, [enter[0], enter[1], i + 1], i === 0 ? [0, 0, -3] : [7, 0, -3]);
  const scale = useTransform(p, [i, i + 1], [1, 0.9]);
  const dim = useTransform(p, [i, i + 1], [0, 0.55]);
  // Zoom lento dentro de la tarjeta para dar movimiento a la foto
  const zoom = useTransform(p, [i - 1, i + 1], [1.18, 1.04]);

  return (
    <motion.div className="ops-card" style={{ y, rotate, scale, opacity, zIndex: i + 1 }}>
      <motion.img src={IMAGES[i]} alt={caption} style={{ scale: zoom }} loading="lazy" />
      <motion.span className="ops-card__dim" style={{ opacity: dim }} />
      <span className={`ops-card__cap ${active ? 'is-live' : ''}`}>
        <span className="ops-card__dot" /> 0{i + 1} · {caption}
      </span>
    </motion.div>
  );
}

export default function Operation() {
  const { t } = useLang();
  const o = t.ops;
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: track, offset: ['start start', 'end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.6 });
  // Tramo final sin cambios para que el último paso se lea con calma
  const p = useTransform(smooth, [0, 0.82], [0, N - 1], { clamp: true });
  const bar = useTransform(smooth, [0, 0.82], [0, 1], { clamp: true });

  useMotionValueEvent(p, 'change', (v) => setActive(Math.min(N - 1, Math.max(0, Math.round(v)))));

  const goTo = (i: number) => {
    const el = track.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const range = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + range * 0.82 * (i / (N - 1)) + 2, behavior: 'smooth' });
  };

  const step = o.steps[active];

  return (
    <section className="ops" id="proyectos">
      <div className="ops__head">
        <motion.span className="eyebrow eyebrow--dark" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {o.eyebrow}
        </motion.span>
        <RevealText tag="h2" className="ops__title" accent={o.accent}>
          {o.title}
        </RevealText>
      </div>

      <div className="ops__track" ref={track}>
        <div className="ops__sticky">
          <div className="ops__stage">
            <div className="ops__media">
              <div className="ops__ghost ops__ghost--a" aria-hidden="true" />
              <div className="ops__ghost ops__ghost--b" aria-hidden="true" />
              {IMAGES.map((_, i) => (
                <StackCard key={i} i={i} p={p} active={i === active} caption={o.captions[i]} />
              ))}
            </div>

            <div className="ops__copy">
              <div className="ops__counter">
                <span><strong>0{active + 1}</strong> / 0{N}</span>
                <div className="ops__bar"><motion.span style={{ scaleX: bar }} /></div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${active}-${step.label}`}
                  className="ops__step"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.45, ease: EASINGS.smooth }}
                >
                  <span className="ops__tag">{step.tag}</span>
                  <h3>{step.label}</h3>
                  <p>{step.text}</p>
                </motion.div>
              </AnimatePresence>

              <div className="ops__dots" role="tablist" aria-label={o.eyebrow}>
                {o.steps.map((s, i) => (
                  <button
                    key={i}
                    role="tab"
                    aria-selected={i === active}
                    className={i === active ? 'is-on' : ''}
                    onClick={() => goTo(i)}
                  >
                    <span>0{i + 1}</span> {s.tag}
                  </button>
                ))}
              </div>

              <div className="ops__cta">
                <MagneticButton href={wa(t.wa.default)} external={HAS_WHATSAPP} className="btn btn--primary">
                  {o.cta} <Icon name="arrow" size={18} stroke={2.2} />
                </MagneticButton>
              </div>
            </div>
          </div>
          <span className={`ops__hint ${active > 0 ? 'is-hidden' : ''}`}>{o.scroll} ↓</span>
        </div>
      </div>
    </section>
  );
}
