import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import RevealText from '../components/RevealText';
import MagneticButton from '../components/MagneticButton';
import AnimatedCounter from '../components/AnimatedCounter';
import Icon from '../components/Icon';
import { HAS_WHATSAPP, wa } from '../data';
import { useLang } from '../i18n';
import { EASINGS, cardVariants, containerVariants, fadeUp } from '../utils/easings';
import { useParallax } from '../hooks/useParallax';

export default function Story() {
  const { t } = useLang();
  const st = t.story;
  const big = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: big, offset: ['start end', 'end start'] });
  const bigX = useTransform(scrollYProgress, [0, 1], ['8%', '-18%']);
  const p1 = useParallax(30);

  return (
    <section className="story" id="nosotros-intro">
      <div className="marquee" aria-label={st.routesLabel}>
        <div className="marquee__track">
          {[...st.routes, ...st.routes].map((r, i) => (
            <span key={i} className="marquee__item"><Icon name="route" size={16} /> {r}</span>
          ))}
        </div>
      </div>

      <div className="story__inner">
        <div className="story__big" ref={big} aria-hidden="true">
          <motion.span style={{ x: bigX }}>{st.big}</motion.span>
        </div>

        <div className="story__row">
          <div className="story__copy">
            <motion.span className="eyebrow eyebrow--dark" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {st.eyebrow}
            </motion.span>
            <RevealText tag="h2" className="story__title" accent={st.accent}>
              {st.title}
            </RevealText>
            <motion.p className="story__text" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {st.text}
            </motion.p>

            <div className="story__ctas">
              <MagneticButton href={wa(t.wa.default)} external={HAS_WHATSAPP} className="btn btn--primary">
                {st.cta} <Icon name="arrow" size={18} stroke={2.2} />
              </MagneticButton>
              <MagneticButton href="#nosotros" className="btn btn--ghost-dark">{st.more}</MagneticButton>
            </div>
          </div>
          <motion.div className="story__media" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <motion.div
              className="story__img story__img--a"
              ref={p1.ref}
              variants={{
                hidden: { clipPath: 'inset(0% 100% 0% 0%)' },
                visible: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.2, ease: EASINGS.premium } },
              }}
            >
              <motion.img src="/img/puerto.webp" alt={st.imgAlt} style={{ y: p1.y, scale: 1.25 }} loading="lazy" />
            </motion.div>
            <motion.div
              className="story__badge"
              initial={{ scale: 0.6, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 160, damping: 14, delay: 0.4 }}
            >
              <strong>{st.badgeStrong}</strong>
              <span>{st.badge}</span>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="stats"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {st.stats.map((s, i) => (
            <motion.div className="stat" key={i} variants={cardVariants}>
              <strong>{/^\d+$/.test(s.v) ? <AnimatedCounter target={Number(s.v)} /> : s.v}</strong>
              <span>{s.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
