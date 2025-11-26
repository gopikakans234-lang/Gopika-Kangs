import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Lock } from 'lucide-react';
import { ModalProps } from '../types';
import { Button } from './Button';

export const LoginModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate Login API call
    setTimeout(() => {
      console.log(`Login attempt: ${email}`);
      setIsLoading(false);
      onClose();
      // Reset fields
      setEmail('');
      setPassword('');
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-navy-900/80 backdrop-blur-md z-50"
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 flex items-center justify-center z-[51] pointer-events-none p-4"
          >
            <div className="bg-navy-800 border border-white/10 w-full max-w-sm p-8 rounded-2xl shadow-2xl pointer-events-auto relative">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-text-muted hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col gap-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/5 mb-4 text-brand-green">
                    <Lock size={20} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">Welcome Back</h3>
                  <p className="text-text-muted text-sm">
                    Enter your credentials to access your dashboard.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="login-email" className="text-xs font-semibold text-text-muted uppercase tracking-wider block">
                      Email
                    </label>
                    <input
                      type="email"
                      id="login-email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="dev@example.com"
                      className="w-full bg-navy-900/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-brand-green/50 focus:border-brand-green transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="login-password" className="text-xs font-semibold text-text-muted uppercase tracking-wider block">
                      Password
                    </label>
                    <input
                      type="password"
                      id="login-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-navy-900/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-brand-green/50 focus:border-brand-green transition-all"
                    />
                  </div>

                  <div className="pt-2">
                    <Button 
                      type="submit" 
                      fullWidth 
                      disabled={isLoading}
                    >
                      {isLoading ? 'Authenticating...' : 'Log In'}
                    </Button>
                  </div>
                </form>
                
                <div className="text-center">
                  <a href="#" className="text-xs text-text-muted hover:text-white transition-colors">
                    Forgot your password?
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};