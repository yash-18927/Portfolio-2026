'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';


const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
];

export default function LiquidHeader() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  // Smooth spring values
  const rawPadding = useTransform(scrollY, [0, 80], [20, 10]);
  const paddingY = useSpring(rawPadding, { stiffness: 120, damping: 25 });

  const rawBlur = useTransform(scrollY, [0, 120], [12, 48]);
  const blurPx = useSpring(rawBlur, { stiffness: 120, damping: 25 });



  useEffect(() => {
    const unsub = scrollY.on('change', (v) => setScrolled(v > 30));
    return () => unsub();
  }, [scrollY]);

  return (
    <motion.header
      id="liquid-header"
      className="fixed top-0 left-0 right-0 z-50 flex justify-center"
      style={{ paddingTop: paddingY, paddingBottom: paddingY }}
    >
      <motion.nav
        className="flex items-center gap-2 md:gap-8 px-3 md:px-6 rounded-full"
        style={{
          backdropFilter: blurPx.get ? `blur(${blurPx.get()}px)` : 'blur(12px)',
          WebkitBackdropFilter: 'blur(40px)',
          border: '0.5px solid rgba(255,255,255,0.15)',
          background: `rgba(0,0,0,${scrolled ? 0.12 : 0})`,
          transition: 'background 0.4s ease',
        }}
      >
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="hidden sm:flex items-center gap-2 py-3 pr-2 md:pr-4"
          style={{ borderRight: '0.5px solid rgba(255,255,255,0.12)' }}
        >
          <span
            style={{
              fontFamily: 'var(--font-inter)',
              fontWeight: 800,
              fontSize: '1rem',
              letterSpacing: '-0.04em',
              color: '#fff',
            }}
          >
            YVS
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              color: 'rgba(255,255,255,0.35)',
              textTransform: 'uppercase',
              alignSelf: 'flex-end',
              marginBottom: '1px',
            }}
          >
            ™
          </span>
        </motion.div>

        {/* Nav Links */}
        <div className="flex items-center gap-3 md:gap-6 py-3">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="link-underline"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.6)',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = 'rgba(255,255,255,1)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')
              }
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <motion.a
          href="mailto:aysingh18927@gmail.com"
          className="pill-btn py-1.5 px-3 md:py-2 md:px-5 ml-1 md:ml-0"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 120, damping: 25 }}
        >
          <span>Hire Me</span>
        </motion.a>
      </motion.nav>
    </motion.header>
  );
}
