'use client';

import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useScroll, useTransform } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

interface AntiGravityCanvasProps {
  images: HTMLImageElement[];
  totalFrames: number;
  children?: React.ReactNode;
}

export default function AntiGravityCanvas({
  images,
  totalFrames,
  children,
}: AntiGravityCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameIndexRef = useRef<number>(0);
  const rafRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);
  const prevWidthRef = useRef<number>(0); 

  // Map scroll progress mapped to the container's 350vh height
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Create massive parallax movement for background text
  // Upper text (CREATIVE DEVELOPER) moves left-to-right
  const x1 = useTransform(scrollYProgress, [0, 1], ['-100vw', '100vw']);
  // Lower text (DIGITAL DESIGNER) moves right-to-left
  const x2 = useTransform(scrollYProgress, [0, 1], ['100vw', '-100vw']);

  // Cover-fit draw: fills canvas maintaining aspect ratio (like object-fit: cover)
  const drawFrame = useCallback(
    (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, img: HTMLImageElement) => {
      const cw = window.innerWidth;
      const ch = window.innerHeight;
      
      const iw = img.naturalWidth || img.width;
      const ih = img.naturalHeight || img.height;

      if (iw === 0 || ih === 0) return;

      // Use cover-fit (Math.max) to fill the screen so it looks premium
      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;

      let dx: number;
      // On mobile (portrait, narrow screens) center the subject horizontally.
      // On desktop keep the premium right-pin so the subject is never cropped.
      if (cw < 768) {
        // CENTER: show the middle of the image on small screens
        dx = (cw - dw) / 2;
      } else {
        // ALIGN RIGHT for desktop: pin right side so the person is always visible
        dx = cw - dw;
      }

      // Center vertically always
      const dy = (ch - dh) / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);
    },
    []
  );

  // Resize handler: adjusts canvas size to DPR and redraws current frame
  const handleResize = useCallback(() => {
    // FIX: Only redraw on horizontal width change to prevent mobile scroll-bar rendering loops
    if (window.innerWidth === prevWidthRef.current) return;
    prevWidthRef.current = window.innerWidth;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = '100vw';
    canvas.style.height = '100dvh';
    ctx.scale(dpr, dpr);

    // Redraw current frame after resize
    const img = images[Math.round(currentFrameRef.current)];
    if (img) drawFrame(canvas, ctx, img);
  }, [images, drawFrame]);

  useEffect(() => {
    if (!images || images.length === 0) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Initialize canvas with alpha: true for transparency support
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Set canvas dimensions accounting for DPR
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = '100vw';
    canvas.style.height = '100dvh';
    ctx.scale(dpr, dpr);

    // Draw first frame immediately
    if (images[0]) {
      drawFrame(canvas, ctx, images[0]);
    }

    // RAF-backed render function for 60fps smoothness
    const render = () => {
      const targetFrame = Math.min(
        Math.max(0, Math.round(frameIndexRef.current)),
        images.length - 1
      );

      if (targetFrame !== Math.round(currentFrameRef.current)) {
        currentFrameRef.current = targetFrame;
        const img = images[targetFrame];
        if (img) {
          drawFrame(canvas, ctx, img);
        }
      }

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    // GSAP ScrollTrigger: maps scroll progress → frameIndex
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        // Scrub ends exactly at 350vh scroll depth leaving 50vh as a "freeze frame" hold buffer
        end: () => `+=${window.innerHeight * 3.5}`,
        scrub: 0.5,
        onUpdate: (self) => {
          frameIndexRef.current = self.progress * (totalFrames - 1);
        },
      },
    });

    // Dummy tween target so GSAP has something to scrub
    const proxy = { frame: 0 };
    tl.to(proxy, { frame: totalFrames - 1, ease: 'none' });

    // Window resize
    window.addEventListener('resize', handleResize);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      tl.kill();
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [images, totalFrames, drawFrame, handleResize]);

  return (
    <div
      ref={containerRef}
      id="canvas-scroll-container"
      // Extended height to 400vh to absorb scroll momentum, while scrub stops at 350vh
      style={{ height: '400vh', position: 'relative' }}
    >
      {/* Sticky viewport */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100dvh',
          width: '100%',
          overflow: 'hidden',
          background: '#000', // ensure true black behind alpha
        }}
      >
        {/* Kinetic Marquee Typography Layer */}
        {/* Pointer-events-none and z-20 puts it beautifully layered over the background video frames */}
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center pointer-events-none overflow-hidden mix-blend-difference">
          <motion.div
            style={{ x: x1 }}
            className="whitespace-nowrap font-inter font-black tracking-tighter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h2 
              style={{
                fontSize: 'clamp(4rem, 15vw, 24rem)',
                lineHeight: '0.8',
                color: 'transparent',
                WebkitTextStroke: '1px rgba(255, 255, 255, 0.1)',
                textTransform: 'uppercase',
              }}
            >
              CREATIVE
            </h2>
          </motion.div>
          <motion.div
            style={{ x: x2 }}
            className="whitespace-nowrap font-inter font-black tracking-tighter mt-4"
          >
            <h2 
              style={{
                fontSize: 'clamp(4rem, 15vw, 24rem)',
                lineHeight: '0.8',
                color: 'transparent',
                WebkitTextStroke: '1px rgba(255, 255, 255, 0.1)',
                textTransform: 'uppercase',
              }}
            >
              DEVELOPER
            </h2>
          </motion.div>
        </div>

        {/* Canvas — transparent context so page bg shows through alpha areas */}
        <canvas
          ref={canvasRef}
          id="antigravity-canvas"
          className="z-10"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'block',
          }}
        />

        {/* Seamless Fade To Black Gradient at the bottom */}
        <div 
          className="absolute bottom-0 left-0 w-full z-20 pointer-events-none"
          style={{ 
            height: '40vh',
            background: 'linear-gradient(to bottom, transparent, #000000)' 
          }}
        />

        {/* Mobile gradient vignette on the left/bottom for text readability */}
        <div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
            // Only meaningful on mobile — on desktop the right-aligned image naturally separates text from subject
          }}
        />

        {/* Overlay children (HeroOverlay, interactable text, etc.) */}
        <div className="absolute inset-0 z-30 pointer-events-none">{children}</div>
      </div>
    </div>
  );
}
