import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import RevealText from '../components/RevealText';
import Icon from '../components/Icon';
import { HAS_WHATSAPP, wa } from '../data';
import { useLang } from '../i18n';
import { EASINGS, fadeUp } from '../utils/easings';

export type QuotePrefill = { message: string; service: number; origin: number; nonce: number };

/** Cotizador: arma la solicitud y la envía por WhatsApp, o la pasa al formulario de contacto */
export default function Tools({ need, nonce, onContinue }: {
  need: string;
  nonce: number;
  onContinue: (p: Omit<QuotePrefill, 'nonce'>) => void;
}) {
  const { t } = useLang();
  const q = t.quote;
  const lines = t.services.items.map((i) => i.title);
  const [f, setF] = useState({ line: 0, project: 0, fin: 2, need: '', name: '' });
  const [error, setError] = useState(false);

  // Texto escrito en el buscador del hero
  useEffect(() => {
    if (nonce > 0 && need) setF((s) => ({ ...s, need }));
  }, [nonce, need]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.need.trim()) return setError(true);
    const msg = q.msg(lines[f.line], q.projectOpts[f.project], q.financingOpts[f.fin], f.need.trim(), f.name.trim());
    if (HAS_WHATSAPP) {
      window.open(wa(msg), '_blank', 'noopener');
    } else {
      onContinue({ message: f.need.trim(), service: f.line, origin: f.project });
    }
  };

  return (
    <section className="tools" id="cotizar">
      <div className="section-head">
        <motion.span className="eyebrow" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {q.eyebrow}
        </motion.span>
        <RevealText tag="h2" className="section-title" accent={q.accent}>
          {q.title}
        </RevealText>
        <motion.p className="section-sub" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {q.note}
        </motion.p>
      </div>

      <motion.form
        className="tools__card quote"
        onSubmit={submit}
        noValidate
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, ease: EASINGS.premium }}
      >
        <label className="quote__label" htmlFor="q-line">{q.line}</label>
        <select id="q-line" className="field" value={f.line} onChange={(e) => setF({ ...f, line: Number(e.target.value) })}>
          {lines.map((l, i) => <option key={i} value={i}>{l}</option>)}
        </select>

        <span className="quote__label">{q.project}</span>
        <div className="seg">
          {q.projectOpts.map((o, i) => (
            <button type="button" key={i} className={f.project === i ? 'is-on' : ''} onClick={() => setF({ ...f, project: i })}>{o}</button>
          ))}
        </div>

        <span className="quote__label">{q.financing}</span>
        <div className="seg">
          {q.financingOpts.map((o, i) => (
            <button type="button" key={i} className={f.fin === i ? 'is-on' : ''} onClick={() => setF({ ...f, fin: i })}>{o}</button>
          ))}
        </div>
        <AnimatePresence>
          {f.fin !== 1 && (
            <motion.div className="quote__transit" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
              <Icon name="bank" size={18} />
              <span>{q.finNote}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <label className="quote__label" htmlFor="q-need">{q.need}</label>
        <textarea
          id="q-need"
          className={`field field--area ${error ? 'has-error' : ''}`}
          rows={3}
          placeholder={q.needPh}
          value={f.need}
          onChange={(e) => { setF({ ...f, need: e.target.value }); setError(false); }}
        />
        {error && <span className="fld__err">{q.needRequired}</span>}

        <label className="quote__label" htmlFor="q-name">{q.name}</label>
        <input id="q-name" className="field" placeholder={q.namePh} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />

        <button type="submit" className="btn btn--primary btn--block quote__send">
          <Icon name={HAS_WHATSAPP ? 'whatsapp' : 'arrow'} size={19} /> {HAS_WHATSAPP ? q.send : q.sendForm}
        </button>
      </motion.form>
    </section>
  );
}
