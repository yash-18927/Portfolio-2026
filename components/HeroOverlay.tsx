'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

export default function HeroOverlay() {
  // Hook into the native scroll position
  const { scrollY } = useScroll();
  
  // Transform scroll position into opacity and y-offset for the original hero text
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroYOffset = useTransform(scrollY, [0, 400], [0, -100]);

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: {
      delay,
      duration: 0.9,
      ease: 'easeOut' as const,
    },
  });

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* 
        Container for original Hero Text (YASH VARDHAN)
      */}
      <div 
        className="absolute inset-0 flex flex-col justify-end pointer-events-none"
        style={{ paddingBottom: 'clamp(3rem, 8vh, 6rem)', paddingLeft: 'clamp(1.5rem, 4vw, 4rem)' }}
      >
        <motion.div 
          style={{ opacity: heroOpacity, y: heroYOffset }}
          className="pointer-events-none flex flex-col"
        >
          {/* Label */}
          <motion.p
            {...fadeUp(0)}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.35)',
              marginBottom: '1rem',
            }}
          >
            AI &amp; ML Student
          </motion.p>

          {/* Main headline */}
          <div style={{ overflow: 'hidden' }}>
            <motion.h1
              {...fadeUp(0.15)}
              className="headline-xl"
              style={{ color: '#fff', marginBottom: '0.25rem' }}
            >
              YASH
            </motion.h1>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <motion.div
              {...fadeUp(0.3)}
              className="headline-xl"
              style={{
                color: 'transparent',
                WebkitTextStroke: '0.5px rgba(255,255,255,0.6)',
                marginBottom: '2rem',
              }}
            >
              VARDHAN
            </motion.div>
          </div>

          {/* Description */}
          <motion.p
            {...fadeUp(0.45)}
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
              color: 'rgba(255,255,255,0.45)',
              maxWidth: '380px',
              lineHeight: '1.7',
              fontWeight: 300,
              marginBottom: '2.5rem',
            }}
          >
            Learning and Building Strong Foundations in Tech
          </motion.p>

          {/* Scroll hint */}
          <motion.div
            {...fadeUp(0.6)}
            className="flex items-center gap-3 pointer-events-auto"
          >
            <div
              style={{
                width: '40px',
                height: '0.5px',
                background: 'rgba(255,255,255,0.3)',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.3)',
              }}
            >
              Scroll to explore
            </span>
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.6rem' }}
            >
              ↓
            </motion.span>
          </motion.div>
        </motion.div>
      </div>

    </div>
  );
}
