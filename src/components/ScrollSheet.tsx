import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';

/**
 * Animación de scroll para cada sección en móvil: la sección sube como una hoja,
 * pasando de reducida y algo transparente a su tamaño completo.
 */
export default function ScrollSheet({ children, enabled }: { children: React.ReactNode; enabled: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 35%'] });
  const p = useSpring(scrollYProgress, { stiffness: 160, damping: 28, mass: 0.5 });
  const y = useTransform(p, [0, 1], [80, 0]);
  const scale = useTransform(p, [0, 1], [0.9, 1]);
  const opacity = useTransform(p, [0, 0.55], [0.25, 1]);

  if (!enabled || reduce) return <>{children}</>;
  return (
    <motion.div ref={ref} style={{ y, scale, opacity, transformOrigin: '50% 0%' }}>
      {children}
    </motion.div>
  );
}
