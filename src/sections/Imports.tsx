import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import RevealText from '../components/RevealText';
import Icon from '../components/Icon';
import { ctaLink } from '../data';
import { IMPORT_ICONS, useLang } from '../i18n';
import { EASINGS, fadeUp } from '../utils/easings';

/** Hoja de ventana con marco, cristales y manija (se desliza al abrir) */
function Pane({ side }: { side: 'l' | 'r' }) {
  return (
    <div className={`pane pane--${side}`}>
      <span className="pane__glass" />
      <span className="pane__glass" />
      <span className="pane__glass" />
      <span className="pane__glass" />
      <span className="pane__handle" />
    </div>
  );
}

/**
 * Puertas y ventanas: la tarjeta empieza cerrada como una ventana doble y sus hojas
 * se abren con el scroll. Cada producto entra girando sobre su bisagra, como una puerta.
 */
export default function Imports() {
  const { t } = useLang();
  const im = t.imports;
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 20%'] });
  const open = useSpring(scrollYProgress, { stiffness: 110, damping: 24, mass: 0.6 });
  const leftX = useTransform(open, [0.25, 1], ['0%', '-102%']);
  const rightX = useTransform(open, [0.25, 1], ['0%', '102%']);
  const tilt = useTransform(open, [0.25, 1], [0, 26]);
  const tiltR = useTransform(tilt, (v) => -v);
  const panesOpacity = useTransform(open, [0.85, 1], [1, 0]);
  const contentScale = useTransform(open, [0.2, 1], [0.92, 1]);
  const bgScale = useTransform(open, [0, 1], [1.35, 1.12]);

  // Parallax suave del fondo mientras se atraviesa la sección
  const { scrollYProgress: pass } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(pass, [0, 1], ['-8%', '8%']);

  return (
    <section className="imports" id="puertas">
      <div className="imports__card" ref={ref}>
        <div className="imports__bg" aria-hidden="true">
          <motion.img src="/img/almacen.webp" alt="" style={{ y: bgY, scale: bgScale }} />
        </div>
        <span className="imports__sheen" aria-hidden="true" />

        <motion.div className="imports__content" style={reduce ? undefined : { scale: contentScale }}>
          <motion.span className="eyebrow eyebrow--dark" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {im.eyebrow}
          </motion.span>
          <RevealText tag="h2" className="section-title section-title--light" accent={im.accent}>
            {im.title}
          </RevealText>

          <div className="imports__grid">
            {im.items.map((title, i) => (
              <motion.a
                key={i}
                className="import-chip"
                {...ctaLink(t.wa.product(title))}
                initial={{ opacity: 0, rotateY: -80 }}
                whileInView={{ opacity: 1, rotateY: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.9, delay: 0.1 + i * 0.09, ease: EASINGS.premium }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="import-chip__icon"><Icon name={IMPORT_ICONS[i]} size={22} /></span>
                <span>{title}</span>
                <Icon name="arrow" size={15} className="import-chip__arrow" />
              </motion.a>
            ))}
          </div>
          <motion.p
            className="imports__note"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            {im.note}
          </motion.p>
        </motion.div>

        {!reduce && (
          <motion.div className="imports__panes" style={{ opacity: panesOpacity }} aria-hidden="true">
            <motion.div className="imports__pane-wrap imports__pane-wrap--l" style={{ x: leftX, rotateY: tilt }}><Pane side="l" /></motion.div>
            <motion.div className="imports__pane-wrap imports__pane-wrap--r" style={{ x: rightX, rotateY: tiltR }}><Pane side="r" /></motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
