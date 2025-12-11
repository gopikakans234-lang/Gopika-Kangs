import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, User } from 'lucide-react';
import { ModalProps } from '../types';
import { Button } from './Button';

export const LoginModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate Login/Register API call
    setTimeout(() => {
      console.log(`${mode === 'login' ? 'Login' : 'Register'} attempt:`, { name, email });
      setIsLoading(false);
      onClose();
      // Reset fields
      setName('');
      setEmail('');
      setPassword('');
      setMode('login'); 
    }, 1500);
  };

  const toggleMode = () => {
    setMode(prev => prev === 'login' ? 'register' : 'login');
    // Clear fields on toggle if desired, or keep them
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
                    {mode === 'login' ? <Lock size={20} /> : <User size={20} />}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                  </h3>
                  <p className="text-text-muted text-sm">
                    {mode === 'login' 
                      ? 'Enter your credentials to access your dashboard.' 
                      : 'Sign up to start your career evolution.'}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name field - only for Register */}
                  {mode === 'register' && (
                    <div className="space-y-2">
                      <label htmlFor="auth-name" className="text-xs font-semibold text-text-muted uppercase tracking-wider block">
                        Name
                      </label>
                      <input
                        type="text"
                        id="auth-name"
                        required={mode === 'register'}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-navy-900/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-brand-green/50 focus:border-brand-green transition-all"
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <label htmlFor="auth-email" className="text-xs font-semibold text-text-muted uppercase tracking-wider block">
                      Email
                    </label>
                    <input
                      type="email"
                      id="auth-email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="dev@example.com"
                      className="w-full bg-navy-900/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-brand-green/50 focus:border-brand-green transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="auth-password" className="text-xs font-semibold text-text-muted uppercase tracking-wider block">
                      Password
                    </label>
                    <input
                      type="password"
                      id="auth-password"
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
                      {isLoading ? 'Processing...' : (mode === 'login' ? 'Log In' : 'Register')}
                    </Button>
                  </div>
                </form>
                
                <div className="text-center space-y-3">
                    {mode === 'login' && (
                        <div>
                             <a href="#" className="text-xs text-text-muted hover:text-white transition-colors">
                                Forgot your password?
                            </a>
                        </div>
                    )}
                  
                  <div className="text-sm text-text-muted">
                    {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
                    <button 
                        onClick={toggleMode}
                        className="text-brand-green font-semibold hover:text-white transition-colors ml-1"
                    >
                        {mode === 'login' ? "Register" : "Log In"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};