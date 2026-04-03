'use client';

import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { motion } from 'framer-motion';
import { useImagePreloader } from '@/hooks/useImagePreloader';
import LoadingScreen from '@/components/LoadingScreen';
import LiquidHeader from '@/components/LiquidHeader';
import AntiGravityCanvas from '@/components/AntiGravityCanvas';
import HeroOverlay from '@/components/HeroOverlay';
import BentoGrid from '@/components/BentoGrid';
import ContactSection from '@/components/ContactSection';
import CustomCursor from '@/components/CustomCursor';
import ClickBurst from '@/components/ClickBurst';

const TOTAL_FRAMES = 300;

export default function HomePage() {
  const { images, progress, isReady } = useImagePreloader(TOTAL_FRAMES);

  // Detect touch/mobile once on mount
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.matchMedia('(hover: none), (pointer: coarse)').matches);
  }, []);

  // Initialize Lenis only on desktop — native scroll is faster on mobile
  useEffect(() => {
    if (!isReady || isMobile) return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [isReady, isMobile]);

  return (
    <main id="main-content" style={{ background: '#000', minHeight: '100vh' }}>
      {/* Cursor & click effects — desktop only, touch screens don't need these */}
      {!isMobile && <CustomCursor />}
      {!isMobile && <ClickBurst />}

      {/* Loading screen — unmounts with exit animation once isReady */}
      <LoadingScreen progress={progress} isReady={isReady} />

      {isReady && (
        <>
          {/* Floating pill navigation */}
          <LiquidHeader />

          {/* Canvas scroll animation section — 600vh scroll depth */}
          <AntiGravityCanvas images={images} totalFrames={TOTAL_FRAMES}>
            <HeroOverlay />
          </AntiGravityCanvas>

          {/* About / Transition strip */}
          <motion.section
            id="about"
            className="section-pad stick-border-top stick-border-bottom"
            style={{ maxWidth: '1200px', margin: '0 auto' }}
            initial={{ opacity: 0, y: isMobile ? 0 : 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: isMobile ? 0.5 : 1, ease: 'easeOut' }}
          >
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center"
            >
              <div>
                <p
                  className="label-mono"
                  style={{ marginBottom: '1.5rem' }}
                >
                  About
                </p>
                <h2
                  className="headline-lg"
                  style={{ marginBottom: '2rem' }}
                >
                  Specializing in AI &amp;{' '}
                  <span
                    style={{
                      color: 'transparent',
                      WebkitTextStroke: '0.5px rgba(255,255,255,0.7)',
                    }}
                  >
                    Machine Learning
                  </span>
                </h2>
              </div>
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
                    color: 'rgba(255,255,255,0.5)',
                    lineHeight: '1.8',
                    fontWeight: 300,
                    marginBottom: '2rem',
                    whiteSpace: 'pre-line' // To allow newlines in bio
                  }}
                >
                  I’m an AI & ML student focused on learning and strengthening my fundamentals in technology. 
                  I enjoy exploring new AI concepts, algorithms, and software, along with practicing problem-solving through DSA and hands-on projects.
                </p>
                <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
                  {[
                    { stat: '3+', label: 'Projects' },
                    { stat: '6+', label: 'Technologies' },
                    { stat: 'AI/ML', label: 'Focus' },
                  ].map(({ stat, label }) => (
                    <div key={label}>
                      <p
                        style={{
                          fontFamily: 'var(--font-inter)',
                          fontWeight: 800,
                          fontSize: '2rem',
                          letterSpacing: '-0.04em',
                          color: '#fff',
                          lineHeight: 1,
                        }}
                      >
                        {stat}
                      </p>
                      <p className="label-mono" style={{ marginTop: '0.25rem' }}>
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* Bento project grid with staggered reveal */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          >
            <BentoGrid />
          </motion.div>

          {/* Contact + footer */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <ContactSection />
          </motion.div>
        </>
      )}
    </main>
  );
}
