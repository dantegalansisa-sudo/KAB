import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import RevealText from '../components/RevealText';
import Icon from '../components/Icon';
import { useLang } from '../i18n';
import { EASINGS, cardVariants, containerVariants, fadeUp } from '../utils/easings';
import { useParallax } from '../hooks/useParallax';

export default function About() {
  const { t } = useLang();
  const ab = t.about;
  const tp = t.tips;
  const PILLARS = [
    { key: 'mision', title: ab.mission, icon: 'spark' as const, text: ab.missionText },
    { key: 'vision', title: ab.vision, icon: 'globe' as const, text: ab.visionText },
  ];
  const [open, setOpen] = useState<number | null>(0);
  const p = useParallax(40);

  return (
    <>
      <section className="about" id="nosotros">
        <div className="section-head">
          <motion.span className="eyebrow" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {ab.eyebrow}
          </motion.span>
          <RevealText tag="h2" className="section-title" accent={ab.accent}>
            {ab.title}
          </RevealText>
        </div>

        <div className="about__photo" ref={p.ref}>
          <motion.img src="/img/aereo.webp" alt={ab.photoAlt} style={{ y: p.y, scale: 1.2 }} loading="lazy" />
          <div className="about__photo-tag"><Icon name="users" size={18} /> {ab.photoTag}</div>
        </div>

        <motion.div className="pillars" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          {PILLARS.map((pl) => (
            <motion.article key={pl.key} className="pillar" variants={cardVariants}>
              <span className="pillar__icon"><Icon name={pl.icon} size={20} /></span>
              <h3>{pl.title}</h3>
              <p>{pl.text}</p>
            </motion.article>
          ))}
        </motion.div>

        <div className="values">
          <span className="values__title">{ab.values}</span>
          <div className="values__rows">
            {[0, 1].map((row) => (
              <div className={`values__track ${row ? 'values__track--rev' : ''}`} key={row}>
                {[...ab.valueList, ...ab.valueList].map((v, i) => (
                  <span key={i} className={`value-chip ${(i + row) % 3 === 0 ? 'value-chip--accent' : ''}`}>{v}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="tips">
        <div className="section-head">
          <motion.span className="eyebrow" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {tp.eyebrow}
          </motion.span>
          <div className="tips__head">
            <motion.span
              className="tips__five"
              initial={{ scale: 0.4, opacity: 0, rotate: -12 }}
              whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 160, damping: 12 }}
            >5</motion.span>
            <RevealText tag="h2" className="section-title">{tp.title}</RevealText>
          </div>
        </div>

        <ul className="accordion">
          {tp.items.map((e, i) => {
            const isOpen = open === i;
            return (
              <motion.li
                key={i}
                className={`acc ${isOpen ? 'is-open' : ''}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.6, ease: EASINGS.smooth }}
              >
                <button className="acc__btn" onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen}>
                  <span className="acc__num">{i + 1}</span>
                  <span className="acc__title">{e.title}</span>
                  <motion.span className="acc__plus" animate={{ rotate: isOpen ? 45 : 0 }}><Icon name="plus" size={22} /></motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="acc__body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASINGS.smooth }}
                    >
                      <p>{e.desc}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>
        <motion.p className="tips__quote" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {tp.quote[0]}<strong>{tp.quote[1]}</strong>
        </motion.p>
      </section>
    </>
  );
}
