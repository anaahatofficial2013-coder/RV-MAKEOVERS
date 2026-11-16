'use client';

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    } as ConstructorParameters<typeof Lenis>[0]);

    function loop(time: number) {
      lenis.raf(time);
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
