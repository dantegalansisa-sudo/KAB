import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import RevealText from '../components/RevealText';
import MagneticButton from '../components/MagneticButton';
import Icon from '../components/Icon';
import { CONTACT, HAS_WHATSAPP, ctaLink, wa } from '../data';
import { useLang } from '../i18n';

const COMPANY_HREFS = ['#nosotros', '#proceso', '#proyectos', '#cotizar'];

export default function Final() {
  const { t } = useLang();
  const f = t.final;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);
  const cy = useTransform(scrollYProgress, [0, 1], [60, -40]);
  const cr = useTransform(scrollYProgress, [0, 1], [-10, 6]);
  const igHandle = CONTACT.instagram.replace(/\/$/, '').split('/').pop();

  return (
    <>
      <section className="final" ref={ref}>
        <motion.img src="/img/maritimo.webp" alt="" className="final__bg" style={{ y, scale: 1.3 }} aria-hidden="true" />
        <div className="final__overlay" />
        <div className="final__content">
          <span className="eyebrow eyebrow--dark">{f.eyebrow}</span>
          <RevealText tag="h2" className="final__title" accent={f.accent}>
            {f.title}
          </RevealText>
          <MagneticButton href={wa(t.wa.default)} external={HAS_WHATSAPP} className="btn btn--primary">
            {f.cta} <Icon name="arrow" size={18} stroke={2.2} />
          </MagneticButton>
        </div>
        <motion.img src="/img/container-kab.webp" alt="" className="final__container" style={{ y: cy, rotate: cr }} aria-hidden="true" />
      </section>

      <footer className="footer" id="footer">
        <img src="/img/logo-light.png" alt="K.A.B. Comercio Global Inc." className="footer__logo" loading="lazy" />
        <p className="footer__tag">{f.tag}</p>

        <div className="footer__contact">
          <span className="footer__label">{f.contact}</span>
          <strong>K.A.B. Comercio Global Inc.</strong>
          {CONTACT.name && <span>{CONTACT.name}</span>}
          {HAS_WHATSAPP && <a {...ctaLink(t.wa.default)}><Icon name="whatsapp" size={18} /> {CONTACT.phone}</a>}
          {CONTACT.email && <a href={`mailto:${CONTACT.email}`}><Icon name="mail" size={18} /> {CONTACT.email}</a>}
          {CONTACT.instagram && (
            <a href={CONTACT.instagram} target="_blank" rel="noreferrer"><Icon name="instagram" size={18} /> @{igHandle}</a>
          )}
          <span className="footer__loc"><Icon name="pin" size={18} /> {f.location}</span>
          {!HAS_WHATSAPP && !CONTACT.email && (
            <a href="#contacto"><Icon name="chat" size={18} /> {t.header.links[5]}</a>
          )}
        </div>

        <div className="footer__cols">
          <div>
            <span className="footer__label">{f.services}</span>
            {f.serviceLinks.map((l) => <a key={l} href="#soluciones">{l}</a>)}
          </div>
          <div>
            <span className="footer__label">{f.company}</span>
            {f.companyLinks.map((l, i) => <a key={l} href={COMPANY_HREFS[i]}>{l}</a>)}
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} K.A.B. Comercio Global Inc.</span>
          <a href="#top">{f.top}</a>
        </div>
      </footer>
    </>
  );
}
