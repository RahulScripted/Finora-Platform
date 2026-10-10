import { motion } from 'framer-motion';

type AnimatedPathProps = {
  d: string;
  id: string;
};

/** A connector line with an animated gradient pulse traveling along it. */
export function AnimatedPath({ d, id }: AnimatedPathProps) {
  return (
    <>
      <path d={d} stroke="currentColor" strokeWidth="1" fill="none" className="text-border" />
      <motion.path
        d={d}
        stroke={`url(#${id})`}
        strokeWidth="2"
        fill="none"
        strokeDasharray="40 160"
        initial={{ strokeDashoffset: 200 }}
        animate={{ strokeDashoffset: -200 }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'linear',
          delay: Math.random() * 2,
        }}
      />
      <defs>
        <linearGradient id={id} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="50%" stopColor="var(--color-primary)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
    </>
  );
}
