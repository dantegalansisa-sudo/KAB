import { useState } from 'react';
import { motion } from 'framer-motion';
import RevealText from '../components/RevealText';
import { EASINGS, fadeUp } from '../utils/easings';
import { useLang } from '../i18n';

// Destino: Puerto Rico (coordenadas sobre mapa.webp, 968×420)
const DR = { x: 306, y: 192 };

const REGIONS = [
  {
    id: 'asia',
    points: [{ x: 735, y: 180 }, { x: 752, y: 150 }],
    cy: -40,
  },
  {
    id: 'usa',
    points: [{ x: 252, y: 166 }, { x: 283, y: 126 }],
    cy: 60,
  },
  {
    id: 'eu',
    points: [{ x: 428, y: 124 }, { x: 463, y: 96 }],
    cy: 30,
  },
];

const arc = (a: { x: number; y: number }, lift: number) => {
  const mx = (a.x + DR.x) / 2;
  const my = Math.min(a.y, DR.y) - Math.abs(a.x - DR.x) * 0.22 - lift * 0.3;
  return `M${a.x} ${a.y} Q ${mx} ${my} ${DR.x} ${DR.y}`;
};

export default function Coverage() {
  const { t } = useLang();
  const cv = t.coverage;
  const [active, setActive] = useState('asia');

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
          {REGIONS.map((r) =>
            r.points.map((p, i) => {
              const on = r.id === active;
              return (
                <g key={`${r.id}-${i}`} className={on ? 'is-on' : ''}>
                  <motion.path
                    d={arc(p, r.cy + i * 20)}
                    className="map__route"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.6, delay: 0.2 + i * 0.2, ease: EASINGS.smooth }}
                  />
                  {on && (
                    <circle r="5" className="map__traveler">
                      <animateMotion dur={`${2.6 + i * 0.6}s`} repeatCount="indefinite" path={arc(p, r.cy + i * 20)} />
                    </circle>
                  )}
                  <circle cx={p.x} cy={p.y} r={on ? 7 : 5} className="map__origin" />
                </g>
              );
            }),
          )}
          <circle cx={DR.x} cy={DR.y} r="22" className="map__pulse" />
          <circle cx={DR.x} cy={DR.y} r="9" className="map__dr" />
          <g className="map__tag" transform={`translate(${DR.x - 92} ${DR.y + 22})`}>
            <rect width="184" height="30" rx="15" />
            <text x="92" y="20" textAnchor="middle">{cv.dr}</text>
          </g>
        </svg>
      </div>

      <div className="regions">
        {REGIONS.map((r, i) => (
          <button key={r.id} className={`region ${active === r.id ? 'is-active' : ''}`} onClick={() => setActive(r.id)}>
            <span className="region__label">{cv.regions[i].label}</span>
            <span className="region__desc">{cv.regions[i].desc}</span>
            {active === r.id && <motion.span layoutId="region-bar" className="region__bar" />}
          </button>
        ))}
      </div>
    </section>
  );
}
