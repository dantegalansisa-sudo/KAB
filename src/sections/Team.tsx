import { motion } from 'framer-motion';
import RevealText from '../components/RevealText';
import Icon from '../components/Icon';
import { TEAM, fmtPhone, telHref } from '../data';
import { useLang } from '../i18n';
import { EASINGS, fadeUp } from '../utils/easings';

const initials = (name: string) => name.split(' ').map((w) => w[0]).join('').slice(0, 2);

export default function Team() {
  const { t } = useLang();
  const tm = t.team;

  return (
    <section className="team" id="equipo">
      <div className="section-head">
        <motion.span className="eyebrow" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {tm.eyebrow}
        </motion.span>
        <RevealText tag="h2" className="section-title" accent={tm.accent}>
          {tm.title}
        </RevealText>
        <motion.p className="section-sub" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {tm.sub}
        </motion.p>
      </div>

      <div className="team__grid">
        {TEAM.map((m, i) => (
          <motion.article
            key={m.name}
            className="member"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: { opacity: 0, y: 60 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: i * 0.15, ease: EASINGS.premium } },
            }}
          >
            {/* La foto se descubre de abajo hacia arriba; la dispara la tarjeta (un elemento recortado no "entra" en pantalla) */}
            <motion.div
              className="member__photo"
              variants={{
                hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
                visible: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.1, delay: 0.15 + i * 0.15, ease: EASINGS.cinematic } },
              }}
            >
              {m.photo ? (
                <img src={m.photo} alt={`${m.name} — ${tm.roles[m.role]}`} loading="lazy" />
              ) : (
                <>
                  <span className="member__initials" aria-hidden="true">{initials(m.name)}</span>
                  <span className="member__soon">{tm.photoSoon}</span>
                </>
              )}
            </motion.div>
            <div className="member__info">
              <span className="member__role">{tm.roles[m.role]}</span>
              <h3>{m.name}</h3>
              <a className="member__tel" href={telHref(m.phone)} aria-label={`${tm.call} ${m.name}`}>
                <Icon name="phone" size={16} /> {fmtPhone(m.phone)}
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
