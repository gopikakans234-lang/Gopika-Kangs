
import React from 'react';
import { CONTENT } from '../constants';
import { Section } from './Section';
import { motion } from 'framer-motion';
import { BookOpen, Info, ArrowRight } from 'lucide-react';
import { Button } from './Button';

interface EBookListProps {
  onViewDetails: (id: string) => void;
  onCtaClick: () => void;
}

export const EBookList: React.FC<EBookListProps> = ({ onViewDetails }) => {
  const { ebook } = CONTENT;

  return (
    <div className="pt-24 md:pt-32 min-h-screen bg-[#FDFDFD]">
      {/* Library Header */}
      <header className="py-20 md:py-32 px-6 border-b border-gray-100 bg-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-center text-navy-900 mb-2 opacity-20"
          >
            <BookOpen size={48} strokeWidth={1} />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-navy-900 tracking-tight uppercase"
          >
            {ebook.library.heading}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-2xl text-gray-400 font-medium tracking-tight"
          >
            {ebook.library.subHeading}
          </motion.p>
        </div>
      </header>

      {/* eBook Card Section */}
      <Section className="py-20 md:py-32" animateOnInView={true}>
        <div className="max-w-6xl mx-auto flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-24">
            {ebook.list.map((book, idx) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group flex flex-col items-center"
              >
                {/* Vertical Book Cover */}
                <div 
                  className="relative w-full max-w-[280px] aspect-[2/3] mb-10 cursor-pointer"
                  onClick={() => onViewDetails(book.id)}
                >
                  <div className="absolute inset-0 bg-navy-900 rounded-r-xl shadow-2xl group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.15)] transition-all duration-500 transform group-hover:-translate-y-3 overflow-hidden border border-gray-100">
                    <img 
                      src={book.cover} 
                      alt={book.title} 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                    {/* Spine Shadow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Hover Description Overlay */}
                    <div className="absolute inset-0 bg-white/95 backdrop-blur-sm p-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center">
                      <p className="text-navy-900 text-base md:text-lg leading-relaxed font-bold italic mb-6">
                        {book.summary}
                      </p>
                      <ArrowRight className="text-brand-green" size={24} />
                    </div>
                  </div>
                </div>

                {/* Book Details */}
                <div className="text-center space-y-4 max-w-[300px]">
                  <div className="space-y-1">
                    <h3 className="text-3xl font-black text-navy-900 leading-tight uppercase">
                      {book.title}
                    </h3>
                    <p className="text-sm text-gray-400 font-bold uppercase tracking-widest px-2">
                      {book.subTitle}
                    </p>
                  </div>
                  
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">
                    {book.meta}
                  </div>

                  <div className="pt-6">
                    <button 
                      onClick={() => onViewDetails(book.id)}
                      className="inline-flex items-center gap-2 px-10 py-3 bg-navy-900 text-white rounded-lg text-sm font-black uppercase tracking-widest hover:bg-brand-green transition-all"
                    >
                      Open Book
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Decorative Footer Area */}
      <div className="py-20 bg-white border-t border-gray-100 text-center">
        <p className="text-gray-300 text-xs font-black uppercase tracking-[0.4em]">Webolution Professional Reading Platform</p>
      </div>
    </div>
  );
};
