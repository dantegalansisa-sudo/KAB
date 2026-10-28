import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  magnetRadius?: number;
  magnetStrength?: number;
  external?: boolean;
  type?: 'button' | 'submit';
}

export default function MagneticButton({
  children, href, onClick, className = '', magnetRadius = 90, magnetStrength = 0.3, external, type = 'button',
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    if (Math.hypot(dx, dy) < magnetRadius) setPos({ x: dx * magnetStrength, y: dy * magnetStrength });
  };

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={() => setPos({ x: 0, y: 0 })} className="magnetic">
      <motion.div
        animate={{ x: pos.x, y: pos.y }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        whileTap={{ scale: 0.96 }}
      >
        {href ? (
          <a href={href} className={className} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
            {children}
          </a>
        ) : (
          <button type={type} onClick={onClick} className={className}>{children}</button>
        )}
      </motion.div>
    </div>
  );
}
