import React from 'react';
import { CONTENT } from '../constants';
import { Section } from './Section';

export const MythTruth: React.FC = () => {
  const { truth } = CONTENT;

  const getColor = (type: string) => {
    switch(type) {
      case 'Problem': return 'border-red-500/30 bg-red-500/5 text-red-200';
      case 'Myth': return 'border-yellow-500/30 bg-yellow-500/5 text-yellow-200';
      case 'Truth': return 'border-brand-green/50 bg-brand-green/10 text-brand-green shadow-[0_0_30px_rgba(34,197,94,0.1)]';
      default: return 'border-white/10 text-white';
    }
  };

  return (
    <Section>
      <div className="grid gap-6 w-full">
        {truth.cards.map((card, index) => (
          <div 
            key={index}
            className={`p-8 rounded-xl border ${getColor(card.type)} transition-all`}
          >
            <h3 className="text-xl md:text-2xl font-bold mb-4 opacity-90">
              {card.title}
            </h3>
            <p className="text-lg opacity-90 leading-relaxed">
              {card.text}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
};