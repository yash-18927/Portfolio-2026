'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Represents a single "shatter" geometry piece
interface BurstParticle {
  id: string;
  x: number;
  y: number;
  angle: number;
  speed: number;
  size: number;
}

interface BurstEvent {
  id: string;
  x: number;
  y: number;
  particles: BurstParticle[];
}

export default function ClickBurst() {
  const [bursts, setBursts] = useState<BurstEvent[]>([]);

  const handleGlobalClick = useCallback((e: MouseEvent) => {
    // Generate 6-10 monochromatic shards
    const particleCount = Math.floor(Math.random() * 5) + 6;
    const particles: BurstParticle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        id: `${Date.now()}-${i}`,
        x: 0, 
        y: 0,
        // Explode outward in random angles
        angle: Math.random() * Math.PI * 2, 
        // varying speed
        speed: Math.random() * 40 + 20, 
        // small shard size
        size: Math.random() * 3 + 2, 
      });
    }

    const newBurst: BurstEvent = {
      id: Date.now().toString(),
      x: e.clientX,
      y: e.clientY,
      particles,
    };

    setBursts((prev) => [...prev, newBurst]);

    // Clean up burst after animation finishes (500ms)
    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== newBurst.id));
    }, 600);
  }, []);

  useEffect(() => {
    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, [handleGlobalClick]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9998] overflow-hidden">
      <AnimatePresence>
        {bursts.map((burst) => (
          <div
            key={burst.id}
            className="absolute"
            style={{ top: burst.y, left: burst.x }}
          >
            {burst.particles.map((p) => {
              // Calculate end coordinates based on angle and speed
              const targetX = Math.cos(p.angle) * p.speed;
              const targetY = Math.sin(p.angle) * p.speed;

              return (
                <motion.div
                  key={p.id}
                  initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                  animate={{
                    x: targetX,
                    y: targetY,
                    scale: [0, 1, 0], // expands to full, then shrinks away
                    opacity: [1, 0.8, 0],
                  }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  style={{
                    position: 'absolute',
                    width: `${p.size}px`,
                    height: `${p.size}px`,
                    backgroundColor: '#fff',
                    borderRadius: '50%',
                    boxShadow: '0 0 8px rgba(255,255,255,0.6)',
                  }}
                />
              );
            })}
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
