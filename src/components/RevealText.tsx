import { motion } from 'framer-motion';
import { EASINGS } from '../utils/easings';

interface Props {
  children: string;
  className?: string;
  delay?: number;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  /** palabras (por índice) que se pintan con el acento naranja */
  accent?: number[];
  /** salto de línea después de estos índices (móvil y tablet) */
  breaks?: number[];
  /** salto de línea en escritorio; si no se pasa, se usan los de `breaks` */
  deskBreaks?: number[];
  immediate?: boolean;
}

const word = {
  hidden: { y: '110%', rotate: 3 },
  visible: (d: number) => ({ y: 0, rotate: 0, transition: { duration: 0.85, delay: d, ease: EASINGS.premium } }),
};

// El observer va en el titular (visible), no en cada palabra: las palabras arrancan
// fuera de su máscara overflow:hidden y el IntersectionObserver nunca las detectaría.
export default function RevealText({
  children, className = '', delay = 0, tag = 'h2', accent = [], breaks = [], deskBreaks, immediate,
}: Props) {
  const Tag = motion[tag];
  const words = children.split(' ');
  return (
    <Tag
      key={children}
      className={`reveal-text ${className}`}
      aria-label={children}
      initial="hidden"
      {...(immediate ? { animate: 'visible' } : { whileInView: 'visible', viewport: { once: true, amount: 0.4 } })}
    >
      {words.map((w, i) => (
        <span key={i} aria-hidden="true" className="reveal-word-wrap">
          <span className="reveal-mask">
            <motion.span className={`reveal-word ${accent.includes(i) ? 'accent' : ''}`} variants={word} custom={delay + i * 0.07}>
              {w}
            </motion.span>
          </span>
          {' '}
          {deskBreaks ? (
            <>
              {breaks.includes(i) && <br className="br-m" />}
              {deskBreaks.includes(i) && <br className="br-d" />}
            </>
          ) : breaks.includes(i) && <br />}
        </span>
      ))}
    </Tag>
  );
}
