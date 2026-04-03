'use client';

import { motion } from 'framer-motion';

export default function CyberGrid() {
  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      style={{
        // Radial mask to make the grid fade smoothly into black edges (no hard box)
        maskImage: 'radial-gradient(ellipse at 50% 100%, black 10%, transparent 60%)',
        WebkitMaskImage: 'radial-gradient(ellipse at 50% 100%, black 10%, transparent 60%)',
      }}
    >
      <div
        className="absolute bottom-0 w-full"
        style={{
          height: '200%',
          perspective: '1000px',
        }}
      >
        <motion.div
          animate={{ y: [0, 100] }}
          transition={{
            duration: 2,
            ease: 'linear',
            repeat: Infinity,
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: '-50%',
            width: '200%',
            height: '100%',
            transformOrigin: '50% 100%',
            transform: 'rotateX(75deg)',
            willChange: 'transform', // promotes to GPU compositor layer
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.07) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }}
        />
      </div>
      
      {/* Optional horizon glow */}
      <div 
        className="absolute w-full h-1/2 bottom-0 z-10"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)',
          pointerEvents: 'none'
        }}
      />
    </div>
  );
}
