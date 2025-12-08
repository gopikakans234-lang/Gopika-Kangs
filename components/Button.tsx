
import React from 'react';
import { motion } from 'framer-motion';
import { ButtonProps } from '../types';

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  fullWidth = false,
  className = '',
  type = 'button',
  disabled = false
}) => {
  
  // Updated to rounded-full for the "Kit.com" aesthetic
  const baseStyles = "inline-flex items-center justify-center rounded-full px-8 py-4 font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-navy-900 focus:ring-brand-green disabled:opacity-50 disabled:cursor-not-allowed text-base md:text-lg tracking-wide";
  
  const variants = {
    primary: "bg-brand-green text-navy-900 hover:bg-brand-hover hover:shadow-[0_0_20px_rgba(12,205,126,0.3)] shadow-lg",
    secondary: "bg-transparent text-text-main border border-text-muted/30 hover:border-brand-green hover:text-brand-green",
    outline: "border-2 border-brand-green text-brand-green hover:bg-brand-green hover:text-navy-900"
  };

  const widthClass = fullWidth ? "w-full" : "w-auto";

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      {children}
    </motion.button>
  );
};
