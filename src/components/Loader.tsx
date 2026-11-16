'use client';

import { useEffect, useState } from 'react';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 800);
    const t2 = setTimeout(() => setPhase(2), 1600);
    const t3 = setTimeout(() => {
      setPhase(3);
      onComplete();
    }, 2400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#1a1612]"
      style={{
        transform: phase === 3 ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <p
        className="font-serif text-6xl text-[#faf8f5]"
        style={{
          transform: phase >= 0 ? 'scale(1)' : 'scale(0.9)',
          opacity: phase >= 0 ? 1 : 0,
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        RV
      </p>

      <p
        className="text-sm text-[#9a8e80] mt-4"
        style={{
          opacity: phase >= 1 ? 1 : 0,
          transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        Where beauty becomes art.
      </p>
    </div>
  );
}