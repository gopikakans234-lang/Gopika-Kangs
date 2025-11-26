import React from 'react';
import { CONTENT } from '../constants';
import { Section } from './Section';
import { AlertCircle, ChevronRight } from 'lucide-react';

export const ProblemAgitate: React.FC = () => {
  const { problem, agitate } = CONTENT;

  return (
    <>
      {/* Problem Section */}
      <Section className="bg-navy-900">
        <div className="bg-navy-800/50 border border-white/5 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
          <div className="flex justify-center mb-6 text-red-400">
            <AlertCircle size={48} strokeWidth={1.5} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {problem.heading}
          </h2>
          <p className="text-lg text-text-muted leading-relaxed">
            {problem.description}
          </p>
        </div>
      </Section>

      {/* Agitate Section */}
      <Section className="relative">
        {/* Subtle decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-green/5 blur-[100px] rounded-full pointer-events-none" />

        <h3 className="text-2xl md:text-3xl font-bold text-white mb-12 relative z-10">
          {agitate.subHeading}
        </h3>

        <ul className="space-y-6 text-left max-w-xl mx-auto relative z-10">
          {agitate.points.map((point, index) => (
            <li key={index} className="flex items-start gap-4 text-text-muted text-lg group">
              <span className="mt-1.5 text-red-400 group-hover:text-red-300 transition-colors">
                <ChevronRight size={20} />
              </span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
};
