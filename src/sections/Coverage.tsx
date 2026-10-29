import { useState } from 'react';
import { motion } from 'framer-motion';
import RevealText from '../components/RevealText';
import { EASINGS, fadeUp } from '../utils/easings';
import { useLang } from '../i18n';

// Destino: San Juan, Puerto Rico (coordenadas sobre mapa.webp, 968×420)
const DR = { x: 306, y: 192 };

// Orígenes repartidos por el mapa: el mensaje es "alcance mundial", sin nombrar países.
// `group` decide qué rutas se encienden con cada pestaña (la última enciende todas).
const ROUTES = [
  { x: 760, y: 150, lift: -40, group: 0 },
  { x: 470, y: 95, lift: -10, group: 0 },
  { x: 780, y: 315, lift: 30, group: 0 },
  { x: 640, y: 195, lift: -20, group: 1 },
  { x: 475, y: 255, lift: 40, group: 1 },
  { x: 255, y: 285, lift: 20, group: 1 },
  { x: 180, y: 105, lift: 0, group: 1 },
];
const TABS = 3;

const arc = (a: { x: number; y: number }, lift: number) => {
  const mx = (a.x + DR.x) / 2;
  const my = Math.min(a.y, DR.y) - Math.abs(a.x - DR.x) * 0.22 - lift * 0.3;
  return `M${a.x} ${a.y} Q ${mx} ${my} ${DR.x} ${DR.y}`;
};

export default function Coverage() {
  const { t } = useLang();
  const cv = t.coverage;
  const [active, setActive] = useState(0);

  return (
    <section className="coverage" id="cobertura">
      <div className="section-head">
        <motion.span className="eyebrow" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {cv.eyebrow}
        </motion.span>
        <RevealText tag="h2" className="section-title" accent={cv.accent}>
          {cv.title}
        </RevealText>
        <motion.p className="section-sub" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {cv.sub}
        </motion.p>
      </div>

      <div className="map">
        <img src="/img/mapa.webp" alt={cv.mapAlt} loading="lazy" />
        <svg viewBox="0 0 968 420" preserveAspectRatio="xMidYMid slice" className="map__svg" aria-hidden="true">
          {ROUTES.map((p, i) => {
            const on = active === TABS - 1 || p.group === active;
            return (
              <g key={i} className={on ? 'is-on' : ''}>
                <motion.path
                  d={arc(p, p.lift)}
                  className="map__route"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.6, delay: 0.2 + i * 0.15, ease: EASINGS.smooth }}
                />
                {on && (
                  <circle r="5" className="map__traveler">
                    <animateMotion dur={`${2.6 + (i % 3) * 0.6}s`} repeatCount="indefinite" path={arc(p, p.lift)} />
                  </circle>
                )}
                <circle cx={p.x} cy={p.y} r={on ? 7 : 5} className="map__origin" />
              </g>
            );
          })}
          <circle cx={DR.x} cy={DR.y} r="22" className="map__pulse" />
          <circle cx={DR.x} cy={DR.y} r="9" className="map__dr" />
          <g className="map__tag" transform={`translate(${DR.x - 92} ${DR.y + 26})`}>
            <rect width="184" height="30" rx="15" />
            <text x="92" y="20" textAnchor="middle">{cv.dr}</text>
          </g>
        </svg>
      </div>

      <div className="regions">
        {cv.regions.map((r, i) => (
          <button key={r.label} className={`region ${active === i ? 'is-active' : ''}`} onClick={() => setActive(i)}>
            <span className="region__label">{r.label}</span>
            <span className="region__desc">{r.desc}</span>
            {active === i && <motion.span layoutId="region-bar" className="region__bar" />}
          </button>
        ))}
      </div>
    </section>
  );
}
