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
          animate={{
            // Translate exactly 1 grid tile (100px) to seamlessly loop the animation
            y: [0, 100]
          }}
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
            // Rotate the plane to sit like a flat floor stretching to the horizon
            transformOrigin: '50% 100%',
            transform: 'rotateX(75deg)',
            // Draw the structural line-art wireframe 
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px', // Creates the large box grid
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
