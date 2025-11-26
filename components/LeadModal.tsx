import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, ArrowRight } from 'lucide-react';
import { ModalProps } from '../types';
import { Button } from './Button';

export const LeadModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Simulate API call
    setTimeout(() => {
      console.log(`Lead captured: ${email}`);
      setStatus('success');
      setTimeout(() => {
        onClose();
        setStatus('idle');
        setEmail('');
      }, 2000);
    }, 1000);
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
            className="fixed inset-0 bg-navy-900/90 backdrop-blur-sm z-40"
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-4"
          >
            <div className="bg-navy-800 border border-white/10 w-full max-w-md p-8 rounded-2xl shadow-2xl pointer-events-auto relative">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-text-muted hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              {status === 'success' ? (
                <div className="flex flex-col items-center text-center py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-brand-green mb-4"
                  >
                    <CheckCircle size={64} />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">You're on the list!</h3>
                  <p className="text-text-muted">Keep an eye on your inbox. Your Webolution begins shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-2">Join the Waitlist</h3>
                    <p className="text-text-muted text-sm">
                      Get the career roadmap sent directly to your inbox.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-text-muted block text-left">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="dev@example.com"
                      className="w-full bg-navy-900 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    fullWidth 
                    disabled={status === 'submitting'}
                  >
                    {status === 'submitting' ? 'Processing...' : (
                      <span className="flex items-center gap-2">
                        Get Roadmap <ArrowRight size={18} />
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
