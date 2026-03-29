'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  progress: number;
  isReady: boolean;
}

export default function LoadingScreen({ progress, isReady }: LoadingScreenProps) {
  const ringRef = useRef<SVGCircleElement>(null);
  const circumference = 2 * Math.PI * 54; // r=54

  useEffect(() => {
    if (ringRef.current) {
      const offset = circumference - (progress / 100) * circumference;
      ringRef.current.style.strokeDashoffset = String(offset);
    }
  }, [progress, circumference]);

  return (
    <AnimatePresence>
      {!isReady && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
          id="loading-screen"
        >
          {/* Background grain texture */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
              backgroundSize: '256px 256px',
            }}
          />

          {/* SVG progress ring */}
          <div className="relative mb-10">
            <svg width="128" height="128" viewBox="0 0 128 128" className="-rotate-90">
              {/* Track */}
              <circle
                cx="64"
                cy="64"
                r="54"
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="0.5"
              />
              {/* Fill */}
              <circle
                ref={ringRef}
                cx="64"
                cy="64"
                r="54"
                fill="none"
                stroke="rgba(255,255,255,0.85)"
                strokeWidth="0.5"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference}
                style={{ transition: 'stroke-dashoffset 0.12s ease-out' }}
              />
            </svg>

            {/* Percentage number */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="font-mono text-white"
                style={{
                  fontSize: '1rem',
                  letterSpacing: '0.15em',
                  fontWeight: 400,
                }}
              >
                {String(progress).padStart(3, '0')}
              </span>
            </div>
          </div>

          {/* Brand name */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-center"
          >
            <p
              className="font-mono text-white"
              style={{
                fontSize: '0.65rem',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.4)',
                marginBottom: '0.35rem',
              }}
            >
              Loading... perfection takes a second... or ten.
            </p>
            <h1
              className="font-inter text-white"
              style={{
                fontSize: 'clamp(1.4rem, 4vw, 2.2rem)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
              }}
            >
              YASH VARDHAN
            </h1>
          </motion.div>

          {/* Bottom progress bar */}
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{
              height: '0.5px',
              background: 'rgba(255,255,255,0.08)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: `${progress}%`,
                background: 'rgba(255,255,255,0.6)',
                transition: 'width 0.12s ease-out',
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
