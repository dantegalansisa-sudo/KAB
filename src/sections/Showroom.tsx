import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import RevealText from '../components/RevealText';
import Icon from '../components/Icon';
import { HAS_WHATSAPP, wa } from '../data';
import { useLang } from '../i18n';
import { AREAS, fold, photo, type AreaId } from '../showroom';
import { EASINGS, fadeUp } from '../utils/easings';
import { MOBILE, useMediaQuery } from '../hooks/useMediaQuery';
import type { QuotePrefill } from './Tools';

type Pic = { area: AreaId; i: number };

const areaOf = (id: AreaId) => AREAS.find((a) => a.id === id)!;

/**
 * Showroom por espacios: grupos (Hogar / Construcción / Entretenimiento) → áreas → fotos.
 * Pocas fotos a la vez (portada + cuadrícula corta con "Ver más"), buscador y visor a pantalla completa.
 */
export default function Showroom({ onInterest }: { onInterest: (p: Omit<QuotePrefill, 'nonce'>) => void }) {
  const { t } = useLang();
  const s = t.showroom;
  const mobile = useMediaQuery(MOBILE);
  const [group, setGroup] = useState(0);
  const [areaId, setAreaId] = useState<AreaId>('sala');
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [viewer, setViewer] = useState<{ list: Pic[]; index: number } | null>(null);

  const area = areaOf(areaId);
  const txt = s.areas[areaId];
  const all: Pic[] = area.sizes.map((_, i) => ({ area: areaId, i }));
  // Fotos de origen pequeñas: en PC la portada es un mosaico de 4 en vez de una foto ampliada
  const mosaic = !mobile && area.sizes[0][0] < 1000 && all.length > 4;
  const rest = all.slice(mosaic ? 4 : 1);
  const limit = mobile ? 4 : 8;
  const shown = expanded ? rest : rest.slice(0, limit);

  const pickGroup = (g: number) => {
    setGroup(g);
    setAreaId(AREAS.find((a) => a.group === g)!.id);
    setExpanded(false);
  };
  const pickArea = (id: AreaId) => { setAreaId(id); setExpanded(false); };

  // Buscador: todas las palabras deben aparecer en el área o en el título de la foto
  const q = fold(query.trim());
  const results = useMemo<Pic[]>(() => {
    if (!q) return [];
    const words = q.split(/\s+/);
    const out: Pic[] = [];
    for (const a of AREAS) {
      const at = s.areas[a.id];
      const base = fold(`${at.name} ${at.desc} ${a.keywords} ${s.groups[a.group]}`);
      at.items.forEach((label, i) => {
        const hay = `${base} ${fold(label)}`;
        if (words.every((w) => hay.includes(w))) out.push({ area: a.id, i });
      });
    }
    return out;
  }, [q, s]);

  const interest = (p: Pic) => {
    const a = areaOf(p.area);
    const at = s.areas[p.area];
    const message = s.msg(at.name, at.items[p.i]);
    if (HAS_WHATSAPP) {
      window.open(wa(message), '_blank', 'noopener');
      return;
    }
    // Sin WhatsApp: cierra el visor y pasa la solicitud al formulario de contacto
    setViewer(null);
    window.setTimeout(() => onInterest({ message, service: a.service, origin: a.origin }), 320);
  };

  const card = (p: Pic, k: number, tag = false) => {
    const [w, h] = areaOf(p.area).sizes[p.i];
    const at = s.areas[p.area];
    const list = q ? results : all;
    return (
      <motion.button
        key={`${p.area}-${p.i}`}
        type="button"
        className="sr-item"
        onClick={() => setViewer({ list, index: list.findIndex((x) => x.area === p.area && x.i === p.i) })}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: Math.min(k, 8) * 0.06, ease: EASINGS.smooth }}
      >
        <img src={photo(p.area, p.i, true)} width={w} height={h} alt={at.items[p.i]} loading="lazy" decoding="async" />
        {tag && <span className="sr-item__tag">{at.name}</span>}
        <span className="sr-item__cap">{at.items[p.i]}</span>
      </motion.button>
    );
  };

  return (
    <section className="showroom" id="showroom">
      <div className="section-head sr-head">
        <div>
          <motion.span className="eyebrow" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {s.eyebrow}
          </motion.span>
          <RevealText tag="h2" className="section-title" accent={s.accent}>
            {s.title}
          </RevealText>
          <motion.p className="section-sub" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {s.sub}
          </motion.p>
        </div>
        <motion.label className="sr-search" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Icon name="search" size={19} />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={s.search}
            aria-label={s.searchLabel}
            enterKeyHint="search"
          />
          {query && (
            <button type="button" className="sr-search__clear" onClick={() => setQuery('')} aria-label={s.clear}>
              <Icon name="close" size={16} />
            </button>
          )}
        </motion.label>
      </div>

      {q ? (
        <div className="sr-results">
          <p className="sr-results__count">{s.results(results.length)}</p>
          {results.length ? (
            <div className="sr-grid">{results.map((p, k) => card(p, k, true))}</div>
          ) : (
            <p className="sr-results__empty">{s.empty}</p>
          )}
        </div>
      ) : (
        <>
          <div className="sr-nav">
            <div className="sr-groups" role="tablist">
              {s.groups.map((g, i) => (
                <button key={g} type="button" role="tab" aria-selected={group === i} className={group === i ? 'is-on' : ''} onClick={() => pickGroup(i)}>
                  {group === i && <motion.span layoutId="sr-group-pill" className="sr-groups__pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                  <span className="sr-groups__txt">{g}</span>
                </button>
              ))}
            </div>
            <div className="sr-areas">
              <AnimatePresence mode="popLayout" initial={false}>
                {AREAS.filter((a) => a.group === group).map((a, k) => (
                  <motion.button
                    key={a.id}
                    type="button"
                    className={`sr-area ${a.id === areaId ? 'is-on' : ''}`}
                    onClick={() => pickArea(a.id)}
                    aria-pressed={a.id === areaId}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: k * 0.05 } }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <Icon name={a.icon} size={18} />
                    {s.areas[a.id].name}
                    <span className="sr-area__n">{a.sizes.length}</span>
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <div className="sr-feature">
            <AnimatePresence initial={false}>
              {mosaic ? (
                <motion.div
                  key={areaId}
                  className="sr-feature__media sr-mosaic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {all.slice(0, 4).map((p, k) => (
                    <motion.button
                      key={k}
                      type="button"
                      onClick={() => setViewer({ list: all, index: k })}
                      aria-label={txt.items[k]}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, delay: k * 0.08, ease: EASINGS.smooth }}
                    >
                      <img src={photo(p.area, p.i)} alt={txt.items[k]} />
                    </motion.button>
                  ))}
                </motion.div>
              ) : (
                <motion.button
                  key={areaId}
                  type="button"
                  className="sr-feature__media"
                  onClick={() => setViewer({ list: all, index: 0 })}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: EASINGS.smooth }}
                  aria-label={txt.items[0]}
                >
                  <img src={photo(areaId, 0)} alt={txt.items[0]} />
                </motion.button>
              )}
            </AnimatePresence>
            <div className="sr-feature__shade" aria-hidden="true" />
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={areaId}
                className="sr-feature__text"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: EASINGS.smooth }}
              >
                <span className="sr-feature__count"><Icon name={area.icon} size={16} /> {area.sizes.length} {s.photos}</span>
                <h3>{txt.name}</h3>
                <p>{txt.desc}</p>
                <button type="button" className="btn btn--primary btn--sm" onClick={() => interest({ area: areaId, i: 0 })}>
                  {s.quoteArea} <Icon name="arrow" size={18} stroke={2.2} />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="sr-grid" key={areaId}>
            {shown.map((p, k) => card(p, k))}
          </div>
          {rest.length > limit && (
            <div className="sr-more">
              <button type="button" className="btn btn--ghost" onClick={() => setExpanded((v) => !v)}>
                {expanded ? s.less : `${s.more} (+${rest.length - limit})`}
              </button>
            </div>
          )}
        </>
      )}

      <p className="sr-note">{s.note}</p>

      {createPortal(
        <AnimatePresence>
          {viewer && (
            <Viewer
              key="viewer"
              list={viewer.list}
              index={viewer.index}
              onIndex={(index) => setViewer((v) => (v ? { ...v, index } : v))}
              onClose={() => setViewer(null)}
              onInterest={interest}
            />
          )}
        </AnimatePresence>,
        document.body,
      )}
    </section>
  );
}

/** Visor a pantalla completa: flechas, teclado y deslizar con el dedo */
function Viewer({ list, index, onIndex, onClose, onInterest }: {
  list: Pic[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
  onInterest: (p: Pic) => void;
}) {
  const { t } = useLang();
  const s = t.showroom;
  const p = list[index];
  const at = s.areas[p.area];
  const [dir, setDir] = useState(1);
  const go = (d: number) => {
    setDir(d);
    onIndex((index + d + list.length) % list.length);
  };

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  });

  return (
    <motion.div
      className="viewer"
      role="dialog"
      aria-modal="true"
      aria-label={at.items[p.i]}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="viewer__stage" onClick={onClose}>
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.img
            key={`${p.area}-${p.i}`}
            src={photo(p.area, p.i)}
            alt={at.items[p.i]}
            custom={dir}
            initial={{ opacity: 0, x: dir * 80, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: dir * -80, scale: 0.96 }}
            transition={{ duration: 0.45, ease: EASINGS.smooth }}
            drag={list.length > 1 ? 'x' : false}
            dragSnapToOrigin
            dragElastic={0.6}
            onDragEnd={(_, info) => {
              if (info.offset.x < -70) go(1);
              else if (info.offset.x > 70) go(-1);
            }}
            onClick={(e) => e.stopPropagation()}
            draggable={false}
          />
        </AnimatePresence>
      </div>

      <div className="viewer__bar">
        <div className="viewer__info">
          <span className="viewer__area">{at.name} · {index + 1} / {list.length}</span>
          <strong>{at.items[p.i]}</strong>
        </div>
        <div className="viewer__actions">
          {list.length > 1 && (
            <button type="button" className="viewer__nav viewer__nav--flip" aria-label={s.prev} onClick={() => go(-1)}><Icon name="arrow" size={18} /></button>
          )}
          <button type="button" className="btn btn--primary btn--sm viewer__cta" onClick={() => onInterest(p)}>
            {s.interest} <Icon name="arrow" size={18} stroke={2.2} />
          </button>
          {list.length > 1 && (
            <button type="button" className="viewer__nav" aria-label={s.next} onClick={() => go(1)}><Icon name="arrow" size={18} /></button>
          )}
        </div>
      </div>
      <button type="button" className="viewer__close" aria-label={s.close} onClick={onClose}><Icon name="close" size={22} /></button>
    </motion.div>
  );
}
