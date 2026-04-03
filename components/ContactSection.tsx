'use client';

import { motion } from 'framer-motion';
import { GitBranch, Link2, Mail, ArrowUpRight } from 'lucide-react';
import CyberGrid from '@/components/CyberGrid';

const socials = [
  { icon: GitBranch, label: 'GitHub', href: 'https://github.com/yash-18927' },
  { icon: Link2, label: 'LinkedIn', href: 'https://www.linkedin.com/in/yashhvs' },
  { icon: Mail, label: 'Email', href: 'mailto:aysingh18927@gmail.com' },
];

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="section-pad stick-border-top"
      style={{
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 3D Animated Cyber Grid / Wireframe Floor */}
      <CyberGrid />

      {/* Background glow blob */}
      <div
        style={{
          position: 'absolute',
          bottom: '-20%',
          right: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="label-mono"
          style={{ marginBottom: '2rem' }}
        >
          Let&apos;s build something
        </motion.p>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="headline-xl"
          style={{ marginBottom: '4rem', maxWidth: '800px', lineHeight: '1.05' }}
        >
          If you&apos;ve got an <span style={{ fontSize: '0.85em' }}>i</span>dea,&nbsp;
          <span style={{ color: 'transparent', WebkitTextStroke: '0.5px rgba(255,255,255,0.6)' }}>
            let&apos;s make it real
          </span>
        </motion.h2>

        {/* CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass glow-white grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-6 md:gap-8 mb-[5rem]"
          style={{
            padding: 'clamp(2rem, 4vw, 3rem)',
          }}
        >
          <div>
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontWeight: 600,
                fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
                letterSpacing: '-0.03em',
                color: '#fff',
                marginBottom: '0.5rem',
              }}
            >
              Currently Learning &amp; Building
            </p>
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.9rem',
                color: 'rgba(255,255,255,0.4)',
                fontWeight: 300,
              }}
            >
              Kota, Rajasthan, India • aysingh18927@gmail.com
            </p>
          </div>
          <motion.a
            href="mailto:aysingh18927@gmail.com"
            className="pill-btn"
            style={{ padding: '0.9rem 2rem', whiteSpace: 'nowrap' }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 120, damping: 25 }}
          >
            <span>Say Hello</span>
            <ArrowUpRight size={12} />
          </motion.a>
        </motion.div>

        {/* Social links + footer */}
        <div
          className="stick-border-top"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '2rem',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          {/* Socials */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {socials.map(({ icon: Icon, label, href }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                title={label}
                style={{
                  width: '40px',
                  height: '40px',
                  border: '0.5px solid rgba(255,255,255,0.15)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255,255,255,0.5)',
                  transition: 'color 0.3s, border-color 0.3s',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                }}
              >
                <Icon size={14} />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.18em',
              color: 'rgba(255,255,255,0.2)',
              textTransform: 'uppercase',
            }}
          >
            © {new Date().getFullYear()} Yash Vardhan Singh
          </p>
        </div>
      </div>
    </section>
  );
}
