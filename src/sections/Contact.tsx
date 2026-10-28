import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import RevealText from '../components/RevealText';
import MagneticButton from '../components/MagneticButton';
import Icon from '../components/Icon';
import { CONTACT, HAS_WHATSAPP, ctaLink, wa } from '../data';
import type { QuotePrefill } from './Tools';
import { useLang } from '../i18n';
import { EASINGS, fadeUp } from '../utils/easings';

type Field = 'name' | 'company' | 'email' | 'phone' | 'service' | 'origin' | 'message';
type Form = Record<Field, string> & { consent: boolean };

const EMPTY: Form = { name: '', company: '', email: '', phone: '', service: '0', origin: '0', message: '', consent: false };
const REQUIRED: Field[] = ['name', 'email', 'phone', 'message'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function Contact({ prefill }: { prefill: QuotePrefill | null }) {
  const { t } = useLang();
  const c = t.contact;
  const [form, setForm] = useState<Form>(EMPTY);
  const [channel, setChannel] = useState<'wa' | 'mail' | 'demo'>('demo');

  // Datos que vienen del cotizador
  useEffect(() => {
    if (!prefill) return;
    setForm((s) => ({ ...s, message: prefill.message, service: String(prefill.service), origin: String(prefill.origin) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefill?.nonce]);
  const [touched, setTouched] = useState<Partial<Record<Field | 'consent', boolean>>>({});
  const [sent, setSent] = useState<string | null>(null);

  const errorOf = (f: Field | 'consent'): string | null => {
    if (f === 'consent') return form.consent ? null : c.required;
    const v = form[f].trim();
    if (REQUIRED.includes(f) && !v) return c.required;
    if (f === 'email' && v && !EMAIL_RE.test(v)) return c.invalidEmail;
    return null;
  };
  const showErr = (f: Field | 'consent') => (touched[f] ? errorOf(f) : null);

  const set = (f: Field, v: string) => setForm((s) => ({ ...s, [f]: v }));
  const blur = (f: Field | 'consent') => setTouched((s) => ({ ...s, [f]: true }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const all: (Field | 'consent')[] = [...REQUIRED, 'consent'];
    setTouched(Object.fromEntries(all.map((f) => [f, true])));
    if (all.some((f) => errorOf(f))) return;

    const { consent: _consent, ...fields } = form;
    const text = c.msg({
      ...fields,
      service: c.serviceOpts[Number(form.service)],
      origin: c.originOpts[Number(form.origin)],
    });
    // Sin backend en la demo: la solicitud se entrega por WhatsApp (o correo) ya redactada.
    // Sin servidor: la solicitud sale por WhatsApp o correo; si K.A.B. aún no tiene canal, queda en modo demo
    if (HAS_WHATSAPP) {
      window.open(wa(text), '_blank', 'noopener');
      setChannel('wa');
    } else if (CONTACT.email) {
      window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(c.mailSubject)}&body=${encodeURIComponent(text)}`;
      setChannel('mail');
    } else {
      setChannel('demo');
    }
    setSent(text);
  };

  const reset = () => { setForm(EMPTY); setTouched({}); setSent(null); };

  const input = (f: Field, type = 'text', auto?: string) => (
    <div className={`fld ${showErr(f) ? 'has-error' : ''}`}>
      <label htmlFor={`c-${f}`}>{c.fields[f]}{REQUIRED.includes(f) && <span aria-hidden="true"> *</span>}</label>
      <input
        id={`c-${f}`}
        type={type}
        autoComplete={auto}
        value={form[f]}
        placeholder={c.ph[f as keyof typeof c.ph]}
        onChange={(e) => set(f, e.target.value)}
        onBlur={() => blur(f)}
        aria-invalid={!!showErr(f)}
        aria-describedby={showErr(f) ? `c-${f}-err` : undefined}
      />
      {showErr(f) && <span className="fld__err" id={`c-${f}-err`}>{showErr(f)}</span>}
    </div>
  );

  return (
    <section className="contact" id="contacto">
      <div className="contact__wrap">
        <motion.aside
          className="contact__info"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: EASINGS.premium }}
        >
          <motion.span className="eyebrow eyebrow--dark" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {c.eyebrow}
          </motion.span>
          <RevealText tag="h2" className="section-title section-title--light" accent={c.accent}>
            {c.title}
          </RevealText>
          <p className="contact__sub">{c.sub}</p>

          <ul className="contact__perks">
            {c.perks.map((p) => (
              <li key={p}><span><Icon name="check" size={14} stroke={2.6} /></span>{p}</li>
            ))}
          </ul>

          <div className="contact__direct">
            <span className="footer__label">{c.direct}</span>
            <strong>K.A.B. Comercio Global Inc.</strong>
            {CONTACT.name && <span>{CONTACT.name}</span>}
            {HAS_WHATSAPP && <a {...ctaLink(t.wa.default)}><Icon name="whatsapp" size={18} /> {CONTACT.phone}</a>}
            {CONTACT.email && <a href={`mailto:${CONTACT.email}`}><Icon name="mail" size={18} /> {CONTACT.email}</a>}
            <span className="contact__loc"><Icon name="pin" size={18} /> {CONTACT.location}</span>
          </div>
          <img src="/img/container.webp" alt="" className="contact__container" aria-hidden="true" />
        </motion.aside>

        <motion.div
          className="contact__card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASINGS.premium }}
        >
          <AnimatePresence mode="wait">
            {sent === null ? (
              <motion.form key="form" className="contact__form" onSubmit={submit} noValidate exit={{ opacity: 0, y: -16 }}>
                <div className="contact__row">
                  {input('name', 'text', 'name')}
                  {input('company', 'text', 'organization')}
                </div>
                <div className="contact__row">
                  {input('email', 'email', 'email')}
                  {input('phone', 'tel', 'tel')}
                </div>
                <div className="contact__row">
                  <div className="fld">
                    <label htmlFor="c-service">{c.fields.service}</label>
                    <select id="c-service" value={form.service} onChange={(e) => set('service', e.target.value)}>
                      {c.serviceOpts.map((o, i) => <option key={i} value={i}>{o}</option>)}
                    </select>
                  </div>
                  <div className="fld">
                    <label htmlFor="c-origin">{c.fields.origin}</label>
                    <select id="c-origin" value={form.origin} onChange={(e) => set('origin', e.target.value)}>
                      {c.originOpts.map((o, i) => <option key={i} value={i}>{o}</option>)}
                    </select>
                  </div>
                </div>
                <div className={`fld ${showErr('message') ? 'has-error' : ''}`}>
                  <label htmlFor="c-message">{c.fields.message}<span aria-hidden="true"> *</span></label>
                  <textarea
                    id="c-message"
                    rows={4}
                    value={form.message}
                    placeholder={c.ph.message}
                    onChange={(e) => set('message', e.target.value)}
                    onBlur={() => blur('message')}
                    aria-invalid={!!showErr('message')}
                  />
                  {showErr('message') && <span className="fld__err">{showErr('message')}</span>}
                </div>

                <label className={`check ${showErr('consent') ? 'has-error' : ''}`}>
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => { setForm((s) => ({ ...s, consent: e.target.checked })); blur('consent'); }}
                  />
                  <span className="check__box"><Icon name="check" size={13} stroke={3} /></span>
                  <span>{c.consent}</span>
                </label>

                <MagneticButton type="submit" className="btn btn--primary btn--block">
                  {c.submit} <Icon name="arrow" size={18} stroke={2.2} />
                </MagneticButton>
              </motion.form>
            ) : (
              <motion.div
                key="ok"
                className="contact__ok"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: EASINGS.smooth }}
              >
                <motion.span
                  className="contact__ok-icon"
                  initial={{ scale: 0, rotate: -40 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.15 }}
                >
                  <Icon name="check" size={34} stroke={2.6} />
                </motion.span>
                <h3>{c.okTitle}</h3>
                <p>{channel === 'wa' ? c.okWa : channel === 'mail' ? c.okMail : c.okDemo}</p>
                <div className="contact__ok-actions">
                  {CONTACT.email && channel !== 'mail' && (
                    <a
                      className="btn btn--ghost"
                      href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(c.mailSubject)}&body=${encodeURIComponent(sent)}`}
                    >
                      <Icon name="mail" size={18} /> {c.mailBtn}
                    </a>
                  )}
                  <button className="btn btn--link" onClick={reset}>{c.again}</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
