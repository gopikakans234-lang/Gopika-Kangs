import React from 'react';
import { CONTENT } from '../constants';
import { Section } from './Section';
import { Activity } from 'lucide-react';

export const ProblemAgitate: React.FC = () => {
  const { problem, agitate } = CONTENT;

  return (
    <Section className="bg-navy-900">
      <div className="bg-navy-800/50 border border-white/5 rounded-2xl p-8 md:p-12 backdrop-blur-sm max-w-3xl mx-auto text-center shadow-2xl">
        <div className="flex justify-center mb-6 text-brand-green">
          <Activity size={48} strokeWidth={1.5} />
        </div>
        
        <p className="text-lg md:text-2xl text-text-muted leading-relaxed font-light mb-6">
          {problem.description}
        </p>

        <ul className="text-left space-y-3 mb-8 max-w-2xl mx-auto">
          {agitate.bullets.map((point: string, i: number) => (
             <li key={i} className="text-base md:text-lg text-text-muted/80 font-light flex items-start gap-3">
                <span className="text-brand-green mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" />
                <span>{point}</span>
             </li>
          ))}
        </ul>

        <p className="text-lg md:text-xl text-white font-medium leading-relaxed">
          {agitate.conclusion}
        </p>
      </div>
    </Section>
  );
};