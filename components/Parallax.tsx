'use client';

import React, { useEffect, useRef } from 'react';

interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}

const Parallax: React.FC<ParallaxProps> = ({ children, className = '', speed = 0.1 }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable on mobile via media query check
    if (window.matchMedia('(max-width: 768px)').matches) return;

    const handleScroll = () => {
      if (!ref.current) return;
      const scrollY = window.scrollY;
      const offset = ref.current.offsetTop;
      
      // Move element based on scroll position relative to its offset
      const transformValue = (scrollY - offset) * speed;
      ref.current.style.transform = `translateY(${transformValue}px)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
};

export default Parallax;
