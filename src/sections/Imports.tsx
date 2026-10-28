import { motion } from 'framer-motion';
import RevealText from '../components/RevealText';
import Icon from '../components/Icon';
import { ctaLink } from '../data';
import { IMPORT_ICONS, useLang } from '../i18n';
import { cardVariants, containerVariants, fadeUp } from '../utils/easings';
import { useParallax } from '../hooks/useParallax';

export default function Imports() {
  const { t } = useLang();
  const im = t.imports;
  const p = useParallax(40);
  return (
    <section className="imports" id="puertas">
      <div className="imports__card">
        <div className="imports__bg" ref={p.ref} aria-hidden="true">
          <motion.img src="/img/almacen.webp" alt="" style={{ y: p.y, scale: 1.3 }} />
        </div>
        <div className="imports__content">
          <motion.span className="eyebrow eyebrow--dark" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {im.eyebrow}
          </motion.span>
          <RevealText tag="h2" className="section-title section-title--light" accent={im.accent}>
            {im.title}
          </RevealText>

          <motion.div
            className="imports__grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {im.items.map((title, i) => (
              <motion.a
                key={i}
                className="import-chip"
                variants={cardVariants}
                {...ctaLink(t.wa.product(title))}
                whileTap={{ scale: 0.95 }}
              >
                <span className="import-chip__icon"><Icon name={IMPORT_ICONS[i]} size={22} /></span>
                <span>{title}</span>
                <Icon name="arrow" size={15} className="import-chip__arrow" />
              </motion.a>
            ))}
          </motion.div>
          <p className="imports__note">{im.note}</p>
        </div>
      </div>
    </section>
  );
}
