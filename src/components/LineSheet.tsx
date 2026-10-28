import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Icon from './Icon';
import { HAS_WHATSAPP, LINES, wa } from '../data';
import { useLang } from '../i18n';
import { EASINGS } from '../utils/easings';

/** Hoja inferior (bottom sheet) con el detalle de una línea; se cierra deslizando hacia abajo */
export default function LineSheet({ index, onClose, onChange }: {
  index: number | null;
  onClose: () => void;
  onChange: (i: number) => void;
}) {
  const { t } = useLang();
  const sv = t.services;
  const a = t.app;
  const open = index !== null;

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [open, onClose]);

  const i = index ?? 0;
  const line = LINES[i];
  const c = sv.items[i];
  const go = (d: number) => onChange((i + d + LINES.length) % LINES.length);

  const quote = (e: React.MouseEvent) => {
    if (HAS_WHATSAPP) {
      e.preventDefault();
      window.open(wa(t.wa.line(c.title)), '_blank', 'noopener');
      return;
    }
    // Sin WhatsApp: cierra la hoja y baja al formulario de contacto
    e.preventDefault();
    onClose();
    window.setTimeout(() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' }), 350);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="sheet__backdrop"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className={`sheet ${line.tone}`}
            role="dialog"
            aria-modal="true"
            aria-label={c.title}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.5, ease: EASINGS.premium }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.7 }}
            onDragEnd={(_, info) => { if (info.offset.y > 110 || info.velocity.y > 600) onClose(); }}
          >
            <div className="sheet__grip" aria-hidden="true" />
            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.28 }}
              >
                <div className="sheet__art">
                  <span className="sheet__ghost" aria-hidden="true"><Icon name={line.icon} size={170} stroke={0.8} /></span>
                  <span className="sheet__icon"><Icon name={line.icon} size={26} /></span>
                  <span className="sheet__count">0{i + 1} {a.of} 0{LINES.length}</span>
                </div>
                <div className="sheet__body">
                  <span className="sheet__kicker">{c.kicker}</span>
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                  <ul>
                    {c.tags.map((tag) => <li key={tag}><Icon name="check" size={13} stroke={2.6} /> {tag}</li>)}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="sheet__actions">
              <button type="button" className="sheet__nav sheet__nav--flip" aria-label={a.prev} onClick={() => go(-1)}><Icon name="arrow" size={18} /></button>
              <a href="#contacto" className="btn btn--primary sheet__cta" onClick={quote}>
                {sv.cta} <Icon name="arrow" size={18} stroke={2.2} />
              </a>
              <button type="button" className="sheet__nav" aria-label={a.next} onClick={() => go(1)}><Icon name="arrow" size={18} /></button>
            </div>
            <button type="button" className="sheet__close" aria-label={a.close} onClick={onClose}><Icon name="close" size={20} /></button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
