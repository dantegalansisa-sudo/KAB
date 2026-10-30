import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import Icon from './Icon';
import { CONTACT, HAS_WHATSAPP, ctaLink } from '../data';
import { useLang, type Lang } from '../i18n';
import { EASINGS } from '../utils/easings';

const HREFS = ['#soluciones', '#showroom', '#proyectos', '#cotizar', '#nosotros', '#contacto'];

export function LangSwitch({ dark }: { dark?: boolean }) {
  const { lang, setLang } = useLang();
  return (
    <div className={`lang ${dark ? 'lang--dark' : ''}`} role="group" aria-label="Idioma / Language">
      {(['es', 'en'] as Lang[]).map((l) => (
        <button key={l} onClick={() => setLang(l)} aria-pressed={lang === l} className={lang === l ? 'is-on' : ''}>
          {lang === l && <motion.span layoutId={dark ? 'lang-pill-dark' : 'lang-pill'} className="lang__pill" transition={{ type: 'spring', stiffness: 420, damping: 32 }} />}
          <span className="lang__txt">{l.toUpperCase()}</span>
        </button>
      ))}
    </div>
  );
}

export default function Header() {
  const { t } = useLang();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(v > 24);
    setHidden(v > 420 && v > prev && !open);
  });

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  // La pestaña "Más" de la barra inferior (móvil) abre este menú
  useEffect(() => {
    const show = () => setOpen(true);
    window.addEventListener('kab:menu', show);
    return () => window.removeEventListener('kab:menu', show);
  }, []);

  return (
    <>
      <motion.header
        className={`header ${scrolled ? 'is-scrolled' : ''}`}
        animate={{ y: hidden ? '-110%' : '0%' }}
        transition={{ duration: 0.45, ease: EASINGS.smooth }}
      >
        <a href="#top" className="header__logo" aria-label={t.header.home}>
          <img src="/img/logo-kab.png" alt="K.A.B. Comercio Global Inc." />
        </a>
        <nav className="header__nav" aria-label="Principal">
          {t.header.links.map((label, i) => (
            <a key={HREFS[i]} href={HREFS[i]}>{label}</a>
          ))}
        </nav>
        <div className="header__actions">
          <LangSwitch />
          <a {...ctaLink(t.wa.default)} className="header__cta">{t.header.quote}</a>
          <button className="header__menu" aria-label={t.header.open} onClick={() => setOpen(true)}>
            <Icon name="menu" size={22} stroke={2} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="menu"
            initial={{ clipPath: 'circle(0% at 92% 4%)' }}
            animate={{ clipPath: 'circle(150% at 92% 4%)' }}
            exit={{ clipPath: 'circle(0% at 92% 4%)' }}
            transition={{ duration: 0.7, ease: EASINGS.premium }}
          >
            <div className="menu__top">
              <img src="/img/logo-kab-light.png" alt="K.A.B. Comercio Global Inc." className="menu__logo" />
              <button className="header__menu header__menu--dark" aria-label={t.header.close} onClick={() => setOpen(false)}>
                <Icon name="close" size={22} stroke={2} />
              </button>
            </div>
            <nav className="menu__nav">
              {t.header.links.map((label, i) => (
                <div className="reveal-mask" key={HREFS[i]}>
                  <motion.a
                    href={HREFS[i]}
                    onClick={() => setOpen(false)}
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.25 + i * 0.06, duration: 0.7, ease: EASINGS.premium }}
                  >
                    <span className="menu__num">0{i + 1}</span>
                    {label}
                  </motion.a>
                </div>
              ))}
            </nav>
            <motion.div
              className="menu__contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <LangSwitch dark />
              <a {...ctaLink(t.wa.default)} onClick={() => setOpen(false)} className="btn btn--primary menu__cta">
                {t.header.quote} <Icon name="arrow" size={18} stroke={2.2} />
              </a>
              {HAS_WHATSAPP && CONTACT.phone && <a {...ctaLink(t.wa.default)}><Icon name="whatsapp" size={18} /> {CONTACT.phone}</a>}
              {CONTACT.email && <a href={`mailto:${CONTACT.email}`}><Icon name="mail" size={18} /> {CONTACT.email}</a>}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
