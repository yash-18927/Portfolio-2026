'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Smooth, snappy spring physics for trailing effect
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
  }, [cursorX, cursorY]);

  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    // Check if hovered element is a link, button, or inside one
    if (
      target.tagName.toLowerCase() === 'a' ||
      target.tagName.toLowerCase() === 'button' ||
      target.closest('a') ||
      target.closest('button') ||
      target.classList.contains('interactive')
    ) {
      setIsHovering(true);
    } else {
      setIsHovering(false);
    }
  }, []);

  const handleMouseEnter = () => setIsVisible(true);
  const handleMouseLeave = () => setIsVisible(false);

  useEffect(() => {
    setIsVisible(true);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);

    // Hide default cursor globally
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.body.style.cursor = 'auto';
    };
  }, [handleMouseMove, handleMouseOver]);

  return (
    <motion.div
      className="pointer-events-none fixed z-[9999] top-0 left-0 mix-blend-difference"
      style={{
        x: cursorX,
        y: cursorY,
        opacity: isVisible ? 1 : 0,
      }}
    >
      {/* Outer elegant glass ring */}
      <motion.div
        animate={{
          scale: isHovering ? 2 : 1,
          backgroundColor: isHovering ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0)',
          borderColor: isHovering ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 0.5)',
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          borderWidth: '1px',
          borderStyle: 'solid',
          position: 'absolute',
          top: '-16px',  // Center over exactly the x/y coord
          left: '-16px',
        }}
      />
      {/* Tiny sharp inner dot */}
      <motion.div
        animate={{
          scale: isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
        style={{
          width: '4px',
          height: '4px',
          backgroundColor: '#fff',
          borderRadius: '50%',
          position: 'absolute',
          top: '-2px',
          left: '-2px',
        }}
      />
    </motion.div>
  );
}
