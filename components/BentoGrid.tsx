'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  tags: string[];
  size: 'large' | 'medium' | 'small';
  link?: string;
  accent?: string;
}

const projects: Project[] = [
  {
    id: 'p1',
    title: 'Smart Curriculum & Attendance',
    category: 'System Design',
    year: '2025',
    tags: ['Frontend', 'Hackathon Runner-Up'],
    link: 'https://smartcurriculum.netlify.app/',
    size: 'large',
  },
  {
    id: 'p2',
    title: 'Mentor-Mentee Connection Platform',
    category: 'Web Interface',
    year: '2025',
    tags: ['Frontend', 'UI/UX'],
    link: 'https://yash-18927.github.io/CPU-atd/',
    size: 'medium',
  },
  {
    id: 'p3',
    title: 'Gesture Control System',
    category: 'Computer Vision',
    year: '2025',
    tags: ['Python', 'OpenCV', 'MediaPipe'],
    link: 'https://github.com/yash-18927/Gesture-Control-System-.git',
    size: 'medium',
  },
  {
    id: 'p4',
    title: 'Mastering the Fundamentals',
    category: 'Currently Learning',
    year: '',
    tags: ['Machine Learning', 'DBMS', 'Web Dev', 'DSA'],
    size: 'large',
  },
];

function TiltCard({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [8, -8]), {
    stiffness: 120,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 120,
    damping: 25,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return;
    
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rawX.set(x);
    rawY.set(y);
  };

  const handleMouseLeave = () => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return;
    
    rawX.set(0);
    rawY.set(0);
  };

  const sizeStyle: React.CSSProperties =
    project.size === 'large'
      ? { minHeight: '280px' }
      : project.size === 'medium'
      ? { minHeight: '240px' }
      : { minHeight: '200px' };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...sizeStyle,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: '800px',
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 120, damping: 25 }}
      className="glass glass-hover glow-white-hover"
      id={`project-card-${project.id}`}
    >
      <div
        style={{
          padding: 'clamp(1.25rem, 2vw, 2rem)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transform: 'translateZ(20px)',
        }}
      >
        <div>
          {/* Category + Year */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem',
            }}
          >
            <span className="label-mono">{project.category}</span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: 'rgba(255,255,255,0.25)',
                letterSpacing: '0.15em',
              }}
            >
              {project.year}
            </span>
          </div>

          {/* Title */}
          <h3
            style={{
              fontFamily: 'var(--font-inter)',
              fontWeight: 700,
              fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
              letterSpacing: '-0.03em',
              color: '#fff',
              lineHeight: 1.05,
            }}
          >
            {project.title}
          </h3>
        </div>

        {/* Tags + Arrow */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.58rem',
                  letterSpacing: '0.12em',
                  color: 'rgba(255,255,255,0.35)',
                  border: '0.5px solid rgba(255,255,255,0.15)',
                  borderRadius: '9999px',
                  padding: '0.2rem 0.6rem',
                  textTransform: 'uppercase',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          {project.link ? (
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 4, y: -4 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              style={{
                width: '36px',
                height: '36px',
                border: '0.5px solid rgba(255,255,255,0.2)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(255,255,255,0.5)',
                fontSize: '0.85rem',
                flexShrink: 0,
                marginLeft: '1rem',
                textDecoration: 'none',
              }}
            >
              ↗
            </motion.a>
          ) : (
            <motion.div
              whileHover={{ x: 4, y: -4 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              style={{
                width: '36px',
                height: '36px',
                border: '0.5px solid rgba(255,255,255,0.2)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(255,255,255,0.5)',
                fontSize: '0.85rem',
                flexShrink: 0,
                marginLeft: '1rem',
              }}
            >
              ↗
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function BentoGrid() {
  return (
    <section
      id="work"
      className="section-pad"
      style={{ maxWidth: '1200px', margin: '0 auto' }}
    >
      {/* Section label */}
      <div
        className="stick-border-bottom"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: '2rem',
          marginBottom: '3rem',
        }}
      >
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="headline-lg"
        >
          Selected Work
        </motion.h2>
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="label-mono"
        >
          {new Date().getFullYear()} Portfolio
        </motion.span>
      </div>

      {/* Bento grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
          hidden: {},
        }}
        className="grid grid-cols-1 md:grid-cols-3 gap-[0.5px] bg-white/10 border border-white/10"
      >
        {projects.map((project) => (
          <motion.div
            key={project.id}
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            className={project.size === 'large' ? 'col-span-1 md:col-span-2' : 'col-span-1'}
          >
            <TiltCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
