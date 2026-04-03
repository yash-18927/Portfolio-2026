'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

export default function HeroOverlay() {
  const { scrollY } = useScroll();

  // Hero text fades out as user starts scrolling
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroYOffset = useTransform(scrollY, [0, 400], [0, -80]);

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: {
      delay,
      duration: 0.9,
      ease: 'easeOut' as const,
    },
  });

  return (
    <div className="absolute inset-0 pointer-events-none">
      <div
        className="absolute inset-0 flex flex-col justify-end pointer-events-none"
        style={{
          // Tighter bottom padding on mobile, roomier on desktop
          paddingBottom: 'clamp(2rem, 6vh, 6rem)',
          paddingLeft: 'clamp(1.25rem, 4vw, 4rem)',
          paddingRight: 'clamp(1.25rem, 4vw, 4rem)',
        }}
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
              // Slightly smaller on mobile, readable on desktop
              fontSize: 'clamp(0.55rem, 1.5vw, 0.65rem)',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.35)',
              marginBottom: 'clamp(0.5rem, 1.5vh, 1rem)',
            }}
          >
            AI &amp; ML Student
          </motion.p>

          {/* Main headline — YASH */}
          <div style={{ overflow: 'hidden' }}>
            <motion.h1
              {...fadeUp(0.15)}
              style={{
                fontFamily: 'var(--font-inter)',
                // Proper mobile-first hero scaling: large enough to feel cinematic even on 375px wide
                fontSize: 'clamp(3.5rem, 14vw, 9rem)',
                fontWeight: 900,
                letterSpacing: '-0.05em',
                lineHeight: 0.9,
                color: '#fff',
                marginBottom: '0.15rem',
              }}
            >
              YASH
            </motion.h1>
          </div>

          {/* Main headline — VARDHAN */}
          <div style={{ overflow: 'hidden' }}>
            <motion.div
              {...fadeUp(0.3)}
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'clamp(3.5rem, 14vw, 9rem)',
                fontWeight: 900,
                letterSpacing: '-0.05em',
                lineHeight: 0.9,
                color: 'transparent',
                WebkitTextStroke: '0.5px rgba(255,255,255,0.6)',
                marginBottom: 'clamp(1rem, 3vh, 2rem)',
              }}
            >
              VARDHAN
            </motion.div>
          </div>

          {/* Description — hidden on very small screens to avoid clutter */}
          <motion.p
            {...fadeUp(0.45)}
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 'clamp(0.8rem, 1.8vw, 1rem)',
              color: 'rgba(255,255,255,0.5)',
              maxWidth: 'clamp(240px, 55vw, 380px)',
              lineHeight: '1.7',
              fontWeight: 300,
              marginBottom: 'clamp(1.5rem, 4vh, 2.5rem)',
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
                width: '32px',
                height: '0.5px',
                background: 'rgba(255,255,255,0.25)',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.55rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.25)',
              }}
            >
              Scroll to explore
            </span>
            <motion.span
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.55rem' }}
            >
              ↓
            </motion.span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
