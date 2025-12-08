
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
        
        <div className="mb-6">
          <p className="text-lg md:text-2xl text-text-muted leading-relaxed font-light mb-4">
            {problem.description}
          </p>
          <p className="text-lg md:text-2xl text-white leading-relaxed font-medium">
            {problem.description2}
          </p>
        </div>

        <div className="text-left mb-8 max-w-2xl mx-auto">
           {agitate.heading && (
             <h4 className="text-xl md:text-2xl font-bold text-white mb-2">
               {agitate.heading}
             </h4>
           )}
           <p className="text-base md:text-lg text-text-muted mb-6">
             {agitate.text}
           </p>

           <ul className="space-y-3">
            {agitate.bullets.map((point: string, i: number) => (
               <li key={i} className="text-base md:text-lg text-text-muted/80 font-light flex items-start gap-3">
                  <span className="text-brand-green mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" />
                  <span>{point}</span>
               </li>
            ))}
          </ul>
        </div>

        <p className="text-lg md:text-xl text-white font-medium leading-relaxed">
          {agitate.conclusion}
        </p>
      </div>
    </Section>
  );
};
