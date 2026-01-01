'use client';

import React, { useEffect, useState } from 'react';

const GoldDust: React.FC = () => {
  const [particles, setParticles] = useState<Array<{ id: number; left: string; size: string; duration: string; delay: string }>>([]);

  useEffect(() => {
    // Generate particles only on client side to avoid hydration mismatch
    const particleCount = window.innerWidth < 768 ? 15 : 40; // Fewer particles on mobile
    const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 4 + 2}px`, // 2px to 6px
      duration: `${Math.random() * 10 + 10}s`, // 10s to 20s
      delay: `${Math.random() * 10}s`,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="gold-dust-container">
      {particles.map((p) => (
        <div
          key={p.id}
          className="gold-particle"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}, 5s`, // fall duration, sway duration
            animationDelay: `${p.delay}, 0s`,
          }}
        />
      ))}
    </div>
  );
};

export default GoldDust;
