
import React from 'react';
import { CONTENT } from '../constants';
import { Section } from './Section';
import { motion } from 'framer-motion';
import { BookOpen, Info } from 'lucide-react';
import { Button } from './Button';

interface EBookListProps {
  onViewDetails: (id: string) => void;
  onCtaClick: () => void;
}

export const EBookList: React.FC<EBookListProps> = ({ onViewDetails }) => {
  const { ebook } = CONTENT;

  return (
    <div className="pt-24 md:pt-32 min-h-screen bg-[#F8F9FA]">
      {/* Library Header */}
      <header className="py-16 md:py-24 px-6 border-b border-gray-200 bg-white">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center text-navy-900 mb-2"
          >
            <BookOpen size={32} strokeWidth={1.5} />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-navy-900 tracking-tight"
          >
            {ebook.library.heading}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-gray-500 font-medium"
          >
            {ebook.library.subHeading}
          </motion.p>
        </div>
      </header>

      {/* Library Bookshelf Grid */}
      <Section className="py-20 md:py-32" animateOnInView={true}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-20">
          {ebook.list.map((book, idx) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer flex flex-col items-center"
              onClick={() => onViewDetails(book.id)}
            >
              {/* Vertical Book Style Cover Container */}
              <div className="relative w-full max-w-[260px] aspect-[2/3] mb-8 perspective-1000 group">
                {/* Book Cover with Spine Shadow */}
                <div className="absolute inset-0 bg-white rounded-r-lg shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden transition-all duration-500 group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)] group-hover:-translate-y-2 border border-gray-100">
                   <img 
                      src={book.cover} 
                      alt={book.title} 
                      className="w-full h-full object-cover opacity-95 group-hover:opacity-100 transition-opacity"
                   />
                   {/* Gradient overlay for physical book dimension */}
                   <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-transparent pointer-events-none" />
                   <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-black/5" />
                </div>
                
                {/* Hover Description overlay - subtle and informative */}
                <div className="absolute inset-0 bg-navy-900/95 backdrop-blur-md p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center rounded-r-lg text-center">
                   <Info className="text-brand-green mx-auto mb-4" size={24} />
                   <p className="text-sm md:text-base text-white/90 leading-relaxed font-medium">
                     {book.summary}
                   </p>
                </div>
              </div>

              {/* Book Info Section */}
              <div className="text-center space-y-3 max-w-[260px]">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-navy-900 leading-tight">
                    {book.title}
                  </h3>
                  <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">
                    {book.subTitle}
                  </p>
                </div>
                
                <div className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 opacity-60">
                   <span>{book.meta}</span>
                </div>

                <div className="pt-6">
                  <Button 
                    variant="outline" 
                    className="text-sm py-2 px-8 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white rounded-lg transition-all"
                  >
                    Open Book
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>
      
      {/* Decorative Shelf Line */}
      <div className="h-px w-full bg-gray-200" />
    </div>
  );
};
