
'use client';

import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
  onClick?: () => void;
  to?: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  onClick, 
  to, 
  className = '',
  type = 'button',
  disabled = false
}) => {
  const baseStyles = `inline-flex items-center justify-center px-8 py-3 rounded-full font-medium tracking-wide transition-all duration-500 transform active:scale-95 text-sm md:text-base floating-card gold-border-gradient ${disabled ? 'opacity-60 cursor-not-allowed grayscale-[0.5] scale-100 pointer-events-none' : ''}`;
  
  const variants = {
    primary: "bg-gold text-charcoal-900 font-bold",
    secondary: "bg-charcoal-900 text-white dark:bg-cream dark:text-charcoal",
    outline: "border border-transparent text-charcoal-900 dark:text-cream backdrop-blur-sm"
  };

  const combinedClasses = `${baseStyles} ${variants[variant]} ${className}`;

  if (to && !disabled) {
    return (
      <Link href={to} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combinedClasses} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
