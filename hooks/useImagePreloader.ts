'use client';

import { useState, useEffect, useRef } from 'react';

interface UseImagePreloaderResult {
  images: HTMLImageElement[];
  progress: number;
  isReady: boolean;
}

export function useImagePreloader(
  totalFrames: number,
  basePath: string = '/frames/ezgif-frame-',
  extension: string = '.png',
  concurrency: number = 8
): UseImagePreloaderResult {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>(new Array(totalFrames));

  useEffect(() => {
    if (totalFrames === 0) return;

    let cancelled = false;
    let loadedCount = 0;
    let nextIndex = 1;

    const updateProgress = () => {
      if (cancelled) return;
      const pct = Math.round((loadedCount / totalFrames) * 100);
      setProgress(pct);

      if (loadedCount === totalFrames) {
        setImages([...imagesRef.current]);
        setIsReady(true);
      }
    };

    const loadNext = () => {
      if (cancelled || nextIndex > totalFrames) return;

      const i = nextIndex++;
      const paddedIndex = String(i).padStart(3, '0');
      const src = `${basePath}${paddedIndex}${extension}`;

      const img = new Image();
      img.src = src;
      imagesRef.current[i - 1] = img;

      img.onload = () => {
        loadedCount++;
        updateProgress();
        loadNext();
      };

      img.onerror = () => {
        // Count errored frames so we don't hang forever
        console.error(`Failed to load frame: ${src}`);
        loadedCount++;
        updateProgress();
        loadNext();
      };
    };

    // Start initial concurrent workers
    for (let w = 0; w < concurrency; w++) {
      loadNext();
    }

    return () => {
      cancelled = true;
    };
  }, [totalFrames, basePath, extension, concurrency]);

  return { images, progress, isReady };
}
