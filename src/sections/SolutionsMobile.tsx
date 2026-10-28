import { motion } from 'framer-motion';
import RevealText from '../components/RevealText';
import Icon from '../components/Icon';
import { LINES } from '../data';
import { useLang } from '../i18n';
import { EASINGS, fadeUp } from '../utils/easings';

/** Líneas de soluciones en móvil: cuadrícula tipo app; cada mosaico abre la hoja de detalle */
export default function SolutionsMobile({ onPick }: { onPick: (i: number) => void }) {
  const { t } = useLang();
  const sv = t.services;
  const a = t.app;

  return (
    <section className="msol" id="soluciones">
      <div className="section-head">
        <motion.span className="eyebrow" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {sv.eyebrow}
        </motion.span>
        <RevealText tag="h2" className="section-title" accent={sv.accent}>
          {sv.title}
        </RevealText>
        <p className="msol__hint"><Icon name="spark" size={14} /> {a.tapHint}</p>
      </div>

      <div className="msol__grid">
        {LINES.map((l, i) => (
          <motion.button
            key={l.id}
            type="button"
            className={`msol__tile ${l.tone} ${i === 0 ? 'is-wide' : ''}`}
            onClick={() => onPick(i)}
            initial={{ opacity: 0, y: 50, scale: 0.92 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, delay: (i % 2) * 0.08, ease: EASINGS.premium }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="msol__ghost" aria-hidden="true"><Icon name={l.icon} size={i === 0 ? 150 : 110} stroke={0.9} /></span>
            <span className="msol__num">0{i + 1}</span>
            <span className="msol__icon"><Icon name={l.icon} size={22} /></span>
            <span className="msol__text">
              <span className="msol__kicker">{sv.items[i].kicker}</span>
              <strong>{a.short[i]}</strong>
            </span>
            <span className="msol__go" aria-hidden="true"><Icon name="arrow" size={16} stroke={2.2} /></span>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
